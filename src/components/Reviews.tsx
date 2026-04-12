import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight02Icon, StarIcon, MessageEdit01Icon } from 'hugeicons-react';
import { CarouselDots } from './CarouselDots';

const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJSclHaFkbU4gRb_RRjHSwI18';

type Review = {
  name: string;
  text: string;
  color: string;
};

const reviews: Review[] = [
  {
    name: 'Anne Elizabeth',
    text: 'Natasha always does a wonderful job with my facials. She has such a calming presence and I always feel comfortable in her space. She has saved my skin and set me up on a great regimen. Cannot recommend her enough!',
    color: '#E57373',
  },
  {
    name: 'Savannah Peck',
    text: "Natasha is always so thorough in making sure my brows are exactly what we talked about at the beginning of my appointment. I always leave feeling confident and she makes the whole process super comfortable and fun. I would recommend her to anyone looking for a top tier experience!",
    color: '#64B5F6',
  },
  {
    name: 'Madison Wisnoski',
    text: "Natasha is a great Esthetician who is very passionate about what she does and love giving her clients custom services. I have gotten beautiful eye lash extensions from her and trust her to listen to what I want and give me a great service. You'd be very lucky to lay on her table and get a great treat yourself service.",
    color: '#81C784',
  },
  {
    name: 'Amy Neeble',
    text: "Natasha is a wonderful aesthetician. She is focused on providing quality services and client satisfaction. Love how my skin looks since I've been seeing her!!!!",
    color: '#FFB74D',
  },
  {
    name: 'Penny Sickenius',
    text: "Best facial ever! Can't wait for my next appointment. Natasha is amazing, professional and always has great recommendations for my skin care needs.",
    color: '#BA68C8',
  },
  {
    name: 'Megan Obranovich',
    text: "Natasha is the best!! She makes you feel right at home as soon as you walk in. So excited to watch her embark on this fabulous new journey - go see my girl, you won't regret it\u2764\uFE0F",
    color: '#4FC3F7',
  },
  {
    name: 'Zo\u00EB Bickford',
    text: 'Natasha is my go to girl for anything skin, lashes, or brows. She is the only person I trust with my face! She is so passionate about what she does and I always leave our time together feeling so relaxed. I recommend Natasha over and over!!',
    color: '#F06292',
  },
  {
    name: 'Jami Chase',
    text: 'The sweetest conversationalist, Natasha, with the best services! Such a clean environment with a safe space feeling! Will forever come back here! : )',
    color: '#AED581',
  },
  {
    name: 'Allye Reaves',
    text: 'Natasha is the best of the best. You will NOT regret choosing her for your skin care needs!!!!!',
    color: '#FF8A65',
  },
  {
    name: 'Jennifer Brockett',
    text: 'Natasha is amazing! I was so happy to find her when I moved here. Highly recommend!',
    color: '#9575CD',
  },
  {
    name: 'angeline aguirre',
    text: 'Natasha is the best and always leaves my lash lifts looking so beautiful!\uD83E\uDD0D\uD83E\uDD0D',
    color: '#4DB6AC',
  },
  {
    name: 'Kayla Oley',
    text: 'The Esthetic Haus is so cozy and Natasha does amazing work! Be sure to check her out \uD83D\uDC95',
    color: '#E06090',
  },
  {
    name: 'Chad Bickford',
    text: 'Got a back facial with Natasha. Would definitely recommend!',
    color: '#7986CB',
  },
  {
    name: 'Olivia Clukey',
    text: 'Love my eyebrows and lashes every time I go, seriously the best!',
    color: '#FFD54F',
  },
  {
    name: 'Matt F',
    text: 'Absolutely slayyying after getting my lashes and facial doneess',
    color: '#4DD0E1',
  },
];

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function FiveStars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>
          <StarIcon size={14} strokeWidth={0} className="fill-[#FBBC05] text-[#FBBC05]" />
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.charAt(0).toUpperCase();

  return (
    <article className="flex flex-col bg-white border border-anchor/15 no-radius p-5 lg:p-6 h-full">
      {/* Header — avatar + name + Google G */}
      <div className="flex items-center gap-3 lg:gap-4 mb-3">
        <div
          className="w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: review.color }}
        >
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-sans text-[0.9rem] lg:text-base font-semibold text-anchor truncate">{review.name}</h3>
        </div>
        <GoogleG className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
      </div>

      {/* Stars */}
      <FiveStars />

      {/* Review text */}
      <p className="mt-2 text-anchor/75 text-[0.85rem] lg:text-[0.9rem] leading-relaxed flex-1 line-clamp-6">
        {review.text}
      </p>
    </article>
  );
}

