import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Interfaces
interface FormData {
    name: string;
    email: string;
    phone: string;
    university: string;
    yearOfStudy: string;
    fieldOfInterest: string;
    cv: File | null;
    cover_letter: string;
}

// Main Component
const InternshipPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '', email: '', phone: '', university: '', yearOfStudy: '',
        fieldOfInterest: '', cv: null, cover_letter: ''
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [cvOption, setCvOption] = useState<'upload' | 'generate' | null>(null);
    const [showCvPreview, setShowCvPreview] = useState(false);
    const [cvPreviewUrl, setCvPreviewUrl] = useState('');
    const navigate = useNavigate();

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({ ...prev, cv: e.target.files[0] }));
            if (errors.cv) setErrors(prev => ({ ...prev, cv: undefined }));
        }
    };

    const generateAndPreviewPdf = () => {
        const doc = generatePdfDoc();
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        setCvPreviewUrl(url);
        setShowCvPreview(true);
    };
    
    const generatePdfDoc = () => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("Internship Application", 14, 22);
        doc.setFontSize(16);
        doc.text(formData.name, 14, 32);
        autoTable(doc, {
            startY: 40,
            head: [['Field', 'Details']],
            body: [
                ['Email', formData.email],
                ['Phone', formData.phone],
                ['University', formData.university],
                ['Year of Study', formData.yearOfStudy],
                ['Field of Interest', formData.fieldOfInterest],
            ],
            theme: 'striped', headStyles: { fillColor: [255, 193, 7] },
        });
        if(formData.cover_letter) {
            const splitCoverLetter = doc.splitTextToSize(formData.cover_letter, 180);
            const pageHeight = doc.internal.pageSize.height;
            let y = (doc as any).lastAutoTable.finalY + 15;
            doc.setFontSize(18);
            doc.text("Cover Letter", 14, y);
            y += 10;
            doc.setFontSize(12);
            splitCoverLetter.forEach((line: string) => {
                if (y > pageHeight - 10) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(line, 14, y);
                y += 7;
            });
        }
        return doc;
    };

    // Navigation & Submission
    const validateStep = () => {
        const newErrors: Partial<FormData> = {};
        if (currentStep === 1) {
            if (!formData.name) newErrors.name = 'Name is required';
            if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
            if (!formData.phone) newErrors.phone = 'Phone number is required';
        } else if (currentStep === 2) {
            if (!formData.university) newErrors.university = 'University is required';
            if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required';
            if (!formData.fieldOfInterest) newErrors.fieldOfInterest = 'Field of interest is required';
        } else if (currentStep === 3 && cvOption === 'upload' && !formData.cv) {
            newErrors.cv = 'CV is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => validateStep() && setCurrentStep(s => s + 1);
    const prevStep = () => setCurrentStep(s => s - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;

        setIsSubmitting(true);
        setSubmissionError(null);
        
        try {
            let cvUrl = '';
            let cvFile = formData.cv;

            if (cvOption === 'generate') {
                const pdfBlob = generatePdfDoc().output('blob');
                cvFile = new File([pdfBlob], `Quick_CV_${formData.name.replace(/ /g, '_')}.pdf`, { type: 'application/pdf' });
            }

            if (cvFile) {
                const filePath = `${formData.email}/${Date.now()}_${cvFile.name}`;
                const { error: uploadError } = await supabase.storage.from('cvs').upload(filePath, cvFile, { upsert: true });
                if (uploadError) throw uploadError;
                const { data } = supabase.storage.from('cvs').getPublicUrl(filePath);
                cvUrl = data?.publicUrl || '';
            }

            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                university: formData.university,
                yearOfStudy: formData.yearOfStudy,
                fieldOfInterest: formData.fieldOfInterest,
                cv_url: cvUrl,
                status: 'Pending', // Add this line
            };

            const { error: insertError } = await supabase.from('internship_applications').insert([submissionData]);
            if (insertError) throw insertError;

            setShowConfirmation(true);
            setTimeout(() => navigate('/'), 3000);
        } catch (error: any) {
            console.error('Submission Error:', error);
            setSubmissionError(`Submission failed. Please try again or email your CV to info@sam-solutions.com.`);
        }

        setIsSubmitting(false);
    };

    // UI Components
    const steps = ['Personal', 'Academics', 'Submission'];

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Internship Application</h1>
                    <p className="mt-2 text-base text-gray-600">Complete the {steps.length} steps to build your future with us.</p>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between items-center w-full max-w-sm mx-auto mb-8">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep > index ? 'bg-yellow-400' : 'bg-gray-200'} ${currentStep === index + 1 ? 'ring-4 ring-yellow-200' : ''}`}>
                                    {currentStep > index + 1 ? '✓' : index + 1}
                                </div>
                                <p className={`mt-2 text-xs sm:text-sm font-medium ${currentStep >= index + 1 ? 'text-gray-800' : 'text-gray-400'}`}>{step}</p>
                            </div>
                            {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${currentStep > index + 1 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, type: 'tween' }}>
                                {currentStep === 1 && <Step1 formData={formData} errors={errors} onChange={handleInputChange} />}
                                {currentStep === 2 && <Step2 formData={formData} errors={errors} onChange={handleInputChange} />}
                                {currentStep === 3 && <Step3 formData={formData} errors={errors} onChange={handleInputChange} onFileChange={handleFileChange} cvOption={cvOption} setCvOption={setCvOption} onGeneratePreview={generateAndPreviewPdf} />}
                            </motion.div>
                        </AnimatePresence>
                        
                        <div className="flex justify-between items-center mt-8">
                            <button type="button" onClick={prevStep} className={`px-5 py-2.5 text-base font-medium rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}>
                                Back
                            </button>
                            {currentStep < steps.length ? (
                                <button type="button" onClick={nextStep} className="px-7 py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-amber-700 transition-all shadow-md hover:shadow-lg">
                                    Next
                                </button>
                            ) : (
                                <button type="submit" disabled={isSubmitting || !cvOption} className="px-7 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-md hover:shadow-lg">
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            )}
                        </div>
                        {submissionError && (
                            <div className="mt-4 text-center text-red-600 bg-red-50 p-3 rounded-lg">
                                <p>{submissionError.split(' or ')[0]} or <a href="mailto:info@samcreative-solutions.com" className="font-semibold underline">{submissionError.split(' or ')[1]}</a></p>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <ConfirmationModal show={showConfirmation} />
            <CvPreviewModal show={showCvPreview} url={cvPreviewUrl} onClose={() => setShowCvPreview(false)} onExport={() => generatePdfDoc().save(`CV_${formData.name}.pdf`)} />
        </div>
    );
};

// Step Components
const Step1 = ({ formData, errors, onChange }: any) => (
    <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
        <FormInput name="name" label="Full Name" value={formData.name} onChange={onChange} error={errors.name} placeholder="e.g., John Doe" />
        <FormInput name="email" label="Email Address" type="email" value={formData.email} onChange={onChange} error={errors.email} placeholder="e.g., john.doe@example.com" />
        <FormInput name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={onChange} error={errors.phone} placeholder="e.g., +1 234 567 890" />
    </div>
);

const Step2 = ({ formData, errors, onChange }: any) => (
    <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Academics & Interests</h3>
        <FormInput name="university" label="University" value={formData.university} onChange={onChange} error={errors.university} placeholder="e.g., Stanford University" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormSelect name="yearOfStudy" label="Year of Study" value={formData.yearOfStudy} onChange={onChange} error={errors.yearOfStudy} options={[
                { value: '1', label: '1st Year' }, { value: '2', label: '2nd Year' }, { value: '3', label: '3rd Year' }, { value: '4', label: '4th Year' }, { value: 'graduate', label: 'Graduate' }
            ]} />
            <FormSelect name="fieldOfInterest" label="Field of Interest" value={formData.fieldOfInterest} onChange={onChange} error={errors.fieldOfInterest} options={[
                { value: 'FE', label: 'Frontend Engineering (FE)' },
                { value: 'BE', label: 'Backend Architecture (BE)' },
                { value: 'AI/ML', label: 'AI & Machine Learning (AI/ML)' },
                { value: 'GVE', label: 'Graphics & Video Editing (GVE)' },
                { value: 'SEO/CS', label: 'SEO & Content Strategy (SEO/CS)' },
            ]} />
        </div>
    </div>
);

const Step3 = ({ onFileChange, cvOption, setCvOption, onGeneratePreview }: any) => (
    <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Submit Your Application</h3>
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center"><div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>Your CV *</label>
            <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => setCvOption('upload')} className={`w-full text-center px-4 py-3 rounded-xl border-2 transition-all font-semibold ${cvOption === 'upload' ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-300'}`}>Upload CV</button>
                <button type="button" onClick={() => { setCvOption('generate'); onGeneratePreview(); }} className={`w-full text-center px-4 py-3 rounded-xl border-2 transition-all font-semibold ${cvOption === 'generate' ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-300'}`}>Generate & Preview</button>
            </div>
            {cvOption === 'upload' && (
                <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} className="pt-3">
                    <input id="cv" name="cv" onChange={onFileChange} type="file" accept=".pdf,.docx,.doc" className="w-full text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200 transition-colors" />
                </motion.div>
            )}
        </div>
    </div>
);

// Reusable Form Components
const FormInput = ({ name, label, error, ...props }: any) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 flex items-center"><div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>{label} *</label>
        <input id={name} name={name} {...props} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all bg-white hover:border-yellow-300" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

const FormSelect = ({ name, label, error, options, ...props }: any) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 flex items-center"><div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>{label} *</label>
        <select id={name} name={name} {...props} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all bg-white hover:border-yellow-300 appearance-none">
            <option value="">Select...</option>
            {options.map((opt: any, i: number) => <option key={i} value={opt.value}>{opt.label}</option>)}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

// Modal Components
const ConfirmationModal = ({ show }: { show: boolean }) => (
    <AnimatePresence>
        {show && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-auto">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}>
                        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-4">Application Submitted!</h2>
                    <p className="text-gray-600 mt-2">Thank you! We'll review your application and be in touch shortly.</p>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

const CvPreviewModal = ({ show, url, onClose, onExport }: { show: boolean; url: string; onClose: () => void; onExport: () => void; }) => (
    <AnimatePresence>
        {show && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-full max-h-[90vh] flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="font-bold text-lg">CV Preview</h3>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">X</button>
                    </div>
                    <div className="flex-1 p-2 bg-gray-100">
                        <iframe src={url} className="w-full h-full border-0" title="CV Preview"></iframe>
                    </div>
                    <div className="p-4 border-t flex justify-end gap-3">
                         <button onClick={onClose} className="px-6 py-2.5 border border-gray-300 font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-100 transition-colors">Close</button>
                         <button onClick={onExport} className="px-6 py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all">Export PDF</button>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default InternshipPage;
