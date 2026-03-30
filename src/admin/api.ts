
export const getApplicants = async () => {
  return Promise.resolve([
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Frontend Development',
      university: 'University of Example',
      dateOfApplication: '2024-01-01',
      resume: 'https://example.com/resume.pdf',
      quickCV: 'https://example.com/quick-cv.pdf',
      status: 'Pending',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Backend Development',
      university: 'Example University',
      dateOfApplication: '2024-01-02',
      resume: 'https://example.com/resume.pdf',
      quickCV: 'https://example.com/quick-cv.pdf',
      status: 'Approved',
    },
    {
        id: 3,
        fullName: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        role: 'AI & ML',
        university: 'Tech University',
        dateOfApplication: '2024-01-03',
        resume: 'https://example.com/resume.pdf',
        quickCV: 'https://example.com/quick-cv.pdf',
        status: 'Rejected',
      },
  ]);
};
