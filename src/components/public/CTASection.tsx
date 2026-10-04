'use client'

import Link from 'next/link'
import { MapPin, MessageCircle, ArrowRight } from 'lucide-react'
import { getWhatsAppUrl, CONTACT } from '@/lib/constants'
import { motion } from 'framer-motion'

export function CTASection() {
  return (
    <section className="bg-[#050505] py-32 md:py-48 border-t border-white/5 text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tighter"
        >
          Experience the <span className="text-accent font-medium">difference.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl mb-12 font-light"
        >
          Visit our showroom or browse our digital inventory. We're here to help you find your perfect vehicle.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <Link
            href="/inventory"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm uppercase tracking-widest font-medium transition-all bg-white text-black hover:bg-gray-200 h-14 px-10"
          >
            Browse Inventory
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm uppercase tracking-widest font-medium transition-all border border-white/20 text-white hover:border-accent hover:text-accent h-14 px-10 gap-3"
          >
            <MessageCircle className="h-4 w-4" />
            Contact Sales
          </a>
        </motion.div>
      </div>
    </section>
  )
}
