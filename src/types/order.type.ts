export interface IResponseOrder {
  data: IOrder | null;
}

export interface IOrder {
  id: number;
  attributes: {
    date: string;
    totalSum: number;
    createdAt: string;
    updatedAt: string;
    comment: string;
    products: IProductsOrder[];
    addressDelivery?: IAddressDelivery;
    contactInformation?: IContactInformation;
  };
}

export interface IProductsOrder {
  id: number;
  count: number;
  sum: number;
  price: number;
  product: IProductRespone;
  language: ILanguage;
}

export interface IProductRespone {
  data: IProduct;
}

export interface IProduct {
  id: number;
  attributes: {
    code: string;
    slug: string;
    descrition: string;
    title: string;
    price: number;
    images: IImages;
    languages: ILanguage[];
  };
}

export interface IImages {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText?: string;
      caption: any;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: any;
          size: number;
          width: number;
          height: number;
          provider_metadata: {
            public_id: string;
            resource_type: string;
          };
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: any;
      provider: string;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export interface ILanguage {
  id: number;
  language: string;
}

export interface IAddressDelivery {
  id: number;
  city: string;
  branchNumber: string;
  street: string;
  idCity: string;
  postOffice: string;
  idPostOffice: string;
  delivery_service: {
    data: {
      id: number;
      attributes: {
        title: string;
        slug: string;
        active: boolean;
        createdAt: string;
        updatedAt: string;
        homeDelivery: boolean;
        postOfficeDelivery: boolean;
      };
    };
  };
}

export interface IContactInformation {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}
