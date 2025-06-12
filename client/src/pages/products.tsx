import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Filter, Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store";
import type { Product, Category } from "@shared/schema";

export default function Products() {
  const [location] = useLocation();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = urlParams.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory, searchQuery, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) {
        const category = categories.find(c => c.slug === selectedCategory);
        if (category) {
          params.append('categoryId', category.id.toString());
        }
      }
      if (searchQuery) params.append('search', searchQuery);
      if (sortBy) params.append('sortBy', sortBy);
      
      const response = await fetch(`/api/products?${params}`);
      return response.json();
    },
    enabled: categories.length > 0,
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setSortBy('');
  };

  const filters = [
    { key: 'all', label: 'All Products', active: !selectedCategory },
    { key: 'new', label: 'New', active: false },
    { key: 'hot', label: 'Hot', active: false },
    { key: 'sale', label: 'On Sale', active: false },
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'new') return product.isNew;
    if (selectedCategory === 'hot') return product.isHot;
    if (selectedCategory === 'sale') return product.isOnSale;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Products</h1>
          <p className="text-muted-foreground">Discover our collection of unique creative products</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Category and Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.slug ? null : category.slug
                )}
                className={selectedCategory === category.slug ? 'bg-accent hover:bg-accent/90' : ''}
              >
                {category.name}
              </Button>
            ))}
            {filters.slice(1).map((filter) => (
              <Button
                key={filter.key}
                variant={selectedCategory === filter.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(
                  selectedCategory === filter.key ? null : filter.key
                )}
                className={selectedCategory === filter.key ? 'bg-accent hover:bg-accent/90' : ''}
              >
                {filter.label}
              </Button>
            ))}
            {(selectedCategory || searchQuery || sortBy) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {isLoading ? 'Loading...' : `${filteredProducts.length} products found`}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-64 rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
            <Button onClick={clearFilters} className="bg-accent hover:bg-accent/90">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
