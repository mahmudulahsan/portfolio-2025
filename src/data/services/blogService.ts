import { supabase } from '@/lib/supabaseClient';
import { Blog, blogs as initialBlogs } from '../blogs';

const TABLE_NAME = 'blogs';

export const blogService = {
    async getAll(): Promise<Blog[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
        // .order('date', { ascending: false }); 

        if (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }
        return data as Blog[];
    },

    async getById(id: string): Promise<Blog | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching blog ${id}:`, error);
            return null;
        }
        return data as Blog;
    },

    async create(blog: Blog): Promise<Blog | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert(blog)
            .select()
            .single();

        if (error) throw error;
        return data as Blog;
    },

    async update(id: string, updates: Partial<Blog>): Promise<Blog | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Blog;
    },

    async delete(id: string): Promise<boolean> {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    async seed(): Promise<void> {
        const { error } = await supabase
            .from(TABLE_NAME)
            .upsert(initialBlogs, { onConflict: 'id' });

        if (error) throw error;
        console.log("Blogs seeded successfully");
    }
};
