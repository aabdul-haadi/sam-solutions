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
  const [cvOption, setCvOption] = useState('upload');

  const totalSteps = 4;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
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
    console.log(formData);
    setIsSubmitted(true);
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
              <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name *" required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address *" required type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number *" required type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <input name="dob" value={formData.dob} onChange={handleInputChange} required type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
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
                    <input name="university" value={formData.university} onChange={handleInputChange} placeholder="University/College *" required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    <select name="program" value={formData.program} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="">Select Program</option>
                        <option value="BSCS">BSCS</option>
                        <option value="BSSE">BSSE</option>
                        <option value="BSAI">BSAI</option>
                        <option value="other">Other</option>
                    </select>
                    <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="">Year of Study</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                        <option value="graduate">Graduate</option>
                    </select>
                    <select name="fieldOfInterest" value={formData.fieldOfInterest} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="">Select Field of Interest</option>
                        <option value="frontend">Frontend Development</option>
                        <option value="backend">Backend Development</option>
                        <option value="ai_ml">AI & ML</option>
                        <option value="social_media">Social Media & Graphics</option>
                        <option value="seo">SEO & Content Writing</option>
                    </select>
                    <textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Skills (e.g., React, Node.js, Python) *" required rows={4} className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
                </div>
            </div>
        );
      case 3:
        return (
          <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Step 3: Experience & Motivation</h2>
             <div className="space-y-6">
                <textarea name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Previous Experience (Optional)" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
                <textarea name="motivation" value={formData.motivation} onChange={handleInputChange} placeholder="Why are you interested in this internship? *" required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
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
                    </div>
                ) : (
                    <div>
                        <div id="cv-preview" className="p-6 border rounded-lg bg-gray-50">
                           <h2 className="text-2xl font-bold">{formData.fullName}</h2>
                            <p>{formData.email} | {formData.phone}</p>
                            <hr className="my-4" />
                            <h3 className="text-lg font-semibold">Education</h3>
                            <p>{formData.program} at {formData.university} ({formData.yearOfStudy})</p>
                            <hr className="my-4" />
                            <h3 className="text-lg font-semibold">Skills</h3>
                            <p>{formData.skills}</p>
                            <hr className="my-4" />
                            <h3 className="text-lg font-semibold">Experience</h3>
                            <p>{formData.experience}</p>
                             <hr className="my-4" />
                            <h3 className="text-lg font-semibold">Motivation</h3>
                            <p>{formData.motivation}</p>
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
        <meta name="description" content="Apply for our remote internship program."/>
      </Helmet>
      <div className={`bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 ${isSubmitted ? 'filter blur-sm' : ''}`}>
        <div className="max-w-2xl w-full mx-auto">
          <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Internship Configurator</h1>
              <p className="text-md text-gray-600">Complete the following steps to apply.</p>
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
