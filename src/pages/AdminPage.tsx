import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';

interface Application {
  id: string;
  fullName: string;
  email: string;
  fieldOfInterest: string;
  university: string;
  yearOfStudy: string;
  applicationDate: string;
  resumeUrl: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('applicationDate');
  const [search, setSearch] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setError('');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to authentication server');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
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
    }
  }, [isLoggedIn]);

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

  if (!isLoggedIn) {
    return (
      <>
        <Helmet><title>Admin Login - Sam Solutions</title></Helmet>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-200">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="text-center">
                <button type="submit" className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300">Login</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Admin Dashboard - Sam Solutions</title></Helmet>
      <div className="bg-gray-50 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
                <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
            </div>
            <div className="flex space-x-4">
              <div>
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700">Filter by Role</label>
                <select id="filter" value={filter} onChange={e => setFilter(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="all">All</option>
                  <option value="frontend">Frontend Dev</option>
                  <option value="backend">Backend Dev</option>
                  <option value="ai_ml">AI & ML</option>
                  <option value="social_media_graphics">Social Media & Graphics</option>
                  <option value="seo_content_writing">SEO & Content Writing</option>
                </select>
              </div>
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort by</label>
                <select id="sort" value={sort} onChange={e => setSort(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="applicationDate">Date</option>
                  <option value="fullName">Name</option>
                  <option value="fieldOfInterest">Role</option>
                </select>
              </div>
              <button onClick={exportToCSV} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300">Export to CSV</button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year of Study</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedApplications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{app.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.fieldOfInterest}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.university}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.yearOfStudy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(app.applicationDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">Resume</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
