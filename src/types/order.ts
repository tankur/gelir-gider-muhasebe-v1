import { OrderStatus } from '../constants/orderStatuses';

export interface OrderItem {
  id: number;
  productCode: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CakimDetail {
  id: number;
  boy: string;
  adet: string;
}

export interface StoneDetail {
  id: number;
  tasCinsi: 'dmc' | 'duble' | 'kare' | 'spaciel';
  boyut: string;
  renk: string;
  adet: string;
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  companyName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  notes?: string;
  isAdedi?: string;
  modelKodu?: string;
  cakimYeri?: string;
  cakimDetaylari?: CakimDetail[];
  tasDetaylari?: StoneDetail[];
  unitPrice?: string;
}