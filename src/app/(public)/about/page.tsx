'use client'

import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { useEffect } from 'react';
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Kezzyk Autos'
  }, [])
  return (
    <main className="flex-1 pb-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-bg-primary overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 tracking-tight">
              Driven by <span className="font-medium">Trust.</span>
            </h1>
            <p className="text-xl text-accent mb-8 font-light tracking-widest uppercase">
              About Kezzyk Autos
            </p>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              At Kezzyk Autos, we redefine the premium car buying experience. We are dedicated to providing a curated selection of exceptional vehicles, matched with unparalleled customer service and transparency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32 bg-bg-primary">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-light text-white mb-6 border-b border-white/10 pb-4">Our <span className="font-medium">Mission</span></h2>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                To connect automotive enthusiasts with their dream vehicles through a seamless, transparent, and trusted process. We strive to elevate the standard of automotive retail by focusing on quality, reliability, and customer satisfaction above all else.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-light text-white mb-6 border-b border-white/10 pb-4">Our <span className="font-medium">Vision</span></h2>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                To be the foremost destination for premium automobiles, recognized globally for our unwavering commitment to excellence, innovation in service delivery, and the creation of lasting relationships with every client we serve.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <h2 className="text-3xl font-light text-white mb-4">Core <span className="font-medium">Values</span></h2>
            <p className="text-xl text-gray-400 font-light">The principles that guide every interaction.</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {[
              {
                title: "Trust & Transparency",
                desc: "We believe in honest communication and full disclosure in every transaction.",
              },
              {
                title: "Premium Quality",
                desc: "Every vehicle in our inventory undergoes rigorous inspection to ensure excellence.",
              },
              {
                title: "Customer First",
                desc: "Your satisfaction is our priority. We tailor our services to meet your unique needs.",
              },
              {
                title: "Innovation",
                desc: "We constantly evolve our processes to provide a modern, efficient buying experience.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="pl-6 border-l border-white/10"
              >
                <h3 className="text-xl font-medium text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bg-primary relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/5 rounded-full blur-[100px] z-0" />
        <div className="section-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-display-md font-bold text-text-primary mb-6">
              Ready to Find Your Next Vehicle?
            </h2>
            <p className="text-body-lg text-text-secondary mb-10">
              Browse our curated inventory of premium automobiles or get in touch with our team to find exactly what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-button bg-accent text-white hover:bg-accent-hover active:bg-accent-dark shadow-md hover:shadow-glow text-body-lg px-7 py-3.5 gap-2.5 w-full sm:w-auto min-w-[200px]"
              >
                Browse Inventory <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-button border border-accent text-accent hover:bg-accent hover:text-white text-body-lg px-7 py-3.5 gap-2.5 w-full sm:w-auto min-w-[200px]"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
