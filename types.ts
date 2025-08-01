export enum DeliveryStatus {
  Pendente = 'Pendente',
  EmTransito = 'Em trânsito',
  Entregue = 'Entregue',
  Falha = 'Falha na entrega',
}

export enum PaymentMethod {
  Dinheiro = 'Dinheiro',
  Pix = 'Pix',
  CartaoCredito = 'Cartão de Crédito',
  CartaoDebito = 'Cartão de Débito',
}

export interface Delivery {
  id: string;
  recipientName: string;
  address: string;
  packageDescription: string;
  status: DeliveryStatus;
  createdAt: string; // ISO string
  deliveryPerson: string;
  paymentMethod: PaymentMethod;
  deliveryFee: number;
  notes?: string;
}