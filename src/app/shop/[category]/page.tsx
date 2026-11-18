import { notFound } from "next/navigation";
import { CatalogLayout } from "@/components/shop/CatalogLayout";
import { CategoryIntro } from "@/components/shop/CategoryIntro";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/selectors";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <>
      <CategoryIntro category={category} />
      <CatalogLayout products={getProductsByCategory(category.id)} activeCategory={category.slug} headingId="category-pieces" />
    </>
  );
}
