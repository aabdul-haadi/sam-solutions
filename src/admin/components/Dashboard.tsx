import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import ApplicantTable from './ApplicantTable';
import { fetchApplications, updateApplicationStatus } from '../api';
import { Application } from '../types';

const Dashboard: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('All');

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

    const filteredApplications = useMemo(() => {
        if (statusFilter === 'All') {
            return applications;
        }
        return applications.filter(app => app.status === statusFilter);
    }, [applications, statusFilter]);

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Internship Applications</h1>
                    <div className="flex items-center">
                        <label htmlFor="status-filter" className="mr-3 text-sm font-medium text-gray-700">Filter by status:</label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                        >
                            <option>All</option>
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                        </select>
                    </div>
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
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
