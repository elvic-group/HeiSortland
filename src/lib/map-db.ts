import { DbEvent } from "@/data/db";
import { EventData, PlaceData } from "@/data/sample";

// ─── Default gradient fallback (used when no image is available) ───

const categoryGradients: Record<string, string> = {
  "kultur-og-musikk": "from-purple-900/80 to-indigo-800/80",
  "sport-og-fritid": "from-green-900/80 to-emerald-800/80",
  "barn-og-familie": "from-orange-800/80 to-amber-700/80",
  "kurs-og-læring": "from-blue-900/80 to-cyan-800/80",
  "mat-og-sosialt": "from-red-900/80 to-rose-800/80",
  frivillighet: "from-teal-900/80 to-green-800/80",
  "natur-og-friluft": "from-emerald-900/80 to-lime-800/80",
  "helse-og-velvære": "from-pink-800/80 to-rose-700/80",
};

function getGradient(category: string): string {
  return categoryGradients[category] ?? "from-navy to-navy/80";
}

// ─── Map DbEvent (snake_case) → EventData (camelCase) ───

export function mapDbEventToEventData(db: DbEvent): EventData {
  return {
    id: db.id,
    title: db.title,
    category: db.category,
    categoryLabel: db.category_label,
    description: db.description,
    shortDescription: db.short_description,
    date: db.date,
    endDate: db.end_date,
    startTime: db.start_time,
    endTime: db.end_time,
    location: db.location,
    address: db.address,
    price: db.price,
    isFree: db.is_free,
    image: db.image_url || "",
    gradient: getGradient(db.category),
    organizerName: db.organizer_name,
    organizerEmail: db.organizer_email,
    organizerPhone: db.organizer_phone,
    website: db.website,
    suitableFor: Array.isArray(db.suitable_for) ? db.suitable_for : [],
    status: db.status,
    featured: db.featured,
    createdAt: db.created_at,
  };
}

// ─── Map DB place (snake_case) → PlaceData (camelCase) ───

export function mapDbPlaceToPlaceData(db: any): PlaceData {
  return {
    id: db.id,
    name: db.name,
    type: db.type,
    typeLabel: db.type_label,
    address: db.address,
    openingHours: db.opening_hours,
    description: db.description,
    shortDescription: db.short_description,
    phone: db.phone,
    email: db.email,
    website: db.website,
    image: db.image_url || "",
    gradient: "from-navy/80 to-navy/80",
  };
}

// ─── Date helpers (copied from sample.ts) ───

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const days = [
    "søndag",
    "mandag",
    "tirsdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lørdag",
  ];
  const months = [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember",
  ];
  return `${days[date.getDay()]} ${date.getDate()}. ${months[date.getMonth()]}`;
}

export function isToday(dateStr: string): boolean {
  const today = new Date();
  const d = new Date(dateStr + "T12:00:00");
  return d.toDateString() === today.toDateString();
}

export function isThisWeek(dateStr: string): boolean {
  const today = new Date();
  const d = new Date(dateStr + "T12:00:00");
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return d >= startOfWeek && d <= endOfWeek;
}

export function isThisWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + "T12:00:00");
  const day = d.getDay();
  return day === 6 || day === 0;
}

export function isTomorrow(dateStr: string): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const d = new Date(dateStr + "T12:00:00");
  return d.toDateString() === tomorrow.toDateString();
}

export function isThisMonth(dateStr: string): boolean {
  const today = new Date();
  const d = new Date(dateStr + "T12:00:00");
  return (
    d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  );
}
