export interface EventData {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  shortDescription: string;
  date: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  price: string;
  isFree: boolean;
  image: string;
  gradient: string;
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  website?: string;
  suitableFor: string[];
  status: "approved" | "pending" | "rejected";
  featured: boolean;
  createdAt: string;
}

export interface PlaceData {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  address: string;
  openingHours: string;
  description: string;
  shortDescription: string;
  phone: string;
  email: string;
  website?: string;
  image: string;
  gradient: string;
}

export interface CategoryData {
  id: string;
  label: string;
  description: string;
  gradient: string;
  count: number;
}

export const categories: CategoryData[] = [
  { id: "arrangementer", label: "Arrangementer", description: "Konserter, festivaler, markeder og mer", gradient: "from-accent to-accent/60", count: 24 },
  { id: "barn-og-familie", label: "Barn og familie", description: "Aktiviteter for små og store", gradient: "from-sage to-sage/60", count: 18 },
  { id: "ungdom", label: "Ungdom", description: "Tilbud og møteplasser for unge", gradient: "from-[#4A6FA5] to-[#4A6FA5/60]", count: 12 },
  { id: "kultur-og-musikk", label: "Kultur og musikk", description: "Kunst, musikk, teater og kultur", gradient: "from-accent to-accent/40", count: 20 },
  { id: "sport-og-fritid", label: "Sport og fritid", description: "Idrett, friluftsliv og trening", gradient: "from-sage to-sage/40", count: 15 },
  { id: "kurs-og-læring", label: "Kurs og læring", description: "Kurs, foredrag og kompetanse", gradient: "from-[#5A6A7A] to-[#5A6A7A/60]", count: 10 },
  { id: "frivillighet", label: "Frivillighet", description: "Bli frivillig eller finn hjelp", gradient: "from-sage to-sage/60", count: 8 },
  { id: "mat-og-sosialt", label: "Mat og sosialt", description: "Kaféer, restauranter og sosiale treff", gradient: "from-accent to-accent/60", count: 14 },
  { id: "lokale-tjenester", label: "Lokale tjenester", description: "Tjenester og tilbud lokalt", gradient: "from-navy to-deep-blue", count: 9 },
  { id: "ledige-lokaler", label: "Ledige lokaler", description: "Utleie av rom og lokaler", gradient: "from-muted to-muted/60", count: 5 },
  { id: "transport", label: "Transport", description: "Buss, båt, fly og samferdsel", gradient: "from-deep-blue to-deep-blue/60", count: 7 },
  { id: "kommunale-tilbud", label: "Kommunale tilbud", description: "Tjenester fra Sortland kommune", gradient: "from-navy to-navy/60", count: 11 },
  { id: "ny-i-kommunen", label: "Ny i kommunen", description: "Tips og info for nye innbyggere", gradient: "from-sage to-sage/60", count: 6 },
  { id: "turistinfo", label: "Turistinfo", description: "For deg som besøker Sortland", gradient: "from-accent to-accent/60", count: 9 },
];

