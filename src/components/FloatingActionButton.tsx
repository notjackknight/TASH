import { Message01Icon } from 'hugeicons-react';
import { motion } from 'motion/react';

export function FloatingActionButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      aria-label="Text us"
      className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-40 no-radius bg-action text-white flex items-center justify-center gap-3 h-14 w-14 md:h-auto md:w-auto md:px-6 md:py-4 shadow-[4px_4px_0px_#4D4828] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#4D4828] transition-all duration-200"
    >
      <Message01Icon size={22} strokeWidth={1.5} className="text-white" />
      <span className="hidden md:inline uppercase tracking-[0.15em] text-xs font-semibold text-white">Text Us</span>
    </motion.button>
  );
}
