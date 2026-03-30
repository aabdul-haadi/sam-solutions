import React from 'react';
import { Application } from '../types';
import { generatePdf } from '../utils/pdfGenerator';

interface OfferLetterProps {
    application: Application | null;
    onClose: () => void;
}

const OfferLetter: React.FC<OfferLetterProps> = ({ application, onClose }) => {
    if (!application) {
        return null;
    }

    const handleDownload = async () => {
        if (application) {
            await generatePdf(application);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform scale-95 hover:scale-100 transition-transform duration-300">
                <div className="px-8 py-5 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Internship Offer</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-10 max-h-[75vh] overflow-y-auto bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Left Column */}
                        <div className="md:col-span-1 pr-8 border-r border-gray-200">
                            <div className="mb-10">
                                <img src="/logo.png" alt="Company Logo" className="w-32 mx-auto mb-6"/>
                                <h3 className="text-xl font-extrabold text-center text-gray-900">[Your Company Name]</h3>
                                <p className="text-sm text-center text-gray-500 mt-2">[Your Company Address]<br/>[Your Company Website]</p>
                            </div>
                            <div className="text-sm text-gray-600">
                                <p className="font-bold text-gray-800 mb-3">Key Information:</p>
                                <p className="mb-2"><strong>Position:</strong> {application.fieldOfInterest}</p>
                                <p className="mb-2"><strong>Start Date:</strong> [Start Date]</p>
                                <p className="mb-2"><strong>Supervisor:</strong> [Supervisor Name]</p>
                                <p><strong>Type:</strong> [Full-time/Part-time] Internship</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:col-span-2">
                            <div className="prose max-w-none text-gray-700">
                                <p className="text-sm text-gray-500 mb-6">Date: {new Date().toLocaleDateString()}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Dear {application.name},</h3>
                                <p>We are delighted to formally offer you an internship position as a <strong>{application.fieldOfInterest}</strong> at <strong>[Your Company Name]</strong>. Your impressive background, skills, and enthusiasm have set you apart, and we are thrilled at the prospect of you joining our team.</p>
                                <p>This internship is designed to be a challenging and rewarding experience. You will have the opportunity to work on meaningful projects, develop your professional skills, and make a tangible impact. We are confident that you will be a valuable asset to our company.</p>
                                <p>A comprehensive onboarding process is planned to ensure your smooth integration into our team and projects. We are committed to providing you with the support and mentorship you need to succeed.</p>
                                <p>We look forward to welcoming you. Please don't hesitate to reach out if you have any questions.</p>
                                
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <p className="font-semibold">Sincerely,</p>
                                    <p className="mt-6"><strong>The [Your Company Name] Team</strong></p>
                                    <p className="text-sm text-gray-500">[Hiring Manager Name/Title]</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-5 bg-white border-t border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-500">This offer is valid until [Expiry Date].</p>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
                        >
                            Close
                        </button>
                        <button 
                            onClick={handleDownload}
                            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                        >
                            <svg className="-ml-1 mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferLetter;
