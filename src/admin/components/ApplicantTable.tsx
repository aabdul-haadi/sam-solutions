import React from 'react';
import { Application } from '../types';

interface ApplicantTableProps {
  applications: Application[];
  onStatusChange: (id: string, status: 'approved' | 'rejected') => void;
}

const ApplicantTable: React.FC<ApplicantTableProps> = ({ applications, onStatusChange }) => {
  return (
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
          {applications.map((app) => (
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
                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900 mr-4">Resume</a>
                <button onClick={() => onStatusChange(app.id, 'approved')} className="text-green-600 hover:text-green-900 mr-2">Approve</button>
                <button onClick={() => onStatusChange(app.id, 'rejected')} className="text-red-600 hover:text-red-900">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantTable;
