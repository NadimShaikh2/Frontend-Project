"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-gold-glow ring-1 ring-white/20 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 group-hover:bg-[#25D366]/50" aria-hidden="true" />
      <MessageCircle className="relative h-7 w-7 sm:h-8 sm:w-8" />
    </motion.a>
  );
}
