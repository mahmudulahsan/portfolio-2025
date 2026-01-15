
import { supabase } from '@/lib/supabaseClient';
import { Experience, experiences as initialData } from '../experience';

const TABLE_NAME = 'experiences';

export const experienceService = {
    async getAll(): Promise<(Experience & { id: string })[]> {
        const { data, error } = await supabase.from(TABLE_NAME).select('*');
        if (error) { console.error('Error:', error); return []; }
        return data as (Experience & { id: string })[];
    },
    async create(item: Experience) {
        const { data, error } = await supabase.from(TABLE_NAME).insert(item).select().single();
        if (error) throw error;
        return data;
    },
    async update(id: string, item: Partial<Experience>) {
        const { data, error } = await supabase.from(TABLE_NAME).update(item).eq('id', id).select().single();
        if (error) throw error;
        return data;
    },
    async delete(id: string) {
        const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
        if (error) throw error;
    },
    async seed() {
        const { error } = await supabase.from(TABLE_NAME).insert(initialData);
        if (error) throw error;
    }
};
