import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { 
  ChevronDown, Facebook, Instagram, Linkedin, Moon, Sun,
  Code2, Smartphone, Cloud, Search, Palette, Database,
  ExternalLink, Github, Sparkles, Layers, ShieldCheck, Cpu
} from "lucide-react";
import hand from "@/assets/hand.png";
import logo from "@/assets/itagency-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ITAgency — Technology Solutions Excellence" },
      { name: "description", content: "Helping you grow through strategy, creativity and technology." },
      { property: "og:title", content: "ITAgency — Technology Solutions Excellence" },
      { property: "og:description", content: "Helping you grow through strategy, creativity and technology." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WORDS = ["Mobile App Development", "Cloud Solutions", "Digital Marketing", "Web Development"];

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Professional web solutions with modern technologies and responsive designs.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "Scalable cloud infrastructure and deployment solutions for your business.",
  },
  {
    icon: Search,
    title: "Digital Marketing",
    desc: "Strategic digital marketing campaigns to boost your online presence.",
  },
  {
    icon: Palette,
    title: "UX/UI Design",
    desc: "User-centered design experiences that engage and convert your audience.",
  },
  {
    icon: Database,
    title: "Data Analytics",
    desc: "Transform your data into actionable insights for better business decisions.",
  },
];

// بيانات المشاريع لكروت التراكم (Stacking Projects)
const FEATURED_PROJECTS = [
  {
    id: "01",
    tag: "E-Commerce SaaS",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: Sparkles,
    title: "Enterprise E-Commerce Platform",
    desc: "Full-scale modern digital store built with headless architecture, global CDN distribution, sub-second checkout, and complete multi-vendor analytics dashboard.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
    previewType: "store",
  },
  {
    id: "02",
    tag: "Mobile & Cloud",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon: Layers,
    title: "AI Fitness & Health Mobile App",
    desc: "Cross-platform iOS and Android mobile app with real-time motion tracking, personalized AI workout routines, biometric data syncing, and social community feed.",
    tech: ["React Native", "Expo", "FastAPI", "PostgreSQL", "OpenAI"],
    previewType: "mobile",
  },
  {
    id: "03",
    tag: "FinTech & Analytics",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: ShieldCheck,
    title: "Decentralized Banking Dashboard",
    desc: "Secure financial asset intelligence dashboard with live crypto and fiat telemetry, automated risk auditing, instant multi-currency transfers, and role-based permissions.",
    tech: ["React 19", "Web3.js", "Tailwind CSS", "Recharts", "Node.js"],
    previewType: "banking",
  },
  {
    id: "04",
    tag: "Automation Engine",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: Cpu,
    title: "Intelligent Workflow Automation",
    desc: "Low-code workflow builder enabling teams to orchestrate cloud tasks, sync data across 100+ integrations, and automate customer pipelines with zero maintenance.",
    tech: ["TypeScript", "Docker", "GraphQL", "Redis", "Cloudflare Workers"],
    previewType: "automation",
  },
];

