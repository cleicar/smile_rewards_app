export type Customer = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  points_balance: number;
  referral_url?: string;
  state?: string;
};

declare global {
  interface Window {
    SmileUI: any;
    currentCustomer?: Customer | null;
  }
}
