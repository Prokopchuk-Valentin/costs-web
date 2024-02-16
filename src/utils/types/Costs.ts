export interface Cost {
  text: string;
  price: number;
  date: Date;
  _id?: number | string;
}

interface BaseEffectProps {
  url: string;
  token: string;
}

export interface CreateCost extends BaseEffectProps {
  cost: Cost;
}

export interface GetCosts extends BaseEffectProps {}

export interface RefreshToken extends BaseEffectProps {
  userName: string;
}
