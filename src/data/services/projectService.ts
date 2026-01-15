import { supabase } from '@/lib/supabaseClient';
import { Project, projects as initialProjects } from '../projects';

const TABLE_NAME = 'projects';

export const projectService = {
    async getAll(): Promise<Project[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
        //.order('created_at', { ascending: false }); // Assuming created_at exists, generic sort

        if (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
        return data as Project[];
    },

    async getById(id: string): Promise<Project | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching project ${id}:`, error);
            return null;
        }
        return data as Project;
    },

    async create(project: Project): Promise<Project | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert(project)
            .select()
            .single();

        if (error) throw error;
        return data as Project;
    },

    async update(id: string, updates: Partial<Project>): Promise<Project | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Project;
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
        // Use upsert to avoid duplicates, using 'id' as the conflict key
        const { error } = await supabase
            .from(TABLE_NAME)
            .upsert(initialProjects, { onConflict: 'id' });

        if (error) {
            console.error("Seed error:", error);
            throw error;
        }
        console.log("Projects seeded successfully");
    }
};
