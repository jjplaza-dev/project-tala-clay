"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchProducts } from "@/lib/search";
import { getCategories, getFeaturedProducts, getProducts } from "@/lib/selectors";

const linkClass = "flex min-h-11 items-center rounded px-2 hover:bg-muted underline-offset-4 hover:underline";

export function SearchDialog() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const results = trimmed ? searchProducts(getProducts(), trimmed, 6) : getFeaturedProducts().slice(0, 4);

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="icon" className="size-11" aria-label="Search the shop" />}>
        <SearchIcon aria-hidden strokeWidth={1.5} className="size-5" />
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Search the shop</DialogTitle>
          <DialogDescription>Search by name, kind of piece or glaze.</DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="site-search" className="sr-only">
            Search pieces
          </Label>
          <Input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mug, bowl, honey..."
            autoComplete="off"
            className="h-11 rounded border-field bg-background px-3"
          />
        </div>
        {trimmed ? null : (
          <div>
            <p className="text-label mb-2">Browse</p>
            <ul className="flex flex-wrap gap-2">
              {getCategories().map((c) => (
                <li key={c.id}>
                  <DialogClose render={<Link href={`/shop/${c.slug}`} />} className="inline-flex min-h-11 items-center rounded border border-field px-3 text-sm hover:bg-muted">
                    {c.name}
                  </DialogClose>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div role="status" aria-live="polite">
          <p className="text-label mb-2">{trimmed ? `Results for “${trimmed}”` : "Popular pieces"}</p>
          {results.length === 0 ? (
            <p className="text-sm">No pieces match “{trimmed}”. Try a kind of piece or a glaze.</p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <DialogClose render={<Link href={`/products/${p.slug}`} />} className={linkClass}>
                    {p.name}
                  </DialogClose>
                </li>
              ))}
            </ul>
          )}
          {trimmed ? (
            <DialogClose render={<Link href={`/shop?q=${encodeURIComponent(trimmed)}`} />} className={`${linkClass} mt-2 font-medium`}>
              See all results in the shop
            </DialogClose>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
