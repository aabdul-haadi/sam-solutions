export interface Application {
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone?: string;
    dob?: string;
    gender?: string;
    degreeProgram?: string;
    university?: string;
    yearOfStudy?: string;
    fieldOfInterest?: string;
    skills?: string;
    experience?: string;
    startDate?: string;
    cv_url: string;
    status: string;
}
