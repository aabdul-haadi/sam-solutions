import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import ApplicantTable from './ApplicantTable';
import { fetchApplications, updateApplicationStatus, deleteApplication } from '../api';
import { Application } from '../types';
import { supabase } from '../../supabaseClient';

interface DashboardProps {
    onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [fieldOfInterestFilter, setFieldOfInterestFilter] = useState<string>('All');

    useEffect(() => {
        const loadApplications = async () => {
            try {
                setLoading(true);
                const data = await fetchApplications();
                setApplications(data);
            } catch (err) {
                setError('Failed to fetch applications.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadApplications();

        const subscription = supabase
            .channel('internship_applications_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'internship_applications' }, payload => {
                if (payload.eventType === 'INSERT') {
                    setApplications(prev => [payload.new as Application, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setApplications(prev => prev.map(app => app.id === payload.new.id ? payload.new as Application : app));
                } else if (payload.eventType === 'DELETE') {
                    setApplications(prev => prev.filter(app => app.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const handleStatusChange = async (id: number, status: string) => {
        try {
            await updateApplicationStatus(id, status);
            setApplications(prevApps =>
                prevApps.map(app => (app.id === id ? { ...app, status } : app))
            );
        } catch (err) {
            setError('Failed to update status.');
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteApplication(id);
            setApplications(prevApps => prevApps.filter(app => app.id !== id));
        } catch (err) {
            setError('Failed to delete application.');
            console.error(err);
        }
    };

    const uniqueFieldsOfInterest = useMemo(() => {
        const fields = new Set(applications.map(app => app.fieldOfInterest));
        return ['All', ...Array.from(fields)];
    }, [applications]);

    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            const statusMatch = statusFilter === 'All' || app.status === statusFilter;
            const fieldMatch = fieldOfInterestFilter === 'All' || app.fieldOfInterest === fieldOfInterestFilter;
            return statusMatch && fieldMatch;
        });
    }, [applications, statusFilter, fieldOfInterestFilter]);

    const statusCounts = useMemo(() => {
        return {
            All: applications.length,
            Pending: applications.filter(app => app.status === 'Pending').length,
            Approved: applications.filter(app => app.status === 'Approved').length,
            'Offer Sent': applications.filter(app => app.status === 'Offer Sent').length,
            Rejected: applications.filter(app => app.status === 'Rejected').length,
        };
    }, [applications]);

    return (
        <AdminLayout>
            <div>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                        {onLogout && (
                            <button
                                onClick={onLogout}
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        )}
                    </div>
                </header>

                <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        {Object.entries(statusCounts).map(([status, count]) => (
                            <div key={status} className="bg-white overflow-hidden shadow rounded-lg cursor-pointer" onClick={() => setStatusFilter(status)}>
                                <div className={`p-5 ${
                                    statusFilter === status ? 'border-b-4 border-indigo-500' : 'border-b-4 border-transparent'
                                }`}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <h3 className="text-lg font-medium text-gray-900">{status}</h3>
                                        </div>
                                        <div className="ml-auto flex-shrink-0">
                                            <p className="text-2xl font-bold text-gray-800">{count}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <label htmlFor="field-filter" className="block text-sm font-medium text-gray-700 mb-2">Filter by Field of Interest:</label>
                        <select
                            id="field-filter"
                            value={fieldOfInterestFilter}
                            onChange={e => setFieldOfInterestFilter(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {uniqueFieldsOfInterest.map(field => (
                                <option key={field}>{field}</option>
                            ))}
                        </select>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <ApplicantTable
                            applications={filteredApplications}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    )}
                </main>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
