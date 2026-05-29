// Unsplash image mappings for events, places, and categories
// Format: https://images.unsplash.com/photo-{ID}?w={WIDTH}&h={HEIGHT}&fit=crop

const CARD = "w=800&h=600&fit=crop";
const HERO = "w=1200&h=800&fit=crop";

export const eventImages: Record<string, string> = {
  sortlandsjam: `https://images.unsplash.com/photo-1514525253161-7a46d19cd819?${CARD}`,
  "familiedag-kulturfabrikken": `https://images.unsplash.com/photo-1596462502278-27bfdc403348?${CARD}`,
  "apen-hall-ungdom": `https://images.unsplash.com/photo-1576616638401-f8a5b2c2f52d?${CARD}`,
  strikkekafe: `https://images.unsplash.com/photo-1567016526105-22da7c13161a?${CARD}`,
  "fjelltur-turlag": `https://images.unsplash.com/photo-1551632811-561732d1e306?${CARD}`,
  "digital-hjelp": `https://images.unsplash.com/photo-1526379095098-d400fd0bf935?${CARD}`,
  "frivillig-motplass": `https://images.unsplash.com/photo-1559027615-cd4628902d4a?${CARD}`,
  "lokalmat-marked": `https://images.unsplash.com/photo-1488459716781-31db52582fe9?${CARD}`,
  "kino-sortland": `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?${CARD}`,
  sportsdag: `https://images.unsplash.com/photo-1576616638401-f8a5b2c2f52d?${CARD}`,
  kveldsvandring: `https://images.unsplash.com/photo-1474366521946-9d2d7cb4b74e?${CARD}`,
  gratiskonsert: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?${CARD}`,
};

export const eventHeroImages: Record<string, string> = {
  sortlandsjam: `https://images.unsplash.com/photo-1514525253161-7a46d19cd819?${HERO}`,
  "familiedag-kulturfabrikken": `https://images.unsplash.com/photo-1596462502278-27bfdc403348?${HERO}`,
  "apen-hall-ungdom": `https://images.unsplash.com/photo-1576616638401-f8a5b2c2f52d?${HERO}`,
  strikkekafe: `https://images.unsplash.com/photo-1567016526105-22da7c13161a?${HERO}`,
  "fjelltur-turlag": `https://images.unsplash.com/photo-1551632811-561732d1e306?${HERO}`,
  "digital-hjelp": `https://images.unsplash.com/photo-1526379095098-d400fd0bf935?${HERO}`,
  "frivillig-motplass": `https://images.unsplash.com/photo-1559027615-cd4628902d4a?${HERO}`,
  "lokalmat-marked": `https://images.unsplash.com/photo-1488459716781-31db52582fe9?${HERO}`,
  "kino-sortland": `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?${HERO}`,
  sportsdag: `https://images.unsplash.com/photo-1576616638401-f8a5b2c2f52d?${HERO}`,
  kveldsvandring: `https://images.unsplash.com/photo-1474366521946-9d2d7cb4b74e?${HERO}`,
  gratiskonsert: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?${HERO}`,
};

export const placeImages: Record<string, string> = {
  kulturfabrikken: `https://images.unsplash.com/photo-1517457373958-b7bdd4587205?${CARD}`,
  "sortland-bibliotek": `https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?${CARD}`,
  "scandic-sortland": `https://images.unsplash.com/photo-1566073771259-6a8506099945?${CARD}`,
  "sortland-idrettshall": `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?${CARD}`,
  frivilligsentralen: `https://images.unsplash.com/photo-1559027615-cd4628902d4a?${CARD}`,
  "kafe-sortland": `https://images.unsplash.com/photo-1554118811-1e0d58224f24?${CARD}`,
  "sortland-park": `https://images.unsplash.com/photo-1519331379826-f10be5486c6f?${CARD}`,
  "sortland-kommune": `https://images.unsplash.com/photo-1559136555-9303baea8ebd?${CARD}`,
};

export const categoryImages: Record<string, string> = {
  arrangementer: `https://images.unsplash.com/photo-1514525253161-7a46d19cd819?${CARD}`,
  "barn-og-familie": `https://images.unsplash.com/photo-1596462502278-27bfdc403348?${CARD}`,
  ungdom: `https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?${CARD}`,
  "kultur-og-musikk": `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?${CARD}`,
  "sport-og-fritid": `https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?${CARD}`,
  "kurs-og-læring": `https://images.unsplash.com/photo-1526379095098-d400fd0bf935?${CARD}`,
  frivillighet: `https://images.unsplash.com/photo-1559027615-cd4628902d4a?${CARD}`,
  "mat-og-sosialt": `https://images.unsplash.com/photo-1488459716781-31db52582fe9?${CARD}`,
  "lokale-tjenester": `https://images.unsplash.com/photo-1559136555-9303baea8ebd?${CARD}`,
  "ledige-lokaler": `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?${CARD}`,
  transport: `https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?${CARD}`,
  "kommunale-tilbud": `https://images.unsplash.com/photo-1559136555-9303baea8ebd?${CARD}`,
  "ny-i-kommunen": `https://images.unsplash.com/photo-1519389950473-47ba0277781c?${CARD}`,
  turistinfo: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?${CARD}`,
};
