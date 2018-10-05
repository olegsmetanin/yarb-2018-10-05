export interface IMerchant {
  id: string
  firstname: string
  lastname: string
  avatarUrl: string
  email: string
  phone: string
  hasPremium: boolean
  created: string
}

export interface IMerchantCreateRequest {
  firstname: string
  lastname: string
  avatarUrl: string
  email: string
  phone: string
}

export interface IMerchantsQuery {
  sort?: string
  after?: string
}

export interface IMerchantQuery {
  merchantId: string
}

export interface IMerchantBid {
  id: string
  merchantId: string
  bidId: string
}

export interface IBidsQuery {
  merchantId?: string
  sort?: string
  after?: string
}

export interface IBid {
  id: string
  carTitle: string
  amount: number
  created: string
}