export const events: EventData[] = [
  {
    id: "sortlandsjam",
    title: "SortlandsJam på Scandic",
    category: "kultur-og-musikk",
    categoryLabel: "Kultur og musikk",
    description: "En helg med levende musikk på Scandic Sortland. Lokale band, god stemning og uformell atmosfære. Både etablerte og nye artister deltar. Kom og hør på nye talenter eller nyt musikken fra dine favoritter. Det blir en variert musikalsk opplevelse med alt fra jazz og blues til rock og pop.\n\nDet er åpent for alle aldre, og det vil være mulig å kjøpe mat og drikke i baren. Det blir også en egen jam-session hvor publikum kan delta.",
    shortDescription: "Levende musikk på Scandic Sortland. Lokale band og jam-session.",
    date: "2026-06-12",
    endDate: "2026-06-14",
    startTime: "19:00",
    endTime: "23:00",
    location: "Scandic Sortland",
    address: "Storgata 7, 8400 Sortland",
    price: "150",
    isFree: false,
    image: "",
    gradient: "from-[#2a1a3a] via-[#4a2a5a] to-accent/30",
    organizerName: "Sortland Musikkforening",
    organizerEmail: "musikk@sortland.no",
    organizerPhone: "911 22 333",
    website: "https://sortlandmusikk.no",
    suitableFor: ["voksne", "ungdom"],
    status: "approved",
    featured: true,
    createdAt: "2026-05-01",
  },
  {
    id: "familiedag-kulturfabrikken",
    title: "Familiedag på Kulturfabrikken",
    category: "barn-og-familie",
    categoryLabel: "Barn og familie",
    description: "En hel dag med aktiviteter for hele familien på Kulturfabrikken Sortland. Ansiktsmaling, rebusløp, verksteder, teater og mye mer. Det blir også salg av vafler, kaffe og brus. Aktiviteter for barn i alle aldre.\n\nTa med hele familien og bli med på en hyggelig dag fylt med kreativitet, moro og fellesskap. Arrangementet er gratis og åpent for alle.",
    shortDescription: "Aktiviteter for hele familien – ansiktsmaling, verksteder og mer.",
    date: "2026-06-15",
    startTime: "11:00",
    endTime: "16:00",
    location: "Kulturfabrikken Sortland",
    address: "Industrigata 3, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-sage/40 via-[#3a5a3a] to-sage/30",
    organizerName: "Kulturfabrikken Sortland",
    organizerEmail: "post@kulturfabrikken.no",
    organizerPhone: "912 34 567",
    website: "https://kulturfabrikken.no",
    suitableFor: ["barn", "familier"],
    status: "approved",
    featured: true,
    createdAt: "2026-05-10",
  },
  {
    id: "apen-hall-ungdom",
    title: "Åpen hall for ungdom",
    category: "ungdom",
    categoryLabel: "Ungdom",
    description: "Åpen hall på Sortland idrettshall hver torsdag. Det blir aktiviteter som basketball, fotball, badminton og bordtennis. Gratis inngang. Det vil være voksne til stede.\n\nUngdom mellom 13 og 19 år er velkomne til å komme og være med på aktiviteter eller bare henge. Det blir servert enkel mat og drikke.",
    shortDescription: "Gratis aktiviteter for ungdom – sport og sosialt samvær.",
    date: "2026-06-12",
    startTime: "18:00",
    endTime: "21:00",
    location: "Sortland idrettshall",
    address: "Idrettsveien 4, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-[#4A6FA5] via-[#3a5a8a] to-[#4A6FA5/40]",
    organizerName: "Sortland ungdomsråd",
    organizerEmail: "ungdom@sortland.no",
    organizerPhone: "913 45 678",
    suitableFor: ["ungdom"],
    status: "approved",
    featured: false,
    createdAt: "2026-05-15",
  },
  {
    id: "strikkekafe",
    title: "Strikkekafé på biblioteket",
    category: "mat-og-sosialt",
    categoryLabel: "Mat og sosialt",
    description: "Ta med strikketøyet og bli med på en hyggelig kveld på Sortland bibliotek. Vi strikker, snakker og drikker kaffe sammen. Nybegynnere er velkomne – vi hjelper deg i gang.\n\nDet blir også mulighet til å få tips og inspirasjon fra andre strikkere. Ta gjerne med et prosjekt du jobber med, eller kom bare for å være sosial.",
    shortDescription: "Hyggelig strikkekveld på biblioteket – åpent for alle.",
    date: "2026-06-13",
    startTime: "18:00",
    endTime: "20:00",
    location: "Sortland bibliotek",
    address: "Storgata 12, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-accent/30 via-[#5a3a2a] to-accent/20",
    organizerName: "Sortland bibliotek",
    organizerEmail: "bibliotek@sortland.no",
    organizerPhone: "915 56 789",
    website: "https://sortlandbibliotek.no",
    suitableFor: ["voksne", "seniorer"],
    status: "approved",
    featured: false,
    createdAt: "2026-05-20",
  },
  {
    id: "fjelltur-turlag",
    title: "Fjelltur med lokalt turlag",
    category: "sport-og-fritid",
    categoryLabel: "Sport og fritid",
    description: "Bli med på guidet fjelltur med Sortland turlag. Turen går til Lamarka med fantastisk utsikt over Sortland og fjorden. Turbeskrivelse: 3 km, lett til middels krevende.\n\nTa med gode sko, drikke og mat. Turen passer for de fleste i alderen 10–70 år. På toppen blir det en rast med mulighet for å nyte medbrakt mat og drikke.",
    shortDescription: "Guidet tur til Lamarka – flott utsikt og godt selskap.",
    date: "2026-06-14",
    startTime: "10:00",
    endTime: "14:00",
    location: "Oppmøte ved Sortland rådhus",
    address: "Rådhusgata 1, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-sage/50 via-[#3a5a3a] to-sage/30",
    organizerName: "Sortland turlag",
    organizerEmail: "tur@sortland.no",
    organizerPhone: "916 67 890",
    suitableFor: ["barn", "ungdom", "voksne", "familier"],
    status: "approved",
    featured: false,
    createdAt: "2026-05-18",
  },
  {
    id: "digital-hjelp",
    title: "Kurs i digital hjelp",
    category: "kurs-og-læring",
    categoryLabel: "Kurs og læring",
    description: "Trenger du hjelp med mobilen, nettbrettet eller PC-en? Kom til biblioteket og få gratis veiledning. Vi hjelper deg med alt fra å sende e-post til å laste ned apper.\n\nTa med din egen enhet. Kurset er åpent for alle, uansett nivå. Det blir servert kaffe og kake.",
    shortDescription: "Gratis veiledning på mobil, nettbrett og PC.",
    date: "2026-06-16",
    startTime: "14:00",
    endTime: "16:00",
    location: "Sortland bibliotek",
    address: "Storgata 12, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-[#5A6A7A] via-[#4a5a6a] to-[#5A6A7A/40]",
    organizerName: "Sortland bibliotek",
    organizerEmail: "bibliotek@sortland.no",
    organizerPhone: "915 56 789",
    suitableFor: ["voksne", "seniorer"],
    status: "approved",
    featured: false,
    createdAt: "2026-05-22",
  },
  {
    id: "frivillig-motplass",
    title: "Frivillig møteplass",
    category: "frivillighet",
    categoryLabel: "Frivillighet",
    description: "Er du interessert i frivillig arbeid? Kom på åpen møteplass på Frivilligsentralen. Her kan du høre om muligheter, møte andre frivillige og finne noe som passer for deg.\n\nDet blir servert enkel mat og drikke. Arrangementet er gratis og åpent for alle som er nysgjerrige på frivillighet.",
    shortDescription: "Åpen møteplass for frivillige og interesserte.",
    date: "2026-06-17",
    startTime: "17:00",
    endTime: "19:00",
    location: "Sortland frivilligsentral",
    address: "Sentralgata 5, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-sage/40 via-[#4a6a4a] to-sage/30",
    organizerName: "Sortland frivilligsentral",
    organizerEmail: "frivillig@sortland.no",
    organizerPhone: "917 78 901",
    suitableFor: ["voksne", "ungdom", "seniorer"],
    status: "approved",
    featured: false,
    createdAt: "2026-05-25",
  },
  {
    id: "lokalmat-marked",
    title: "Lokal mat & marked",
    category: "mat-og-sosialt",
    categoryLabel: "Mat og sosialt",
    description: "Bli med på lokalt marked med mat, håndverk og lokalproduserte varer på Sortland torv. Smak deg gjennom Vesterålen – fra ferskt fisk til lokale oster og håndverksøl.\n\nDet blir også aktiviteter for barn, musikk og underholdning. Markedet er åpent for alle.",
    shortDescription: "Marked med lokal mat, håndverk og musikk på torvet.",
    date: "2026-06-21",
    startTime: "10:00",
    endTime: "16:00",
    location: "Sortland torv",
    address: "Torvgata, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-accent/30 via-[#5a3a1a] to-accent/20",
    organizerName: "Sortland næringsforening",
    organizerEmail: "naring@sortland.no",
    organizerPhone: "918 89 012",
    suitableFor: ["barn", "ungdom", "voksne", "familier", "seniorer"],
    status: "approved",
    featured: true,
    createdAt: "2026-05-28",
  },
  {
    id: "kino-sortland",
    title: "Familiefilm på Sortland kino",
    category: "barn-og-familie",
    categoryLabel: "Barn og familie",
    description: "Ukens familiefilm på Sortland kino. Visning av ny barnefilm. Billige billettpriser for barn, og voksenfølge har rabatt. Popcorn og brus i kiosken.\n\nDørene åpner 30 minutter før visning.",
    shortDescription: "Ukens barnefilm på Sortland kino – billige billetter.",
    date: "2026-06-20",
    startTime: "14:00",
    endTime: "16:00",
    location: "Sortland kino",
    address: "Kinogata 2, 8400 Sortland",
    price: "80",
    isFree: false,
    image: "",
    gradient: "from-[#4A6FA5] via-[#3a5a8a] to-accent/20",
    organizerName: "Sortland kino",
    organizerEmail: "kino@sortland.no",
    organizerPhone: "919 90 123",
    suitableFor: ["barn", "familier"],
    status: "approved",
    featured: false,
    createdAt: "2026-06-01",
  },
  {
    id: "sportsdag",
    title: "Sportsdag for barn",
    category: "sport-og-fritid",
    categoryLabel: "Sport og fritid",
    description: "En hel dag med idrett og lek for barn i alderen 6–12 år. Det blir fotball, friidrett, orientering og mye mer. Gratis deltakelse og premier til alle.\n\nTa med gode sko, drikkeflaske og solkrem. Det blir servert grilling og brus til lunsj.",
    shortDescription: "Idrettsdag for barn 6–12 år – gratis og åpent for alle.",
    date: "2026-06-23",
    startTime: "10:00",
    endTime: "15:00",
    location: "Sortland idrettspark",
    address: "Idrettsveien 4, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-sage/50 via-[#4a7a4a] to-sage/30",
    organizerName: "Sortland idrettsråd",
    organizerEmail: "idrett@sortland.no",
    organizerPhone: "920 01 234",
    suitableFor: ["barn"],
    status: "approved",
    featured: false,
    createdAt: "2026-06-02",
  },
  {
    id: "kveldsvandring",
    title: "Kveldsvandring i Sortland",
    category: "kultur-og-musikk",
    categoryLabel: "Kultur og musikk",
    description: "En guidet kveldsvandring gjennom Sortlands gater. Hør historien bak de blå husene, om kunstprosjektet som ga byen sitt særpreg, og om menneskene som bor her.\n\nTuren varer ca 1,5 time. Start ved Sortland kirke. Ta med gode sko og når det er kaldt, varme klær.",
    shortDescription: "Guidet kveldsvandring – oppdag Sortlands historie.",
    date: "2026-06-25",
    startTime: "19:00",
    endTime: "20:30",
    location: "Sortland kirke",
    address: "Kirkegata 1, 8400 Sortland",
    price: "100",
    isFree: false,
    image: "",
    gradient: "from-accent/20 via-[#3a2a1a] to-accent/30",
    organizerName: "Sortland historielag",
    organizerEmail: "historie@sortland.no",
    organizerPhone: "921 12 345",
    suitableFor: ["voksne", "ungdom", "familier"],
    status: "approved",
    featured: false,
    createdAt: "2026-06-03",
  },
  {
    id: "gratiskonsert",
    title: "Gratiskonsert i parken",
    category: "kultur-og-musikk",
    categoryLabel: "Kultur og musikk",
    description: "Sommerkonsert i Sortland park med lokale artister og band. Ta med pledd, mat og drikke og nyt en kveld med god musikk under åpen himmel. Gratis for alle.\n\nRegnvær: Konserten flyttes inn i Kulturfabrikken. Følg med på våre sider for oppdatering.",
    shortDescription: "Gratis sommerkonsert i parken – ta med pledd og nyt musikken.",
    date: "2026-06-27",
    startTime: "18:00",
    endTime: "21:00",
    location: "Sortland park",
    address: "Parkgata, 8400 Sortland",
    price: "0",
    isFree: true,
    image: "",
    gradient: "from-sage/30 via-[#4a6a4a] to-accent/20",
    organizerName: "Sortland kommune",
    organizerEmail: "post@sortland.kommune.no",
    organizerPhone: "922 23 456",
    suitableFor: ["barn", "ungdom", "voksne", "familier", "seniorer"],
    status: "approved",
    featured: true,
    createdAt: "2026-06-04",
  },
];

