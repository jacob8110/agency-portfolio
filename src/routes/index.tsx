import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import handImg from '@/assets/hand.png';
import logoImg from '@/assets/itagency-logo.png';
import {
  Code2,
  Smartphone,
  Cloud,
  Megaphone,
  Palette,
  BarChart3,
  ExternalLink,
  Github,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Send,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  ChevronDown,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Index,
});

// Typewriter Hook
const WORDS = ['Web Development', 'Mobile App Development', 'Cloud Solutions', 'Digital Marketing'];

function useTypewriter() {
  const [text, setText] = useState('');
  useEffect(() => {
    let w = 0, i = 0, del = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = WORDS[w] ?? '';
      if (!del) {
        setText(word.slice(0, ++i));
        if (i === word.length) {
          del = true;
          t = setTimeout(tick, 1500);
          return;
        }
        t = setTimeout(tick, 90);
      } else {
        setText(word.slice(0, --i));
        if (i === 0) {
          del = false;
          w = (w + 1) % WORDS.length;
          t = setTimeout(tick, 300);
          return;
        }
        t = setTimeout(tick, 45);
      }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []);
  return text;
}

// Interactive Connected Canvas Particles (Original Hero Animation)
function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;

    let w = 0, h = 0, raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    resize();

    const pts = Array.from({ length: 85 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 0.5;

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let a = 0; a < pts.length; a++) {
        const pa = pts[a]!;
        for (let b = a + 1; b < pts.length; b++) {
          const pb = pts[b]!;
          const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
          if (d < 140) {
            ctx.globalAlpha = (1 - d / 140) * 0.35;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(pa.x - mouse.x, pa.y - mouse.y);
        if (dm < 170) {
          ctx.globalAlpha = (1 - dm / 170) * 0.6;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    const mm = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', mm);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mm);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}

const TECH_STACK = [
  { name: 'React 19', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Next.js 15', color: '#FFFFFF' },
  { name: 'Tailwind CSS', color: '#38BDF8' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Python', color: '#FFD43B' },
  { name: 'FastAPI', color: '#05998B' },
];

const FEATURED_PROJECTS = [
  {
    id: '01',
    category: 'Full-Stack E-Commerce',
    title: 'NovaSphere — High-Frequency Commerce Engine',
    desc: 'Distributed microservices architecture with real-time inventory synchronization, sub-second checkout latency, and multi-currency Stripe billing.',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Stripe'],
    stats: [
      { label: 'Uptime', val: '99.98%' },
      { label: 'Latency', val: '22ms' },
      { label: 'Scale', val: '100K+ QPS' },
    ],
    github: 'https://github.com/jacob8110',
    previewElements: (
      <div className="w-full h-full p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-white/80">LIVE STORE DASHBOARD</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            +34.2% Growth
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="text-[10px] text-white/40 uppercase font-mono">Revenue</div>
            <div className="text-base font-bold text-white mt-1">$124,580</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="text-[10px] text-white/40 uppercase font-mono">Orders</div>
            <div className="text-base font-bold text-white mt-1">3,420</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="text-[10px] text-white/40 uppercase font-mono">Conversion</div>
            <div className="text-base font-bold text-blue-400 mt-1">4.8%</div>
          </div>
        </div>
        <div className="h-20 w-full bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg border border-blue-500/20 flex items-end p-2 gap-1.5">
          <div className="w-full bg-blue-500/40 rounded-t h-[40%]" />
          <div className="w-full bg-blue-500/60 rounded-t h-[65%]" />
          <div className="w-full bg-blue-500/80 rounded-t h-[55%]" />
          <div className="w-full bg-blue-400 rounded-t h-[85%]" />
          <div className="w-full bg-blue-500 rounded-t h-[70%]" />
          <div className="w-full bg-blue-300 rounded-t h-[95%]" />
        </div>
      </div>
    ),
  },
  {
    id: '02',
    category: 'Computer Vision AI',
    title: 'AuraVision — Real-Time Video Intelligence',
    desc: 'Edge-deployed neural network inference pipeline delivering multi-stream object classification, biometric verification, and sub-15ms latency.',
    tags: ['Python', 'FastAPI', 'PyTorch', 'React', 'Docker'],
    stats: [
      { label: 'FPS', val: '60 FPS' },
      { label: 'Accuracy', val: '99.4%' },
      { label: 'Latency', val: '14ms' },
    ],
    github: 'https://github.com/jacob8110',
    previewElements: (
      <div className="w-full h-full p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-mono text-white/80">CAMERA FEED 01</span>
          </div>
          <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            DETECTING (60fps)
          </span>
        </div>
        <div className="relative my-3 flex-1 rounded-lg border border-purple-500/20 bg-purple-950/20 p-3 flex items-center justify-center">
          <div className="border border-dashed border-purple-400/60 p-4 rounded bg-purple-500/10 text-center">
            <div className="text-xs font-mono text-purple-200">Subject: Confirmed #811</div>
            <div className="text-[10px] font-mono text-emerald-400 mt-0.5">Confidence: 99.8%</div>
          </div>
        </div>
        <div className="flex gap-2 text-[11px] font-mono text-white/70">
          <div className="flex-1 bg-white/5 p-2 rounded border border-white/5">RAM: 1.2 GB</div>
          <div className="flex-1 bg-white/5 p-2 rounded border border-white/5">Engine: ONNX</div>
        </div>
      </div>
    ),
  },
  {
    id: '03',
    category: 'Cloud Infrastructure',
    title: 'PulseSync — Distributed Cluster Telemetry',
    desc: 'Scalable observability platform capturing high-volume traces, automated canary rollouts, and multi-region health checks across clustered environments.',
    tags: ['Go', 'TypeScript', 'Kubernetes', 'Prometheus', 'Tailwind'],
    stats: [
      { label: 'Nodes', val: '240 Active' },
      { label: 'Event Lag', val: '< 2ms' },
      { label: 'Coverage', val: '100%' },
    ],
    github: 'https://github.com/jacob8110',
    previewElements: (
      <div className="w-full h-full p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-white/80">CLUSTER HEALTH</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            OPTIMAL
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 my-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-[10px] font-mono text-cyan-300"
            >
              node-{i + 1}
            </div>
          ))}
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex justify-between items-center text-xs font-mono">
          <span className="text-white/60">Cluster CPU Load</span>
          <span className="text-cyan-400 font-bold">18.4%</span>
        </div>
      </div>
    ),
  },
];

function Index() {
  const typed = useTypewriter();
  const [theme, setTheme] = useState<'black' | 'dark-blue'>('black');

  const services = [
    { title: 'Web Development', desc: 'High-performance interactive web apps built with modern frameworks.', icon: Code2 },
    { title: 'Mobile App Development', desc: 'Seamless iOS and Android apps crafted for smooth user experiences.', icon: Smartphone },
    { title: 'Cloud Solutions', desc: 'Scalable architectures, automated microservices, and secure deployments.', icon: Cloud },
    { title: 'Digital Marketing', desc: 'Data-driven growth strategies that scale online visibility and reach.', icon: Megaphone },
    { title: 'UX/UI Design', desc: 'Intuitive design systems and interfaces centered around real user needs.', icon: Palette },
    { title: 'Data Analytics', desc: 'Transforming telemetry and business metrics into clear visual dashboards.', icon: BarChart3 },
  ];

  return (
    <div
      className={`min-h-screen text-white font-sans transition-colors duration-500 ${
        theme === 'black' ? 'bg-[#000000]' : 'bg-[#060c18]'
      }`}
    >
      {/* 1. Interactive Connected Particles Canvas */}
      <ParticlesCanvas />

      {/* 2. Fixed Tech Hand Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url(${handImg})`,
          backgroundPosition: 'left center',
          backgroundSize: 'contain',
          opacity: theme === 'black' ? 0.35 : 0.45,
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
  <img src={logoImg} alt="ITAgency" className="h-8 w-auto object-contain" />
</a>


          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <a href="#hero" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#stats" className="hover:text-blue-400 transition-colors">Metrics</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'black' ? 'dark-blue' : 'black')}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all text-white/80"
              title="Toggle theme"
            >
              {theme === 'black' ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-yellow-400" />}
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main id="hero" className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
         

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Technology Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              Excellence
            </span>
          </h1>

          <div className="h-12 flex items-center justify-center mb-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90">
              In{' '}
              <span className="text-blue-400 border-r-2 border-blue-400 pr-1 animate-pulse font-mono">
                {typed}
              </span>
            </p>
          </div>

          <p className="max-w-2xl text-base sm:text-lg text-white/60 mb-10 leading-relaxed">
            Helping ambitious brands scale through high-performance engineering, cutting-edge interactive web design, and cloud architecture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2"
            >
              Explore Featured Work
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/jacob8110"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub Profile
            </a>
          </div>
        </div>
      </main>

      {/* Infinite Tech Marquee */}
      <section className="relative z-10 py-8 border-y border-white/5 bg-black/40 overflow-hidden">
        <div className="flex gap-8 w-max animate-marquee">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/5 border border-white/5 text-sm font-mono text-white/80 shrink-0"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Our Core Services
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            End-to-end design and development capabilities built for enterprise-grade scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects with Sticky Stacking Cards */}
      <section id="projects" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">
            Selected Works
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            A showcase of production-ready architectures, full-stack ecosystems, and polished interactive experiences.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {FEATURED_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="sticky top-28 rounded-3xl p-8 sm:p-12 border border-white/10 backdrop-blur-xl shadow-2xl transition-all"
              style={{
                backgroundColor: theme === 'black' ? '#080808' : '#0c1424',
                marginTop: `${idx * 16}px`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-white/40">
                        {project.id} / 03
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 mb-8">
                    {project.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider">{stat.label}</div>
                        <div className="text-base font-bold text-white mt-1">{stat.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30"
                    >
                      Project Case Study
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/60 shadow-inner">
                    <div className="px-4 py-3 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="text-[11px] font-mono text-white/40 truncate max-w-[200px]">
                        https://github.com/jacob8110/{project.id}
                      </div>
                      <div className="w-4" />
                    </div>

                    <div className="h-[280px] sm:h-[320px] bg-gradient-to-br from-blue-600/20 via-slate-900/60 to-black relative">
                      {project.previewElements}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="relative z-10 py-20 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              100%
            </div>
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-2">Lighthouse Score</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              &lt;20ms
            </div>
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-2">Average TTFB</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              24/7
            </div>
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-2">Automated CI/CD</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              A+
            </div>
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-2">Security Grade</div>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">
                Let's Build
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Ready to engineer your next big milestone?
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Whether you have an upcoming project, need architectural consulting, or want to collaborate on high-scale systems, let's talk.
              </p>

              <div className="flex flex-col gap-4 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-white/40">DIRECT INBOX</div>
                    <div className="font-medium text-white">mena.ashraf@agency.dev</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-white/40">LOCATION</div>
                    <div className="font-medium text-white">Available Worldwide (Remote)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5 text-xs text-white/40 font-mono">
              Designed & Built by Mena Ashraf © 2026. All rights reserved.
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for reaching out! Your message was received.');
              }}
              className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-2">PROJECT SUBJECT</label>
                <input
                  type="text"
                  required
                  placeholder="New Web Application / Consulting"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-2">PROJECT DETAILS</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your vision, tech stack, and timeline..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Project Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
