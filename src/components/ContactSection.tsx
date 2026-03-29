import React, { useState } from 'react';
import { Phone, Mail, MapPin, Server, Globe, Users, ArrowRight } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Select service',
    comment: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'ContactSection' }),
      });

      if (!response.ok) throw new Error('Network response was not ok.');
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: 'Select service', comment: '' });
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const stats = [
    { icon: <Globe className="w-8 h-8 text-amber-500" />, value: '5+', label: 'Countries' },
    { icon: <Server className="w-8 h-8 text-amber-500" />, value: '100+', label: 'Projects' },
    { icon: <Users className="w-8 h-8 text-amber-500" />, value: '50+', label: 'Happy Clients' },
  ];

  const buttonStyle: React.CSSProperties = {
    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
  };

  return (
    <div className="bg-gray-50 py-12 sm:py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
            <p className="font-bold text-amber-500 tracking-widest mb-2">GET IN TOUCH</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                Let’s Start a Project Together
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                We are here to help. Fill out the form, and we'll get back to you as soon as possible.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-start">
          
          {/* Left Side - Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-3.5 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-amber-500 outline-none transition" />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full p-3.5 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-amber-500 outline-none transition" />
              </div>
              <div>
                 <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={formData.phone} onChange={handleChange} className="w-full p-3.5 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-amber-500 outline-none transition" />
              </div>
              <div>
                <select name="service" value={formData.service} onChange={handleChange} className="w-full p-3.5 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-amber-500 outline-none appearance-none transition">
                  <option>Select a service</option>
                  <option>Web Development</option>
                  <option>Graphic Design</option>
                  <option>SEO & Content</option>
                  <option>AI Solutions</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <textarea name="comment" placeholder="Tell us about your project..." rows={4} value={formData.comment} onChange={handleChange} required className="w-full p-3.5 rounded-lg bg-gray-100 border-transparent focus:ring-2 focus:ring-amber-500 outline-none transition"></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  disabled={status === 'loading'} 
                  className="w-full bg-amber-500 text-white font-bold py-4 px-6 hover:bg-amber-600 transition-all duration-300 shadow-lg flex items-center justify-center text-base sm:text-lg"
                  style={buttonStyle}
                >
                  {status === 'loading' ? <div className="loading-spinner" style={{width: '28px', height: '28px'}}></div> : <span className="flex items-center">Submit Your Request <ArrowRight className="ml-2" size={20}/></span>}
                </button>
              </div>
              {status === 'success' && <p className="text-center mt-3 text-green-600 font-semibold">Message sent! We'll be in touch soon.</p>}
              {status === 'error' && <p className="text-center mt-3 text-red-600 font-semibold">Something went wrong. Please try again.</p>}
            </form>
          </div>

          {/* Right Side - Info & Map */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Our Contact Information</h3>
                <div className="space-y-5">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><Mail className="w-6 h-6 text-amber-600" /></div>
                        <div>
                            <p className="text-gray-500 font-medium">Email Us</p>
                            <a href="mailto:info@samcreative-solutions.com" className="font-bold text-gray-800 text-base sm:text-lg hover:text-amber-600 transition break-all">info@samcreative-solutions.com</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><Phone className="w-6 h-6 text-amber-600" /></div>
                        <div>
                            <p className="text-gray-500 font-medium">Call Us</p>
                            <a href="tel:+923263778850" className="font-bold text-gray-800 text-base sm:text-lg hover:text-amber-600 transition">+92 326 3778850</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-amber-600" /></div>
                        <div>
                            <p className="text-gray-500 font-medium">Our Location</p>
                            <p className="font-bold text-gray-800 text-base sm:text-lg">Karachi, Pakistan</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Our Global Presence</h3>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.381373509893!2d67.00109931499965!3d24.85195208405963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e083a2169b7%3A0x959325983a48e58!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1627048993510!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mt-6">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <p className="text-2xl sm:text-3xl font-bold text-amber-500">{stat.value}</p>
                            <p className="text-gray-600 font-medium text-sm sm:text-base mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
