export type User = {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
};

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
};

export type Product = {
  id: number;
  title: string;
  price: number;
};

export type StatementRow = {
  orderId: number;
  date: string;
  amount: number;
  totalItems: number;
  productTitles: string;
};

export type Row = {
  postingDate: string;
  amount: string;
  drCr: string;
  narrative1: string;
  narrative2: string;
  narrative3: string;
};
