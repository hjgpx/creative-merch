import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold mb-4">CreativeShop</h4>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Discover the beauty in everyday life with our curated selection of creative products and handcrafted treasures.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Product Categories</h5>
            <ul className="space-y-2">
              <li><Link href="/products?category=stationery"><span className="text-muted-foreground hover:text-primary-foreground transition-colors cursor-pointer">Stationery</span></Link></li>
              <li><Link href="/products?category=ceramics"><span className="text-muted-foreground hover:text-primary-foreground transition-colors cursor-pointer">Ceramics</span></Link></li>
              <li><Link href="/products?category=home-decor"><span className="text-muted-foreground hover:text-primary-foreground transition-colors cursor-pointer">Home Decor</span></Link></li>
              <li><Link href="/products?category=art-supplies"><span className="text-muted-foreground hover:text-primary-foreground transition-colors cursor-pointer">Art Supplies</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Customer Service</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary-foreground transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary-foreground transition-colors">Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary-foreground transition-colors">FAQ</a></li>
              <li><Link href="/contact"><span className="text-muted-foreground hover:text-primary-foreground transition-colors cursor-pointer">Contact Us</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Contact Info</h5>
            <div className="space-y-3 text-muted-foreground">
              <div>
                <p>Phone: (555) 123-4567</p>
              </div>
              <div>
                <p>Email: hello@creativeshop.com</p>
              </div>
              <div>
                <p>Address: 123 Creative Street, Art District, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-muted-foreground/20 pt-8 text-center">
          <p className="text-muted-foreground">© 2024 CreativeShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
