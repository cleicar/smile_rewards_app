export type Customer = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  points_balance: number;
  referral_url?: string;
  state?: string;
};

export type PointsProduct = {
  id: string;
  name: string;
  points_price: number;
  exchange_description: string;
  exchange_type: string;
};

export type Reward = {
  name: string;
  created_at: string;
  points_price: number;
  minimum_points_price: number;
  points_product: PointsProduct;
};

declare global {
  interface Window {
    SmileUI: any;
    currentCustomer?: Customer | null;
  }
}
