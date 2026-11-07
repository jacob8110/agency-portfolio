import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/itagency-logo.png.asset.json";

const navigation = ["Home", "About Us", "Services", "Portfolio", "Blog", "Pages", "Contact Us"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [blue, setBlue] = useState(false);
  useEffect(() => setBlue(document.documentElement.classList.contains("theme-blue")), []);
  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("theme-blue");
    document.documentElement.classList.toggle("theme-blue", next);
    setBlue(next);
  };
  const item = (name: string) => {
    const cls = "flex items-center gap-1 transition-colors hover:text-primary";
    if (name === "Home") return <Link to="/" className={cls} onClick={() => setOpen(false)}>Home<ChevronDown className="h-3 w-3" /></Link>;
    if (name === "About Us") return <Link to="/about" className={cls} activeProps={{ className: "text-primary" }} onClick={() => setOpen(false)}>About Us</Link>;
    if (name === "Contact Us") return <Link to="/contact" className={cls} activeProps={{ className: "text-primary" }} onClick={() => setOpen(false)}>Contact Us</Link>;
    return <span className={cls}>{name}{["Blog", "Pages"].includes(name) && <ChevronDown className="h-3 w-3" />}</span>;
  };
  return <header className="site-header relative z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-3 sm:flex sm:justify-between">
    <Link to="/" className="min-w-0 shrink-0"><img src={logo.url} alt="Yacoub Studio" className="site-logo h-16 w-auto object-contain" /></Link>
    <nav aria-label="Main navigation" className="hidden items-center gap-7 text-base font-medium lg:flex">{navigation.map(n => <div key={n}>{item(n)}</div>)}</nav>
    <div className="flex shrink-0 items-center gap-4">
      <Button asChild className="quote-button hidden sm:inline-flex"><Link to="/contact">Get Quotes</Link></Button>
      <Button onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme" variant="secondary" size="icon" className="h-10 w-10 rounded-full border border-border transition-transform hover:scale-110">{blue ? <Moon /> : <Sun className="text-primary" />}</Button>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full grid gap-5 border-y border-foreground/15 bg-background px-6 py-6 lg:hidden">{navigation.map(n => <div key={n}>{item(n)}</div>)}</nav>}
  </header>;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.classList.add("reveal-ready");
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { node.classList.add("revealed"); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`portfolio-reveal ${className}`}>{children}</div>;
}

export function PortfolioLayout({ children }: { children: ReactNode }) {
  return <div className="portfolio-page min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>{children}</main>
    <footer className="portfolio-container flex flex-wrap items-center justify-between gap-5 border-t border-foreground/15 py-8 text-sm text-foreground/60">
      <span>Yacoub Ashraf</span><Link to="/contact" className="flex items-center gap-2 transition-colors hover:text-primary">Let's connect <ArrowUpRight className="h-4 w-4" /></Link>
    </footer>
  </div>;
}

export function PageIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return <section className="portfolio-intro border-y border-foreground/10">
    <div className="portfolio-container">
      <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-3 text-xs font-medium text-foreground/60"><Link to="/" className="hover:text-primary">HOME</Link><span>/</span><span className="text-primary">{title}</span></nav>
      <h1 className="portfolio-title animate-fade-up font-display font-bold">{title}</h1>
      <p className="mt-5 text-sm text-foreground/65">{subtitle}</p>
    </div>
  </section>;
}