"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { EventData, PlaceData } from "@/data/sample";
import { getLandmarkOrApprox } from "@/lib/sortland-coords";

// ─── Fix default marker icons (Leaflet + bundlers issue) ───
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// @ts-expect-error Leaflet's default icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

// ─── Custom marker icons ───

const eventIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: `<div class="map-marker map-marker--event"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" fill="#D9583B" stroke="#fff" stroke-width="2.5"/></svg></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -12],
});

const placeIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: `<div class="map-marker map-marker--place"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.2 2 5 4.2 5 7C5 10.5 10 16 10 16C10 16 15 10.5 15 7C15 4.2 12.8 2 10 2Z" fill="#6F8F72" stroke="#fff" stroke-width="2"/><circle cx="10" cy="7" r="2" fill="#fff"/></svg></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 16],
  popupAnchor: [0, -18],
});

// ─── Types ───

interface MapViewProps {
  events: EventData[];
  places: PlaceData[];
  activeTab: "events" | "places" | "all";
  onEventClick?: (id: string) => void;
  onPlaceClick?: (id: string) => void;
}

// ─── Auto-fit bounds component ───

function FitBounds({
  markers,
}: {
  markers: Array<{ lat: number; lng: number }>;
}) {
  const map = useMap();
  const prevRef = useRef<string>("");

  const key = useMemo(
    () => markers.map((m) => `${m.lat},${m.lng}`).join("|"),
    [markers],
  );

  useEffect(() => {
    if (markers.length === 0) return;
    if (key === prevRef.current) return;
    prevRef.current = key;

    if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lng], 14, { animate: true });
    } else {
      const bounds = L.latLngBounds(
        markers.map((m) => [m.lat, m.lng] as L.LatLngTuple),
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
    }
  }, [map, markers, key]);

  return null;
}

// ─── Main component ───

export default function MapView({
  events,
  places,
  activeTab,
}: MapViewProps) {
  const markers = useMemo(() => {
    const all: Array<{
      id: string;
      lat: number;
      lng: number;
      name: string;
      address: string;
      type: "event" | "place";
    }> = [];

    if (activeTab === "events" || activeTab === "all") {
      events.forEach((event) => {
        if (event.address) {
          const coords = getLandmarkOrApprox(event.address);
          all.push({
            id: event.id,
            ...coords,
            name: event.title,
            address: event.address,
            type: "event",
          });
        }
      });
    }

    if (activeTab === "places" || activeTab === "all") {
      places.forEach((place) => {
        const coords = getLandmarkOrApprox(place.address || place.name);
        all.push({
          id: place.id,
          ...coords,
          name: place.name,
          address: place.address || "",
          type: "place",
        });
      });
    }

    return all;
  }, [events, places, activeTab]);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-navy border border-border overflow-hidden">
      <MapContainer
        center={[68.6958, 15.4134]}
        zoom={13}
        className="w-full h-full"
        style={{ height: "100%", minHeight: "400px" }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={true}
      >
        {/* Dark tile layer: CartoDB Dark Matter */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <FitBounds markers={markers} />

        {markers.map((marker) => (
          <Marker
            key={`${marker.type}-${marker.id}`}
            position={[marker.lat, marker.lng]}
            icon={marker.type === "event" ? eventIcon : placeIcon}
          >
            <Popup className="map-popup">
              <div className="text-ink">
                <p className="font-serif text-sm font-semibold leading-tight">
                  {marker.name}
                </p>
                {marker.address && (
                  <p className="text-xs text-muted mt-0.5">{marker.address}</p>
                )}
                <span className="inline-block mt-1.5 text-[10px] font-mono uppercase tracking-wider text-sage">
                  {marker.type === "event" ? "Arrangement" : "Sted"}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Zoom controls overlay */}
      <div className="absolute bottom-3 right-3 z-[1000] flex flex-col gap-0.5">
        <button
          onClick={() => {
            const mapEl = document.querySelector(".leaflet-container");
            if (mapEl) {
              const map = (mapEl as any)._leaflet_map;
              if (map) map.zoomIn();
            }
          }}
          className="w-8 h-8 flex items-center justify-center bg-navy/90 border border-white/15 text-white/70 hover:text-white hover:bg-navy transition-colors text-sm leading-none"
        >
          +
        </button>
        <button
          onClick={() => {
            const mapEl = document.querySelector(".leaflet-container");
            if (mapEl) {
              const map = (mapEl as any)._leaflet_map;
              if (map) map.zoomOut();
            }
          }}
          className="w-8 h-8 flex items-center justify-center bg-navy/90 border border-white/15 text-white/70 hover:text-white hover:bg-navy transition-colors text-sm leading-none"
        >
          −
        </button>
      </div>
    </div>
  );
}
