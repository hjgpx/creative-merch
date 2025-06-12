import { Link } from "wouter";
import { ArrowRight, Star, Users, Award, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import type { Product, Category } from "@shared/schema";

export default function Home() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: featuredProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const stats = [
    { icon: ShoppingBag, label: "Products", value: "1000+" },
    { icon: Users, label: "Designers", value: "50+" },
    { icon: Star, label: "Happy Customers", value: "10000+" },
    { icon: Award, label: "Satisfaction", value: "99%" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-warm-50 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
                Discover Unique
                <span className="text-accent block">Creative Art</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Curated handcrafted products and original designer works that add artistic flair to your life. 
                Every piece carries the heart of the artisan and the soul of creativity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Creative products showcase" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Featured Categories</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated categories of creative products, each collection featuring the finest handcrafted items and designer works
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`}>
                <Card className="group cursor-pointer hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-semibold mb-1">{category.name}</h4>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Featured Products</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular creative products, each piece carefully selected for its quality and artistic merit
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6">About CreativeShop</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded in 2020, CreativeShop is dedicated to discovering and promoting exceptional creative products and handcrafted items. 
                We collaborate with designers and artisans from around the world to bring you unique, heartwarming lifestyle products.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Every product is carefully selected to ensure the perfect combination of quality and design. 
                We believe that every detail in life deserves careful attention.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map(({ icon: Icon, label, value }, index) => (
                  <div key={index} className="text-center">
                    <Icon className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="text-3xl font-bold text-accent mb-2">{value}</div>
                    <div className="text-muted-foreground text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Creative workspace" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-warm-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-accent-foreground/90 mb-8 text-lg">
            Be the first to know about new creative products and limited-time offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Button className="bg-white text-accent hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
