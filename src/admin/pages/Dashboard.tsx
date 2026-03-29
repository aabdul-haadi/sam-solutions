import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from '../components/AdminLayout';
import ApplicantTable from '../components/ApplicantTable';
import { Application } from '../types';

const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('applicationDate');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/applications');
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error('Failed to fetch applications');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();

    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => console.log('WebSocket connected');
    ws.onmessage = (event) => setApplications(JSON.parse(event.data));
    ws.onclose = () => console.log('WebSocket disconnected');
    ws.onerror = (error) => console.error('WebSocket error:', error);

    return () => ws.close();
  }, []);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`http://localhost:3001/api/applications/${id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        console.error('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const filteredAndSortedApplications = useMemo(() => {
    let filtered = applications;

    if (search) {
        filtered = filtered.filter(app => 
            app.fullName.toLowerCase().includes(search.toLowerCase()) ||
            app.email.toLowerCase().includes(search.toLowerCase()) ||
            app.fieldOfInterest.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (filter !== 'all') {
      filtered = filtered.filter(app => app.fieldOfInterest === filter);
    }

    return filtered.sort((a, b) => {
      if (sort === 'fullName') return a.fullName.localeCompare(b.fullName);
      if (sort === 'fieldOfInterest') return a.fieldOfInterest.localeCompare(b.fieldOfInterest);
      return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
    });
  }, [applications, filter, sort, search]);

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'Role', 'University', 'Year of Study', 'Date', 'Status', 'Resume URL'];
    const rows = filteredAndSortedApplications.map(app => 
      [app.fullName, app.email, app.fieldOfInterest, app.university, app.yearOfStudy, new Date(app.applicationDate).toLocaleDateString(), app.status, app.resumeUrl].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Applicants</h2>
            <button onClick={exportToCSV} className="px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300">
                Export to CSV
            </button>
        </div>
        <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
                <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full p-3 text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" />
            </div>
            <div className="flex space-x-4">
              <div>
                <label htmlFor="filter" className="text-sm font-bold text-gray-600 block">Filter by Role</label>
                <select id="filter" value={filter} onChange={e => setFilter(e.target.value)} className="w-full p-3 mt-1 text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300">
                  <option value="all">All</option>
                  <option value="frontend">Frontend Dev</option>
                  <option value="backend">Backend Dev</option>
                  <option value="ai_ml">AI & ML</option>
                  <option value="social_media_graphics">Social Media & Graphics</option>
                  <option value="seo_content_writing">SEO & Content Writing</option>
                </select>
              </div>
              <div>
                <label htmlFor="sort" className="text-sm font-bold text-gray-600 block">Sort by</label>
                <select id="sort" value={sort} onChange={e => setSort(e.target.value)} className="w-full p-3 mt-1 text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300">
                  <option value="applicationDate">Date</option>
                  <option value="fullName">Name</option>
                  <option value="fieldOfInterest">Role</option>
                </select>
              </div>
            </div>
        </div>
      <ApplicantTable applications={filteredAndSortedApplications} onStatusChange={handleStatusChange} />
    </AdminLayout>
  );
};

export default Dashboard;
