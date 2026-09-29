/**
 * RITABAN MITRA — SYSTEMS PORTFOLIO
 * Dynamic Neon Light Movements Canvas & Minimalist Interactive Console
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeonCanvas();
  initTabs();
  initWorkProjects();
  initSystemsAgent();
  initConsole();
  initContact();
});

function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

/* =============================================================================
   10 PROJECTS DATA (Authentic Systems, Original Codebases & Research)
   ============================================================================= */
const PROJECTS_DATA = [
  {
    id: 'modern-ai-infra',
    title: 'modern-ai-infra',
    role: 'Author & Systems Engineer',
    category: 'systems',
    badge: 'Flagship Infrastructure',
    tags: ['PyTorch', 'TorchTitan Benchmarking', '3D Parallelism', 'Triton'],
    shortDesc: 'Distributed LLM scaling harness and benchmarks for partitioning 70B+ parameter models across multi-GPU nodes with minimal communication overhead.',
    deepDesc: 'In-depth distributed infrastructure experiments benchmarking upstream TorchTitan and distributed PyTorch configurations. Analyzes communication vs compute overlap (AllReduce vs AllGather), 1F1B pipeline bubble minimization, and custom Triton kernels for fused layer normalization and RoPE across multi-node GPU clusters.',
    highlights: [
      'Benchmarked 1F1B schedule bubble minimization',
      'Custom fused Triton layer-norm & RoPE kernels',
      'Near-linear scaling efficiency on 4x/8x GPU setups'
    ],
    link: 'https://github.com/Ritabanm/modern-ai-infra',
    recommendedFor: ['distributed', 'kernels'],
    rank: 1
  },
  {
    id: 'adapt-iq',
    title: 'ADAPT-IQ: Cognitive Flexibility Benchmark',
    role: 'Author & Benchmark Lead',
    category: 'systems',
    badge: 'Benchmarking Suite',
    tags: ['Benchmark', 'Kaggle', 'Google DeepMind Challenge', 'Python'],
    shortDesc: 'Novel evaluation benchmark for the Google DeepMind × Kaggle Measuring AGI Challenge that tests whether models can dynamically adapt when constraints change mid-reasoning.',
    deepDesc: 'Standard AI benchmarks evaluate static memorization. ADAPT-IQ introduces the Context-Injection Creativity Test (CICT), injecting shifting constraints and contradictory conditions mid-inference trajectory to rigorously quantify real-time cognitive adaptability and problem-solving flexibility.',
    highlights: [
      'Official submission to Google DeepMind × Kaggle challenge',
      'Dynamic mid-trajectory constraint mutation engine',
      'Open-source evaluation harnesses & reproducible datasets'
    ],
    link: 'https://www.kaggle.com/competitions/kaggle-measuring-agi/writeups/adapt-iq-measuring-ai-cognitive-flexibility',
    recommendedFor: ['security', 'serving'],
    rank: 2
  },
  {
    id: 'bridgedata-openvla',
    title: 'bridgedata-openvla-generalization',
    role: 'Author & Systems Engineer',
    category: 'systems',
    badge: 'Embodied AI & Robotics',
    tags: ['Python', 'Robotics', 'Vision-Language-Action', 'OpenVLA'],
    shortDesc: 'Generalization benchmarks and evaluation harness for Vision-Language-Action (VLA) models in robotic manipulation across diverse multi-task environments.',
    deepDesc: 'Evaluates zero-shot cross-embodiment transfer and visual domain shifts using the BridgeData dataset. Implements batched action token evaluation and camera viewpoint adaptation pipelines to benchmark real-time policy inference latency on edge robotics platforms.',
    highlights: [
      'Cross-embodiment manipulation generalization benchmarks',
      'Vision-Language-Action (VLA) policy evaluation harness',
      'Batched inference latency profiling for edge robotic platforms'
    ],
    link: 'https://github.com/Ritabanm/bridgedata-openvla-generalization',
    recommendedFor: ['serving', 'distributed'],
    rank: 3
  },
  {
    id: 'agent-security',
    title: 'OpenAI-Agent-Security',
    role: 'Author',
    category: 'systems',
    badge: 'Security Sandboxing',
    tags: ['Python', 'Sandboxing', 'Agent Defenses', 'Threat Simulation'],
    shortDesc: 'Threat simulation framework and automatic containment sandbox for autonomous agents running recursive multi-step tool calls.',
    deepDesc: 'Simulates recursive tool escalation, prompt injection payloads hiding inside tool responses, and execution state corruption in autonomous agent loops. Implements automated isolation sandboxing, dynamic privilege de-escalation, and validation filters on tool return payloads.',
    highlights: [
      'Simulates recursive multi-step tool escalation attacks',
      'Lightweight runtime isolation sandboxes for external code',
      'Payload inspection filter preventing secondary injection'
    ],
    link: 'https://github.com/Ritabanm/OpenAI-Agent-Security',
    recommendedFor: ['security', 'tools'],
    rank: 4
  },
  {
    id: 'syntharch-rl',
    title: 'SynthArch: RL System Design Planner',
    role: 'Author & Architect',
    category: 'systems',
    badge: 'RL & System Architecture',
    tags: ['JavaScript', 'Q-Learning', 'System Design', 'Browser-Native'],
    shortDesc: 'Interactive browser-native systems design planner that trains a Q-Learning reinforcement learning agent in real time to optimize architecture layouts under SLA and cost constraints.',
    deepDesc: 'Models distributed system design as a Markov Decision Process (MDP). A client-side Q-Learning agent explores state spaces (database sharding, caching tiers, load balancers, messaging queues) to converge on cost-optimal architectures that meet target latency SLAs without server compute overhead.',
    highlights: [
      'Client-side browser-native Q-Learning engine',
      'Markov Decision Process formulation for distributed architectures',
      'Real-time cost estimation and latency SLA tradeoff curves'
    ],
    link: 'https://github.com/Ritabanm/SynthArch-RL',
    liveUrl: 'https://ritabanm.github.io/SynthArch-RL/',
    recommendedFor: ['serving', 'distributed', 'tools'],
    rank: 5
  },
  {
    id: 'devsecops-toolkit',
    title: 'DevSecops-toolkit',
    role: 'Author & Developer',
    category: 'systems',
    badge: 'DevSecOps & Tooling',
    tags: ['Security', 'CI/CD', 'Vulnerability Scanning', 'Node.js'],
    shortDesc: 'Open source developer security CLI for automated vulnerability detection, container scanning, and CI/CD security gating.',
    deepDesc: 'Automates security guardrails in modern software development pipelines. Features static code vulnerability pattern detection, automated dependency vulnerability alerts, and secret leak scanning before code reaches production.',
    highlights: [
      'Automated dependency & secret leakage detection',
      'Pre-commit & CI/CD pipeline security gates',
      'Lightweight CLI with zero third-party agent overhead'
    ],
    link: 'https://github.com/Ritabanm/DevSecops-toolkit',
    liveUrl: 'https://ritabanm.github.io/DevSecops-toolkit/',
    recommendedFor: ['security', 'tools'],
    rank: 6
  },
  {
    id: 'hardware-c',
    title: 'ARM Cortex-M Hardware Driver Library in C',
    role: 'Author',
    category: 'systems',
    badge: 'Computer Architecture',
    tags: ['C', 'ARM Cortex-M', 'Register-Level I/O', 'Embedded Drivers'],
    shortDesc: 'Production-grade modular C hardware library targeting ARM Cortex-M microcontrollers with register-level memory mapping and peripheral drivers.',
    deepDesc: 'Implements bare-metal hardware drivers directly mapping registers for GPIO, timers, UART, SPI, and DMA controllers. Explores memory-mapped I/O, cache-line alignment, interrupt service routines (ISRs), and volatile memory semantics without reliance on heavy HAL layers.',
    highlights: [
      'Register-level memory-mapped I/O architecture',
      'Zero-overhead bare-metal peripheral controllers',
      'Cache alignment & interrupt handler optimization'
    ],
    link: 'https://github.com/Ritabanm/Hardware-programming-C',
    recommendedFor: ['kernels', 'tools'],
    rank: 7
  },
  {
    id: 'swift-concurrency',
    title: 'Swift Concurrency & Systems Architecture Suite',
    role: 'Author',
    category: 'systems',
    badge: 'Concurrent Systems',
    tags: ['Swift', 'Actors', 'TaskGroups', 'Lock-Free Patterns'],
    shortDesc: 'Comprehensive interactive systems reference demonstrating modern Swift concurrency (Actors, TaskGroups, async/await) and GCD concurrency patterns.',
    deepDesc: 'Runnable architecture suite analyzing data races, structured concurrency lifecycles, reentrancy hazards in actor models, cooperative thread pool scheduling, and high-throughput concurrent stream processing.',
    highlights: [
      'Structured concurrency and Actor isolation guarantees',
      'Cooperative thread pool scheduling & contention benchmarks',
      'Self-contained reproducible concurrency test harnesses'
    ],
    link: 'https://github.com/Ritabanm/Swift-Concurrency-Tutorials',
    recommendedFor: ['distributed', 'kernels'],
    rank: 8
  },
  {
    id: 'texit-pdf',
    title: 'texit-pdf: In-Browser Vector PDF Engine',
    role: 'Author & Creator',
    category: 'systems',
    badge: 'Client-Side Systems',
    tags: ['JavaScript', 'WebAssembly', 'LaTeX', 'Vector Graphics'],
    shortDesc: 'Fast, client-side Markdown to LaTeX vector PDF engine running entirely in the browser with zero server dependencies.',
    deepDesc: 'Compiles complex LaTeX mathematical formulas and rich documents directly in the browser via WebAssembly, producing publication-grade vector PDFs with instant client-side preview rendering and zero data leakage.',
    highlights: [
      '100% in-browser client-side execution via WebAssembly',
      'Zero server latency and full privacy guarantee',
      'Interactive live document synchronization engine'
    ],
    link: 'https://github.com/Ritabanm/texit-pdf',
    liveUrl: 'https://ritabanm.github.io/texit-pdf/',
    recommendedFor: ['serving', 'security', 'tools'],
    rank: 9
  },
  {
    id: 'meta-vr-dev',
    title: 'meta-vr-dev: WebXR & Spatial Computing',
    role: 'Author & Systems Engineer',
    category: 'systems',
    badge: 'Spatial Computing',
    tags: ['WebXR', 'Three.js', 'Meta Quest 3', 'Horizon OS'],
    shortDesc: 'High-performance WebXR spatial computing framework targeting Meta Quest 3 and Horizon OS using Three.js and real-time graphics pipelines.',
    deepDesc: 'Engineered WebXR graphics pipelines with stereoscopic render targets, low-latency 6DoF hand tracking, and spatial audio controllers for immersive browser-based VR applications on standalone headsets.',
    highlights: [
      'Targeted Meta Quest 3 & Horizon OS WebXR runtimes',
      'Stereoscopic Three.js rendering & 6DoF controller binding',
      'High frame-rate VR scene optimization'
    ],
    link: 'https://github.com/Ritabanm/meta-vr-dev',
    recommendedFor: ['kernels', 'serving', 'tools'],
    rank: 10
  }
];

