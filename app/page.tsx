"use client";

import { useState } from "react";
import { BarChart3, Bot, GitCompare, ShieldCheck, Sparkles } from "lucide-react";

type Result = {
  model: string;
  response: string;
  latency: number;
  tokens: number;
};

export default function Home() {
  const [prompt, setPrompt] = useState("Explain why prompt regression testing is useful for AI applications.");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setResults([]);
    try {
      const r = await fetch("/api/run", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ prompt })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      setResults(data.results);
    } catch (e) {
      setResults([{ model: "Error", response: e instanceof Error ? e.message : "Unknown error", latency: 0, tokens: 0 }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <nav className="nav shell">
        <div className="brand"><span className="brandDot" />OpenPrompt</div>
        <div className="navLinks"><a href="#playground">Playground</a><a href="#features">Features</a><a href="#about">About</a></div>
        <a className="githubBtn" href="https://github.com" target="_blank">Open Source</a>
      </nav>

      <section className="hero shell">
        <div className="eyebrow"><Sparkles size={15}/> AI PROMPT ENGINEERING TOOLKIT</div>
        <h1>Test prompts.<br/><span>Compare AI.</span><br/>Ship with confidence.</h1>
        <p>Evaluate prompts, compare model responses, measure latency and tokens, and catch regressions before they reach production.</p>
        <div className="heroActions"><a href="#playground" className="primary">Try Playground</a><a href="#features" className="secondary">Explore features</a></div>
      </section>

      <section id="features" className="featureGrid shell">
        <Feature icon={<GitCompare/>} title="Model comparison" text="Run the same prompt and compare outputs side by side." />
        <Feature icon={<BarChart3/>} title="Performance metrics" text="Measure response latency and token usage for every run." />
        <Feature icon={<ShieldCheck/>} title="Regression ready" text="Build repeatable prompt tests before deploying AI changes." />
        <Feature icon={<Bot/>} title="Developer first" text="Simple APIs and a clean workflow designed for AI builders." />
      </section>

      <section id="playground" className="workspace shell">
        <div className="sectionTitle"><div><span className="mini">PLAYGROUND</span><h2>Test a prompt</h2></div><span className="status">● API READY</span></div>
        <div className="grid2">
          <div className="panel">
            <label>Prompt</label>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
            <button className="run" disabled={loading} onClick={run}>{loading ? "Running models..." : "Run evaluation"}</button>
          </div>
          <div className="panel">
            <label>Results</label>
            {results.length === 0 ? <div className="empty">Run your prompt to compare model output, latency and token usage.</div> :
              <div className="results">{results.map((x,i)=><article className="result" key={i}><div className="resultTop"><b>{x.model}</b><span>{x.latency}ms · {x.tokens} tokens</span></div><p>{x.response}</p></article>)}</div>}
          </div>
        </div>
      </section>

      <section id="about" className="about shell">
        <span className="mini">OPEN SOURCE</span>
        <h2>Built for developers who treat prompts like code.</h2>
        <p>OpenPrompt is designed to make prompt experimentation reproducible, measurable and easier to integrate into modern AI development workflows.</p>
      </section>

      <footer className="footer shell">OpenPrompt · MIT License · Built for the open-source AI ecosystem</footer>
    </main>
  );
}

function Feature({icon,title,text}:{icon:React.ReactNode,title:string,text:string}) {
  return <div className="feature"><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>;
}
