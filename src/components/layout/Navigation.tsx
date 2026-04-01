"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Globe, Menu, X, Search,
  Building2, Scale, Calculator, BookOpen, Tag, LogIn, Droplets
} from "lucide-react";

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

const navLinks = [
  { label: "Countries",     href: "/countries/",      icon: Globe },
  { label: "EOR",           href: "/eor/",            icon: Building2 },
  { label: "HR Compliance", href: "/hr-compliance/",  icon: Scale },
  { label: "Payroll Tools", href: "/payroll-tools/",  icon: Calculator },
  { label: "Insights",      href: "/insights/",       icon: BookOpen },
  { label: "Pricing",       href: "/pricing/",        icon: Tag },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white border-b border-slate-200"
      )}>
        <div className="container-hrlake">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="HRLake home">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-shadow group-hover:shadow-md" style={{background: 'linear-gradient(135deg, #0369a1 0%, #0d9488 100%)'}}>
                <Droplets size={17} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:flex items-baseline gap-0 leading-none">
                <span className="font-black text-slate-900 text-base tracking-tight">HR</span>
                <span className="font-black text-teal-600 text-base tracking-tight">Lake</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "nav-link",
                    isActive(href) && "active"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/search/"
                className="w-9 h-9 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </Link>
              <Link
                href="/sign-in/"
                className="nav-link flex items-center gap-1.5"
              >
                <LogIn size={15} />
                Sign in
              </Link>
              <Link
                href="/sign-up/"
                className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-semibold rounded-md text-white transition-colors shadow-sm"
                style={{background: 'linear-gradient(135deg, #0369a1 0%, #0d9488 100%)'}}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/search/"
                className="w-9 h-9 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 flex items-center justify-center rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Menu Panel */}
      <div className={cn(
        "fixed top-16 left-0 right-0 z-40 lg:hidden",
        "bg-white border-b border-slate-200 shadow-lg",
        "transition-all duration-300 overflow-hidden",
        open ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      )}>
        <nav className="container-hrlake py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {label}
            </Link>
          ))}
          <div className="border-t border-slate-100 mt-2 pt-3 flex flex-col gap-2">
            <Link
              href="/sign-in/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <LogIn size={18} className="shrink-0" />
              Sign in
            </Link>
            <Link
              href="/sign-up/"
              className="flex items-center justify-center gap-2 mx-4 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{background: 'linear-gradient(135deg, #0369a1 0%, #0d9488 100%)'}}
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </div>

      {/* Spacer so page content starts below fixed nav */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