/* =============================================================================
   WORK & CODE VIEW ENGINE: FILTERS, COUNT LIMIT, RECOMMENDATIONS
   ============================================================================= */
let currentProjectFilter = {
  count: 3,        // 3, 5, or 10
  category: 'all', // 'all', 'my-systems', 'open-source'
  recommendation: 'all', // 'all', 'serving', 'distributed', 'security', 'kernels'
  detail: 'compact', // 'compact', 'deep'
  layout: 'cards'    // 'cards', 'list'
};

function initWorkProjects() {
  const container = document.getElementById('work-render-container');
  if (!container) return;

  // 1. Count Toggle (Top 3, Top 5, All 10)
  const countBtns = document.querySelectorAll('#count-toggle .seg-pill-btn');
  countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      countBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProjectFilter.count = parseInt(btn.getAttribute('data-count'), 10) || 10;
      renderProjects();
    });
  });

  // 2. Recommendation Filter Chips
  const recChips = document.querySelectorAll('#recommend-chips .rec-chip');
  recChips.forEach(chip => {
    chip.addEventListener('click', () => {
      recChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentProjectFilter.recommendation = chip.getAttribute('data-rec') || 'all';
      renderProjects();
    });
  });

  // 3. Detail Toggle (Compact vs Deep Dive)
  const detailBtns = document.querySelectorAll('#detail-toggle .seg-pill-btn');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      detailBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProjectFilter.detail = btn.getAttribute('data-detail') || 'compact';
      updateDetailMode();
    });
  });

  // 4. Layout Toggle (Cards vs List)
  const layoutBtns = document.querySelectorAll('#layout-toggle .seg-pill-btn');
  layoutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      layoutBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProjectFilter.layout = btn.getAttribute('data-layout') || 'cards';
      updateLayoutMode();
      renderProjects();
    });
  });

  // Initial render
  updateLayoutMode();
  updateDetailMode();
  renderProjects();
}

function updateDetailMode() {
  const container = document.getElementById('work-render-container');
  if (!container) return;
  if (currentProjectFilter.detail === 'deep') {
    container.classList.remove('compact-mode');
    container.classList.add('deep-mode');
  } else {
    container.classList.remove('deep-mode');
    container.classList.add('compact-mode');
  }
}

