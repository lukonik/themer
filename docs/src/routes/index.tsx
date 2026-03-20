import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AppWindow,
  ArrowRight,
  Blocks,
  Code2,
  Database,
  Feather,
  Github,
  Palette,
  RefreshCw,
  Server,
  ShieldCheck,
  Sliders,
  SunMoon,
  Zap,
} from "lucide-react";
import config from "virtual:prestige/config";
import Logo from "../assets/logo.png?$oh";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const features = [
  {
    title: "Tanstack Integration",
    description: "Tanstack Router and Tanstack Start first class support",
    icon: Blocks,
  },
  {
    title: "Zero FOUC",
    description:
      "Theme applied before React hydration to prevent any Flash of Unstyled Content.",
    icon: Zap,
  },
  {
    title: "SSR Support",
    description: "Works seamlessly with server-side rendering.",
    icon: Server,
  },
  {
    title: "Client Support",
    description: "Works seamlessly with SPA (Single Page Applications).",
    icon: AppWindow,
  },
  {
    title: "System Theme Detection",
    description: "Automatically follows OS dark/light mode preferences.",
    icon: SunMoon,
  },
  {
    title: "Different Storage Types",
    description:
      "Save theme with built-in localStorage, sessionStorage, cookieStorage, or write your own custom storage adapter.",
    icon: Database,
  },
  {
    title: "Cross-Tab Synchronization",
    description: "Theme changes sync across browser tabs.",
    icon: RefreshCw,
  },
  {
    title: "Flexible Theme Application",
    description: "Apply themes via data attributes or CSS classes.",
    icon: Palette,
  },
  {
    title: "Custom Theme Values",
    description: "Map theme names to custom attribute values.",
    icon: Sliders,
  },
  {
    title: "TypeScript Support",
    description: "Fully typed API.",
    icon: Code2,
  },
  {
    title: "Lightweight",
    description:
      "Minimal bundle size with no external dependencies (except peer deps).",
    icon: Feather,
  },
  {
    title: "No Transition Flash",
    description: "Optionally disable CSS transitions during theme changes.",
    icon: ShieldCheck,
  },
];

function RouteComponent() {
  return (
    <div className="min-h-screen bg-default-50 text-default-800 font-sans selection:bg-primary-500/30 overflow-hidden relative">
      {/* Background Ambience Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-400/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-primary-400/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-indigo-400/10 blur-[150px]" />
      </div>

      <main className="relative z-10 container mx-auto  pt-6 pb-24 lg:pt-20 lg:mb-10">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 mb-2 lg:h-auto h-[50vh]">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left px-6">
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-default-900 mb-8 leading-[1.1] drop-shadow-sm">
              Meet{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-primary-600">
                {config.title}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-default-600 mb-12 max-w-2xl leading-relaxed font-light">
              The easiest way to add a Dark/Light theme to your{" "}
              <span className="inline-flex gap-1 items-center">
                TanStack App
                <img
                  className="w-5 h-5 ml-1"
                  src="/tanstack.png"
                  alt="Tanstack logo"
                />
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/docs/get-started" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto rounded-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary-500/20 flex items-center justify-center gap-3">
                  Get Started <ArrowRight size={18} />
                </button>
              </Link>
              <a
                href="https://github.com/lukonik/themer"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto rounded-full px-8 py-4 border border-default-200 bg-white hover:bg-default-50 text-default-700 font-medium transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center justify-center gap-3">
                  <Github size={20} />
                  <span>Star on GitHub</span>
                </button>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full max-w-xl lg:max-w-2xl relative hidden lg:block">
            <div className="relative lg:rounded-3xl overflow-hidden lg:border lg:border-default-200/50 lg:bg-white/40 lg:ring-1 lg:ring-default-900/5 lg:shadow-2xl group flex items-center justify-center">
              <div className="lg:block hidden absolute inset-0 bg-linear-to-br from-white/40 to-transparent pointer-events-none z-10 mix-blend-overlay" />
              <div className="w-full h-[350px] lg:h-150 flex items-center justify-center lg:p-16">
                <Logo
                  alt="Prestige Logo"
                  className="w-full max-w-[500px]  h-auto object-contain transition-transform duration-2000 group-hover:scale-110 ease-out drop-shadow-2xl"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-default-900/5 to-transparent z-10 pointer-events-none" />
            </div>
            {/* Ambient Glow behind image */}
            <div className=" absolute -inset-4 bg-linear-to-br from-primary-400/30 to-primary-400/30 blur-3xl rounded-[3rem] -z-10 opacity-60" />
          </div>
        </div>
        {/* Features Section */}
        <div className="lg:mt-32 mt-10 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-default-900 mb-6 tracking-tight">
              Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr px-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl border border-default-200 bg-white hover:bg-default-50/80 transition-all duration-500 flex flex-col h-full hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-32 bg-linear-to-bl from-primary-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full blur-3xl translate-x-10 -translate-y-10" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center mb-8 text-primary-600 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out shadow-sm">
                    <feature.icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-default-900 mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-default-600 leading-relaxed font-light mt-auto text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
