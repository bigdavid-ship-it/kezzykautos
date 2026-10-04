'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import { motion } from 'framer-motion'

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-[#050505] overflow-hidden border-b border-white/5">
      {/* Dark overlays for cinematic contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10" />
      
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80')`,
        }}
      />

      <div className="container mx-auto px-4 relative z-20 py-20 md:py-32 md:mt-12 flex flex-col justify-center h-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer as any}
          className="max-w-4xl space-y-6"
        >
          <motion.p variants={fadeInUp} className="text-white/60 font-medium text-xs md:text-sm uppercase tracking-[0.4em]">
            Kezzyk Autos
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-[7.5rem] font-light text-white leading-[1.05] tracking-tighter">
            Drive <span className="font-medium text-accent">Brilliance.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light pt-4">
            A curated selection of the world's most exceptional vehicles.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link
              href="/inventory"
              className="inline-flex min-w-0 items-center justify-center text-xs uppercase tracking-[0.2em] font-semibold transition-all bg-white text-black hover:bg-accent hover:text-white h-16 px-12 gap-4 rounded-full"
            >
              Explore Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Trust Badges to fill space professionally */}
          <motion.div variants={fadeInUp} className="pt-16 md:pt-24 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/10 mt-12">
            <div>
              <p className="text-white font-medium text-lg">100+</p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Premium Cars</p>
            </div>
            <div>
              <p className="text-white font-medium text-lg">100%</p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Verified History</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-white font-medium text-lg">Nationwide</p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Safe Delivery</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
