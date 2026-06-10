export default function Contact() {
    return null;
}

import { useState, FormEvent, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

export function ContactForm() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        website: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Auto-dismiss toast after 4 seconds
    useEffect(() => {
        if (submitStatus !== 'idle') {
            const timer = setTimeout(() => setSubmitStatus('idle'), 4000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const serviceId = 'service_pd0mo4f';
            const templateId = 'template_aicii8d';
            const publicKey = 'oc2wybL_N8-xX8oU5';

            const templateParams = {
                title: `New message from ${formData.name}`,
                name: formData.name,
                email: formData.email,
                time: new Date().toLocaleString(),
                message: `Organization: ${formData.organization || 'N/A'}\nWebsite: ${formData.website || 'N/A'}\n\n${formData.message}`,
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', organization: '', website: '', message: '' });
        } catch (error) {
            console.error('Email send failed:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full bg-transparent border-b border-gray-700 py-4 text-white placeholder-gray-500 outline-none focus:border-white transition-colors duration-300 text-base";

    return (
        <>
        <main className="py-20 px-6" ref={ref}>
            <div className="max-w-screen-xl mx-auto">
                <motion.div
                    className="grid lg:grid-cols-2 gap-16 lg:gap-24"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }}
                >
                    {/* Left Side — Heading & Socials */}
                    <div className="flex flex-col justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] as const }}
                        >
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight italic">
                                Let's start a<br />
                                project together
                            </h2>
                            <p className="mt-8 text-gray-400 text-lg max-w-md leading-relaxed">
                                I develop clear websites with code that empower startups and businesses capture new leads and accelerate their growth.
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-16 lg:mt-0"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">Socials</p>
                            <div className="flex items-center gap-6">
                                <a href="https://www.linkedin.com/in/priyanshu-mehra-060070245/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    LinkedIn
                                </a>
                                <a href="https://www.instagram.com/priyanshu_3/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Instagram
                                </a>
                                <a href="https://github.com/priyanshu-3" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Github
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side — Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] as const }}
                    >
                        <input
                            type="text"
                            required
                            placeholder="Your name *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={inputClass}
                        />
                        <input
                            type="email"
                            required
                            placeholder="Email address *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputClass}
                        />
                        <input
                            type="text"
                            placeholder="Organization name"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className={inputClass}
                        />
                        <input
                            type="url"
                            placeholder="Current website (if applicable)"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className={inputClass}
                        />
                        <textarea
                            required
                            placeholder="What is the main purpose of your project"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className={`${inputClass} resize-none h-32`}
                        />


                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-white text-black font-medium text-lg rounded-full hover:bg-gray-200 active:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            </div>
        </main>

        {/* Floating Toast Notification */}
        <AnimatePresence>
            {submitStatus !== 'idle' && (
                <motion.div
                    initial={{ opacity: 0, y: -40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed top-24 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto z-[9999]"
                >
                    <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl shadow-black/40 md:min-w-[320px]">
                        {/* Icon */}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
                            submitStatus === 'success' 
                                ? 'bg-white text-black' 
                                : 'bg-white/20 text-white'
                        }`}>
                            {submitStatus === 'success' ? (
                                <Check className="w-5 h-5" strokeWidth={2.5} />
                            ) : (
                                <X className="w-5 h-5" strokeWidth={2.5} />
                            )}
                        </div>

                        {/* Text */}
                        <div>
                            <p className="text-white font-medium text-sm">
                                {submitStatus === 'success' ? 'Success' : 'Something went wrong'}
                            </p>
                            <p className="text-gray-400 text-xs mt-0.5">
                                {submitStatus === 'success' 
                                    ? 'I will contact you shortly.' 
                                    : 'Please try again later.'}
                            </p>
                        </div>

                        {/* Dismiss */}
                        <button 
                            onClick={() => setSubmitStatus('idle')}
                            className="ml-auto text-gray-500 hover:text-white transition-colors p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Auto-dismiss progress bar */}
                    <motion.div 
                        className="h-[2px] bg-white/30 rounded-full mt-1 mx-2"
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 4, ease: "linear" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
        </>
    )
}

