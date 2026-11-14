import Link from "next/link";
import { footerInfoNav } from "@/config/nav";
import { studio } from "@/data/studio";
import { getCategories } from "@/lib/selectors";
import { PageContainer } from "./PageContainer";

const linkClass = "inline-flex min-h-11 items-center underline-offset-4 hover:underline";

function LinkGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-label mb-2 text-ochre">{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkClass}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const shopLinks = [
    { label: "All pieces", href: "/shop" },
    ...getCategories().map((c) => ({ label: c.name, href: `/shop/${c.slug}` })),
  ];
  const studioLinks = [
    { label: "About", href: "/about" },
    { label: "Care guide", href: "/care" },
    { label: "Wholesale", href: "/wholesale" },
  ];

  return (
    <footer className="surface-dark py-16 md:py-20">
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-[40ch]">
            <p className="text-xl font-semibold">{studio.name}</p>
            <p className="mt-3 leading-relaxed">{studio.blurb}</p>
            <p className="mt-4 text-sm">
              {studio.contactEmail} <span className="opacity-80">(placeholder address)</span>
            </p>
          </div>
          <LinkGroup title="Shop" links={shopLinks} />
          <LinkGroup title="Studio" links={studioLinks} />
          <LinkGroup title="Help" links={footerInfoNav} />
        </div>
        <div className="mt-12 grid gap-2 border-t border-oat/20 pt-6 text-sm leading-relaxed">
          <p>
            Payments (preview): card and PayPal checkout for international orders is planned with Stripe and PayPal. A
            Philippines payment method is not configured yet.
          </p>
          <p className="opacity-80">
            Sample store: prices, stock, delivery windows and policies are placeholders for the studio to replace.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
