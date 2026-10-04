'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CONTACT, getWhatsAppUrl, SOCIAL_LINKS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Map } from '@/components/public/Map';
import { useSettings } from '@/components/providers/SettingsProvider';

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
    },
  },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const settings = useSettings();

  const fallbackContact = CONTACT;
  const fallbackSocial = SOCIAL_LINKS;

  const phone = settings ? settings.contact_phone : fallbackContact.phone;
  const email = settings ? settings.contact_email : fallbackContact.email;
  const address = settings ? settings.address : fallbackContact.address;
  const whatsappNumber = settings ? settings.whatsapp_number : fallbackContact.whatsapp;
  
  const activeSocials: Record<string, string> = {
    ...(settings ? (settings.tiktok_url ? { tiktok: settings.tiktok_url } : {}) : { tiktok: fallbackSocial.tiktok }),
    ...(settings ? (settings.facebook_url ? { facebook: settings.facebook_url } : {}) : { facebook: fallbackSocial.facebook }),
  }

  const getDynamicWhatsAppUrl = (vehicleName?: string) => {
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '')
    const message = vehicleName
      ? `Hello Kezzyk Autos, I'm interested in the ${vehicleName} listed on your website. Please I'd like more information about it.`
      : `Hello Kezzyk Autos, I'd like to inquire about your available vehicles.`
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 pb-32 bg-[#050505]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-[#050505] overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp as any}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-tighter">
              Get in <span className="font-medium text-accent">Touch.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
              Have a question or looking for a specific vehicle? Our team of automotive specialists is here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl pt-24 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Contact Info Sidebar */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer as any}
            className="lg:col-span-5 space-y-16"
          >
            <div>
              <motion.h3 variants={fadeInUp} className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-10 font-medium">Direct Contact</motion.h3>
              
              <div className="space-y-10">
                <motion.div variants={fadeInUp} className="group">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-2">Phone</p>
                  <a href={`tel:${phone}`} className="text-2xl font-light text-white group-hover:text-accent transition-colors flex items-center gap-4">
                    {phone}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </motion.div>

                <motion.div variants={fadeInUp} className="group">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-2">Email</p>
                  <a href={`mailto:${email}`} className="text-2xl font-light text-white group-hover:text-accent transition-colors flex items-center gap-4">
                    {email}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </motion.div>

                <motion.div variants={fadeInUp} className="group">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-2">WhatsApp</p>
                  <a 
                    href={getDynamicWhatsAppUrl("Hello Kezzyk Autos, I'm reaching out from your contact page.")} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-2xl font-light text-white group-hover:text-accent transition-colors flex items-center gap-4"
                  >
                    Chat with us
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-2">Location</p>
                  <p className="text-xl font-light text-white leading-relaxed max-w-xs">
                    {address}
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-2">Hours</p>
                  <p className="text-xl font-light text-white leading-relaxed">
                    Mon - Sat: 9:00 AM - 6:00 PM<br/>Sun: Closed
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-8 font-medium">Social</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(activeSocials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-accent hover:border-accent hover:text-white transition-all uppercase tracking-widest text-xs font-semibold"
                  >
                    {platform === 'tiktok' && <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>}
                    {platform === 'facebook' && <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>}
                    {platform}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-16 rounded-[2rem]">
              <h3 className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-10 font-medium">Send Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-sm tracking-wide text-gray-400">Full Name *</label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      required 
                      disabled={isSubmitting}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus:ring-0 focus:border-accent text-lg placeholder:text-gray-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm tracking-wide text-gray-400">Email Address *</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      disabled={isSubmitting}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus:ring-0 focus:border-accent text-lg placeholder:text-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="phone" className="text-sm tracking-wide text-gray-400">Phone Number</label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    placeholder="+234 ..." 
                    disabled={isSubmitting}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus:ring-0 focus:border-accent text-lg placeholder:text-gray-700"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm tracking-wide text-gray-400">Message *</label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="How can we help you?" 
                    rows={4} 
                    required 
                    disabled={isSubmitting}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus:ring-0 focus:border-accent text-lg placeholder:text-gray-700 resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl">
                    Thank you! Your message has been sent successfully. We will get back to you soon.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                    Oops! Something went wrong. Please try again later or contact us directly.
                  </motion.div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto px-12 py-7 text-lg font-light tracking-wide rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="container mx-auto px-4 max-w-5xl pt-24 lg:pt-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp as any}
          className="space-y-8"
        >
          <h3 className="text-sm tracking-[0.2em] uppercase text-gray-500 font-medium">Find Us</h3>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-4 md:p-8">
            <Map 
              lat={6.5244} 
              lng={3.3792} 
              title="Kezzyk Autos" 
              address={address} 
              showDirections={true}
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
