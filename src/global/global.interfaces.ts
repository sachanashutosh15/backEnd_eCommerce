export interface userLoginInfo {
  email: string;
  password: string;
}

export interface userSignUpInfo {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface userDetails {
  name: string,
  email: string,
  address: string
}

export interface inventoryItem {
  name: string,
  image: string,
  description: string,
  weight: number,
  quantity: number,
  price: number
}

export interface orderDetails {
  userId: string;
  productId: string;
  quantity: number;
  status: string;
}