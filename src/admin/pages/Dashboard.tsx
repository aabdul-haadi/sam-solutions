import React, { useState, useEffect } from 'react';
import { getApplicants } from '../api';

const Dashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'dateOfApplication', direction: 'desc' });

  useEffect(() => {
    const fetchApplicants = async () => {
      const data = await getApplicants();
      setApplicants(data);
      setFilteredApplicants(data);
    };
    fetchApplicants();
  }, []);

  useEffect(() => {
    let filtered = applicants;

    if (searchTerm) {
      filtered = filtered.filter(
        (applicant) =>
          applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter((applicant) => applicant.role === roleFilter);
    }

    setFilteredApplicants(filtered);
  }, [searchTerm, roleFilter, applicants]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredApplicants].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredApplicants(sorted);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 px-3 py-2 border rounded-lg"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-1/3 px-3 py-2 border rounded-lg"
        >
          <option value="">Filter by role</option>
          <option value="Frontend Development">Frontend Development</option>
          <option value="Backend Development">Backend Development</option>
          <option value="AI & ML">AI & ML</option>
          <option value="Social Media & Graphics">Social Media & Graphics</option>
          <option value="SEO & Content Writing">SEO & Content Writing</option>
        </select>
      </div>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('fullName')}>Full Name</th>
            <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('email')}>Email</th>
            <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('role')}>Role</th>
            <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('dateOfApplication')}>Date of Application</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant) => (
            <tr key={applicant.id} className="border-b">
              <td className="p-4">{applicant.fullName}</td>
              <td className="p-4">{applicant.email}</td>
              <td className="p-4">{applicant.role}</td>
              <td className="p-4">{applicant.dateOfApplication}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${{
                    Approved: 'bg-green-200 text-green-800',
                    Rejected: 'bg-red-200 text-red-800',
                    Pending: 'bg-blue-200 text-blue-800',
                  }[applicant.status]}`}>
                  {applicant.status}
                </span>
              </td>
              <td className="p-4">
                <button className="text-blue-500 hover:underline">View</button>
                <button className="text-green-500 hover:underline ml-4">Approve</button>
                <button className="text-red-500 hover:underline ml-4">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
