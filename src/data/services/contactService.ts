
import { supabase } from '@/lib/supabaseClient';
import { contactInfo } from '../contact';

const PROFILE_TABLE = 'profile_info';
const LINKS_TABLE = 'social_links';

export const contactService = {
    // Profile Info
    async getProfile() {
        // We assume single row with id='main'
        const { data, error } = await supabase.from(PROFILE_TABLE).select('*').eq('id', 'main').single();
        if (error && error.code !== 'PGRST116') { // PGRST116 is code for no rows found
            console.error('Error fetching profile:', error);
            return null;
        }
        return data;
    },
    async updateProfile(item: { email?: string, phone?: string, address?: string }) {
        // Upsert to ensure it exists
        const { data, error } = await supabase.from(PROFILE_TABLE).upsert({ id: 'main', ...item }).select().single();
        if (error) throw error;
        return data;
    },

    // Social Links
    async getLinks() {
        const { data, error } = await supabase.from(LINKS_TABLE).select('*');
        if (error) { console.error('Error fetching links:', error); return []; }
        return data;
    },
    async createLink(item: { id: string, label: string, value: string, href: string, icon: string }) {
        const { data, error } = await supabase.from(LINKS_TABLE).insert(item).select().single();
        if (error) throw error;
        return data;
    },
    async updateLink(id: string, item: Partial<{ label: string, value: string, href: string, icon: string }>) {
        const { data, error } = await supabase.from(LINKS_TABLE).update(item).eq('id', id).select().single();
        if (error) throw error;
        return data;
    },
    async deleteLink(id: string) {
        const { error } = await supabase.from(LINKS_TABLE).delete().eq('id', id);
        if (error) throw error;
    },

    async seed() {
        // Seed Profile
        const { error: profileError } = await supabase.from(PROFILE_TABLE).upsert({
            id: 'main',
            email: contactInfo.email,
            phone: contactInfo.phone,
            address: contactInfo.address
        });
        if (profileError) throw profileError;

        // Seed Links
        // We rely on 'id' being unique in social_links table provided by contactInfo.links
        const { error: linksError } = await supabase.from(LINKS_TABLE).upsert(contactInfo.links);
        if (linksError) throw linksError;
    }
};
