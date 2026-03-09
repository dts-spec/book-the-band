"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: "dark" | "light";
  className?: string;
}

export default function Tabs({
  tabs,
  defaultTab,
  onTabChange,
  variant = "dark",
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  function handleTabClick(tabId: string) {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  }

  return (
    <div
      className={cn(
        "flex gap-1 p-1 rounded-lg",
        variant === "dark" ? "bg-surface-dark" : "bg-surface-light-elevated",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer",
            activeTab === tab.id
              ? variant === "dark"
                ? "bg-surface-elevated text-white"
                : "bg-white text-text-dark shadow-sm"
              : variant === "dark"
                ? "text-text-muted hover:text-text-secondary"
                : "text-text-dark-muted hover:text-text-dark-secondary",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
