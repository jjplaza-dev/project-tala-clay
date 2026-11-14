import Link from "next/link";
import type { NavItem } from "@/domain";
import { CategoryMenu } from "./CategoryMenu";

export function MainNav({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) =>
          item.children ? (
            <CategoryMenu key={item.label} label={item.label} items={item.children} />
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded px-3 text-[0.9375rem] font-medium underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
