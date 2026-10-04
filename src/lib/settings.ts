import { createClient } from './supabase/client';

export type WebsiteSettings = {
  id: number;
  contact_email: string;
  contact_phone: string;
  address: string;
  whatsapp_number: string;
  tiktok_url: string;
  facebook_url: string;
}

export const getSettings = async (): Promise<WebsiteSettings | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }

  return data;
};

export const updateSettings = async (settings: Partial<WebsiteSettings>) => {
  const supabase = createClient();
  const { error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', 1);

  if (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};
