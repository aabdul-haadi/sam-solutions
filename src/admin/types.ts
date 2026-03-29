export interface Application {
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
  