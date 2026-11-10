"use client";

import { siteConfig } from "@/config/site";

export function WhatsAppButton() {
  // Aap yahan apna WhatsApp number dal dein (bina + ke aur spaces ke)
  const whatsappNumber = "923268442292"; 
  const message = "Hello Habib Engineering, I'm interested in your products.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      // 🚨 Yahan animation (bounce) aur proper styling di hai
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      {/* Official WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-8"
      >
        <path d="M12.031 21.058c-1.755 0-3.474-.473-4.99-1.367l-.358-.213-3.71 1.007 1.027-3.628-.232-.376a9.75 9.75 0 0 1-1.497-5.208c0-5.385 4.383-9.768 9.768-9.768 2.61 0 5.062 1.016 6.908 2.861a9.704 9.704 0 0 1 2.861 6.907c0 5.386-4.383 9.769-9.767 9.769l-.01.006zm0-19.114a9.43 9.43 0 0 0-9.423 9.423c0 1.728.458 3.428 1.338 4.916l.235.398-1.13 4.026 4.132-1.12.385.225a9.38 9.38 0 0 0 4.463 1.134l.009.006c5.202 0 9.435-4.233 9.435-9.435a9.38 9.38 0 0 0-2.76-6.674 9.375 9.375 0 0 0-6.675-2.76l-.009.006zm5.161 11.585c-.282-.14-1.67-.825-1.93-.92-.26-.095-.45-.14-.64.14-.19.28-.735.92-.9 1.11-.165.19-.33.21-.612.07-.282-.14-1.19-.44-2.267-1.4-.838-.75-1.403-1.67-1.568-1.95-.165-.28-.017-.43.123-.57.127-.126.282-.33.423-.495.14-.165.19-.28.282-.47.093-.19.047-.35-.023-.49-.07-.14-.64-1.54-.877-2.11-.23-.55-.466-.47-.64-.48-.165-.01-.353-.01-.542-.01-.188 0-.495.07-.753.35-.258.28-.988.965-.988 2.353 0 1.387 1.012 2.728 1.154 2.918.14.19 1.99 3.04 4.82 4.26.673.29 1.198.463 1.608.593.753.24 1.438.207 1.98.125.61-.09 1.67-.68 1.905-1.34.235-.66.235-1.226.165-1.34-.07-.115-.258-.185-.54-.325z" />
      </svg>
    </a>
  );
}