import { 
  categories, products, cartItems, orders, orderItems,
  type Category, type Product, type CartItem, type Order, type OrderItem,
  type InsertCategory, type InsertProduct, type InsertCartItem, type InsertOrder 
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(filters?: { categoryId?: number; search?: string; sortBy?: string }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProductStock(id: number, stock: number): Promise<void>;

  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<void>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Orders
  createOrder(order: InsertOrder, items: { productId: number; quantity: number; price: string }[]): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<(OrderItem & { product: Product })[]>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData = [
      { name: "Stationery", slug: "stationery", description: "Creative stationery and desk accessories", imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Ceramics", slug: "ceramics", description: "Handmade pottery and ceramic crafts", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Home Decor", slug: "home-decor", description: "Artistic home decoration items", imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" },
      { name: "Art Supplies", slug: "art-supplies", description: "Professional art and craft supplies", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { ...cat, id: this.currentCategoryId++ };
      this.categories.set(category.id, category);
    });

    // Initialize products
    const productsData = [
      {
        name: "Handcrafted Leather Notebook",
        description: "Premium leather notebook with handmade paper, perfect for journaling and creative writing.",
        price: "158.00",
        originalPrice: "200.00",
        imageUrl: "https://images.unsplash.com/photo-1544378730-6f8b3cd0e0c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 1,
        stock: 25,
        isNew: true,
        isOnSale: true,
        rating: "4.8",
        reviewCount: 24
      },
      {
        name: "Hand-painted Ceramic Mug",
        description: "Unique ceramic mug with artistic hand-painted patterns, making every tea time special.",
        price: "89.00",
        imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 2,
        stock: 30,
        rating: "4.5",
        reviewCount: 18
      },
      {
        name: "Washi Tape Collection",
        description: "Set of 12 beautiful washi tapes with various patterns, perfect for crafting and decoration.",
        price: "45.00",
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 1,
        stock: 50,
        isHot: true,
        rating: "4.9",
        reviewCount: 32
      },
      {
        name: "Wooden Desk Organizer",
        description: "Natural wood desk organizer with multiple compartments for a tidy workspace.",
        price: "128.00",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 3,
        stock: 15,
        rating: "4.6",
        reviewCount: 15
      },
      {
        name: "Watercolor Paint Set",
        description: "Professional watercolor paint set with 24 vibrant colors and brushes.",
        price: "85.00",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 4,
        stock: 20,
        isNew: true,
        rating: "4.7",
        reviewCount: 28
      },
      {
        name: "Ceramic Succulent Planter",
        description: "Handmade ceramic planter perfect for small succulents and air plants.",
        price: "65.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 2,
        stock: 35,
        rating: "4.4",
        reviewCount: 22
      },
      {
        name: "Vintage Fountain Pen",
        description: "Classic fountain pen with smooth ink flow, ideal for calligraphy and writing.",
        price: "220.00",
        imageUrl: "https://images.unsplash.com/photo-1544378730-6f8b3cd0e0c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 1,
        stock: 10,
        rating: "4.8",
        reviewCount: 19
      },
      {
        name: "Macramé Wall Hanging",
        description: "Handwoven macramé wall decoration to add bohemian charm to any room.",
        price: "95.00",
        imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        categoryId: 3,
        stock: 18,
        isHot: true,
        rating: "4.6",
        reviewCount: 31
      }
    ];

    productsData.forEach(prod => {
      const product: Product = { 
        ...prod, 
        id: this.currentProductId++,
        createdAt: new Date()
      };
      this.products.set(product.id, product);
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = { ...category, id: this.currentCategoryId++ };
    this.categories.set(newCategory.id, newCategory);
    return newCategory;
  }

  async getProducts(filters?: { categoryId?: number; search?: string; sortBy?: string }): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (filters?.categoryId) {
      products = products.filter(p => p.categoryId === filters.categoryId);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'price-desc':
          products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case 'newest':
          products.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
          break;
        case 'rating':
          products.sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
          break;
      }
    }
    
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.categoryId === categoryId);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct: Product = { 
      ...product, 
      id: this.currentProductId++,
      createdAt: new Date()
    };
    this.products.set(newProduct.id, newProduct);
    return newProduct;
  }

  async updateProductStock(id: number, stock: number): Promise<void> {
    const product = this.products.get(id);
    if (product) {
      product.stock = stock;
      this.products.set(id, product);
    }
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    return items.map(item => ({
      ...item,
      product: this.products.get(item.productId!)!
    })).filter(item => item.product);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      cartItem => cartItem.sessionId === item.sessionId && cartItem.productId === item.productId
    );
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }
    
    const newItem: CartItem = { 
      ...item, 
      id: this.currentCartItemId++,
      createdAt: new Date()
    };
    this.cartItems.set(newItem.id, newItem);
    return newItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<void> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
    }
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id, _]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
  }

  async createOrder(order: InsertOrder, items: { productId: number; quantity: number; price: string }[]): Promise<Order> {
    const newOrder: Order = { 
      ...order, 
      id: this.currentOrderId++,
      createdAt: new Date()
    };
    this.orders.set(newOrder.id, newOrder);
    
    // Create order items
    for (const item of items) {
      const orderItem: OrderItem = {
        id: this.currentOrderItemId++,
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      };
      this.orderItems.set(orderItem.id, orderItem);
      
      // Update product stock
      await this.updateProductStock(item.productId, 
        (this.products.get(item.productId)?.stock || 0) - item.quantity
      );
    }
    
    return newOrder;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderItems(orderId: number): Promise<(OrderItem & { product: Product })[]> {
    const items = Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
    return items.map(item => ({
      ...item,
      product: this.products.get(item.productId!)!
    })).filter(item => item.product);
  }
}

export const storage = new MemStorage();
