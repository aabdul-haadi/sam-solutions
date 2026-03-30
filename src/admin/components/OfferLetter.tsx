import React, { useState, useEffect, useRef } from 'react';
import { Application } from '../types';
import { generatePdfFromElement } from '../utils/pdfGenerator';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

interface OfferLetterProps {
    application: Application | null;
    onClose: () => void;
}

const OfferLetter: React.FC<OfferLetterProps> = ({ application, onClose }) => {
    const [hiringManager, setHiringManager] = useState('SAM CREATIVE SOLUTIONS');
    const [letterContent, setLetterContent] = useState('');
    const letterPreviewRef = useRef<HTMLDivElement>(null);

    const companyName = "SAM CREATIVE SOLUTIONS";

    useEffect(() => {
        if (application) {
            const today = new Date().toLocaleDateString('en-GB');
            const template = `
                <p>Date: ${today}</p>
                <br>
                <p>Dear <strong>${application.name}</strong>,</p>
                <p>We are delighted to formally offer you an 8-week unpaid internship position as a <strong>${application.fieldOfInterest}</strong> at <strong>${companyName}</strong>. Your impressive background, skills, and enthusiasm have set you apart, and we are thrilled at the prospect of you joining our team.</p>
                <p>This internship is designed to be a challenging and rewarding experience. You will have the opportunity to work on meaningful projects, develop your professional skills, and make a tangible impact. We are confident that you will be a valuable asset to our company.</p>
                <p>A comprehensive onboarding process is planned to ensure your smooth integration into our team and projects. We are committed to providing you with the support and mentorship you need to succeed.</p>
                <p>We look forward to welcoming you. Please don't hesitate to reach out if you have any questions.</p>
                <br>
                <p>Sincerely,</p>
                <p><strong>The ${companyName} Team</strong></p>
                <p><strong>${hiringManager}</strong></p>
            `;
            setLetterContent(template);
        }
    }, [application, hiringManager]);

    if (!application) return null;

    const handleDownload = () => {
        if (letterPreviewRef.current) {
            generatePdfFromElement(letterPreviewRef.current, application.name);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl flex flex-col" style={{ height: '90vh' }}>
                <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">Live Offer Letter Editor</h3>
                    <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-700">&times;</button>
                </div>

                <div className="flex-grow flex overflow-hidden">
                    {/* Left Bar for Controls */}
                    <div className="w-1/3 p-6 overflow-y-auto border-r border-gray-200 bg-gray-50">
                        <h4 className="text-md font-semibold text-gray-800 mb-4">Controls</h4>
                        <div className="mb-6">
                            <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-2">Hiring Manager/Title</label>
                            <input
                                type="text"
                                id="hiringManager"
                                value={hiringManager}
                                onChange={(e) => setHiringManager(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 outline-none"
                                placeholder="e.g., Jane Doe, HR Manager"
                            />
                        </div>
                        <div>
                             <h4 className="text-md font-semibold text-gray-800 mb-2">Letter Content</h4>
                             <ReactQuill 
                                theme="snow"
                                value={letterContent}
                                onChange={setLetterContent}
                                className="bg-white"
                             />
                        </div>
                    </div>

                    {/* Right Bar for Live Preview */}
                    <div className="w-2/3 p-8 overflow-y-auto bg-white" >
                        <div ref={letterPreviewRef} className="p-8 border border-gray-200 rounded-md shadow-lg bg-white">
                           <div className="flex items-center mb-12">
                                <img src="/black-icon-sam.webp" alt="Company Logo" className="h-12 w-12 mr-4"/>
                                <h1 className="text-2xl font-bold text-gray-800">{companyName}</h1>
                           </div>
                           <div dangerouslySetInnerHTML={{ __html: letterContent }} />
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={handleDownload}
                        className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferLetter;        