function updateLayoutMode() {
  const container = document.getElementById('work-render-container');
  if (!container) return;
  if (currentProjectFilter.layout === 'list') {
    container.classList.remove('cards-layout');
    container.classList.add('list-layout');
  } else {
    container.classList.remove('list-layout');
    container.classList.add('cards-layout');
  }
}

function renderProjects() {
  const container = document.getElementById('work-render-container');
  if (!container) return;

  let list = [...PROJECTS_DATA];

  // Filter / Sort by recommendation
  const rec = currentProjectFilter.recommendation;
  if (rec !== 'all') {
    list.sort((a, b) => {
      const aMatches = a.recommendedFor && a.recommendedFor.includes(rec);
      const bMatches = b.recommendedFor && b.recommendedFor.includes(rec);
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return a.rank - b.rank;
    });
  } else {
    list.sort((a, b) => a.rank - b.rank);
  }

  // Slice by count
  const visibleProjects = list.slice(0, currentProjectFilter.count);

  if (visibleProjects.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center; background: var(--bg-card); border: 1px dashed var(--border); border-radius: var(--radius-md);">
        <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1rem;">No projects match the current filter selection.</p>
        <button id="reset-filter-btn" class="seg-pill-btn active" style="margin: 0 auto; display: inline-flex; padding: 0.5rem 1rem;">Reset Filters</button>
      </div>
    `;
    const rBtn = document.getElementById('reset-filter-btn');
    if (rBtn) {
      rBtn.addEventListener('click', () => {
        applyProjectFilters({ count: 10, recommendation: 'all' });
      });
    }
    return;
  }

  if (currentProjectFilter.layout === 'cards') {
    container.innerHTML = visibleProjects.map(p => {
      const isRecMatch = rec !== 'all' && p.recommendedFor && p.recommendedFor.includes(rec);
      return `
        <article class="work-card ${p.rank <= 3 ? 'featured-card' : ''} ${isRecMatch ? 'matched-rec' : ''}" id="project-${p.id}">
          <div class="work-card-top">
            <div class="card-header-tags">
              <span class="role-badge">${escapeHtml(p.role)}</span>
              ${p.badge ? `<span class="badge-pill">${escapeHtml(p.badge)}</span>` : ''}
              ${isRecMatch ? `<span class="rec-match-badge">⚡ Recommended Match</span>` : ''}
            </div>
            <div class="work-card-header">
              <h3 class="work-card-title">${escapeHtml(p.title)}</h3>
              <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="work-card-link" title="Open Repository / Writeup">
                Code &UpperRightArrow;
              </a>
            </div>
            <p class="work-card-short">${escapeHtml(p.shortDesc)}</p>
            
            <div class="deep-detail-block">
              <p><strong>Systems Architecture:</strong> ${escapeHtml(p.deepDesc)}</p>
            </div>

            <ul class="project-highlights">
              ${p.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
            </ul>
          </div>

          <div class="work-card-footer">
            <div class="card-tags">
              ${p.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
            </div>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              ${p.liveUrl ? `
                <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="link-tag" style="font-size: 0.74rem; background: rgba(6,182,212,0.15); border-color: rgba(6,182,212,0.35); color: var(--cyan);">
                  🚀 Live App &UpperRightArrow;
                </a>
              ` : ''}
              <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="link-tag" style="font-size: 0.78rem;">
                Code &UpperRightArrow;
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  } else {
    // List Layout
    container.innerHTML = visibleProjects.map(p => {
      const isRecMatch = rec !== 'all' && p.recommendedFor && p.recommendedFor.includes(rec);
      return `
        <div class="work-list-item ${isRecMatch ? 'matched-rec' : ''}" id="project-${p.id}">
          <div class="list-col-name">
            <span class="list-title">${escapeHtml(p.title)}</span>
            <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
              <span class="role-badge" style="font-size: 0.62rem;">${escapeHtml(p.role)}</span>
              ${p.badge ? `<span class="badge-pill" style="font-size: 0.62rem;">${escapeHtml(p.badge)}</span>` : ''}
              ${isRecMatch ? `<span class="rec-match-badge" style="font-size: 0.62rem;">⚡ Best Match</span>` : ''}
            </div>
          </div>
          <div class="list-col-body">
            <p class="list-desc">${escapeHtml(p.shortDesc)}</p>
            <div class="deep-detail-block" style="margin: 0.4rem 0 0.2rem 0; padding: 0.5rem 0.75rem;">
              <p style="font-size: 0.8rem;"><strong>Architecture:</strong> ${escapeHtml(p.deepDesc)}</p>
            </div>
            <div class="list-tags">
              ${p.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
          <div class="list-col-action" style="display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-end;">
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="work-card-link" style="font-size: 0.74rem; color: var(--cyan);">
                🚀 Live App &UpperRightArrow;
              </a>
            ` : ''}
            <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="work-card-link" style="font-size: 0.76rem;">
              Code &UpperRightArrow;
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
}

function applyProjectFilters({ count, recommendation, detail, layout }) {
  if (count !== undefined) {
    currentProjectFilter.count = count;
    document.querySelectorAll('#count-toggle .seg-pill-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-count'), 10) === count);
    });
  }
  if (category !== undefined) {
    currentProjectFilter.category = category;
    document.querySelectorAll('#category-filter .seg-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
    });
  }
  if (recommendation !== undefined) {
    currentProjectFilter.recommendation = recommendation;
    document.querySelectorAll('#recommend-chips .rec-chip').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-rec') === recommendation);
    });
  }
  if (detail !== undefined) {
    currentProjectFilter.detail = detail;
    document.querySelectorAll('#detail-toggle .seg-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-detail') === detail);
    });
    updateDetailMode();
  }
  if (layout !== undefined) {
    currentProjectFilter.layout = layout;
    document.querySelectorAll('#layout-toggle .seg-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-layout') === layout);
    });
    updateLayoutMode();
  }
  renderProjects();
}

window.applyProjectFilters = applyProjectFilters;
window.switchView = switchView;

/* =============================================================================
   SYSTEMS AGENT CHATBOT (Interactive Assistant to Guide & Choose Projects)
   ============================================================================= */
