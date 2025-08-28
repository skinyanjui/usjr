import { NAV } from "./nav"

export type ServiceOption = {
  value: string
  label: string
  href: string
}

const getSlugFromHref = (href?: string): string => {
  if (!href) return ""
  const parts = href.split("/").filter(Boolean)
  return parts[parts.length - 1] || ""
}

export const getServiceOptions = (): ServiceOption[] => {
  const servicesItem = NAV.find((item) => item.label === "Services")
  const children = servicesItem?.children ?? []
  return children.map((child) => ({
    label: child.label,
    value: getSlugFromHref(child.href),
    href: child.href || "",
  }))
}

