
import { supabase } from '@/lib/supabaseClient';
import { Research, researchItems as initialData } from '../research';

const TABLE_NAME = 'research';

export const researchService = {
    async getAll(): Promise<(Research & { id: string })[]> {
        const { data, error } = await supabase.from(TABLE_NAME).select('*');
        if (error) { console.error('Error:', error); return []; }
        return data as (Research & { id: string })[];
    },
    async create(item: Research) {
        const { data, error } = await supabase.from(TABLE_NAME).insert(item).select().single();
        if (error) throw error;
        return data;
    },
    async update(id: string, item: Partial<Research>) {
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
