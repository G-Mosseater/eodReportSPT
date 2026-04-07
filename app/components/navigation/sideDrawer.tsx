"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
}

export default function SideDrawer({ children, show, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      <aside
        className="
          fixed top-0 right-0
          h-full w-72 md:w-80
          bg-white shadow-lg z-50
          transform transition-transform duration-300
          translate-x-0
        "
      >
        {children}
      </aside>
    </>,
    document.getElementById("drawer") as HTMLElement
  );
}