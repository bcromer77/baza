import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-50 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center 
space-y-4">
        <span className="text-lg font-bold text-gray-900">
          CreatorTorch🔥
        </span>
        <p className="text-gray-500 text-sm">
          Connecting brands with creators through authentic voice
        </p>
        <div className="flex space-x-6">
          <Link href="/creator-dashboard" className="text-gray-600 
hover:text-blue-500 transition-all duration-300 hover:glow">
            Creator Dashboard
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-500 
transition-all duration-300 hover:glow">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 
hover:text-blue-500 transition-all duration-300 hover:glow">
            Contact
          </Link>
        </div>
        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} CreatorTorch. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
