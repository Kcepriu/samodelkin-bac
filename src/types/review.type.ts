export interface IResponseReview {
  data: IReview | null;
}

export interface IReview {
  id: number;
  attributes: {
    date: string;
    rating: number;
    content: string;
    advantages: string;
    disAdvantages: string;
    createdAt: string;
    updatedAt: string;
    shortContent: string;
    isPublication: boolean;
    firstName: string;
    lastName: any;
    rank: any;
    product: IProduct;
    replyReview: any[];
  };
}

export interface IProduct {
  data: {
    id: number;
    attributes: {
      code: string;
      createdAt: string;
      updatedAt: string;
      countPlayers: number;
      slug: string;
      descrition: string;
      title: string;
      price: number;
      available: boolean;
      additions: boolean;
      dicount: any;
      salesLeader: any;
      // images: Images;
    };
  };
}
