import { Users, Award, ShoppingBag, Star, Heart, Palette, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  const stats = [
    { icon: ShoppingBag, label: "Curated Products", value: "1000+" },
    { icon: Users, label: "Partner Designers", value: "50+" },
    { icon: Star, label: "Happy Customers", value: "10000+" },
    { icon: Award, label: "Satisfaction Rate", value: "99%" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Crafted with Love",
      description: "Every product is selected with care, ensuring quality and uniqueness in each piece."
    },
    {
      icon: Palette,
      title: "Artistic Excellence",
      description: "We collaborate with talented artists and designers to bring you truly exceptional creative works."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connecting creators and customers worldwide through the universal language of art."
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b05b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      description: "With 10 years in the art industry, Sarah founded CreativeShop to support independent artists and bring unique designs to everyday life."
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Curation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      description: "Michael travels the world discovering emerging artists and handcrafted treasures that tell meaningful stories."
    },
    {
      name: "Emma Thompson",
      role: "Customer Experience Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      description: "Emma ensures every customer has an exceptional shopping experience and connects with the stories behind each product."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-warm-50 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              About <span className="text-accent">CreativeShop</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're passionate about discovering and sharing exceptional creative products that inspire and delight. 
              Our mission is to connect talented artists with people who appreciate beautiful, meaningful design.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020, CreativeShop began as a small passion project to showcase the incredible work 
                  of independent artists and craftspeople. What started as a curated collection of handmade items 
                  has grown into a thriving community of creators and art lovers.
                </p>
                <p>
                  We believe that beautiful, thoughtfully designed objects have the power to inspire joy and 
                  creativity in everyday life. That's why we carefully select each product in our collection, 
                  working directly with artists to ensure authenticity and quality.
                </p>
                <p>
                  Today, we're proud to support over 50 independent designers and artists from around the world, 
                  helping them share their unique vision with customers who truly appreciate handcrafted excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Creative workspace with artistic tools"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, label, value }, index) => (
              <div key={index} className="text-center">
                <Icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                <div className="text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our commitment to creativity, quality, and community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <Icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind CreativeShop who work tirelessly to bring you the best in creative design
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                  <p className="text-accent font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-warm-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Creative Community</h2>
          <p className="text-accent-foreground/90 mb-8 text-lg leading-relaxed">
            Whether you're an artist looking to showcase your work or a customer seeking unique creative products, 
            we'd love to have you as part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
                Shop Our Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-accent">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
