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
  variable_points_step: number;
  variable_points_step_reward_value: number;
  points_price_max: number;
};

export type Reward = {
  name: string;
  created_at: string;
  points_price: number;
  minimum_points_price: number;
  points_product: PointsProduct;
};

export type FulfilledReward = {
  id: string;
  name: string;
  imageUrl?: string;
  usageInstructions?: string;
  sourceDescription?: string;
  code?: string;
};


declare global {
  interface Window {
    SmileUI: any;
    currentCustomer?: Customer | null;
  }
}