function useTypewriter() {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0, i = 0, del = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = WORDS[w] ?? "";
      if (!del) {
        setText(word.slice(0, ++i));
        if (i === word.length) { del = true; t = setTimeout(tick, 1500); return; }
        t = setTimeout(tick, 90);
      } else {
        setText(word.slice(0, --i));
        if (i === 0) { del = false; w = (w + 1) % WORDS.length; t = setTimeout(tick, 300); return; }
        t = setTimeout(tick, 45);
      }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []);
  return text;
}

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    resize();
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: Math.random() * 2 + 1.5,
    }));
    const draw = () => {
      const col = getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || "#1877f2";
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 0.6;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      for (let a = 0; a < pts.length; a++) {
        const pa = pts[a]!;
        for (let b = a + 1; b < pts.length; b++) {
          const pb = pts[b]!;
          const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
          if (d < 150) { ctx.globalAlpha = (1 - d / 150) * 0.4; ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); }
        }
        const dm = Math.hypot(pa.x - mouse.x, pa.y - mouse.y);
        if (dm < 180) { ctx.globalAlpha = (1 - dm / 180) * 0.6; ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    const mm = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mm);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", mm); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}

const NAV: [string, boolean][] = [
  ["Home", true], 
  ["About Us", false], 
  ["Services", false], 
  ["Portfolio", false], 
  ["Blog", true], 
  ["Pages", true], 
  ["Contact Us", false]
];

function Index() {
  const typed = useTypewriter();
  const [light, setLight] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle("theme-light", light); }, [light]);

  return (
    <div className="relative min-h-screen bg-black text-foreground transition-colors duration-500">
      {/* شبكة الجزيئات الثابتة في الخلفية */}
      <Particles />

      {/* صورة اليد التكنولوجية ثابتة في مكانها بيسار الشاشة أثناء التمرير */}
      <img 
        src={hand} 
        alt="" 
        aria-hidden 
        className="pointer-events-none fixed left-0 top-1/2 z-0 hidden w-[45vw] max-w-[680px] -translate-y-1/2 select-none md:block" 
      />

      {/* الهيدر وقائمة التنقل الثابتة بأعلى الصفحة */}
      <header className="sticky top-0 z-50 mx-auto flex w-full max-w-[1580px] items-center justify-between bg-black/80 px-6 py-5 backdrop-blur-md lg:px-12">
        <a href="/"><img src={logo} alt="ITAgency" className="h-12 w-auto" /></a>
        <nav className="hidden items-center gap-7 text-base font-medium lg:flex">
          {NAV.map(([n, dd]) => (
            <a key={n} href="#" className="flex items-center gap-1 transition-colors hover:text-primary">
              {n}{dd && <ChevronDown className="h-4 w-4" />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="#projects" className="hidden rounded-md bg-[#1877f2] px-12 py-3.5 font-medium text-white transition hover:brightness-110 sm:inline-block">Get Quotes</a>
          <button onClick={() => setLight(!light)} aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full bg-card text-primary transition-transform hover:scale-110">
            {light ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* قسم الهيرو الرئيسي */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1580px] items-center px-6 lg:px-12">
        <div className="relative z-10 md:ml-[42%] lg:ml-[38%]">
          <h1 className="font-display text-4xl font-bold leading-tight text-white lg:text-[42px]">
            Technology Solutions Excellence
          </h1>
          <h2 className="mt-2 min-h-[2.5rem] font-display text-2xl font-semibold text-[#1877f2] lg:text-[26px]">
            In {typed}<span className="animate-pulse">|</span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-300">
            Helping you grow through strategy, creativity and technology.
          </p>
          
          <div className="mt-14 flex gap-5 text-[#1877f2]">
            <a href="#" aria-label="X" className="transition-transform hover:scale-110"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.4L6.3 22H3.2l7.3-8.3L1 2h6.3l4.4 5.9L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" /></svg></a>
            <a href="#" aria-label="Facebook" className="transition-transform hover:scale-110"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="transition-transform hover:scale-110"><Linkedin className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="transition-transform hover:scale-110"><Instagram className="h-5 w-5" /></a>
          </div>

          <div className="mt-6 flex flex-wrap gap-6">
            <a href="#services" className="w-[182px] rounded-md bg-[#1877f2] py-3.5 text-center font-medium text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110">
              Get Quotes
            </a>
            <a href="#projects" className="w-[182px] rounded-md border border-blue-500/50 bg-[#0d1b3e] py-3.5 text-center font-medium text-white transition hover:bg-[#1877f2]/20 hover:border-blue-400">
              Get Started
            </a>
          </div>
        </div>
      </main>

      {/* قسم خدماتنا (Our Services) */}
      <section id="services" className="relative z-10 mx-auto w-full max-w-[1580px] px-6 py-28 lg:px-12">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
            Our Services
          </h2>
          <a
            href="#services"
            className="rounded-[6px] bg-[#1877f2] px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]"
          >
            See Services
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center rounded-xl border border-[#0e1e38] bg-[#02050c]/90 px-8 py-14 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#1877f2]/60 hover:bg-[#040a18] hover:shadow-[0_0_35px_rgba(24,119,242,0.18)]"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center text-[#1877f2] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-14 w-14 stroke-[1.6]" />
                </div>

                <h3 className="mb-4 font-display text-2xl font-bold text-white transition-colors group-hover:text-[#1877f2]">
                  {s.title}
                </h3>

                <p className="max-w-xs text-base leading-relaxed text-slate-400">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🔥 سكشن المشاريع المتراكمة (Sticky Stacking Cards - DEEP Style) */}
      <section id="projects" className="relative z-10 mx-auto w-full max-w-[1580px] px-6 py-24 lg:px-12">
        {/* عنوان السكشن الرئيسي */}
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#1877f2]">
              Showcase Portfolio
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[44px]">
              Featured Works & Case Studies
            </h2>
          </div>
          <p className="max-w-md text-base text-slate-400">
            Explore deep interactive digital solutions crafted with modern full-stack engineering and pixel-perfect design.
          </p>
        </div>

        {/* الحاوية التي تحتوي على كروت التراكم */}
        <div className="relative flex flex-col gap-12 pb-24">
          {FEATURED_PROJECTS.map((project, index) => {
            const BadgeIcon = project.icon;
            // حساب المسافة الرأسية لكل كارت ليتراكم بانتظام
            const topOffset = 100 + index * 24;

            return (
              <div
                key={project.id}
                style={{ top: `${topOffset}px` }}
                className="sticky z-10 flex min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-[#1e293b]/70 bg-[#0a0f1c] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-300 lg:flex-row"
              >
                {/* الجانب الأيسر: التفاصيل والنصوص */}
                <div className="flex flex-1 flex-col justify-between p-8 sm:p-12 lg:p-14">
                  <div>
                    {/* بادج الفئة */}
                    <div className="mb-6 flex items-center gap-3">
                      <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold ${project.badgeColor}`}>
                        <BadgeIcon className="h-3.5 w-3.5" />
                        {project.tag}
                      </span>
                      <span className="text-sm font-mono font-medium text-slate-500">
                        {project.id} / 04
                      </span>
                    </div>

                    {/* عنوان المشروع العريض */}
                    <h3 className="mb-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[34px] lg:leading-tight">
                      {project.title}
                    </h3>

                    {/* وصف المشروع */}
                    <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                      {project.desc}
                    </p>

                    {/* وسوم التقنيات */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-slate-800 bg-[#0f172a]/80 px-3 py-1 text-xs font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* أزرار العمل المشترك */}
                  <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/60">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-md bg-[#1877f2] px-6 py-3 text-sm font-medium text-white transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>

                {/* الجانب الأيمن: نافذة المتصفح المحاكية (Mockup View) */}
                <div className="flex flex-1 flex-col border-t border-slate-800/80 bg-[#040814] lg:border-l lg:border-t-0">
                  {/* شريط نافذة المتصفح مع النقاط الثلاث */}
                  <div className="flex h-12 items-center justify-between border-b border-slate-800/60 px-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#ef4444]/80" />
                      <div className="h-3 w-3 rounded-full bg-[#eab308]/80" />
                      <div className="h-3 w-3 rounded-full bg-[#22c55e]/80" />
                    </div>
                    <div className="rounded-md bg-slate-900/80 px-4 py-1 text-xs font-mono text-slate-400">
                      https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.dev
                    </div>
                    <div className="w-12" />
                  </div>

                  {/* المحتوى الداخلي للنافذة: تمثيل واجهة تفاعلية نظيفة للمشروع */}
                  <div className="relative flex flex-1 items-center justify-center p-8 lg:p-12">
                    <div className="w-full rounded-xl border border-blue-500/20 bg-[#080d1a] p-6 shadow-2xl">
                      <div className="mb-4 flex items-center justify-between border-b border-slate-800/60 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-[#1877f2]/20 flex items-center justify-center text-[#1877f2]">
                            <BadgeIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{project.title}</div>
                            <div className="text-xs text-slate-400">Production Ready • v2.4.0</div>
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          Active System
                        </span>
                      </div>

                      {/* كتل محاكاة للرسوم البيانية والبيانات */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="rounded-lg bg-slate-900/90 p-3">
                          <div className="text-xs text-slate-400">Performance</div>
                          <div className="text-lg font-bold text-white">99.8%</div>
                        </div>
                        <div className="rounded-lg bg-slate-900/90 p-3">
                          <div className="text-xs text-slate-400">Latency</div>
                          <div className="text-lg font-bold text-emerald-400">14ms</div>
                        </div>
                        <div className="rounded-lg bg-slate-900/90 p-3">
                          <div className="text-xs text-slate-400">Uptime</div>
                          <div className="text-lg font-bold text-[#1877f2]">100%</div>
                        </div>
                      </div>

                      {/* شريط مرئي تجريدي للواجهة */}
                      <div className="space-y-2 rounded-lg bg-black/40 p-4">
                        <div className="h-2 w-3/4 rounded bg-blue-500/40" />
                        <div className="h-2 w-1/2 rounded bg-slate-700/50" />
                        <div className="h-2 w-5/6 rounded bg-slate-800/60" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
