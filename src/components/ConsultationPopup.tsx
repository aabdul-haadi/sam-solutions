import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  MapPin, 
  Mail, 
  AlertCircle,  
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { submitConsultationForm } from '../lib/supabase';

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationPopup: React.FC<ConsultationPopupProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    country: '',
    projectDescription: '',
    day: '',
    timeSlot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['9 AM - 12 PM', '12 PM - 3 PM', '3 PM - 5 PM'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const nextStep = () => {
    // Basic validation before proceeding
    if (step === 1 && (!formData.name || !formData.email)) {
      setError('Please fill in name and email');
      return;
    }
    if (step === 2 && (!formData.country || !formData.projectDescription)) {
      setError('Please fill in country and project description');
      return;
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitConsultationForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        country: formData.country,
        project_description: formData.projectDescription,
        preferred_day: formData.day,
        preferred_time: formData.timeSlot
      });

      if (result.success) {
        setIsSubmitted(true);
        // Reset form and close after 5 seconds
        setTimeout(() => {
          resetForm();
          onClose();
        }, 5000);
      } else {
        setError(result.error || 'Failed to submit consultation request');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      state: '',
      country: '',
      projectDescription: '',
      day: '',
      timeSlot: ''
    });
    setError(null);
    setIsSubmitted(false);
  };

  const handleEmailFallback = () => {
    const subject = encodeURIComponent(`Consultation Request: ${formData.projectDescription.substring(0, 50)}...`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Location: ${formData.state}, ${formData.country}
Preferred Day: ${formData.day}
Preferred Time: ${formData.timeSlot}

Project Description:
${formData.projectDescription}
    `.trim());

    window.open(
      `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=samcreativeofficials@gmail.com&su=${subject}&body=${body}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-7 h-7 text-yellow-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Free Consultation</h2>
                <p className="text-sm text-gray-600">Get expert advice for your project</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-2">
            {['Your Details', 'Project Info', 'Schedule'].map((label, index) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step > index + 1 ? 'bg-green-500 text-white' :
                  step === index + 1 ? 'bg-yellow-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className="text-xs mt-1 text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">
                Your consultation request has been received. We'll send a Zoom link to your email within 24 hours.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Next steps:</strong> Check your email for confirmation and meeting details.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Error Display */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800 mb-2">{error}</p>
                      <button
                        type="button"
                        onClick={handleEmailFallback}
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email us directly
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 mb-4">
                    <User className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-medium">Personal Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 mb-4">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-medium">Location & Project</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition"
                          placeholder="United States"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province (Optional)
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition"
                          placeholder="California"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Description *
                      </label>
                      <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition resize-none"
                        placeholder="Tell us about your project goals, requirements, and timeline..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 10 characters</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Scheduling */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 mb-4">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-medium">Preferred Time (Optional)</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Day
                      </label>
                      <select
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition"
                      >
                        <option value="">Select a day (optional)</option>
                        {days.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        disabled={!formData.day}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition ${
                          !formData.day ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="">Select a time slot</option>
                        {formData.day && timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Scheduling is optional. We'll contact you to arrange the best time.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={step === 1 ? onClose : prevStep}
                  className="px-5 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  {step === 1 ? 'Cancel' : 'Back'}
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-yellow-600 text-gray-900 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-yellow-600 text-gray-900 rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationPopup;