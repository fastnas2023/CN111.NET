import { SUPPORTED_LOCALES, type SupportedLocale } from "./locales";

function hasSupportedLocalePrefix(pathname: string) {
  return SUPPORTED_LOCALES.some((loc) => {
    const prefix = `/${loc}`;
    return pathname === prefix || pathname.startsWith(prefix + "/");
  });
}

export function stripLocale(pathname: string) {
  for (const loc of SUPPORTED_LOCALES) {
    const prefix = `/${loc}`;
    if (pathname === prefix) return "/";
    if (pathname.startsWith(prefix + "/")) return pathname.slice(prefix.length);
  }
  return pathname;
}

/**
 * Prefix a site href ("/tickets") with "/{locale}".
 *
 * - Idempotent: already-prefixed href stays unchanged
 * - "/" becomes "/{locale}" (not "/{locale}/")
 */
export function withLocale(locale: SupportedLocale, href: string) {
  // External links, hash links, and relative urls are left as-is.
  if (!href.startsWith("/")) return href;

  // Already locale-prefixed.
  if (hasSupportedLocalePrefix(href)) return href;

  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

