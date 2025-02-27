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
