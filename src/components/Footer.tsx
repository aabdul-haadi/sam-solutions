'use client';

import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

interface FooterProps {
  setCurrentPage?: (page: string) => void;
}

/* ------------------------------------------------------------------ */
/*                         Newsletter Logic                           */
/* ------------------------------------------------------------------ */
const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setMessage('');

    try {
      // Replace with your real endpoint
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message ?? 'Subscription failed');

      setStatus('success');
      setMessage('Thank you! You’re subscribed.');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message ?? 'Something went wrong.');

      // Fallback – open Gmail with a pre-filled contact email
      const subject = encodeURIComponent('Newsletter Subscription Issue');
      const body = encodeURIComponent(
        `Hi SAM CREATIVE,\n\nI tried to subscribe with "${email}" but got an error.\n\nError: ${err.message}\n\nPlease add me manually.\n\nThanks!`
      );
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=info@samcreative-solutions.com&su=${subject}&body=${body}`,
        '_blank'
      );
    }
    finally {
      // Auto-hide toast after 5 s
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  /* ------------------------------------------------------------------ */
  /*                         Footer Data                                 */
  /* ------------------------------------------------------------------ */
  const footerLinks = {
    services: [
      'Web Development',
      'E-commerce Solutions',
      'SaaS Applications',
      'Graphic Designing',
      '2D/3D Animation',
      '3D Modeling',
    ],
    company: [
      'About Us',
      { name: 'Portfolio', page: 'portfolio' },
      { name: 'Contact', page: 'contact' },
    ],
    resources: [
      { name: 'Blog', page: 'blog' },
      { name: 'Privacy Policy', page: 'privacy' },
      { name: 'Terms of Service', page: 'terms' },
    ],
    legal: [
      { name: 'Privacy Policy', page: 'privacy' },
      { name: 'Terms of Service', page: 'terms' },
      { name: 'FAQ', page: 'faq' },
      'Cookie Policy',
      'Refund Policy',
      'Disclaimer',
    ],
  };

  const socialLinks = [
    { icon: <FaFacebook size={20} />, href: 'https://www.facebook.com/profile.php?id=61570940347368', label: 'Facebook' },
    { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/company/sam-creativesolutions/?viewAsMember=true', label: 'LinkedIn' },
    { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/samcreative_solutions/', label: 'Instagram' },
    { icon: <FaYoutube size={20} />, href: 'https://www.youtube.com/@SamCreative', label: 'YouTube' },
  ];

  type FooterLink = string | { name: string; page: string };

  const handleLinkClick = (item: FooterLink) => {
    if (typeof item === 'object' && item.page && setCurrentPage) {
      setCurrentPage(item.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* ------------------------------------------------------------------ */
  /*                               Render                               */
  /* ------------------------------------------------------------------ */
  return (
    <footer className="bg-black text-white">
      {/* ---------- Main Footer ---------- */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-16 rounded-full overflow-hidden">
                <img src="/icon-04.png" alt="SAM CREATIVE Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span style={{ fontFamily: 'BigerOver', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  SAM CREATIVE
                </span>
                <span className="text-sm text-yellow-400 font-medium -mt-1 tracking-[0.2em]">
                  solutions
                </span>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              We create premium digital experiences that captivate audiences and drive results. From
              AI-powered solutions to stunning designs, we&apos;re your partner in digital transformation.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 mt-1" />
                <a href="mailto:info@samcreative-solutions.com" className="text-gray-300 hover:underline">
                  info@samcreative-solutions.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <a
                    href="https://wa.me/923263778850"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:underline block"
                  >
                    +92 326 3778850
                  </a>
                  <a
                    href="https://wa.me/923138372573"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:underline block"
                  >
                    +92 313 8372573
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  {typeof link === 'object' ? (
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                      {link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  {typeof link === 'object' ? (
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                      {link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest insights and updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-60"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-r-full hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </button>
              </div>

              {/* Toast */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm animate-fadeIn">
                  <CheckCircle size={16} />
                  <span>{message}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm animate-fadeIn">
                  <XCircle size={16} />
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Social Media & Legal */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <div className="flex space-x-6">
                {footerLinks.legal.slice(0, 3).map((link, i) => (
                  <button
                    key={i}
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {typeof link === 'object' ? link.name : link}
                  </button>
                ))}
              </div>
              <p className="text-gray-400">© 2025 SAM CREATIVE Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-black font-semibold">
            Ready to start your next project?{' '}
            <a href="#" className="underline ml-2 hover:no-underline">
              Get a free consultation today!
            </a>
          </p>
        </div>
      </div>

      {/* Fade-in animation for toast */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
