
import { supabase } from '@/lib/supabaseClient';
import { SkillGroup, skillGroups as initialData } from '../skills';

const TABLE_NAME = 'skills';

export const skillService = {
    async getAll(): Promise<(SkillGroup & { id: string })[]> {
        const { data, error } = await supabase.from(TABLE_NAME).select('*');
        if (error) { console.error('Error:', error); return []; }
        return data as (SkillGroup & { id: string })[];
    },
    async create(item: SkillGroup) {
        const { data, error } = await supabase.from(TABLE_NAME).insert(item).select().single();
        if (error) throw error;
        return data;
    },
    async update(id: string, item: Partial<SkillGroup>) {
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