function SeeAllCard() {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center bg-white border border-anchor/15 no-radius p-6 h-full hover:bg-canvas/40 transition-colors duration-300 gap-4"
    >
      <GoogleG className="w-10 h-10" />
      <span className="font-serif text-xl text-anchor">See all reviews</span>
      <span className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-semibold text-action">
        <span>View on Google</span>
        <ArrowRight02Icon size={14} strokeWidth={2} />
      </span>
    </a>
  );
}

export function Reviews() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = reviews.length + 1; // +1 for "See all" card

  return (
    <section
      id="reviews"
      className="py-10 md:py-12 lg:py-12 bg-white relative overflow-hidden scroll-mt-24"
    >
      {/* Tiled parallax background — matches Services & Gallery */}
      <div
        className="absolute inset-0 pointer-events-none bg-fixed"
        style={{
          backgroundImage: "url('/eh_public_assets/backgrounds/tile_pattern.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '500px auto',
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-white/88" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-anchor/25 to-transparent" />

      <div className="relative w-full">
        {/* Header — editorial style, no card */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-6 md:mb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="inline-flex items-center gap-4"
          >
            <MessageEdit01Icon size={18} strokeWidth={1.5} className="text-action shrink-0 hidden md:block" />
            <h2 className="font-serif text-5xl md:text-6xl text-anchor whitespace-nowrap">
              <span className="md:hidden">Our <span className="italic">clients.</span></span>
              <span className="hidden md:inline">What our <span className="italic">clients say.</span></span>
            </h2>
          </motion.div>
        </div>

        {/* Mobile-only swipe hint */}
        <div className="md:hidden mb-3 flex items-center justify-center gap-3 text-action">
          <span className="uppercase tracking-[0.2em] text-[10px] font-semibold">
            Swipe to explore
          </span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="flex items-center"
          >
            <ArrowRight02Icon size={18} strokeWidth={1.75} />
          </motion.div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="w-full overflow-x-auto pb-4 hide-scrollbar pl-6 md:pl-12 lg:pl-8 xl:pl-10 2xl:pl-12 snap-x snap-mandatory"
        >
          <div className="flex gap-6 w-max pr-6 md:pr-12 lg:pr-8 xl:pr-10 2xl:pr-12">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="snap-center w-[85vw] max-w-[360px] md:w-[36vw] md:max-w-[360px] lg:w-[28vw] lg:max-w-none flex"
              >
                <ReviewCard review={review} />
              </div>
            ))}
            {/* See all reviews card */}
            <div className="snap-center w-[78vw] max-w-[320px] md:w-[36vw] md:max-w-[360px] lg:w-[22vw] lg:max-w-[340px] flex">
              <SeeAllCard />
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <CarouselDots
          scrollRef={carouselRef}
          count={totalSlides}
          maxVisible={7}
          className="pt-4 pb-2"
        />

        {/* CTA — Leave a review */}
        <div className="mt-4 md:mt-6 flex justify-center px-6">
          <motion.a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="no-radius bg-anchor text-white border-2 border-transparent px-10 py-4 md:px-10 md:py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300"
          >
            <span>Leave Us a Review</span>
            <ArrowRight02Icon size={14} strokeWidth={2} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