export const places: PlaceData[] = [
  {
    id: "kulturfabrikken",
    name: "Kulturfabrikken Sortland",
    type: "kulturhus",
    typeLabel: "Kulturhus",
    address: "Industrigata 3, 8400 Sortland",
    openingHours: "Man–fre 09:00–22:00, Lør–søn 10:00–18:00",
    description: "Kulturfabrikken er Sortlands største kultur- og aktivitetshus. Her finner du scene, galleri, møterom og verksteder. Huset er vertskap for konserter, utstillinger, kurs og arrangementer for alle aldersgrupper.\n\nHer er det også en kafé med enkel servering. Kulturfabrikken er et møtested for hele Sortland.",
    shortDescription: "Kulturhus med scene, galleri, verksteder og kafé.",
    phone: "912 34 567",
    email: "post@kulturfabrikken.no",
    website: "https://kulturfabrikken.no",
    image: "",
    gradient: "from-accent/30 via-[#3a2a1a] to-accent/20",
  },
  {
    id: "sortland-bibliotek",
    name: "Sortland bibliotek",
    type: "bibliotek",
    typeLabel: "Bibliotek",
    address: "Storgata 12, 8400 Sortland",
    openingHours: "Man–fre 10:00–18:00, Lør 10:00–14:00",
    description: "Sortland bibliotek er et moderne folkebibliotek med et bredt utvalg av bøker, filmer og tidsskrifter. Her er det også leseplasser, PC-er, møterom og arrangementer for både barn og voksne.\n\nBiblioteket har gratis wi-fi, utskrift og kopiering. Det arrangeres regelmessig bokprat, forfatterkvelder og barneaktiviteter.",
    shortDescription: "Moderne folkebibliotek med arrangementer for alle aldre.",
    phone: "915 56 789",
    email: "bibliotek@sortland.no",
    website: "https://sortlandbibliotek.no",
    image: "",
    gradient: "from-sage/20 via-[#4a6a5a] to-sage/10",
  },
  {
    id: "scandic-sortland",
    name: "Scandic Sortland",
    type: "hotell",
    typeLabel: "Hotell",
    address: "Storgata 7, 8400 Sortland",
    openingHours: "Døgnåpent resepsjon",
    description: "Scandic Sortland ligger sentralt med utsikt over Sortlandssundet. Hotellet har 120 rom, restaurant, bar og konferansefasiliteter. Det er et populært sted for både overnatting og arrangementer.\n\nHotellet har også en kafé som er åpen for alle, og serverer frokost, lunsj og middag.",
    shortDescription: "Sentralt hotell med restaurant, bar og konferanserom.",
    phone: "911 22 333",
    email: "sortland@scandic.no",
    website: "https://scandic.no/sortland",
    image: "",
    gradient: "from-deep-blue via-[#2a3a5a] to-deep-blue/80",
  },
  {
    id: "sortland-idrettshall",
    name: "Sortland idrettshall",
    type: "idrett",
    typeLabel: "Idrettsanlegg",
    address: "Idrettsveien 4, 8400 Sortland",
    openingHours: "Man–søn 07:00–22:00",
    description: "Sortland idrettshall er et moderne idrettsanlegg med hall for ballspill, gymsal, styrkerom og garderober. Hallen brukes av lokale idrettslag, skoler og organisasjoner.\n\nDet er også mulig å leie hallen for private arrangementer. Kontakt Sortland kommune for leieavtale.",
    shortDescription: "Idrettshall med ballbaner, gymsal og styrkerom.",
    phone: "913 45 678",
    email: "idrett@sortland.kommune.no",
    image: "",
    gradient: "from-sage/30 via-[#4a6a4a] to-sage/20",
  },
  {
    id: "frivilligsentralen",
    name: "Sortland frivilligsentral",
    type: "frivillig",
    typeLabel: "Frivilligsentral",
    address: "Sentralgata 5, 8400 Sortland",
    openingHours: "Man–fre 10:00–16:00",
    description: "Sortland frivilligsentral er et møtested for frivillige og organisasjoner. Her kan du få informasjon om frivillige muligheter, delta på aktiviteter eller bli med i et fellesskap.\n\nFrivilligsentralen driver flere tiltak som besøkstjeneste, leksehjelp og arrangementer for barn og eldre. Det er åpent for alle som vil være med.",
    shortDescription: "Møtested for frivillige med aktiviteter og fellesskap.",
    phone: "917 78 901",
    email: "frivillig@sortland.no",
    image: "",
    gradient: "from-sage/40 via-[#5a7a4a] to-sage/20",
  },
  {
    id: "kafe-sortland",
    name: "Kafé Sortland",
    type: "kafe",
    typeLabel: "Kafé",
    address: "Storgata 15, 8400 Sortland",
    openingHours: "Man–lør 08:00–17:00, Søn 10:00–15:00",
    description: "Kafé Sortland er en hyggelig møteplass i sentrum. Her serveres kaffe, te, bakst, lunsjretter og kaker. Kaféen har også en liten butikk med lokale produkter.\n\nKaféen er kjent for sin gode atmosfære og hyggelige betjening. Det er gratis wi-fi og barnevennlige forhold.",
    shortDescription: "Hyggelig kafé i sentrum med kaffe, mat og lokale produkter.",
    phone: "914 56 789",
    email: "kafe@sortland.no",
    image: "",
    gradient: "from-accent/20 via-[#4a2a1a] to-accent/15",
  },
  {
    id: "sortland-park",
    name: "Sortland park",
    type: "park",
    typeLabel: "Park og friluft",
    address: "Parkgata, 8400 Sortland",
    openingHours: "Alltid åpent",
    description: "Sortland park er en grønn lunge midt i byen. Her er det benker, lekeplass, plener og fine turstier. Parken brukes til arrangementer, konserter og som et sted for rekreasjon.\n\nOm sommeren er det ofte aktiviteter her. Parken er også et fint sted for en lunsj i grøntområdet eller en kveldstur.",
    shortDescription: "Byens grønne lunge med lekeplass, benker og arrangementer.",
    phone: "",
    email: "",
    image: "",
    gradient: "from-sage/30 via-[#5a7a4a] to-sage/20",
  },
  {
    id: "sortland-kommune",
    name: "Sortland kommune – Servicekontor",
    type: "kommunalt",
    typeLabel: "Kommunalt kontor",
    address: "Rådhusgata 1, 8400 Sortland",
    openingHours: "Man–fre 09:00–15:00",
    description: "Sortland kommunes servicekontor er ditt første møte med kommunen. Her kan du få hjelp med skjemaer, informasjon om kommunale tjenester og veiledning.\n\nServicekontoret håndterer alt fra byggesaker til sosialhjelp og skoleinformasjon. Det er også mulig å bestille time for personlig veiledning.",
    shortDescription: "Kommunens servicekontor for veiledning og skjemaer.",
    phone: "922 23 456",
    email: "post@sortland.kommune.no",
    website: "https://sortland.kommune.no",
    image: "",
    gradient: "from-navy via-deep-blue to-navy/80",
  },
];

export const quickFilters = [
  { id: "today", label: "I dag" },
  { id: "weekend", label: "Denne helgen" },
  { id: "free", label: "Gratis" },
  { id: "barn", label: "Barn" },
  { id: "ungdom", label: "Ungdom" },
  { id: "musikk", label: "Musikk" },
  { id: "kultur", label: "Kultur" },
  { id: "sport", label: "Sport" },
  { id: "frivillig", label: "Frivillig" },
  { id: "kurs", label: "Kurs" },
  { id: "mat-sosialt", label: "Mat og sosialt" },
];

export function getCategoryLabel(id: string): string {
  const cat = categories.find((c) => c.id === id);
  return cat?.label ?? id;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const days = ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"];
  const months = ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"];
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
  return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
}
