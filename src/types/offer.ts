export interface OfferProduct {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Offer {
  id: number;
  customerId: string | number;
  customerName: string;
  companyName?: string;
  products: OfferProduct[];
  totalAmount: number;
  currency: 'TRY' | 'USD' | 'EUR';
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  validUntil: string;
  terms: string;
  notes?: string;
}