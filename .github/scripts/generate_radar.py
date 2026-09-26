#!/usr/bin/env python3
"""
Dynamic Contribution Radar Generator
Fetches recent commits, events, and repositories from GitHub API
and generates an SVG radar chart for the profile README.
"""

import os
import math
import json
import urllib.request
from datetime import datetime, timezone

USERNAME = "Ritabanm"
OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../assets/contribution-radar.svg")

# Optional repository exclusions (can be set via environment variable)
EXCLUDE_REPOS = {r.strip().lower() for r in os.environ.get("EXCLUDE_REPOS", "").split(",") if r.strip()}

CATEGORIES = [
    {
        "id": "ai_infra",
        "label": "AI Infra & Kernels",
        "icon": "⚡",
        "keywords": ["modern-ai-infra", "tensorrt-llm", "vllm", "torchtitan", "cutlass", "mlx", "pytorch", "cuda", "triton", "kernel", "gpu", "inference", "hbm"],
        "base_weight": 85
    },
    {
        "id": "distributed",
        "label": "Distributed & Cloud",
        "icon": "🌐",
        "keywords": ["kubernetes", "datadog-agent", "swift-concurrency-tutorials", "deepspeed", "cluster", "parallel", "fsdp", "docker", "cloud"],
        "base_weight": 80
    },
    {
        "id": "security",
        "label": "Security & Sandboxing",
        "icon": "🛡️",
        "keywords": ["openai-agent-security", "devsecops-toolkit", "adversarial-account-guard", "security", "sandbox", "guard", "injection", "threat"],
        "base_weight": 75
    },
    {
        "id": "benchmarks",
        "label": "Benchmarks & Evaluation",
        "icon": "📊",
        "keywords": ["adapt-iq", "ruler", "benchmark", "measuring-agi", "kaggle", "eval", "metrics"],
        "base_weight": 80
    },
    {
        "id": "embodied",
        "label": "Embodied AI & Robotics",
        "icon": "🤖",
        "keywords": ["bridgedata-openvla-generalization", "openvla", "robotics", "embodied", "vision-language-action", "vla"],
        "base_weight": 70
    },
    {
        "id": "arch_embedded",
        "label": "Architecture & Embedded",
        "icon": "💻",
        "keywords": ["hardware-programming-c", "syntharch-rl", "meta-vr-dev", "texit-pdf", "cortex-m", "bare-metal", "arm", "webxr", "architecture"],
        "base_weight": 78
    }
]


def fetch_github_data():
    headers = {
        "User-Agent": "Ritabanm-Radar-Bot",
        "Accept": "application/vnd.github.v3+json"
    }
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    events = []
    repos = []

    # 1. Fetch recent events (commits, pushes)
    try:
        req = urllib.request.Request(f"https://api.github.com/users/{USERNAME}/events/public?per_page=100", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            events = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"[Warning] Could not fetch events: {e}")

    # 2. Fetch public repositories
    try:
        req = urllib.request.Request(f"https://api.github.com/users/{USERNAME}/repos?per_page=100&sort=updated", headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            repos = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"[Warning] Could not fetch repos: {e}")

    return events, repos


def compute_scores(events, repos):
    # Initialize counts
    commit_counts = {cat["id"]: 0 for cat in CATEGORIES}
    repo_counts = {cat["id"]: 0 for cat in CATEGORIES}

    # Count commits from recent push events
    for event in events:
        repo_name = event.get("repo", {}).get("name", "").lower()
        if any(ex in repo_name for ex in EXCLUDE_REPOS):
            continue

        if event.get("type") == "PushEvent":
            commits = event.get("payload", {}).get("commits", [])
            num_commits = len(commits) if commits else 1
            matched = False
            for cat in CATEGORIES:
                for kw in cat["keywords"]:
                    if kw in repo_name:
                        commit_counts[cat["id"]] += num_commits
                        matched = True
                        break
                if matched:
                    break

    # Count repositories matching categories
    for repo in repos:
        repo_name = repo.get("name", "").lower()
        if any(ex in repo_name for ex in EXCLUDE_REPOS):
            continue
        description = (repo.get("description") or "").lower()
        language = (repo.get("language") or "").lower()
        text_to_check = f"{repo_name} {description} {language}"

        for cat in CATEGORIES:
            for kw in cat["keywords"]:
                if kw in text_to_check:
                    repo_counts[cat["id"]] += 1
                    break

    # Compute final percentage scores (65% to 98% scale for balanced visual appeal)
    final_scores = {}
    for cat in CATEGORIES:
        cid = cat["id"]
        dynamic_boost = (commit_counts[cid] * 3) + (repo_counts[cid] * 2)
        score = cat["base_weight"] + min(dynamic_boost, 14)
        score = max(60, min(96, score))
        final_scores[cid] = score

    return final_scores, commit_counts, repo_counts


