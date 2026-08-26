import { getService, locations, quoteFormHref } from "./site-data";

export function quoteCtaHrefForPath(pathname: string) {
  if (pathname === "/" || pathname === "/contact") {
    return "#quote";
  }

  const serviceMatch = pathname.match(/^\/services\/([^/]+)\/?$/);
  if (serviceMatch) {
    const service = getService(serviceMatch[1]);
    if (service) {
      return quoteFormHref({ service: service.quoteValue });
    }
  }

  const locationMatch = pathname.match(/^\/locations\/([^/]+)\/?$/);
  if (locationMatch) {
    const location = locations.find((item) => item.slug === locationMatch[1]);
    if (location) {
      return quoteFormHref({ location: location.name });
    }
  }

  return "/#quote";
}
