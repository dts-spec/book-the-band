"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, children, className }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative bg-surface-elevated rounded-2xl border border-border-dark shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
