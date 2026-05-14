import React, { useState, useEffect, useRef } from 'react';
import { Application } from '../types';
import { generatePdfFromElement } from '../utils/pdfGenerator';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

interface OfferLetterProps {
    application: Application | null;
    onClose: () => void;
    onStatusUpdate?: (id: number, status: string) => void;
}

const OfferLetter: React.FC<OfferLetterProps> = ({ application, onClose, onStatusUpdate }) => {
    const [hiringManager, setHiringManager] = useState('SAM CREATIVE SOLUTIONS');
    const [letterContent, setLetterContent] = useState('');
    const [emailSubject, setEmailSubject] = useState('Internship Offer - SAM Creative Solutions');
    const [emailBody, setEmailBody] = useState('');
    const [isSending, setIsSending] = useState(false);
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
            setEmailBody(`Dear ${application.name},\n\nCongratulations! We are thrilled to offer you an internship at ${companyName}. Please find your official offer letter attached.\n\nBest regards,\nThe ${companyName} Team`);
        }
    }, [application, hiringManager]);

    if (!application) return null;

    const handleDownload = async () => {
        if (letterPreviewRef.current && application) {
            await generatePdfFromElement(letterPreviewRef.current, application.name);
        }
    };

    const handleSendEmail = async () => {
        if (!application || !letterPreviewRef.current) return;
        setIsSending(true);
        try {
            const blob = await generatePdfFromElement(letterPreviewRef.current);
            const formData = new FormData();
            formData.append('to', application.email);
            formData.append('subject', emailSubject);
            formData.append('body', emailBody);
            formData.append('attachment', blob, `${application.name}_Offer_Letter.pdf`);

            const response = await fetch('http://localhost:3001/api/send-email', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                if (onStatusUpdate) {
                    onStatusUpdate(application.id, 'Offer Sent');
                }
                alert('Email sent securely to ' + application.email);
                onClose();
            } else {
                alert('Backend Error: ' + result.error);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to connect to backend server. Make sure you run `npm run serve`.');
        } finally {
            setIsSending(false);
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

                        <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                            <h4 className="text-sm font-bold text-blue-800 mb-3">Email Configuration</h4>
                            <div className="mb-3">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                                <input type="text" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Body (Plain Text)</label>
                                <textarea value={emailBody} onChange={e => setEmailBody(e.target.value)} rows={4} className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-indigo-500" />
                                <p className="text-xs text-gray-500 mt-1">The PDF visible on the right will automatically be attached to this email.</p>
                            </div>
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
                                <img src="/black-icon-sam.png" alt="Company Logo" className="h-12 w-12 mr-4"/>
                                <h1 className="text-2xl font-bold text-gray-800">{companyName}</h1>
                           </div>
                           <div dangerouslySetInnerHTML={{ __html: letterContent }} />
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                        onClick={handleDownload}
                        className="px-6 py-2.5 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={handleSendEmail}
                        disabled={isSending}
                        className={`px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSending ? 'Securely Sending...' : 'Direct Send Email'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferLetter;        
