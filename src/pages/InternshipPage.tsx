import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
      <div className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const ConfirmationPopup = ({ onDone }: { onDone: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md mx-auto transform transition-all duration-300 scale-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-8">Thank you for your interest. We will review your application and get back to you soon.</p>
        <button onClick={onDone} className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-lg">
          Back to Home
        </button>
      </div>
    </div>
  );

interface InternshipPageProps {
    setCurrentPage: (page: string) => void;
}

const InternshipPage: React.FC<InternshipPageProps> = ({ setCurrentPage }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    program: '',
    university: '',
    yearOfStudy: '',
    fieldOfInterest: '',
    skills: '',
    experience: '',
    startDate: '',
    resume: null as File | null,
    motivation: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cvOption, setCvOption] = useState('upload');

  const totalSteps = 4;

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required.';
      if (!formData.email) {
        newErrors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid.';
      }
      if (!formData.dob) newErrors.dob = 'Date of birth is required.';
    } else if (step === 2) {
      if (!formData.program) newErrors.program = 'Academic program is required.';
      if (!formData.university) newErrors.university = 'University name is required.';
      if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required.';
      if (!formData.fieldOfInterest) newErrors.fieldOfInterest = 'Field of interest is required.';
      if (!formData.skills) newErrors.skills = 'Skills are required.';
    } else if (step === 3) {
      if (!formData.startDate) newErrors.startDate = 'Preferred start date is required.';
      if (!formData.motivation) newErrors.motivation = 'Motivation is required.';
    } else if (step === 4) {
        if (cvOption === 'upload' && !formData.resume) {
            newErrors.resume = 'Please upload your resume or generate one.';
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
      if (errors.resume) {
        setErrors(prev => ({...prev, resume: ''}));
      }
    }
  };

  const generatePdf = () => {
    const cvElement = document.getElementById('cv-preview');
    if (cvElement) {
      html2canvas(cvElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${formData.fullName.split(' ').join('_')}_CV.pdf`);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(totalSteps)) {
      console.log(formData);
      setIsSubmitted(true);
    }
  };
  
  const handleDone = () => {
    setIsSubmitted(false);
    setCurrentPage('home');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Step 1: Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" required type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" required type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <input name="dob" value={formData.dob} onChange={handleInputChange} required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
            <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Step 2: Education & Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="program" value={formData.program} onChange={handleInputChange} placeholder="Enter your program/degree name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    {errors.program && <p className="text-red-500 text-sm">{errors.program}</p>}
                    <input name="university" value={formData.university} onChange={handleInputChange} placeholder="Enter your university name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    {errors.university && <p className="text-red-500 text-sm">{errors.university}</p>}
                    <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="">Year of Study</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                        <option value="graduate">Graduate</option>
                    </select>
                    {errors.yearOfStudy && <p className="text-red-500 text-sm">{errors.yearOfStudy}</p>}
                    <select name="fieldOfInterest" value={formData.fieldOfInterest} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="">Which role are you applying for?</option>
                        <option value="frontend">Frontend Development</option>
                        <option value="backend">Backend Development</option>
                        <option value="ai_ml">AI & ML</option>
                        <option value="social_media">Social Media & Graphics</option>
                        <option value="seo">SEO & Content Writing</option>
                    </select>
                    {errors.fieldOfInterest && <p className="text-red-500 text-sm">{errors.fieldOfInterest}</p>}
                    <textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="List your key skills (e.g., HTML, CSS, JavaScript)" required rows={4} className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
                    {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
                </div>
            </div>
        );
      case 3:
        return (
          <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Step 3: Experience & Motivation</h2>
             <div className="space-y-6">
                <textarea name="experience" value={formData.experience} onChange={handleInputChange} placeholder="If you have prior experience, please describe briefly." rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
                <input name="startDate" value={formData.startDate} onChange={handleInputChange} required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                 <p className='text-gray-500'>Duration: 8 Weeks (fixed)</p>
                <textarea name="motivation" value={formData.motivation} onChange={handleInputChange} placeholder="Tell us why you’re passionate about this role." required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
                {errors.motivation && <p className="text-red-500 text-sm">{errors.motivation}</p>}
            </div>
          </div>
        );
    case 4:
        return (
            <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Step 4: CV / Resume</h2>
                <div className="flex items-center space-x-4 mb-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="cvOption" value="upload" checked={cvOption === 'upload'} onChange={() => setCvOption('upload')} className="form-radio h-4 w-4 text-yellow-400" />
                        <span className="text-gray-700 font-medium">Upload CV</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="cvOption" value="generate" checked={cvOption === 'generate'} onChange={() => setCvOption('generate')} className="form-radio h-4 w-4 text-yellow-400" />
                        <span className="text-gray-700 font-medium">Generate Quick CV</span>
                    </label>
                </div>

                {cvOption === 'upload' ? (
                    <div>
                        <input type="file" name="resume" onChange={handleFileChange} required={cvOption === 'upload'} accept=".pdf,.docx" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"/>
                        {errors.resume && <p className="text-red-500 text-sm mt-2">{errors.resume}</p>}
                    </div>
                ) : (
                    <div>
                        <div id="cv-preview" className="p-6 border rounded-lg bg-gray-50 space-y-4">
                           <h2 className="text-2xl font-bold text-gray-800">{formData.fullName}</h2>
                            <p className="text-gray-600">{formData.email} | {formData.phone}</p>
                            <hr />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Education</h3>
                                <p className="text-gray-600">{formData.program} at {formData.university} ({formData.yearOfStudy})</p>
                            </div>
                            <hr />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
                                <p className="text-gray-600">{formData.skills}</p>
                            </div>
                            <hr />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
                                <p className="text-gray-600">{formData.experience || 'No prior experience mentioned.'}</p>
                            </div>
                             <hr />
                             <div>
                                <h3 className="text-lg font-semibold text-gray-700">Motivation</h3>
                                <p className="text-gray-600">{formData.motivation}</p>
                            </div>
                        </div>
                        <button type="button" onClick={generatePdf} className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                            Generate & Download PDF
                        </button>
                    </div>
                )}
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Internship Application - Sam Solutions</title>
        <meta name="description" content="Apply for our 8-week remote internship program."/>
      </Helmet>
      <div className={`bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 ${isSubmitted ? 'filter blur-sm' : ''}`}>
        <div className="max-w-2xl w-full mx-auto">
          <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Internship Application Form</h1>
              <p className="text-md text-gray-600">Complete the following steps to apply for our 8-week remote internship.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
            <form onSubmit={handleSubmit}>
              {renderStep()}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors">
                    Previous
                  </button>
                )}
                <div className="flex-grow"></div>
                {currentStep < totalSteps ? (
                  <button type="button" onClick={nextStep} className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors">
                    Next
                  </button>
                ) : (
                  <button type="submit" className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {isSubmitted && <ConfirmationPopup onDone={handleDone} />}
    </>
  );
};

export default InternshipPage;
