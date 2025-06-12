# Creative Products E-commerce Website

A modern e-commerce website for selling creative and handcrafted products, built with React, Express, and TypeScript.

## Features

- **Product Catalog**: Browse products across 4 categories (Stationery, Ceramics, Home Decor, Art Supplies)
- **Shopping Cart**: Add, remove, and update item quantities
- **Checkout System**: Complete order form with customer information
- **Search & Filter**: Find products by category, price, rating, and keywords
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Product Details**: Detailed product pages with ratings and stock information

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd creative-shop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory data storage
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

### Products
- `GET /api/products` - Get all products with optional filters
- `GET /api/products/:id` - Get product by ID

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug

### Shopping Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

## Features Overview

### Product Management
- 8 sample products across 4 categories
- Product ratings and reviews
- Stock management
- Sale and promotional badges

### Shopping Experience
- Persistent shopping cart
- Real-time cart updates
- Free shipping threshold ($100)
- Order confirmation system

### UI/UX
- Modern, warm color scheme
- Mobile-responsive design
- Loading states and error handling
- Toast notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.