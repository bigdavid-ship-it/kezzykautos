'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, BadgeDollarSign, Handshake, MessageCircle } from 'lucide-react'

const indicators = [
  {
    icon: ShieldCheck,
    title: 'Verified Vehicles',
    description: 'Inspected & Guaranteed',
  },
  {
    icon: BadgeDollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden charges',
  },
  {
    icon: Handshake,
    title: 'Trusted Dealer',
    description: 'Reliable & Professional',
  },
  {
    icon: MessageCircle,
    title: 'Nationwide Delivery',
    description: 'We deliver to your door',
  },
]

export function TrustIndicators() {
  return (
    <section className="bg-bg-elevated py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Why Choose Kezzyk Autos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center p-6 rounded-xl bg-bg-primary/50 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4 text-accent">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
