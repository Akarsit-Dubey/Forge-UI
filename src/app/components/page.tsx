"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Star,
  Layers,
  ArrowRight,
  LayoutGrid,
  List,
  Sliders,
  BookOpen,
  Filter,
} from "lucide-react";
import { allComponents, categories } from "@/registry";
import { ComponentDefinition } from "@/registry/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlaygroundStore } from "@/store/playground-store";

export default function ComponentsGalleryPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { favorites, toggleFavorite, selectComponent } = usePlaygroundStore();

  const filteredComponents = allComponents
    .filter((comp) => {
      const matchesSearch =
        comp.name.toLowerCase().includes(search.toLowerCase()) ||
        comp.description.toLowerCase().includes(search.toLowerCase()) ||
        comp.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        comp.category.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        selectedCategory === "All" || comp.category === selectedCategory;

      const matchesFav = showOnlyFavorites ? favorites.includes(comp.id) : true;

      return matchesSearch && matchesCat && matchesFav;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.category.localeCompare(b.category);
    });

  const handleOpenInPlayground = (id: string) => {
    selectComponent(id);
    router.push("/playground");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Component Library
          </Badge>
          <span className="text-xs text-muted-foreground">
            {allComponents.length} production-grade primitives
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Components
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Beautifully crafted, accessible UI components. Custom-engineered with
          Radix UI primitives and Tailwind CSS.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-5">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, category, or tag (e.g., modal, button)..."
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* View Toggle & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Favorites filter button */}
          <Button
            variant={showOnlyFavorites ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className="h-8 text-xs gap-1.5"
          >
            <Star
              className={`h-3.5 w-3.5 ${
                showOnlyFavorites ? "fill-amber-500 text-amber-500" : ""
              }`}
            />
            <span>Favorites ({favorites.length})</span>
          </Button>

          {/* Grid / List View Toggle */}
          <div className="flex items-center rounded-md border border-border/80 bg-muted/30 p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${
                viewMode === "list"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground"
              }`}
              title="List View"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === "All"
              ? "bg-foreground text-background font-semibold"
              : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          All ({allComponents.length})
        </button>
        {categories.map((cat) => {
          const count = allComponents.filter((c) => c.category === cat).length;
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                isSelected
                  ? "bg-foreground text-background font-semibold"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Components Presentation */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => {
            const isFav = favorites.includes(component.id);

            return (
              <div
                key={component.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-all hover:shadow-md"
              >
                {/* Card Live Preview Showcase */}
                <div className="relative flex h-44 w-full items-center justify-center bg-dots-pattern p-4 border-b border-border/60 overflow-hidden">
                  <div className="pointer-events-none scale-90 sm:scale-100 transition-transform group-hover:scale-105">
                    <component.component
                      props={component.defaultProps}
                      visualStyles={{}}
                    />
                  </div>

                  {/* Favorite button in corner */}
                  <button
                    onClick={() => toggleFavorite(component.id)}
                    className={`absolute right-3 top-3 rounded-md p-1.5 bg-background/80 backdrop-blur border border-border/60 transition-transform hover:scale-110 ${
                      isFav ? "text-amber-500" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Star
                      className={`h-3.5 w-3.5 ${isFav ? "fill-amber-500" : ""}`}
                    />
                  </button>

                  <Badge
                    variant="outline"
                    className="absolute left-3 top-3 text-[10px] font-mono bg-background/80 backdrop-blur"
                  >
                    {component.category}
                  </Badge>
                </div>

                {/* Card Meta & Links */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {component.name}
                      </h3>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {component.props.length} props
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {component.description}
                    </p>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <Link
                      href={`/docs/${component.id}`}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <BookOpen className="h-3 w-3" />
                      <span>Docs</span>
                    </Link>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleOpenInPlayground(component.id)}
                      className="h-7 text-xs gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <Sliders className="h-3 w-3" />
                      <span>Customize</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-border/80 divide-y divide-border/60 bg-card overflow-hidden">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-muted/40 font-mono text-xs font-semibold">
                  {component.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-xs text-foreground">
                      {component.name}
                    </h4>
                    <Badge variant="outline" className="text-[10px]">
                      {component.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {component.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/docs/${component.id}`}>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View API
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() => handleOpenInPlayground(component.id)}
                  className="h-7 text-xs gap-1"
                >
                  <Sliders className="h-3 w-3" />
                  <span>Open</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredComponents.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            No components match your search filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
              setShowOnlyFavorites(false);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
