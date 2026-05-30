// Approximate coordinates for locations in Sortland / Vesterålen area
// Used as fallback when places/events don't have real lat/lng

const SORTLAND_CENTER = { lat: 68.6958, lng: 15.4134 };

// Generate a pseudo-random but deterministic offset based on a string seed
function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash) / 2147483647;
}

export function getApproximateCoords(
  seed: string,
): { lat: number; lng: number } {
  const latOffset = (hashSeed(seed + "lat") - 0.5) * 0.02;
  const lngOffset = (hashSeed(seed + "lng") - 0.5) * 0.04;
  return {
    lat: SORTLAND_CENTER.lat + latOffset,
    lng: SORTLAND_CENTER.lng + lngOffset,
  };
}

// Known landmarks in Sortland (approximate coordinates)
export const LANDMARK_COORDS: Record<string, { lat: number; lng: number }> = {
  "Sortland Kulturhus": { lat: 68.6969, lng: 15.4129 },
  "Sortland bibliotek": { lat: 68.6965, lng: 15.4120 },
  "Sortland Hotell": { lat: 68.6948, lng: 15.4145 },
  "Sortland kirke": { lat: 68.6975, lng: 15.4110 },
  "Kulturfabrikken": { lat: 68.6960, lng: 15.4150 },
  "Sortland videregående skole": { lat: 68.6940, lng: 15.4100 },
  "Sortlandshallen": { lat: 68.6935, lng: 15.4080 },
  "Folkebiblioteket": { lat: 68.6965, lng: 15.4120 },
  "Sortland Rådhus": { lat: 68.6960, lng: 15.4130 },
  "Vesterålen Kysthotell": { lat: 68.6950, lng: 15.4160 },
};

export function getLandmarkOrApprox(
  name: string,
): { lat: number; lng: number } {
  if (LANDMARK_COORDS[name]) return LANDMARK_COORDS[name];
  return getApproximateCoords(name);
}
