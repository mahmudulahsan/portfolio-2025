
import { supabase } from '@/lib/supabaseClient';
import { Achievement, achievements as initialData } from '../achievements';

const TABLE_NAME = 'achievements';

export const achievementService = {
    async getAll(): Promise<Achievement[]> {
        const { data, error } = await supabase.from(TABLE_NAME).select('*');
        if (error) { console.error('Error:', error); return []; }
        return data as Achievement[];
    },
    async create(item: Achievement) {
        const { data, error } = await supabase.from(TABLE_NAME).insert(item).select().single();
        if (error) throw error;
        return data;
    },
    async update(id: string, item: Partial<Achievement>) {
        const { data, error } = await supabase.from(TABLE_NAME).update(item).eq('id', id).select().single();
        if (error) throw error;
        return data;
    },
    async delete(id: string) {
        const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
        if (error) throw error;
    },
    async seed() {
        // Achievements didn't have IDs in the static file, so we insert them without IDs and let DB generate them
        // Or we can try to map them. Since they are simple objects, we just insert.
        // WARNING: repeatedly seeding will duplicate data without unique IDs.
        // Ideally we should truncate or check existence.
        // For this simple seed updates, we will delete all first then insert (safe for full reset)

        // const { error: deleteError } = await supabase.from(TABLE_NAME).delete().neq('title', '0'); // Delete all
        // if (deleteError) throw deleteError;

        const { error } = await supabase.from(TABLE_NAME).insert(initialData);
        if (error) throw error;
    }
};
