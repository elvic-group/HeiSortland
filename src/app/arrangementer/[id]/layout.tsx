import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const supabase = await createClient();
    const { data: event } = await supabase
      .from("events")
      .select("title, short_description, image_url")
      .eq("id", id)
      .single();

    if (!event) {
      return {
        title: "Arrangement ikke funnet | HeiSortland",
        description:
          "Dette arrangementet finnes ikke lenger, eller lenken er ugyldig.",
      };
    }

    return {
      title: `${event.title} | HeiSortland`,
      description:
        event.short_description || `Les mer om ${event.title} på HeiSortland.`,
      openGraph: {
        title: event.title,
        description:
          event.short_description || `Les mer om ${event.title} på HeiSortland.`,
        images: event.image_url ? [{ url: event.image_url }] : [],
        type: "website",
      },
    };
  } catch {
    return {
      title: "Arrangement | HeiSortland",
      description: "Oppdag spennende arrangementer på HeiSortland.",
    };
  }
}

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
