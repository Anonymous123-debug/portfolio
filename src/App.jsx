import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  Languages: ["Python", "JavaScript", "SQL", "Java", "C", "Go (learning)"],
  "Frontend & UI": ["HTML", "CSS", "ReactJS", "Streamlit", "NextJS (learning)"],
  "Backend & Data": ["REST APIs", "SQLAlchemy", "Pandas", "ETL Pipelines", "PostgreSQL"],
  "Cloud & DevOps": ["AWS S3", "AWS EC2", "AWS RDS", "Git", "GitHub", "Docker (basic)"],
  Concepts: ["Data Modeling", "RAG Systems", "Vector Retrieval", "OOP", "DBMS", "Agile"],
};

const PROJECTS = [
  {
    id: 1,
    title: "CloudETL QuickLoad",
    tag: "Data Engineering",
    problem: "Manually loading CSV data into cloud databases wastes hours and introduces human error.",
    description: "Automated ETL pipeline that extracts, transforms (deduplication, date parsing), and loads CSV datasets into PostgreSQL on AWS RDS — with scheduled execution and full error handling.",
    stack: ["Python", "Pandas", "SQLAlchemy", "PostgreSQL", "AWS RDS"],
    impact: "Reduced data ingestion time from manual hours → automated minutes with zero-touch scheduled runs.",
    github: "https://github.com/Anonymous123-debugg",
    demo: null,
    highlight: true,
  },
  {
    id: 2,
    title: "RAG Document Query System",
    tag: "AI / NLP",
    problem: "LLMs hallucinate answers when they don't have document-specific context.",
    description: "Built a Retrieval-Augmented Generation system that chunks documents, indexes them into a vector store, and retrieves the most relevant passages before generating answers — dramatically reducing hallucinations.",
    stack: ["Python", "OpenAI API", "Vector DB", "Streamlit"],
    impact: "Achieved context-grounded responses with measurably fewer hallucinations vs. vanilla GPT prompting.",
    github: "https://github.com/Anonymous123-debugg",
    demo: null,
    highlight: true,
  },
  {
    id: 3,
    title: "Intelligent Traffic Signal Controller",
    tag: "Embedded / AI",
    problem: "Static traffic signals cause unnecessary congestion — they don't adapt to real-time conditions.",
    description: "Designed an adaptive traffic control system running on edge devices, integrating ANN + Proximal Policy Optimization (PPO) to dynamically adjust signal timing based on live traffic density.",
    stack: ["Python", "ANN", "PPO (RL)", "Edge Deployment"],
    impact: "Real-time decision loop running under 200ms inference — suitable for actual edge deployment.",
    github: "https://github.com/Anonymous123-debuggit",
    demo: null,
    highlight: false,
  },
  {
    id: 4,
    title: "HACKRX 6.0 — AI Document Assistant",
    tag: "Hackathon",
    problem: "Insurance & compliance documents are dense; users need instant, accurate answers without reading 100 pages.",
    description: "Built under hackathon time pressure: a full-stack AI web app where users upload documents and get instant answers. Owned both front-end (Streamlit) and back-end (API, retrieval pipeline) entirely.",
    stack: ["Python", "OpenAI API", "Streamlit", "HTML"],
    impact: "Delivered a working product end-to-end within the hackathon window; recognized for UX and accuracy.",
    github: "https://github.com/Anonymous123-debugg",
    demo: null,
    highlight: false,
  },
];

const EXPERIENCE = [
  {
    type: "education",
    title: "B.Tech – Computer Science Engineering",
    org: "Amrita Vishwa Vidyapeetham, Tamil Nadu",
    period: "2023 – 2027",
    details: ["CGPA: 6.58 / 10 (Pursuing)", "Relevant: Data Structures, DBMS, OS, Cloud Computing, ML"],
  },
  {
    type: "cert",
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    period: "2024",
    details: ["Covers S3, EC2, RDS, IAM, cloud architecture fundamentals"],
  },
  {
    type: "cert",
    title: "Full Stack Developer",
    org: "100xDevs",
    period: "2024",
    details: ["REST APIs, frontend/backend integration, modern JS ecosystem"],
  },
];

