import React, { useState } from 'react';
import { X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ConsultationPopup: React.FC<ConsultationPopupProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'A valid email is required.';
    if (!phone.trim()) newErrors.phone = 'A contact number is required.';
    if (!message.trim()) newErrors.message = 'Please enter your requirements.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, website, message, source: 'ConsultationPopup' }),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      setStatus('success');
      // Reset form or give user option to close
      setTimeout(() => {
        onClose();
        resetForm();
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setMessage('');
    setStatus('idle');
    setErrors({});
  };

  const handleClose = () => {
    if (status === 'loading') return;
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-navy-dark border border-gold-accent/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-light-contrast hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Get a Free Consultation</h2>
            <p className="text-light-contrast mt-2">Fill out the form below, and we'll be in touch shortly.</p>
          </div>

          {status === 'success' && (
            <div className="flex flex-col items-center justify-center text-center h-full p-8">
              <CheckCircle className="text-green-400 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-bold text-white">Submission Successful!</h3>
              <p className="text-light-contrast mt-2">Thank you for your interest. We will get back to you within 24 hours.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center justify-center text-center h-full p-8">
              <AlertTriangle className="text-red-400 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-bold text-white">Something Went Wrong</h3>
              <p className="text-light-contrast mt-2">We couldn't process your request. Please try again later or contact us directly.</p>
            </div>
          )}

          {status !== 'success' && status !== 'error' && (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInputField('name', 'Full Name*', name, setName, errors.name)}
                {renderInputField('email', 'Email Address*', email, setEmail, errors.email, 'email')}
                {renderInputField('phone', 'Contact Number*', phone, setPhone, errors.phone, 'tel')}
                {renderInputField('website', 'Website URL (Optional)', website, setWebsite, errors.website, 'url')}
              </div>
              <div>
                {renderTextareaField('message', 'Your Requirements*', message, setMessage, errors.message)}
              </div>
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-gold-accent text-navy-base font-bold py-3 px-10 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                >
                  {status === 'loading' && <Loader2 className="animate-spin mr-2" size={20} />}
                  {status === 'loading' ? 'Submitting...' : 'Book My Consultation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
       <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
       `}</style>
    </div>
  );
};

const renderInputField = (
  id: string,
  label: string,
  value: string,
  setter: (val: string) => void,
  error?: string,
  type: string = 'text'
) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => setter(e.target.value)}
      placeholder=" " // Required for the floating label to work correctly
      className={`peer w-full bg-navy-base border ${error ? 'border-red-500' : 'border-gold-accent/30'} rounded-md px-4 py-3 text-white transition-colors focus:outline-none focus:border-gold-accent h-12`}
    />
    <label
      htmlFor={id}
      className={`absolute left-4 transition-all duration-300 text-light-contrast/70 pointer-events-none
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-gold-accent
        ${value ? 'top-0 -translate-y-1/2 text-xs' : ''}`
    }>
      {label}
    </label>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const renderTextareaField = (
  id: string,
  label: string,
  value: string,
  setter: (val: string) => void,
  error?: string
) => (
    <div className="relative">
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={(e) => setter(e.target.value)}
      placeholder=" "
      rows={5}
      className={`peer w-full bg-navy-base border ${error ? 'border-red-500' : 'border-gold-accent/30'} rounded-md px-4 py-3 text-white transition-colors focus:outline-none focus:border-gold-accent`}
    ></textarea>
    <label
      htmlFor={id}
      className={`absolute left-4 transition-all duration-300 text-light-contrast/70 pointer-events-none
        peer-placeholder-shown:top-5 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
        peer-focus:top-0 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gold-accent
        ${value ? 'top-0 -translate-y-0 text-xs' : ''}`
    }>
      {label}
    </label>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default ConsultationPopup;
