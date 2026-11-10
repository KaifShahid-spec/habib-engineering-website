"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MegaMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 xl:gap-2">
      {mainNav.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        if (item.children) {
          return (
            <div key={item.href} className="group relative">
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors hover:text-primary rounded-md",
                  isActive ? "text-primary" : "text-slate-700"
                )}
              >
                {item.label}
                <ChevronDown className="size-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Dropdown Content */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block w-[450px]">
                <div className="rounded-xl border bg-white p-6 shadow-xl ring-1 ring-slate-900/5">
                  <div className="grid gap-8">
                    {item.children.map((group) => (
                      <div key={group.title}>
                        <h4 className="mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {group.title}
                        </h4>
                        <div className="grid gap-2">
                          {group.items.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group/item flex flex-col gap-1 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                            >
                              <span className="text-sm font-semibold text-slate-800 group-hover/item:text-primary transition-colors">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="text-xs text-slate-500 line-clamp-1">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 text-sm font-semibold transition-colors hover:text-primary rounded-md",
              isActive ? "text-primary" : "text-slate-700"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}