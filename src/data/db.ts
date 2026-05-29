import { createClient } from "@/lib/supabase/client";

// ─── Events ───

export interface DbEvent {
  id: string;
  title: string;
  category: string;
  category_label: string;
  description: string;
  short_description: string;
  date: string;
  end_date?: string;
  start_time: string;
  end_time: string;
  location: string;
  address: string;
  price: string;
  is_free: boolean;
  image_url?: string;
  organizer_name: string;
  organizer_email: string;
  organizer_phone: string;
  website?: string;
  suitable_for: string[];
  status: "approved" | "pending" | "rejected";
  featured: boolean;
  created_at: string;
}

export async function fetchApprovedEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "approved")
    .order("date", { ascending: true });

  if (error) throw error;
  return data as DbEvent[];
}

export async function fetchAllEvents() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as DbEvent[];
}

export async function fetchEventById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as DbEvent;
}

export async function fetchOrganizerEvents(organizerEmail: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("organizer_email", organizerEmail)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as DbEvent[];
}

export async function createEvent(
  event: Omit<DbEvent, "id" | "created_at" | "status" | "featured">,
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .insert({ ...event, status: "pending", featured: false })
    .select()
    .single();

  if (error) throw error;
  return data as DbEvent;
}

export async function uploadEventImage(file: File) {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from("event-images")
    .upload(fileName, file, { upsert: true });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("event-images")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

// ─── Places ───

export async function fetchPlaces() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .order("name");
  if (error) throw error;
  return data;
}

// ─── Categories ───

export async function fetchCategories() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");
  if (error) throw error;
  return data;
}
