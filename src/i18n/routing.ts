import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["no", "en"],
  defaultLocale: "no",
  localeCookie: {
    name: "NEXT_LOCALE",
  },
});