function initSystemsAgent() {
  const fab = document.getElementById('agent-fab');
  const drawer = document.getElementById('agent-drawer');
  const backdrop = document.getElementById('agent-backdrop');
  const closeBtn = document.getElementById('agent-close-btn');
  const chatBody = document.getElementById('agent-chat-body');
  const input = document.getElementById('agent-input');
  const sendBtn = document.getElementById('agent-send-btn');
  const quickPrompts = document.getElementById('agent-quick-prompts');

  if (!fab || !drawer) return;

  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.classList.add('show');
    if (window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    }
    if (input && !isTouch) input.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (backdrop) backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  fab.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  const bannerBtn = document.getElementById('launch-agent-btn');
  if (bannerBtn) {
    bannerBtn.addEventListener('click', openDrawer);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Quick Prompt Chips
  if (quickPrompts) {
    quickPrompts.addEventListener('click', (e) => {
      const chip = e.target.closest('.prompt-chip');
      if (chip) {
        const query = chip.getAttribute('data-q') || chip.textContent;
        handleUserQuery(query.trim());
      }
    });
  }

  // Send on enter or click
  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val) {
        handleUserQuery(val);
        input.value = '';
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) {
          handleUserQuery(val);
          input.value = '';
        }
      }
    });
  }

  function handleUserQuery(userText) {
    // Append user message
    appendChatMsg(userText, 'user');

    // Bot generates response
    setTimeout(() => {
      const botResponse = generateAgentAnswer(userText);
      appendChatMsg(botResponse.html, 'bot', botResponse.actions);
    }, 280);
  }

  function appendChatMsg(content, sender, actions = []) {
    const msg = document.createElement('div');
    msg.className = `agent-msg ${sender}`;
    msg.innerHTML = content;

    if (actions && actions.length > 0) {
      const group = document.createElement('div');
      group.className = 'agent-action-group';
      actions.forEach(act => {
        const btn = document.createElement('button');
        btn.className = 'agent-action-btn';
        btn.textContent = act.label;
        btn.addEventListener('click', () => {
          act.onClick();
        });
        group.appendChild(btn);
      });
      msg.appendChild(group);
    }

    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function generateAgentAnswer(query) {
    const q = query.toLowerCase();

    // 1. Low-latency Serving / KV Cache / Memory
    if (q.includes('serving') || q.includes('latency') || q.includes('cache') || q.includes('ttft') || q.includes('memory') || q.includes('vllm') || q.includes('robot') || q.includes('openvla')) {
      return {
        html: `For <strong>low-latency serving, robotics &amp; architecture optimization</strong>, Ritaban's core original systems are:<br><br>
               1. <strong>modern-ai-infra:</strong> Distributed scaling harness benchmarking 70B+ LLMs across multi-GPU setups.<br>
               2. <strong>bridgedata-openvla-generalization:</strong> Batched evaluation and low-latency inference profiling for Vision-Language-Action (VLA) robotics.<br>
               3. <strong>SynthArch-RL:</strong> Browser-native Reinforcement Learning system design planner optimizing architecture and SLAs.`,
        actions: [
          {
            label: '⚡ Show Serving & Architecture',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ recommendation: 'serving', count: 5 });
            }
          },
          {
            label: 'View modern-ai-infra Code',
            onClick: () => {
              window.open('https://github.com/Ritabanm/modern-ai-infra', '_blank');
            }
          },
          {
            label: 'View OpenVLA Code',
            onClick: () => {
              window.open('https://github.com/Ritabanm/bridgedata-openvla-generalization', '_blank');
            }
          }
        ]
      };
    }

    // 2. Distributed / Multi-GPU / 3D Parallelism / TorchTitan
    if (q.includes('distribut') || q.includes('multi-gpu') || q.includes('parallel') || q.includes('titan') || q.includes('cluster') || q.includes('fsdp')) {
      return {
        html: `For <strong>multi-GPU &amp; distributed systems</strong>:<br><br>
               1. <strong>modern-ai-infra:</strong> Distributed scaling harness benchmarking 70B+ LLMs across Tensor, Pipeline, and FSDP2 parallelism with custom Triton kernels.<br>
               2. <strong>Swift Concurrency Suite:</strong> Interactive architecture reference analyzing actors, cooperative thread pools, and data race mitigation.<br>
               3. <strong>ARM Cortex-M Hardware Driver Suite:</strong> Low-level memory-mapped I/O, UART, and register-level hardware programming in C.`,
        actions: [
          {
            label: '🌐 Show Multi-GPU Projects',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ recommendation: 'distributed', count: 5 });
            }
          },
          {
            label: 'View modern-ai-infra Code',
            onClick: () => {
              window.open('https://github.com/Ritabanm/modern-ai-infra', '_blank');
            }
          }
        ]
      };
    }

    // 3. Security / Sandboxing / Benchmarks / Kaggle / DeepMind
    if (q.includes('security') || q.includes('benchmark') || q.includes('kaggle') || q.includes('deepmind') || q.includes('agi') || q.includes('sandbox') || q.includes('threat')) {
      return {
        html: `For <strong>evaluation benchmarks &amp; agent security</strong>:<br><br>
               1. <strong>ADAPT-IQ:</strong> Official Google DeepMind &times; Kaggle Measuring AGI Challenge submission evaluating mid-trajectory dynamic reasoning adaptability.<br>
               2. <strong>OpenAI-Agent-Security:</strong> Threat simulation framework and automated isolation sandbox for recursive multi-step tool calls.`,
        actions: [
          {
            label: '🛡️ Show Security & Benchmarks',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ recommendation: 'security', count: 5 });
            }
          },
          {
            label: 'Read Kaggle Writeup',
            onClick: () => {
              window.open('https://www.kaggle.com/competitions/kaggle-measuring-agi/writeups/adapt-iq-measuring-ai-cognitive-flexibility', '_blank');
            }
          }
        ]
      };
    }

    // 4. CUDA / Kernels / Hardware
    if (q.includes('cuda') || q.includes('kernel') || q.includes('hardware') || q.includes('c++') || q.includes('c ') || q.includes('arch')) {
      return {
        html: `For <strong>low-level hardware, kernels &amp; architecture</strong>:<br><br>
               1. <strong>ARM Cortex-M Hardware Driver Library in C:</strong> Bare-metal modular C drivers with register-level memory mapping and peripheral controllers.<br>
               2. <strong>modern-ai-infra:</strong> Custom Triton kernels for fused layer normalization and RoPE on modern GPU clusters.<br>
               3. <strong>meta-vr-dev:</strong> Draw-call batching and stereoscopic shader optimizations for low-latency VR rendering.`,
        actions: [
          {
            label: '💻 Show Kernel & Hardware Projects',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ recommendation: 'kernels', count: 5 });
            }
          },
          {
            label: 'View Hardware-C Code',
            onClick: () => {
              window.open('https://github.com/Ritabanm/Hardware-programming-C', '_blank');
            }
          }
        ]
      };
    }

    // 5. Top 3 Projects
    if (q.includes('top 3') || q.includes('top three') || q.includes('best 3') || q.includes('core 3')) {
      return {
        html: `Ritaban's <strong>Top 3 Core Systems Projects</strong> are:<br><br>
               1. <strong>modern-ai-infra</strong> &mdash; Distributed LLM scaling harness with custom Triton kernels on multi-GPU clusters.<br>
               2. <strong>ADAPT-IQ</strong> &mdash; Cognitive flexibility benchmark for the Google DeepMind &times; Kaggle AGI challenge.<br>
               3. <strong>bridgedata-openvla-generalization</strong> &mdash; Generalization &amp; low-latency inference evaluation harness for Vision-Language-Action robotics.`,
        actions: [
          {
            label: 'Switch View to Top 3',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ count: 3, recommendation: 'all', category: 'all' });
            }
          }
        ]
      };
    }

    // 6. Top 5 / All 10 Projects
    if (q.includes('top 5') || q.includes('10') || q.includes('all projects') || q.includes('everything')) {
      return {
        html: `I can show you all 10 projects or top 5 projects across AI serving, distributed clusters, security, and low-level kernels. Click below to toggle your view!`,
        actions: [
          {
            label: 'Show Top 5 Projects',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ count: 5, recommendation: 'all', category: 'all' });
            }
          },
          {
            label: 'Show All 10 Projects',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ count: 10, recommendation: 'all', category: 'all' });
            }
          }
        ]
      };
    }

    // 7. Contact / Email / Hiring
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('recruiter') || q.includes('resume')) {
      return {
        html: `Ritaban is actively interested in <strong>AI Infrastructure &amp; Systems Engineering</strong> roles.<br><br>
               &bull; <strong>Email:</strong> <a href="mailto:ritabanmitra709@gmail.com">ritabanmitra709@gmail.com</a><br>
               &bull; <strong>GitHub:</strong> <a href="https://github.com/Ritabanm" target="_blank">github.com/Ritabanm</a>`,
        actions: [
          {
            label: 'Go to Contact Tab',
            onClick: () => {
              switchView('contact');
            }
          },
          {
            label: 'Copy Email Address',
            onClick: () => {
              navigator.clipboard.writeText('ritabanmitra709@gmail.com');
              const toast = document.getElementById('toast');
              if (toast) {
                toast.textContent = '✓ Copied email: ritabanmitra709@gmail.com';
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2500);
              }
            }
          }
        ]
      };
    }

    // 7.5 Open Source Tools & CLIs
    if (q.includes('tool') || q.includes('cli') || q.includes('open source') || q.includes('developer tool') || q.includes('utility')) {
      return {
        html: `Ritaban has authored and maintains several <strong>open source developer tools &amp; systems</strong>:<br><br>
               &bull; <strong>SynthArch-RL:</strong> Browser-native RL system design planner for SLA optimization.<br>
               &bull; <strong>DevSecops-toolkit:</strong> Automated vulnerability &amp; secret leak detection CLI for CI/CD.<br>
               &bull; <strong>Hardware-programming-C:</strong> Bare-metal ARM Cortex-M peripheral driver suite.<br>
               &bull; <strong>OpenAI-Agent-Security:</strong> Threat simulation framework &amp; sandboxing harness for tool calls.`,
        actions: [
          {
            label: '🛠️ Open Tools Section',
            onClick: () => {
              switchView('tools');
            }
          },
          {
            label: 'Filter Projects by Tools',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ count: 10, recommendation: 'tools' });
            }
          }
        ]
      };
    }

    // 7.8 Academic Research & Publications
    if (q.includes('research') || q.includes('paper') || q.includes('publication') || q.includes('scholar') || q.includes('academic') || q.includes('adapt-iq') || q.includes('stroke')) {
      return {
        html: `Ritaban has authored <strong>academic research and benchmark literature</strong>:<br><br>
               1. <strong>ADAPT-IQ (2026):</strong> Context-Injection Creativity Test (CICT) measuring cognitive flexibility in frontier models (Google DeepMind &times; Kaggle AGI Challenge).<br>
               2. <strong>Stroke Patient Prediction (2022):</strong> Parallelized predictive modeling using Random Forest vs. SVM (10 Citations, <em>Advances in Parallel Computing</em>).<br><br>
               Verified researcher at <strong>University at Buffalo</strong> with 10 citations on Google Scholar.`,
        actions: [
          {
            label: '🎓 Go to Research Tab',
            onClick: () => {
              switchView('research');
            }
          },
          {
            label: 'Read ADAPT-IQ Writeup',
            onClick: () => {
              window.open('https://www.kaggle.com/competitions/kaggle-measuring-agi/writeups/adapt-iq-measuring-ai-cognitive-flexibility', '_blank');
            }
          },
          {
            label: 'View Stroke Paper',
            onClick: () => {
              window.open('https://www.researchgate.net/publication/366052737_Efficient_Prediction_of_Stroke_Patients_Using_Random_Forest_Algorithm_in_Comparison_to_Support_Vector_Machine', '_blank');
            }
          }
        ]
      };
    }

    // 8. Stack / Languages
    if (q.includes('stack') || q.includes('language') || q.includes('skill')) {
      return {
        html: `<strong>Languages &amp; Core Systems Stack:</strong><br>
               &bull; <strong>Languages:</strong> C++, C, CUDA, Python, Rust, Go, POSIX Shell<br>
               &bull; <strong>ML Runtimes:</strong> vLLM, TensorRT-LLM, TorchTitan, Apple MLX, PyTorch<br>
               &bull; <strong>Infra &amp; Profiling:</strong> Nsight Systems/Compute, Linux eBPF, Docker, Kubernetes`,
        actions: [
          {
            label: 'Show All 10 Projects',
            onClick: () => {
              switchView('work');
              applyProjectFilters({ count: 10 });
            }
          }
        ]
      };
    }

    // Default Fallback with Helpful Suggestions
    return {
      html: `I can help you explore Ritaban's work. Would you like to see <strong>fast serving &amp; memory caching</strong>, <strong>multi-GPU distributed scaling</strong>, <strong>evaluation benchmarks</strong>, or <strong>CUDA kernels</strong>?`,
      actions: [
        {
          label: '⚡ Fast AI Serving',
          onClick: () => {
            switchView('work');
            applyProjectFilters({ recommendation: 'serving', count: 5 });
          }
        },
        {
          label: '🌐 Multi-GPU Scaling',
          onClick: () => {
            switchView('work');
            applyProjectFilters({ recommendation: 'distributed', count: 5 });
          }
        },
        {
          label: '🛡️ Security & Benchmarks',
          onClick: () => {
            switchView('work');
            applyProjectFilters({ recommendation: 'security', count: 5 });
          }
        },
        {
          label: 'Show Top 3 Projects',
          onClick: () => {
            switchView('work');
            applyProjectFilters({ count: 3, recommendation: 'all', category: 'all' });
          }
        }
      ]
    };
  }

  // Expose open function globally so terminal can open it
  window.openSystemsAgent = openDrawer;
}


