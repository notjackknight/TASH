import { motion } from 'motion/react';
import { ShoppingBag02Icon, ArrowUpRight01Icon } from 'hugeicons-react';

// NOTE: shop URL intentionally retained — client has 30 days to migrate the shop subdomain separately.
const SHOP_URL = 'https://theesthetichaus.shop/';

export function ShopStrip() {
  return (
    <section className="bg-anchor border-t border-micro/20 overflow-hidden">
      <motion.a
        href={SHOP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className="group relative flex items-center justify-between gap-4 md:gap-6 px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 py-5 md:py-6 text-white hover:bg-action transition-colors duration-300"
      >
        {/* Left — icon + headline */}
        <div className="flex items-center gap-3 md:gap-5 min-w-0">
          <ShoppingBag02Icon
            size={20}
            strokeWidth={1.5}
            className="shrink-0 text-white/80 group-hover:text-white transition-colors"
          />
          <div className="flex flex-col md:flex-row md:items-baseline md:gap-3 min-w-0">
            <span className="uppercase tracking-[0.25em] text-[10px] md:text-[11px] font-semibold text-white/70 group-hover:text-white/90 transition-colors">
              Now Shipping
            </span>
            <span className="font-serif text-lg md:text-2xl leading-tight truncate">
              Shop <span className="italic font-light">TASH Skin.</span>
            </span>
          </div>
        </div>

        {/* Right — CTA */}
        <span className="shrink-0 inline-flex items-center gap-2 uppercase tracking-[0.25em] text-[10px] md:text-xs font-semibold">
          <span className="hidden sm:inline">Visit Shop</span>
          <span className="sm:hidden">Shop</span>
          <ArrowUpRight01Icon
            size={14}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </motion.a>
    </section>
  );
}
