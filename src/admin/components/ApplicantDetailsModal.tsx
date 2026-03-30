import React from 'react';
import { Application } from '../types';

interface ApplicantDetailsModalProps {
    application: Application | null;
    onClose: () => void;
}

const ApplicantDetailsModal: React.FC<ApplicantDetailsModalProps> = ({ application, onClose }) => {
    if (!application) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform scale-95 hover:scale-100 transition-transform duration-300">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Applicant Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Name</label>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{application.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="mt-1 text-gray-800">{application.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Phone</label>
                                <p className="mt-1 text-gray-800">{application.phone}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">University</label>
                                <p className="mt-1 text-gray-800">{application.university}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Year of Study</label>
                                <p className="mt-1 text-gray-800">{application.yearOfStudy}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Field of Interest</label>
                                <p className="mt-1 text-gray-800">{application.fieldOfInterest}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">CV/Resume</label>
                            <div className="mt-1">
                                <a href={application.cv_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    View CV
                                    <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Submitted At</label>
                            <p className="mt-1 text-gray-800">{new Date(application.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 rounded-b-xl text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicantDetailsModal;
