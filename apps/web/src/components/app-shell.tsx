"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, TerminalSquare } from "lucide-react";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/console", label: "Console", icon: <TerminalSquare size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-800/70 bg-slate-950/80 p-4 backdrop-blur md:border-b-0 md:border-r">
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
            ElasticSentinel
          </p>
          <p className="mt-2 text-sm text-slate-300">SOC triage workspace</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition ${
                  active
                    ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                    : "border-transparent bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b border-slate-800/70 bg-slate-950/75 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold capitalize text-slate-100">
              {pathname.replace("/", "") || "Dashboard"}
            </h1>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
              Live Workspace
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
