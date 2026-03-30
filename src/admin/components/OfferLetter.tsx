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
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform scale-95 hover:scale-100 transition-transform duration-300">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Offer Letter Preview</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto">
                    <div className="prose max-w-none text-gray-700">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-extrabold text-gray-900">[Your Company Name]</h1>
                            <p className="text-sm text-gray-500">[Your Company Address] | [Your Company Website]</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Internship Offer</h2>

                        <p className="mb-4"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        <p className="mb-6"><strong>To:</strong> {application.name}</p>

                        <p>Dear {application.name},</p>
                        <p>We are absolutely delighted to formally offer you an internship position as a <strong>{application.fieldOfInterest}</strong> at <strong>[Your Company Name]</strong>. Your background, skills, and enthusiasm have distinguished you from a competitive pool of applicants, and we are excited about the prospect of you joining our team.</p>
                        <p>This is a <strong>[Full-time/Part-time]</strong> internship that is scheduled to begin on <strong>[Start Date]</strong>. You will be reporting to <strong>[Supervisor Name]</strong> at our office located at <strong>[Location]</strong>. We have planned a comprehensive onboarding process to ensure you are well-integrated into our team and projects from day one.</p>
                        <p>We believe this internship will provide you with a challenging and rewarding experience, offering you the opportunity to work on meaningful projects and develop your professional skills. We are confident that your contributions will be valuable to our company's success.</p>
                        <p>We look forward to welcoming you to our team. Please do not hesitate to reach out if you have any questions.</p>
                        
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <p className="font-semibold">Sincerely,</p>
                            <p className="mt-4"><strong>The [Your Company Name] Team</strong></p>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end items-center space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
                    >
                        Cancel
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
    );
};

export default OfferLetter;