// ── Utility ──────────────────────────────────────────────────────────────────
function useScrollSpy() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const handler = () => {
      for (const id of ["Contact", "Experience", "Projects", "Skills", "About"]) {
        const el = document.getElementById(id.toLowerCase());
        if (el && window.scrollY + 120 >= el.offsetTop) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function useDark() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return [dark, setDark];
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ text }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "4px",
        fontSize: "12px",
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.04em",
        background: "rgba(99,202,183,0.1)",
        color: "#63cab7",
        border: "1px solid rgba(99,202,183,0.25)",
        margin: "3px",
      }}
    >
      {text}
    </span>
  );
}

function Tag({ text }) {
  return (
    <span style={{
      fontSize: "10px",
      fontFamily: "'DM Mono', monospace",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#63cab7",
      background: "rgba(99,202,183,0.08)",
      border: "1px solid rgba(99,202,183,0.2)",
      padding: "2px 8px",
      borderRadius: "3px",
    }}>
      {text}
    </span>
  );
}

function ProjectCard({ project, dark }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: dark
          ? hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)"
          : hovered ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.01)",
        border: `1px solid ${hovered ? "rgba(99,202,183,0.4)" : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`,
        borderRadius: "12px",
        padding: "28px",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {project.highlight && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "linear-gradient(135deg, #63cab7, #3a9d8f)",
          padding: "4px 14px",
          borderRadius: "0 12px 0 12px",
          fontSize: "10px",
          fontFamily: "'DM Mono', monospace",
          color: "#0a0f0d",
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}>
          FEATURED
        </div>
      )}
      <div style={{ marginBottom: "12px" }}>
        <Tag text={project.tag} />
      </div>
      <h3 style={{
        fontSize: "20px",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        color: dark ? "#f0f0f0" : "#111",
        marginBottom: "8px",
      }}>
        {project.title}
      </h3>
      <p style={{ fontSize: "13px", color: "#63cab7", fontFamily: "'DM Mono', monospace", marginBottom: "14px", lineHeight: 1.5 }}>
        Problem: {project.problem}
      </p>
      <p style={{ fontSize: "14px", color: dark ? "#aaa" : "#555", lineHeight: 1.7, marginBottom: "16px" }}>
        {project.description}
      </p>
      <div style={{
        background: dark ? "rgba(99,202,183,0.06)" : "rgba(99,202,183,0.08)",
        borderLeft: "3px solid #63cab7",
        padding: "10px 14px",
        borderRadius: "0 6px 6px 0",
        marginBottom: "18px",
        fontSize: "13px",
        color: dark ? "#ccc" : "#333",
        lineHeight: 1.5,
      }}>
        ↗ {project.impact}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {project.stack.map(s => <Badge key={s} text={s} />)}
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontFamily: "'DM Mono', monospace",
            color: dark ? "#ccc" : "#444",
            textDecoration: "none",
            border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
            padding: "6px 14px",
            borderRadius: "6px",
            transition: "all 0.2s",
          }}
        >
          ⌥ GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontFamily: "'DM Mono', monospace",
              color: "#0a0f0d",
              textDecoration: "none",
              background: "#63cab7",
              padding: "6px 14px",
              borderRadius: "6px",
            }}
          >
            ↗ Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useDark();
  const active = useScrollSpy();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const bg = dark ? "#0a0f0d" : "#f8f9f7";
  const fg = dark ? "#e8e8e8" : "#111";
  const subtle = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const muted = dark ? "#888" : "#666";

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: bg, color: fg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(99,202,183,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #63cab7; border-radius: 2px; }
        a { color: inherit; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media(max-width:768px){
          .nav-desktop{display:none!important}
          .hero-btns{flex-direction:column!important;align-items:stretch!important}
          .skills-grid{grid-template-columns:1fr!important}
          .projects-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 32px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(20px)",
        background: dark ? "rgba(10,15,13,0.85)" : "rgba(248,249,247,0.85)",
        borderBottom: `1px solid ${border}`,
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.02em" }}>
          GP<span style={{ color: "#63cab7" }}>.</span>
        </span>

        <div className="nav-desktop" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px",
                color: active === l ? "#63cab7" : muted,
                letterSpacing: "0.06em",
                transition: "color 0.2s",
              }}
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: subtle, border: `1px solid ${border}`,
              borderRadius: "8px", padding: "6px 10px",
              cursor: "pointer", fontSize: "15px",
              color: fg, transition: "all 0.2s",
            }}
          >
            {dark ? "☀" : "◑"}
          </button>
        </div>

        {/* Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: fg }} className="mobile-menu-btn">
          {menuOpen ? "✕" : "≡"}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          background: dark ? "#0e1410" : "#fff",
          borderBottom: `1px solid ${border}`,
          padding: "20px 32px",
          display: "flex", flexDirection: "column", gap: "20px",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: "15px", color: fg, textAlign: "left" }}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "100px 32px 60px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: dark
            ? "radial-gradient(circle at 80% 20%, rgba(99,202,183,0.08) 0%, transparent 60%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
            : "radial-gradient(circle at 80% 20%, rgba(99,202,183,0.12) 0%, transparent 60%)",
          backgroundSize: "auto, 60px 60px, 60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px" }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "#63cab7",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{ animation: "pulse 2s infinite", display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#63cab7" }} />
            AVAILABLE FOR INTERNSHIPS · 2025
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(42px, 7vw, 82px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: fg,
            marginBottom: "20px",
          }}>
            Gadde<br />
            <span style={{ color: "#63cab7" }}>Punith</span>
          </h1>

          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "15px",
            color: muted,
            letterSpacing: "0.04em",
            marginBottom: "24px",
          }}>
            Aspiring Software Engineer · AI & Data Systems · Backend
          </p>

          <p style={{
            fontSize: "17px",
            lineHeight: 1.8,
            color: dark ? "#bbb" : "#444",
            maxWidth: "560px",
            marginBottom: "40px",
          }}>
            I build backend systems, data pipelines, and AI-powered applications — with a focus on making them actually <em style={{ color: "#63cab7", fontStyle: "normal" }}>work at scale</em>. AWS certified. RAG systems shipped. ETL pipelines automated.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("Projects")}
              style={{
                background: "#63cab7",
                color: "#0a0f0d",
                border: "none",
                padding: "14px 28px",
                borderRadius: "8px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
            >
              View Projects ↗
            </button>
            <a
              href="#"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                borderRadius: "8px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "14px",
                color: fg,
                textDecoration: "none",
                border: `1px solid ${border}`,
                background: subtle,
                letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
            >
              ↓ Download Resume
            </a>
            <button
              onClick={() => scrollTo("Contact")}
              style={{
                background: "none",
                border: `1px solid rgba(99,202,183,0.4)`,
                padding: "14px 28px",
                borderRadius: "8px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "14px",
                color: "#63cab7",
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              Contact Me
            </button>
          </div>

          <div style={{ display: "flex", gap: "32px", marginTop: "56px", flexWrap: "wrap" }}>
            {[["3+", "Projects Shipped"], ["1", "AWS Certification"], ["2", "Hackathons"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "28px", color: "#63cab7" }}>{n}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: muted, letterSpacing: "0.08em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.15em", color: "#63cab7", marginBottom: "16px" }}>
                01 / ABOUT
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.1, marginBottom: "28px", letterSpacing: "-0.02em" }}>
                I solve problems with code — not just write it.
              </h2>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: dark ? "#bbb" : "#555", marginBottom: "20px" }}>
                CS Engineering student at Amrita Vishwa Vidyapeetham, with real-world experience building systems that process data, reduce hallucinations in AI responses, and automate what was previously done by hand.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: dark ? "#bbb" : "#555", marginBottom: "28px" }}>
                My work spans cloud-deployed ETL pipelines, RAG-based document retrieval, and edge AI systems. I'm drawn to backend architecture and data engineering — building things that are fast, correct, and maintainable.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {["Data Engineering", "AI / RAG Systems", "Cloud (AWS)", "Backend Dev"].map(t => <Tag key={t} text={t} />)}
              </div>
            </div>
            <div style={{
              background: dark ? "rgba(99,202,183,0.04)" : "rgba(99,202,183,0.06)",
              border: `1px solid rgba(99,202,183,0.15)`,
              borderRadius: "16px",
              padding: "36px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "13px",
              lineHeight: 2,
            }}>
              {[
                ["Degree", "B.Tech CSE @ Amrita VV"],
                ["Year", "2nd Year (2023–2027)"],
                ["Cert", "AWS Cloud Practitioner"],
                ["Focus", "Backend · AI · Data"],
                ["Open to", "Internships · Remote"],
                ["Location", "Hyderabad, India"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "16px", borderBottom: `1px solid ${border}`, paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#63cab7", minWidth: "80px" }}>{k}</span>
                  <span style={{ color: dark ? "#ccc" : "#333" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 32px", background: dark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.15em", color: "#63cab7", marginBottom: "16px" }}>
              02 / SKILLS
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.02em", marginBottom: "56px" }}>
              What I work with
            </h2>
          </Reveal>
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <Reveal key={cat} delay={i * 0.08}>
                <div style={{
                  border: `1px solid ${border}`,
                  borderRadius: "12px",
                  padding: "24px",
                  background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "16px", color: fg }}>
                    {cat}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {items.map(s => <Badge key={s} text={s} />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "100px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.15em", color: "#63cab7", marginBottom: "16px" }}>
            03 / PROJECTS
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Things I've built
          </h2>
          <p style={{ color: muted, fontSize: "15px", marginBottom: "56px", maxWidth: "480px" }}>
            Each project started with a real problem. Results and impact are called out explicitly — not just tech listed.
          </p>
        </Reveal>
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: "24px" }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <ProjectCard project={p} dark={dark} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "100px 32px", background: dark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.15em", color: "#63cab7", marginBottom: "16px" }}>
              04 / EXPERIENCE & EDUCATION
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.02em", marginBottom: "56px" }}>
              Background
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "720px" }}>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  border: `1px solid ${border}`,
                  borderRadius: "12px",
                  padding: "28px",
                  background: dark ? "rgba(255,255,255,0.02)" : "#fff",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "20px",
                  alignItems: "start",
                }}>
                  <div>
                    <Tag text={e.type === "education" ? "Education" : "Certification"} />
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "18px", color: fg, margin: "12px 0 4px" }}>{e.title}</h3>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#63cab7", marginBottom: "14px" }}>{e.org}</div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {e.details.map(d => (
                        <li key={d} style={{ fontSize: "14px", color: dark ? "#aaa" : "#555", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <span style={{ color: "#63cab7", marginTop: "2px" }}>›</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: muted, whiteSpace: "nowrap" }}>{e.period}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.15em", color: "#63cab7", marginBottom: "16px" }}>
            05 / CONTACT
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Let's work together
          </h2>
          <p style={{ color: muted, fontSize: "15px", marginBottom: "56px", maxWidth: "480px" }}>
            Open to internships, project collaborations, and interesting problems. Response within 24 hours.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Email", value: "work.punith@outlook.com", href: "mailto:work.punith@outlook.com" },
                { label: "GitHub", value: "github.com/Anonymous123-debuggit", href: "https://github.com/Anonymous123-debuggit" },
                { label: "LinkedIn", value: "linkedin.com/in/gadde-punith-9943953aa", href: "https://www.linkedin.com/in/gadde-punith-9943953aa" },
                { label: "Phone", value: "+91 8019842884", href: "tel:+918019842884" },
              ].map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 22px",
                    borderRadius: "10px",
                    border: `1px solid ${border}`,
                    background: subtle,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#63cab7", letterSpacing: "0.1em", marginBottom: "4px" }}>{c.label}</div>
                    <div style={{ fontSize: "15px", color: fg }}>{c.value}</div>
                  </div>
                  <span style={{ color: "#63cab7", fontSize: "18px" }}>↗</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {sent ? (
              <div style={{
                border: "1px solid rgba(99,202,183,0.4)",
                borderRadius: "12px",
                padding: "40px",
                textAlign: "center",
                background: "rgba(99,202,183,0.06)",
              }}>
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>✓</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "#63cab7", marginBottom: "8px" }}>Message sent!</div>
                <div style={{ color: muted, fontSize: "14px" }}>I'll get back to you within 24 hours.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "Recruiter / Collaborator" },
                  { key: "email", label: "Email", type: "email", placeholder: "hello@company.com" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#63cab7", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                        border: `1px solid ${border}`,
                        borderRadius: "8px",
                        color: fg, fontSize: "14px", outline: "none",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#63cab7", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="What are you working on?"
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 16px",
                      background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                      border: `1px solid ${border}`,
                      borderRadius: "8px",
                      color: fg, fontSize: "14px", outline: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      resize: "vertical",
                    }}
                  />
                </div>
                <button
                  onClick={() => { if (formData.name && formData.email) setSent(true); }}
                  style={{
                    background: "#63cab7",
                    color: "#0a0f0d",
                    border: "none",
                    padding: "14px",
                    borderRadius: "8px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                  }}
                >
                  Send Message ↗
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${border}`,
        padding: "32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px" }}>
          GP<span style={{ color: "#63cab7" }}>.</span>
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: muted }}>
          © 2025 Gadde Punith · Hyderabad, India
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          {["GitHub", "LinkedIn", "Email"].map(l => (
            <a key={l} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: muted, textDecoration: "none" }}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
