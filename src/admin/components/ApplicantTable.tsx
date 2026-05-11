import React, { useState } from 'react';
import { Application } from '../types';
import ApplicantDetailsModal from './ApplicantDetailsModal';
import OfferLetter from './OfferLetter';

interface ApplicantTableProps {
    applications: Application[];
    onStatusChange: (id: number, status: string) => void;
    onDelete: (id: number) => void;
}

const ApplicantTable: React.FC<ApplicantTableProps> = ({ applications, onStatusChange, onDelete }) => {
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [showOfferLetter, setShowOfferLetter] = useState<Application | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<Application | null>(null);

    const handleDelete = (app: Application) => {
        setShowDeleteConfirm(app);
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            onDelete(showDeleteConfirm.id);
            setShowDeleteConfirm(null);
        }
    };

    const handleSendEmail = (email: string, name: string, status: string) => {
        let subject = '';
        let body = '';

        if (status === 'Approved') {
            subject = 'Internship Offer';
            body = `Dear ${name},%0D%0A%0D%0AWe are pleased to offer you an internship position at our company. Congratulations!%0D%0A%0D%0ABest regards,%0D%0AThe HR Team`;
        } else {
            subject = 'Internship Application Update';
            body = `Dear ${name},%0D%0A%0D%0AThank you for your interest in our internship program. We are currently processing your application and will keep you updated on its status.%0D%0A%0D%0ABest regards,%0D%0AThe HR Team`;
        }

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    const renderStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full";
        if (status === 'Approved') return (
            <span className={`${baseClasses} bg-gradient-to-r from-green-400 to-green-500 text-white shadow-sm`}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Approved
            </span>
        );
        if (status === 'Offer Sent') return (
            <span className={`${baseClasses} bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-sm`}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Offer Sent
            </span>
        );
        if (status === 'Rejected') return (
            <span className={`${baseClasses} bg-gradient-to-r from-red-400 to-red-500 text-white shadow-sm`}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Rejected
            </span>
        );
        return (
            <span className={`${baseClasses} bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-sm`}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Pending
            </span>
        );
    };

    if (applications.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl rounded-2xl border border-gray-200">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No applications found</h3>
                <p className="text-lg text-gray-600 mb-6">No applications match the current filter criteria.</p>
                <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-md border border-gray-200">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">Try adjusting your filters</span>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Mobile and Tablet Card View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
                {applications.map(app => (
                    <div key={app.id} className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{app.name}</h3>
                                <p className="text-sm text-gray-600">{app.email}</p>
                            </div>
                            {renderStatusBadge(app.status)}
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                                {app.university}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {app.fieldOfInterest}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {app.phone || 'N/A'}
                            </div>
                        </div>
                        <div className="mb-4">
                            <select
                                value={app.status}
                                onChange={(e) => onStatusChange(app.id, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                            >
                                <option>Pending</option>
                                <option>Approved</option>
                                <option>Offer Sent</option>
                                <option>Rejected</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setSelectedApplication(app)} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                            </button>
                            <button onClick={() => handleSendEmail(app.email, app.name, app.status)} className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </button>
                            {app.status === 'Approved' && (
                                <button onClick={() => setShowOfferLetter(app)} className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Offer
                                </button>
                            )}
                            <button onClick={() => handleDelete(app)} className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th scope="col" className="w-[22%] lg:w-[25%] xl:w-[20%] px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicant</th>
                                <th scope="col" className="w-[20%] lg:w-[20%] xl:w-[18%] px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">University</th>
                                <th scope="col" className="w-[15%] px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">Field</th>
                                <th scope="col" className="w-[18%] lg:w-[15%] xl:w-[15%] px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Phone</th>
                                <th scope="col" className="w-[15%] lg:w-[15%] xl:w-[12%] px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th scope="col" className="w-[25%] lg:w-[25%] xl:w-[20%] px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.map(app => (
                                <tr key={app.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
                                                <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                                    <span className="text-xs lg:text-sm font-medium text-white">{app.name.charAt(0).toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="ml-3 lg:ml-4">
                                                <div className="text-sm font-semibold text-gray-900">{app.name}</div>
                                                <div className="text-xs lg:text-sm text-gray-500">{app.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                            </svg>
                                            <span className="truncate">{app.university}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-600 hidden xl:table-cell">
                                        <div className="flex items-center">
                                            <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            <span className="truncate">{app.fieldOfInterest}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-gray-700 font-medium hidden lg:table-cell">
                                        <div className="flex items-center">
                                            <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            <span className="truncate">{app.phone || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={app.status}
                                            onChange={(e) => onStatusChange(app.id, e.target.value)}
                                            className="block w-full px-2 lg:px-3 py-1 lg:py-2 text-xs lg:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                                        >
                                            <option>Pending</option>
                                            <option>Approved</option>
                                            <option>Offer Sent</option>
                                            <option>Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm font-medium">
                                        <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-1">
                                            <button onClick={() => setSelectedApplication(app)} className="inline-flex items-center justify-center px-2 lg:px-3 py-1 lg:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs lg:text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                                <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View
                                            </button>
                                            <button onClick={() => handleSendEmail(app.email, app.name, app.status)} className="inline-flex items-center justify-center px-2 lg:px-3 py-1 lg:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs lg:text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                                <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Email
                                            </button>
                                            {app.status === 'Approved' && (
                                                <button onClick={() => setShowOfferLetter(app)} className="inline-flex items-center justify-center px-2 lg:px-3 py-1 lg:py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs lg:text-sm font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Offer
                                                </button>
                                            )}
                                            <button onClick={() => handleDelete(app)} className="inline-flex items-center justify-center px-2 lg:px-3 py-1 lg:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs lg:text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                                <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Delete application
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this application? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={confirmDelete}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ApplicantDetailsModal application={selectedApplication} onClose={() => setSelectedApplication(null)} />
            <OfferLetter application={showOfferLetter} onClose={() => setShowOfferLetter(null)} onStatusUpdate={onStatusChange} />
        </>
    );
};

export default ApplicantTable;