/* =============================================================================
   1. DYNAMIC NEON LIGHT MOVEMENTS CANVAS
   Smooth, organic glowing neon energy trails & floating plasma lights
   ============================================================================= */
function initNeonCanvas() {
  const canvas = document.getElementById('neon-glow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    // Prevent re-rendering on mobile address bar collapse (height-only small shifts)
    if (Math.abs(window.innerWidth - width) > 10 || Math.abs(window.innerHeight - height) > 100) {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
  });

  // Mouse & Touch interaction
  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = width / 2;
  let targetMouseY = height / 2;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      targetMouseX = e.touches[0].clientX;
      targetMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  // Floating neon plasma lights
  const lights = [
    { x: width * 0.2, y: height * 0.3, radius: 280, color: 'rgba(0, 245, 212, 0.16)', speedX: 0.0012, speedY: 0.0016, phase: 0 },
    { x: width * 0.8, y: height * 0.25, radius: 320, color: 'rgba(56, 189, 248, 0.14)', speedX: 0.0015, speedY: 0.0011, phase: 1.5 },
    { x: width * 0.35, y: height * 0.75, radius: 340, color: 'rgba(167, 139, 250, 0.15)', speedX: 0.0011, speedY: 0.0014, phase: 3.14 },
    { x: width * 0.75, y: height * 0.7, radius: 260, color: 'rgba(0, 245, 212, 0.12)', speedX: 0.0018, speedY: 0.0013, phase: 4.7 }
  ];

  // Neon wave streams
  const wavePoints = 20;
  let time = 0;

  function render() {
    time += 0.015;

    // Smooth mouse lerp
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'screen';

    // 1. Draw glowing neon plasma light fields
    lights.forEach((light, i) => {
      const offsetX = Math.sin(time * 0.8 + light.phase) * (width * 0.12);
      const offsetY = Math.cos(time * 0.6 + light.phase) * (height * 0.1);

      const px = light.x + offsetX;
      const py = light.y + offsetY;

      const grad = ctx.createRadialGradient(px, py, 10, px, py, light.radius);
      grad.addColorStop(0, light.color);
      grad.addColorStop(0.5, light.color.replace(/[\d\.]+\)$/, '0.06)'));
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, light.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw dynamic interactive neon aurora waves
    drawNeonWave(time, 0.18, height * 0.35, 'rgba(0, 245, 212, 0.3)', 'rgba(56, 189, 248, 0.1)');
    drawNeonWave(time * 0.85 + 2, 0.22, height * 0.55, 'rgba(167, 139, 250, 0.25)', 'rgba(0, 245, 212, 0.05)');
    drawNeonWave(time * 1.1 + 4, 0.15, height * 0.75, 'rgba(56, 189, 248, 0.2)', 'rgba(167, 139, 250, 0.05)');

    // 3. Subtle dynamic cursor illumination
    const cursorGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 220);
    cursorGrad.addColorStop(0, 'rgba(0, 245, 212, 0.09)');
    cursorGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.03)');
    cursorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = cursorGrad;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 220, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(render);
  }

  function drawNeonWave(t, frequency, baseY, strokeColor, glowColor) {
    ctx.beginPath();
    ctx.moveTo(0, baseY);

    for (let x = 0; x <= width; x += 30) {
      // Harmonic wave calculation + cursor magnetic push
      const distToMouse = Math.abs(x - mouseX);
      const mouseInfluence = Math.max(0, 1 - distToMouse / 280) * 35;
      const wave = Math.sin(x * 0.003 + t) * 45 + Math.cos(x * 0.007 - t * 0.7) * 25 + mouseInfluence;
      const y = baseY + wave;
      ctx.lineTo(x, y);
    }

    // Glowing outer wave
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 14;
    ctx.shadowBlur = 25;
    ctx.shadowColor = strokeColor;
    ctx.stroke();

    // Sharp inner neon beam
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.8;
    ctx.shadowBlur = 12;
    ctx.stroke();

    // Reset shadow
    ctx.shadowBlur = 0;
  }

  render();
}

