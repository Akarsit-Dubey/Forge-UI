"use client";

import React, { useState } from "react";
import { Search, Star, Layers, ChevronDown } from "lucide-react";
import { allComponents, categories } from "@/registry";
import { ComponentDefinition } from "@/registry/schema";
import { usePlaygroundStore } from "@/store/playground-store";

interface ComponentSidebarProps {
  onSelectComponent: (id: string) => void;
}

export function ComponentSidebar({ onSelectComponent }: ComponentSidebarProps) {
  const [search, setSearch] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { selectedComponentId, favorites, toggleFavorite } = usePlaygroundStore();

  const filteredComponents = allComponents.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(search.toLowerCase()) ||
      comp.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      comp.category.toLowerCase().includes(search.toLowerCase());
    const matchesFav = showOnlyFavorites ? favorites.includes(comp.id) : true;
    return matchesSearch && matchesFav;
  });

  return (
    <aside className="w-64 border-r border-border/80 bg-background/50 flex flex-col h-full text-xs">
      {/* Header and Search */}
      <div className="p-3 border-b border-border/60 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Components</span>
            <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] text-muted-foreground">
              {allComponents.length}
            </span>
          </div>

          {/* Favorites toggle filter */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            title={showOnlyFavorites ? "Show all components" : "Filter by favorites"}
            className={`p-1 rounded transition-colors ${
              showOnlyFavorites
                ? "bg-amber-500/15 text-amber-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${showOnlyFavorites ? "fill-amber-500" : ""}`} />
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter components..."
            className="h-8 w-full rounded-md border border-input bg-muted/40 pl-8 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {categories.map((category) => {
          const categoryComponents = filteredComponents.filter(
            (c) => c.category === category
          );
          if (categoryComponents.length === 0) return null;

          return (
            <div key={category} className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                {category}
              </div>
              <div className="space-y-0.5">
                {categoryComponents.map((component) => {
                  const isSelected = selectedComponentId === component.id;
                  const isFav = favorites.includes(component.id);

                  return (
                    <div
                      key={component.id}
                      className={`group flex items-center justify-between rounded-md px-2.5 py-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                      onClick={() => onSelectComponent(component.id)}
                    >
                      <span className="truncate">{component.name}</span>

                      {/* Favorite toggle button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(component.id);
                        }}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:scale-110 ${
                          isFav ? "opacity-100 text-amber-500" : "text-muted-foreground"
                        }`}
                        title={isFav ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Star className={`h-3 w-3 ${isFav ? "fill-amber-500" : ""}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredComponents.length === 0 && (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No components match your search.
          </div>
        )}
      </div>
    </aside>
  );
}
