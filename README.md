<div align="center">

# Ritaban Mitra
### Systems for Agentic AI & High-Performance Inference
**New York City**

<br/>

<a href="mailto:ritabanmitra709@gmail.com">
  <img src="https://img.shields.io/badge/ritabanmitra709%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email Ritaban Mitra" />
</a>

<br/><br/>

> *Designing low-latency serving runtimes, prefix-aware memory management, and adversarial robustness harnesses for multi-turn, tool-augmented compound AI systems.*

</div>

---

### 🧠 The Engineering Focus

Current inference engines are optimized for single-shot, static batching. **Agentic workloads break these assumptions**—they are multi-turn, stateful, interrupted by asynchronous tool invocations, and memory-constrained by exploding context windows. 

My work sits at the intersection of **the inference layer and agent runtime orchestration**:

* **Prefix-Aware KV Management & Dynamic Scheduling:** Mitigating KV cache churn during tool interrupts; optimizing multi-turn agent sessions through structured prompt reuse, prefix preservation, and stateful routing.
* **Low-Latency Agent Execution Engines:** Closing the gap between model execution and external tool dispatch, eliminating IO stalls in multi-agent loops.
* **Frontier Evaluation & Adversarial Hardening:** Rigorous stress-testing of autonomous agents against multi-step tool injection, state corruption, and out-of-distribution cognitive shifts.
* **GPU & Systems Kernel Profiling:** Analyzing latency bottlenecks across heterogeneous memory hierarchies (CUDA, Metal/MLX, PyTorch internals).

---

### ⚡ Selected Systems & Research Projects

#### 🛠️ [adapt-runtime](https://github.com/Ritabanm/adapt-runtime)
**Policy-Driven Execution Runtime & Prefix-Aware Serving Layer for Agentic Workloads**
* Architected a specialized serving runtime designed specifically for tool-interrupted, multi-round agent interactions.
* Implements prefix-aware request scheduling to maximize KV cache hit rates across iterative tool-calling sequences.
* Reduces execution latency by decoupling model generation states from asynchronous external IO routines.
* *Stack:* `Python`, `AsyncIO`, `vLLM/Serving Architectures`, `Systems Design`

#### 🔬 [adapt-iq](https://github.com/Ritabanm/adapt-iq)
**Cognitive Flexibility & Context-Injection Benchmark for Frontier Models**
* Developed an automated evaluation framework to measure cognitive adaptability and multi-step reasoning shifts in frontier AI systems under rapid context modification.
* Submitted to the **Google DeepMind x Kaggle AGI Hackathon**.
* *Stack:* `Python`, `Frontier AI Evaluation`, `LLM Benchmarking`

#### 🖥️ [modern-ai-infra](https://github.com/Ritabanm/modern-ai-infra)
**Systems Research: Distributed Training, GPU Kernels, and AI Networking**
* Reproducible systems benchmarks and implementation patterns covering distributed communication primitives, memory-efficient attention mechanisms, and throughput optimization across modern accelerators.
* *Stack:* `Python`, `C++`, `CUDA`, `PyTorch Internals`, `Distributed Systems`

#### 🛡️ [OpenAI-Agent-Security](https://github.com/Ritabanm/OpenAI-Agent-Security)
**High-Throughput Adversarial Search & Multi-Step Tool Attack Defense**
* Engineered high-throughput adversarial candidate filtering for multi-step tool vulnerabilities in autonomous agents.
* Submission for the **OpenAI / Google / IEEE AI Agent Security** initiative.
* *Stack:* `Python`, `Adversarial Search`, `Agent Safety`, `Tool-Use Security`

---

### 🧰 Technical Arsenal

<table>
  <tr>
    <td width="25%"><strong>Compute & Languages</strong></td>
    <td><code>C++</code> <b>·</b> <code>CUDA</code> <b>·</b> <code>Python</code> <b>·</b> <code>JavaScript / TypeScript</code> <b>·</b> <code>POSIX C</code></td>
  </tr>
  <tr>
    <td width="25%"><strong>Serving & Kernels</strong></td>
    <td><code>vLLM</code> <b>·</b> <code>TensorRT-LLM</code> <b>·</b> <code>PyTorch (Core &amp; Dispatch)</code> <b>·</b> <code>CUTLASS</code> <b>·</b> <code>MLX</code> <b>·</b> <code>Faiss</code></td>
  </tr>
  <tr>
    <td width="25%"><strong>Distributed & Scale</strong></td>
    <td><code>Distributed Training (DDP/FSDP)</code> <b>·</b> <code>TorchTitan</code> <b>·</b> <code>DeepSpeed</code> <b>·</b> <code>Kubernetes</code> <b>·</b> <code>Docker</code></td>
  </tr>
  <tr>
    <td width="25%"><strong>Systems Architecture</strong></td>
    <td><code>KV Cache Optimization</code> <b>·</b> <code>Prefix Caching</code> <b>·</b> <code>Asynchronous Runtimes</code> <b>·</b> <code>Agent Tool Security</code></td>
  </tr>
</table>

---

### 📈 Telemetry & Contributions

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Ritabanm&show_icons=true&theme=tokyonight&hide_border=true&count_private=true" alt="Ritaban's GitHub stats" height="165" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Ritabanm&layout=compact&theme=tokyonight&hide_border=true" alt="Top Languages" height="165" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=Ritabanm&theme=tokyonight&hide_border=true" alt="GitHub Streak" />
</div>

---

<div align="center">
  <sub>Open to deep technical discussions on inference engine internals, agent runtime overhead, and systems-level safety.</sub>
</div>
