export interface ReviewFilter {
  stars: number;
  productId: string;
  productOrService: 'product' | 'service';
  date: Date;
  name: string;
  type: 'bix' | 'nps';
}
