import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle, Clock, Users, Award, ChevronDown, AlertCircle, MessageCircle, Calendar, Star, Zap, Shield, Sparkles } from 'lucide-react';

interface ContactPageProps {
  setCurrentPage?: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailFallback, setShowEmailFallback] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (showEmailFallback) setShowEmailFallback(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setShowEmailFallback(false);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '', timeline: '' });
      }, 3000);

    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setShowEmailFallback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service || 'General'} - ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'N/A'}
Phone: ${formData.phone || 'N/A'}
Service: ${formData.service || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Message:
${formData.message || 'No message provided'}
    `.trim());

    window.open(
      `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=info@samcreative-solutions.com&su=${subject}&body=${body}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleBackToHome = () => setCurrentPage?.('home');

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const services = ['Web Development', 'E-commerce Solutions', 'SaaS Applications', 'AI Solutions', 'Graphic Design', '2D/3D Animation', 'SEO & Marketing', 'Other'];
  const budgetRanges = ['Below $1000', '$1000 - $5000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000 - $100,000', '$100,000+'];
  const timelines = ['ASAP', '1-2 months', '3-6 months', '6+ months', 'Just exploring'];

  const faqs = [
    { q: "How long does a typical project take?", a: "Project timelines vary from 2-16 weeks depending on complexity and scope." },
    { q: "Do you provide ongoing support?", a: "Yes, we offer comprehensive support and maintenance packages." },
    { q: "Can you work with our existing team?", a: "Absolutely! We collaborate seamlessly with in-house teams." },
    { q: "What's included in the project cost?", a: "All development, design, testing, and initial support are included." },
    { q: "Do you offer payment plans?", a: "Yes, we offer flexible payment schedules for larger projects." },
    { q: "Can you help with hosting and deployment?", a: "Yes, we handle all technical aspects including hosting setup." }
  ];

  const stats = [
    { icon: Clock, value: '24-48h', label: 'Response Time' },
    { icon: Users, value: '150+', label: 'Happy Clients' },
    { icon: Award, value: '98%', label: 'Success Rate' }
  ];

  const benefits = [
    { icon: Zap, title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality' },
    { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your projects' },
    { icon: Sparkles, title: 'Innovative Solutions', desc: 'Cutting-edge technology implementation' },
    { icon: Star, title: 'Premium Support', desc: '24/7 dedicated support team' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ENHANCED HERO SECTION */}
     <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.25),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.15),transparent_50%)]" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
  </div>
  
  <div className="pt-20 pb-12 md:pb-16 relative z-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleBackToHome}
        className="flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 mb-6 md:mb-8 group text-sm md:text-base"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-yellow-400 font-medium">Ready to Transform Your Business</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
          Let's Create <span className="text-yellow-400 relative">
            Magic
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></span>
          </span> Together
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
          Share your vision with us. We'll craft a digital solution that exceeds expectations and drives results.
        </p>

        {/* ENHANCED STATS - RESPONSIVE */}
        <div className="mt-10 md:mt-12">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="group relative bg-transparent  rounded-full p-4 md:p-6 transition-all duration-500"
              >
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:shadow-yellow-400/30 transition-shadow duration-300">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-black" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 leading-none">
                    {stat.value}
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* MAIN CONTENT WITH ENHANCED DESIGN */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ENHANCED CONTACT FORM */}
          <div className="lg:col-span-8">
            <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* FORM HEADER */}
              <div className="bg-gradient-to-r from-gray-900 to-black p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Start Your Journey</h2>
                <p className="text-gray-300">Fill out the form below and we'll craft a custom solution for you</p>
              </div>

              {/* FORM CONTENT */}
              <div className="p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-10 md:py-12">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-bounce">
                      <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Brilliant! 🎉</h3>
                    <p className="text-gray-600 mb-5 md:mb-6 max-w-md mx-auto">
                      Your project details have been received. Our team will review and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
                    >
                      Start New Project
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    {showEmailFallback && (
                      <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-200 rounded-2xl p-5 md:p-6 animate-fade-in backdrop-blur-sm">
                        <div className="flex items-start space-x-4">
                          <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0 animate-pulse" />
                          <div className="flex-1">
                            <p className="text-red-800 font-medium mb-2">Quick Alternative!</p>
                            <p className="text-red-700 text-sm mb-4">Prefer email? We respond within 1 hour.</p>
                            <button
                              type="button"
                              onClick={handleEmailClick}
                              className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-3 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                            >
                              <Mail className="w-4 h-4" />
                              <span>Email Us Directly</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ENHANCED FORM FIELDS */}
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white hover:border-yellow-300"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white hover:border-yellow-300"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white hover:border-yellow-300"
                          placeholder="Your Company Inc."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white hover:border-yellow-300"
                          placeholder="+92 313 8372573"
                        />
                      </div>
                    </div>

                    {/* ENHANCED DROPDOWNS */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                          Service Needed *
                        </label>
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white appearance-none hover:border-yellow-300"
                          >
                            <option value="">Select service</option>
                            {services.map(service => (
                              <option key={service} value={service}>{service}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="budget" className="block text-sm font-semibold text-gray-700">
                          Budget Range
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white appearance-none hover:border-yellow-300"
                          >
                            <option value="">Select budget</option>
                            {budgetRanges.map(range => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700">
                          Timeline
                        </label>
                        <div className="relative">
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white appearance-none hover:border-yellow-300"
                          >
                            <option value="">Select timeline</option>
                            {timelines.map(timeline => (
                              <option key={timeline} value={timeline}>{timeline}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white resize-none hover:border-yellow-300"
                        placeholder="Describe your project vision, goals, challenges, and any specific requirements..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 md:pt-6 gap-4">
                      <p className="text-sm text-gray-500">* Required fields</p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-semibold text-base md:text-lg hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-3">
                          <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                          <span>{isSubmitting ? 'Sending...' : 'Launch Project'}</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* BENEFITS SECTION */}
            <div className="mt-8 md:mt-12">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Why Partner With Us?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100 hover:border-yellow-300 transition-all duration-300 group hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{benefit.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ENHANCED SIDEBAR */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            {/* QUICK ACTIONS */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Quick Connect</h3>
                
                {/* WHATSAPP - UPDATED NUMBER */}
                <div className="mb-6">
                  <a
                    href="https://wa.me/923138372573"
                    target="_blank"
                    rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-5 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">WhatsApp</p>
                      <p className="text-sm opacity-90">Instant Response</p>
                    </div>
                  </div>
                 
                </a>
              </div>

              {/* EMAIL */}
              <div className="mb-6">
                <div className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-5 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">Email Us</p>
                      <p className="text-sm text-gray-600">info@samcreative-solutions.com</p>
                      <button
                        onClick={handleEmailClick}
                        className="mt-2 text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center space-x-1"
                      >
                        <span>Compose Email</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* PHONE */}
              <div>
                <div className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-5 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">Call Us</p>
                      <div className="space-y-1">
                        <a href="tel:+923263778850" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Phone className="w-4 h-4" />
                          <span>+92 326 3778850</span>
                        </a>
                        <a href="tel:+923138372573" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Phone className="w-4 h-4" />
                          <span>+92 313 8372573</span>
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Mon-Sat, 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* APPOINTMENT */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-3xl p-6 md:p-8 shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Schedule a Call</h3>
                  <p className="text-sm text-gray-700">Book a personalized consultation with our experts</p>
                </div>
              </div>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-gray-900 to-black text-white text-center py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Book Appointment
              </a>
            </div>

            {/* SOCIAL MEDIA */}
         <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
  <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Our Journey</h3>
  <div className="grid grid-cols-3 gap-4">
    <a
      href="https://www.facebook.com/profile.php?id=61570940347368"
      className="group bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
    >
      <span className="text-xl font-bold">f</span>
    </a>
    <a
      href="https://www.linkedin.com/company/sam-creativesolutions/?viewAsMember=true"
      className="group bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-105"
    >
      <span className="text-xl font-bold">in</span>
    </a>
    <a
      href="https://www.instagram.com/samcreative_solutions/"
      className="group bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-105"
    >
      <span className="text-xl font-bold">ig</span>
    </a>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* ENHANCED FAQ SECTION */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Questions, <span className="text-yellow-500">Answered</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Everything you need to know before starting your project
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="group cursor-pointer"
                  onClick={() => toggleFAQ(i)}
                >
                  <div className={`
                    bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300
                    ${activeFAQ === i 
                      ? 'border-yellow-400 shadow-xl shadow-yellow-400/20' 
                      : 'border-gray-100 hover:border-yellow-300 hover:shadow-xl'
                    }
                  `}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-bold mb-3 transition-colors duration-300 ${
                          activeFAQ === i ? 'text-gray-900' : 'text-gray-800'
                        }`}>
                          {faq.q}
                        </h4>
                        <div className={`
                          overflow-hidden transition-all duration-500
                          ${activeFAQ === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                      <div className={`
                        ml-4 w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0
                        transition-all duration-300
                        ${activeFAQ === i 
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 rotate-180' 
                          : 'bg-gray-100 group-hover:bg-yellow-50'
                        }
                      `}>
                        <ChevronDown className={`
                          w-5 h-5 transition-all duration-300
                          ${activeFAQ === i ? 'text-black' : 'text-gray-600 group-hover:text-yellow-600'}
                        `} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA SECTION */}
          <div className="mt-16 md:mt-20 text-center">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400/10 rounded-full translate-y-20 -translate-x-20"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Start Your Project?
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join 150+ satisfied clients who transformed their business with us
                </p>
                <button
                  onClick={() => document.getElementById('name')?.focus()}
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center space-x-3">
                    <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Get Started Now</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