/* =============================================================================
   2. TAB NAVIGATION
   ============================================================================= */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      switchView(targetView);
    });
  });
}

function switchView(viewName) {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(b => {
    if (b.getAttribute('data-view') === viewName) {
      b.classList.add('active');
      b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      b.classList.remove('active');
    }
  });

  tabPanes.forEach(p => {
    if (p.id === `view-${viewName}`) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (viewName === 'console') {
    const input = document.getElementById('console-input');
    if (input && !isTouch) input.focus();
  }
}

function initProjectToggle() {
  const toggleBtn = document.getElementById('toggle-more-btn');
  const container = document.getElementById('other-projects-container');
  const textSpan = document.getElementById('toggle-more-text');

  if (toggleBtn && container && textSpan) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = container.classList.toggle('open');
      toggleBtn.classList.toggle('open', isOpen);
      textSpan.textContent = isOpen ? 'Hide Other Projects' : 'View Other Projects (3)';
    });
  }
}

/* =============================================================================
   3. CONSOLE (Fast, Jargon-Free, High-Signal)
   ============================================================================= */
function initConsole() {
  const screen = document.getElementById('console-screen');
  const output = document.getElementById('console-output');
  const input = document.getElementById('console-input');

  const history = [];
  let hIdx = -1;

  // Initial message
  renderStartup();

  function renderStartup() {
    output.innerHTML = `
<div class="c-block">
  <div class="c-response" style="border-left-color: var(--cyan);">
    <h4>Hi, I'm Ritaban Mitra.</h4>
    <p>
      I'm an infrastructure systems engineer. 
      I work on making AI models run fast by optimizing memory hierarchies, low-latency runtimes, and distributed clusters.
    </p>
    <p style="margin-bottom: 0;">
      Type <code>now</code> to see what I'm building today, <code>projects</code> for my code, <code>benchmarks</code> to test latency, or click any chip above.
    </p>
  </div>
</div>`;
  }

  // Quick Chips
  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        input.value = cmd;
        handleExec();
      }
    });
  });

  // Clear button dot
  const redDot = document.querySelector('.dot.red');
  if (redDot) {
    redDot.addEventListener('click', () => {
      output.innerHTML = '';
      input.value = '';
    });
  }

  const commands = {
    help: () => `
<div class="c-response">
  <h4>Available Commands:</h4>
  <ul>
    <li><code>now</code> &mdash; What I am building and scaling right now (2026)</li>
    <li><code>projects [3|5|10]</code> &mdash; Summary of my core systems projects (toggle Top 3, 5, or 10)</li>
    <li><code>research</code> &mdash; Academic publications &amp; AI benchmarks (Google Scholar)</li>
    <li><code>tools</code> &mdash; Open source developer tools &amp; live apps I've built</li>
    <li><code>agent</code> &mdash; Open interactive Systems Agent chatbot assistant</li>
    <li><code>radar</code> &mdash; View dynamic contribution radar chart</li>
    <li><code>rec</code> &mdash; Get project recommendations by systems interest</li>
    <li><code>whoami</code> &mdash; My background, credentials &amp; contact</li>
    <li><code>stack</code> &mdash; The languages &amp; systems tools I write code in</li>
    <li><code>benchmarks</code> &mdash; Run a live simulated latency test on an H100 GPU</li>
    <li><code>contact</code> &mdash; Email address &amp; GitHub profile</li>
    <li><code>clear</code> &mdash; Clear the screen</li>
  </ul>
</div>`,

    tools: () => {
      switchView('tools');
      return `
<div class="c-response" style="border-left-color: var(--cyan);">
  <h4>Open Source Tools &amp; Deployed Apps:</h4>
  <p>Switched to the <strong>Open Source Tools</strong> tab. Here are developer tools &amp; live apps Ritaban built:</p>
  <ul>
    <li><strong>SynthArch-RL:</strong> Browser-native RL system design planner &bull; <a href="https://ritabanm.github.io/SynthArch-RL/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
    <li><strong>DevSecops-toolkit:</strong> Automated vulnerability &amp; container scanner &bull; <a href="https://ritabanm.github.io/DevSecops-toolkit/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
    <li><strong>texit-pdf:</strong> In-browser Markdown to LaTeX vector PDF engine &bull; <a href="https://ritabanm.github.io/texit-pdf/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
    <li><strong>NexusCSV:</strong> Private spreadsheet CSV to nested JSON transformer &bull; <a href="https://ritabanm.github.io/NexusCSV/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
    <li><strong>Spectrum:</strong> Canvas-based image color palette &amp; CSS extractor &bull; <a href="https://ritabanm.github.io/Spectrum/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
    <li><strong>Responsive-multiview:</strong> Multi-device viewport responsive design suite &bull; <a href="https://ritabanm.github.io/Responsive-multiview/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
    <li><strong>PolicyBatch:</strong> Client-side Privacy Policy generator &bull; <a href="https://ritabanm.github.io/PolicyBatch/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
    <li><strong>stellar-invoice:</strong> Instant client-side invoice and PDF generator &bull; <a href="https://ritabanm.github.io/stellar-invoice/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
    <li><strong>pomodoro-timer:</strong> Developer focus timer with session analytics &bull; <a href="https://ritabanm.github.io/pomodoro-timer/" target="_blank" style="color:var(--cyan);">Launch App &UpperRightArrow;</a></li>
  </ul>
  <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <button class="agent-action-btn" onclick="switchView('tools')">View Tools Section</button>
  </div>
</div>`;
    },

    agent: () => {
      if (window.openSystemsAgent) {
        setTimeout(window.openSystemsAgent, 100);
      }
      return `
<div class="c-response" style="border-left-color: var(--cyan);">
  <h4>Systems Agent // RM-1 Activated</h4>
  <p>The interactive Systems Agent drawer has been opened on the bottom right. You can ask for personalized project recommendations, multi-GPU scaling experience, or hiring details!</p>
</div>`;
    },

    chat: () => {
      if (window.openSystemsAgent) {
        setTimeout(window.openSystemsAgent, 100);
      }
      return `
<div class="c-response" style="border-left-color: var(--cyan);">
  <h4>Systems Agent // RM-1 Activated</h4>
  <p>Opening chatbot assistant drawer...</p>
</div>`;
    },

    rec: () => `
<div class="c-response" style="border-left-color: var(--cyan);">
  <h4>System Recommendations By Specialty:</h4>
  <ul>
    <li><strong>⚡ Fast AI Serving &amp; Architecture:</strong> bridgedata-openvla-generalization, SynthArch-RL, texit-pdf</li>
    <li><strong>🌐 Multi-GPU &amp; 3D Parallelism:</strong> modern-ai-infra, Swift Concurrency Suite</li>
    <li><strong>🛡️ Security &amp; Benchmarks:</strong> ADAPT-IQ (DeepMind/Kaggle), OpenAI-Agent-Security, DevSecops-toolkit</li>
    <li><strong>💻 Low-Level Hardware &amp; Kernels:</strong> ARM Cortex-M Hardware-C, modern-ai-infra (Triton/CUDA), meta-vr-dev</li>
  </ul>
  <p style="margin-top: 0.5rem;">Click the <strong>Work &amp; Code</strong> tab or ask the <strong>Systems Agent</strong> to explore!</p>
</div>`,

    now: () => `
<div class="c-response">
  <h4>What I'm Working On Right Now (2026):</h4>
  <ul>
    <li><strong>modern-ai-infra:</strong> Benchmarking 3D parallelism and communication overlap with custom Triton kernels on modern GPU clusters.</li>
    <li><strong>Robotics &amp; VLA Generalization:</strong> Profiling and benchmarking zero-shot generalization and batched inference for Vision-Language-Action policies.</li>
    <li><strong>SynthArch-RL:</strong> Developing client-side reinforcement learning models for automated system architecture design.</li>
  </ul>
</div>`,

    projects: (args) => {
      let count = 3;
      if (args && args.includes('5')) count = 5;
      else if (args && args.includes('10')) count = 10;
      else if (args && args.includes('all')) count = 10;

      const projs = PROJECTS_DATA.slice(0, count);
      return `
<div class="c-response">
  <h4>Featured Code &amp; Systems (Showing Top ${count}):</h4>
  <ul>
    ${projs.map(p => `
      <li style="margin-bottom: 0.5rem;">
        <strong>${escapeHtml(p.title)}</strong> &bull; <span style="color:var(--cyan);font-size:0.75rem;">${escapeHtml(p.role)}</span><br>
        <span style="color:var(--text-muted);font-size:0.85rem;">${escapeHtml(p.shortDesc)}</span><br>
        <a href="${p.link}" target="_blank" style="color:var(--cyan);font-size:0.78rem;">${p.link} &UpperRightArrow;</a>
      </li>
    `).join('')}
  </ul>
  <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <button class="agent-action-btn" onclick="switchView('work'); applyProjectFilters({count:3});">View Top 3 in UI</button>
    <button class="agent-action-btn" onclick="switchView('work'); applyProjectFilters({count:5});">View Top 5 in UI</button>
    <button class="agent-action-btn" onclick="switchView('work'); applyProjectFilters({count:10});">View All 10 in UI</button>
  </div>
</div>`;
    },

    whoami: () => `
<div class="c-response">
  <h4>Ritaban Mitra</h4>
  <p><strong>Focus:</strong> AI Infrastructure &amp; Systems Engineering</p>
  <p><strong>Core Focus:</strong> Low-Latency Agent Runtimes, Memory Hierarchies &amp; GPU Scaling</p>
  <p><strong>Core Belief:</strong> AI models don't need more compute to feel instantaneous—they need runtimes that stop repeating work and schedule memory intelligently.</p>
  <p><strong>Email:</strong> <a href="mailto:ritabanmitra709@gmail.com">ritabanmitra709@gmail.com</a> &bull; <strong>GitHub:</strong> <a href="https://github.com/Ritabanm" target="_blank">Ritabanm</a></p>
</div>`,

    stack: () => `
<div class="c-response">
  <h4>Languages &amp; Systems I Use:</h4>
  <ul>
    <li><strong>Core Code:</strong> C++, C, CUDA, Python, Rust, Go, Swift, POSIX Shell</li>
    <li><strong>ML Serving &amp; Systems:</strong> vLLM, TensorRT-LLM, TorchTitan, Apple MLX, PagedAttention, DeepSpeed</li>
    <li><strong>Cluster &amp; Infra:</strong> Kubernetes, Docker, Linux (eBPF, IO_uring), Nsight Systems/Compute, Datadog</li>
  </ul>
</div>`,

    research: () => {
      switchView('research');
      return `
<div class="c-response" style="border-left-color: var(--cyan);">
  <h4>Academic Research &amp; Publications:</h4>
  <p>Switched to the <strong>Research</strong> tab. Featured peer-reviewed research &amp; benchmarks:</p>
  <ul>
    <li>
      <strong>ADAPT-IQ (2026):</strong> Context-Injection Creativity Test (CICT) for Measuring Cognitive Flexibility in Frontier AI &bull; <em>Google DeepMind &times; Kaggle AGI Challenge</em><br>
      <a href="https://www.kaggle.com/competitions/kaggle-measuring-agi/writeups/adapt-iq-measuring-ai-cognitive-flexibility" target="_blank" style="color:var(--cyan); font-size:0.8rem;">Read Kaggle Writeup &UpperRightArrow;</a> &bull; 
      <a href="https://github.com/Ritabanm/adapt-iq" target="_blank" style="color:var(--cyan); font-size:0.8rem;">Benchmark Repo &UpperRightArrow;</a>
    </li>
    <li style="margin-top: 0.5rem;">
      <strong>Stroke Patient Prediction (2022):</strong> Efficient prediction of stroke patients using random forest algorithm in comparison to support vector machine (10 Citations) &bull; <em>Advances in Parallel Computing (IOS Press)</em><br>
      <a href="https://www.researchgate.net/publication/366052737_Efficient_Prediction_of_Stroke_Patients_Using_Random_Forest_Algorithm_in_Comparison_to_Support_Vector_Machine" target="_blank" style="color:var(--cyan); font-size:0.8rem;">View Publication &UpperRightArrow;</a> &bull;
      <a href="https://scholar.google.com/scholar?q=Ritaban+Mitra+University+at+Buffalo" target="_blank" style="color:var(--cyan); font-size:0.8rem;">Google Scholar &UpperRightArrow;</a>
    </li>
  </ul>
  <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <button class="agent-action-btn" onclick="switchView('research')">View Research Section</button>
  </div>
</div>`;
    },

    papers: function() {
      return this.research();
    },

    radar: () => `
<div class="c-response" style="border-left-color: var(--cyan); text-align: center;">
  <h4>Contribution Focus:</h4>
  <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom: 0.75rem;">Dynamically aggregated across recent GitHub commits, PRs &amp; repositories.</p>
  <img src="assets/contribution-radar.svg" alt="Contribution Focus" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 8px 24px rgba(0,0,0,0.4);" />
</div>`,

    benchmarks: () => `
<div class="c-response" style="border-left-color: var(--green);">
  <h4>Running Synthetic Benchmark: LLaMA-3-70B on 4x H100 GPUs</h4>
  <p style="font-family: var(--font-mono); font-size: 0.82rem; color: #10b981;">
    [0.00s] 16 Agent Streams started with 2,048 shared prompt tokens.<br>
    [0.04s] Hierarchical radix tree cache hit: 99.2% reuse.<br>
    [0.09s] Tool dispatched. Other decoding batches processed.<br>
    [0.14s] Response resumed: <strong>TTFT = 14.1 ms</strong> (vs 112.4 ms naive).<br>
    &bull; <strong>Speedup: 7.97x faster</strong><br>
    &bull; <strong>Memory Saved: 24.8 GB VRAM</strong>
  </p>
</div>`,

    contact: () => `
<div class="c-response">
  <h4>Get in Touch:</h4>
  <p>Email: <a href="mailto:ritabanmitra709@gmail.com">ritabanmitra709@gmail.com</a></p>
  <p>GitHub: <a href="https://github.com/Ritabanm" target="_blank">github.com/Ritabanm</a></p>
  <p>Location: New York</p>
</div>`,

    clear: () => {
      output.innerHTML = '';
      return '';
    },

    sudo: () => `<div class="c-response"><p>Nice try! Permission denied: You already have full access to my code above.</p></div>`,
    matrix: () => `<div class="c-response"><p style="color:#10b981;">Wake up, Neo... The GPU has you.</p></div>`
  };

  function handleExec() {
    const raw = input.value.trim();
    input.value = '';
    if (!raw) return;

    history.push(raw);
    hIdx = history.length;

    const block = document.createElement('div');
    block.className = 'c-block';

    const echo = document.createElement('div');
    echo.className = 'c-echo';
    echo.innerHTML = `<span class="prompt-text">ritaban@h100:~$</span> ${escapeHtml(raw)}`;
    block.appendChild(echo);

    const parts = raw.trim().split(/\s+/);
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ').toLowerCase();

    if (commands[baseCmd]) {
      const res = commands[baseCmd](args);
      if (res) {
        const rDiv = document.createElement('div');
        rDiv.innerHTML = res;
        block.appendChild(rDiv);
      }
    } else {
      const err = document.createElement('div');
      err.className = 'c-response';
      err.style.borderLeftColor = 'var(--red)';
      err.innerHTML = `<p>Unknown command: <code>${escapeHtml(raw)}</code>. Type <code>help</code>, <code>projects</code>, or <code>agent</code>.</p>`;
      block.appendChild(err);
    }

    output.appendChild(block);
    screen.scrollTop = screen.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExec();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hIdx > 0) {
        hIdx--;
        input.value = history[hIdx];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx < history.length - 1) {
        hIdx++;
        input.value = history[hIdx];
      } else {
        hIdx = history.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.value.trim();
      const cmds = ['now', 'projects', 'research', 'tools', 'agent', 'rec', 'whoami', 'stack', 'papers', 'benchmarks', 'contact', 'help', 'clear'];
      const match = cmds.find(c => c.startsWith(current));
      if (match) input.value = match;
    }
  });
}

/* =============================================================================
   4. CONTACT & CLIPBOARD
   ============================================================================= */
function initContact() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'ritabanmitra709@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (toast) {
          toast.textContent = `✓ Copied email: ${email}`;
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2500);
        }
      });
    });
  }
}
