import { supabase } from '../supabaseClient';
import { Application } from './types';

export const fetchApplications = async (): Promise<Application[]> => {
    const { data, error } = await supabase
        .from('internship_applications')
        .select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data as Application[];
};

export const updateApplicationStatus = async (id: number, status: string): Promise<void> => {
    const { error } = await supabase
        .from('internship_applications')
        .update({ status })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
};
