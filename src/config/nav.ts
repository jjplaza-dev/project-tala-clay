import type { NavItem } from "@/domain";
import { categories } from "@/data/categories";

export const primaryNav: NavItem[] = [
  { label: "Shop", href: "/shop" },
  {
    label: "Collections",
    href: "/shop",
    children: categories.map((c) => ({ label: c.name, href: `/shop/${c.slug}` })),
  },
  { label: "Care", href: "/care" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "About", href: "/about" },
];

export const footerInfoNav: NavItem[] = [
  { label: "Shipping", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
