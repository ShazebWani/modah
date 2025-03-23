export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  mainCategory?: string;
  sellerId: number;
  stock: number;
  rating: number;
  inCarts: number;
  forYou?: boolean;
  popular?: boolean;
}

export interface SellerType {
  id: string;
  name: string;
  location: string;
  image: string;
  profilePic: string;
  rating: number;
}

export interface CartItemType {
  id: string;
  productId: string;
  quantity: number;
  product: {
    title: string;
    price: number;
    stock: number;
    inCarts: number;
    images: string[];
  };
  seller: {
    profilePic: string;
    name: string;
  };
}

