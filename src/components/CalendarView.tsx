"use client";

import { useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { nb } from "date-fns/locale";
import type { EventData } from "@/data/sample";
import { formatDate } from "@/lib/map-db";

interface CalendarViewProps {
  events: EventData[];
  onSelectDate: (date: Date | null) => void;
  selectedDate: Date | null;
}

export default function CalendarView({
  events,
  onSelectDate,
  selectedDate,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInCalendar = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  // Build a map of date → events count
  const eventCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach((event) => {
      try {
        const d = parseISO(event.date);
        const key = format(d, "yyyy-MM-dd");
        counts[key] = (counts[key] || 0) + 1;
      } catch {
        // skip invalid dates
      }
    });
    return counts;
  }, [events]);

  // Events for the selected date
  const selectedEvents = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, "yyyy-MM-dd");
    return events.filter((event) => {
      try {
        const d = parseISO(event.date);
        return format(d, "yyyy-MM-dd") === key;
      } catch {
        return false;
      }
    });
  }, [events, selectedDate]);

  const dayNames = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

  const isToday = (date: Date) => isSameDay(date, new Date());
  const isInMonth = (date: Date) => isSameMonth(date, currentMonth);

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6 px-1">
        <button
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="w-10 h-10 flex items-center justify-center border border-border text-muted hover:text-ink hover:border-ink/30 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M8 3L4 7L8 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="font-serif text-xl text-ink">
          {format(currentMonth, "MMMM yyyy", { locale: nb })}
        </h2>
        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="w-10 h-10 flex items-center justify-center border border-border text-muted hover:text-ink hover:border-ink/30 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M6 3L10 7L6 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Calendar grid */}
      <div className="border border-border bg-white">
        {/* Day headers */}
        <div className="grid grid-cols-7">
          {dayNames.map((name) => (
            <div
              key={name}
              className="py-2.5 text-center text-[10px] font-mono uppercase tracking-widest text-muted border-b border-border"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {daysInCalendar.map((day, idx) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const count = eventCounts[dateKey] || 0;
            const isSelected = selectedDate
              ? isSameDay(day, selectedDate)
              : false;

            return (
              <button
                key={idx}
                onClick={() => onSelectDate(isSelected ? null : day)}
                className={`relative aspect-square flex flex-col items-center justify-center border-b border-r border-border/40 transition-colors ${
                  !isInMonth(day) ? "opacity-20" : ""
                } ${
                  isSelected
                    ? "bg-ink text-warm"
                    : isToday(day)
                      ? "bg-accent/5 hover:bg-accent/10"
                      : "hover:bg-navy/5"
                }`}
                style={{
                  borderRightWidth:
                    (idx + 1) % 7 === 0 ? "0px" : undefined,
                }}
              >
                <span
                  className={`text-sm leading-none mb-1 ${
                    isToday(day) && !isSelected
                      ? "text-accent font-semibold"
                      : ""
                  } ${isSelected ? "text-warm" : "text-ink"}`}
                >
                  {format(day, "d")}
                </span>
                {count > 0 && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-warm" : "bg-accent"
                    }`}
                    title={`${count} arrangement${count > 1 ? "er" : ""}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected date events */}
      {selectedDate && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-mono text-muted">
              {formatDate(format(selectedDate, "yyyy-MM-dd"))}
            </p>
            <button
              onClick={() => onSelectDate(null)}
              className="text-[10px] font-mono uppercase tracking-wider text-muted hover:text-ink transition-colors"
            >
              Fjern filter
            </button>
          </div>
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-muted italic">
              Ingen arrangementer denne dagen.
            </p>
          ) : (
            <div className="space-y-2">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 border border-border bg-white hover:border-muted/30 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-serif text-ink line-clamp-1">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {event.startTime} · {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
