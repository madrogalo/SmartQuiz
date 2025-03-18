import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fr", "de", "es"],
  // Used when no locale matches
  defaultLocale: "en",
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
// eslint-disable-next-line prettier/prettier
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