def generate_svg(scores, commit_counts, repo_counts):
    width = 760
    height = 510
    cx = 380
    cy = 250
    radius = 135

    num_axes = len(CATEGORIES)
    # Start top at 90 deg (pi/2) and rotate clockwise
    angles = [math.pi / 2 - (i * 2 * math.pi / num_axes) for i in range(num_axes)]

    # Rings (20%, 40%, 60%, 80%, 100%)
    rings_svg = []
    for level in [0.2, 0.4, 0.6, 0.8, 1.0]:
        r = radius * level
        pts = []
        for a in angles:
            x = cx + r * math.cos(a)
            y = cy - r * math.sin(a)
            pts.append(f"{x:.1f},{y:.1f}")
        rings_svg.append(f'<polygon points="{" ".join(pts)}" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="{"3,3" if level < 1.0 else "none"}" opacity="0.8"/>')

    # Radial axis lines
    axes_svg = []
    for a in angles:
        x2 = cx + radius * math.cos(a)
        y2 = cy - radius * math.sin(a)
        axes_svg.append(f'<line x1="{cx}" y1="{cy}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#334155" stroke-width="1.3" opacity="0.6"/>')

    # Data polygon points
    data_pts = []
    dot_nodes = []
    for i, cat in enumerate(CATEGORIES):
        cid = cat["id"]
        score = scores[cid]
        val_ratio = score / 100.0
        r = radius * val_ratio
        a = angles[i]
        x = cx + r * math.cos(a)
        y = cy - r * math.sin(a)
        data_pts.append(f"{x:.1f},{y:.1f}")
        dot_nodes.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.5" fill="#38bdf8" stroke="#0f172a" stroke-width="2"/>')

    data_polygon = " ".join(data_pts)

    # Category Labels positioned around the radar
    labels_svg = []
    for i, cat in enumerate(CATEGORIES):
        cid = cat["id"]
        score = scores[cid]
        a = angles[i]
        label_r = radius + 34
        lx = cx + label_r * math.cos(a)
        ly = cy - label_r * math.sin(a)

        # Text anchors based on angle
        if abs(math.cos(a)) < 0.2:
            anchor = "middle"
            if math.sin(a) > 0:
                ly -= 6
            else:
                ly += 16
        elif math.cos(a) > 0:
            anchor = "start"
            lx += 8
        else:
            anchor = "end"
            lx -= 8

        labels_svg.append(f'''
        <g transform="translate({lx:.1f}, {ly:.1f})">
          <text text-anchor="{anchor}" font-family="Plus Jakarta Sans, -apple-system, sans-serif" font-weight="700" font-size="12.5" fill="#f1f5f9">
            {cat["icon"]} {cat["label"]}
          </text>
          <text text-anchor="{anchor}" dy="14" font-family="JetBrains Mono, monospace" font-size="10.5" fill="#38bdf8" font-weight="600">
            {score}% capability index
          </text>
        </g>
        ''')

    now_utc = datetime.now(timezone.utc).strftime("%b %d, %Y")

    svg_content = f'''<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="{width}" y2="{height}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#070a11"/>
      <stop offset="50%" stop-color="#0d1424"/>
      <stop offset="100%" stop-color="#080c16"/>
    </linearGradient>

    <!-- Radar Area Gradient -->
    <linearGradient id="radarFill" x1="{cx - radius}" y1="{cy - radius}" x2="{cx + radius}" y2="{cy + radius}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.50"/>
      <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.45"/>
    </linearGradient>

    <!-- Subtle Glow Filter -->
    <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    @keyframes pulse {{
      0% {{ opacity: 0.6; transform: scale(0.98); }}
      50% {{ opacity: 1; transform: scale(1.02); }}
      100% {{ opacity: 0.6; transform: scale(0.98); }}
    }}
    .glow-dot {{
      animation: pulse 2.4s infinite ease-in-out;
    }}
  </style>

  <!-- Container Box -->
  <rect x="2" y="2" width="{width - 4}" height="{height - 4}" rx="18" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Top Decorative Header Bar -->
  <g transform="translate(32, 28)">
    <circle cx="6" cy="6" r="4" fill="#10b981" class="glow-dot"/>
    <text x="18" y="10" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#10b981" letter-spacing="1">LIVE TELEMETRY // COMMIT-WEIGHTED RADAR</text>
    <text x="0" y="34" font-family="Plus Jakarta Sans, -apple-system, sans-serif" font-size="19" font-weight="800" fill="#f8fafc">
      Systems &amp; Engineering Contribution Focus
    </text>
    <text x="0" y="52" font-family="Plus Jakarta Sans, -apple-system, sans-serif" font-size="11.5" fill="#94a3b8">
      Dynamically aggregated across multi-GPU scaling, low-level kernels, robotics, and security codebases
    </text>
  </g>

  <!-- Timestamp Badge -->
  <g transform="translate({width - 155}, 28)">
    <rect width="125" height="24" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="62" y="16" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#38bdf8" font-weight="600">
      ⚡ {now_utc}
    </text>
  </g>

  <!-- Grid Rings & Radial Axes -->
  <g>
    {''.join(rings_svg)}
    {''.join(axes_svg)}
  </g>

  <!-- Radar Area -->
  <polygon points="{data_polygon}" fill="url(#radarFill)" stroke="#00f5ff" stroke-width="2.4" filter="url(#radarGlow)"/>

  <!-- Node Dots -->
  <g>
    {''.join(dot_nodes)}
  </g>

  <!-- Axis Category Labels -->
  <g>
    {''.join(labels_svg)}
  </g>

  <!-- Bottom Mini Legend -->
  <g transform="translate(32, {height - 24})">
    <text x="0" y="0" font-family="JetBrains Mono, monospace" font-size="10" fill="#64748b">
      ● Metrics automatically synchronized via GitHub Actions on recent push events &bull; Excludes under-review work
    </text>
  </g>
</svg>
'''
    return svg_content


def main():
    print(f"Fetching GitHub activity for {USERNAME}...")
    events, repos = fetch_github_data()
    print(f"Analyzed {len(events)} events and {len(repos)} repositories.")

    scores, commit_counts, repo_counts = compute_scores(events, repos)
    print("Computed Contribution Radar Scores:")
    for cat in CATEGORIES:
        cid = cat["id"]
        print(f"  - {cat['label']}: {scores[cid]}% (commits: {commit_counts[cid]}, repos: {repo_counts[cid]})")

    svg_data = generate_svg(scores, commit_counts, repo_counts)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(svg_data)

    print(f"Successfully generated dynamic contribution radar: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
