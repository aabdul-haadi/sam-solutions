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
        const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
        if (status === 'Approved') return `${baseClasses} bg-green-100 text-green-800`;
        if (status === 'Offer Sent') return `${baseClasses} bg-purple-100 text-purple-800`;
        if (status === 'Rejected') return `${baseClasses} bg-red-100 text-red-800`;
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    };

    if (applications.length === 0) {
        return (
            <div className="text-center py-12 px-4 bg-white shadow-lg rounded-xl">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                <p className="mt-1 text-sm text-gray-500">No applications match the current filter.</p>
            </div>
        );
    }

    return (
        <>
            {/* Mobile and Tablet Card View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {applications.map(app => (
                    <div key={app.id} className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                                <span className={renderStatusBadge(app.status)}>{app.status}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{app.university}</p>
                            <p className="text-sm text-gray-500 mt-1">{app.fieldOfInterest}</p>
                            <p className="text-sm font-medium text-gray-700 mt-1">{app.phone || 'N/A'}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                             <div className="mb-4">
                                 <select
                                    value={app.status}
                                    onChange={(e) => onStatusChange(app.id, e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                                >
                                     <option>Pending</option>
                                    <option>Approved</option>
                                    <option>Offer Sent</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button onClick={() => setSelectedApplication(app)} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-sm">View</button>
                                <button onClick={() => handleSendEmail(app.email, app.name, app.status)} className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-all text-sm">Email</button>
                                {app.status === 'Approved' && (
                                    <button onClick={() => setShowOfferLetter(app)} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-all text-sm">Offer</button>
                                )}
                                <button onClick={() => handleDelete(app)} className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-all text-sm">Delete</button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white shadow-xl rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field of Interest</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map(app => (
                            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                    <div className="text-sm text-gray-500">{app.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.university}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.fieldOfInterest}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{app.phone || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={app.status}
                                        onChange={(e) => onStatusChange(app.id, e.target.value)}
                                        className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                                    >
                                         <option>Pending</option>
                                        <option>Approved</option>
                                        <option>Offer Sent</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => setSelectedApplication(app)} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-all">View</button>
                                    <button onClick={() => handleSendEmail(app.email, app.name, app.status)} className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-all">Email</button>
                                    {app.status === 'Approved' && (
                                        <button onClick={() => setShowOfferLetter(app)} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-all">Offer Letter</button>
                                    )}
                                    <button onClick={() => handleDelete(app)} className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-all">Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
