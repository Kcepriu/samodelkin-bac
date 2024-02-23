import type { Schema, Attribute } from '@strapi/strapi';

export interface ArticlesContentImage extends Schema.Component {
  collectionName: 'components_articles_content_images';
  info: {
    displayName: 'ContentImage';
    description: '';
  };
  attributes: {
    content: Attribute.RichText & Attribute.Required;
    image: Attribute.Media;
    percentImage: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }> &
      Attribute.DefaultTo<50>;
    reverseDirection: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<''>;
  };
}

export interface ArticlesContent extends Schema.Component {
  collectionName: 'components_articles_contents';
  info: {
    displayName: 'Content';
    description: '';
  };
  attributes: {
    content: Attribute.RichText & Attribute.Required;
    description: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<''>;
  };
}

export interface ArticlesImage extends Schema.Component {
  collectionName: 'components_articles_images';
  info: {
    displayName: 'Image';
    icon: 'picture';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    description: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<''>;
  };
}

export interface ArticlesTitleArticle extends Schema.Component {
  collectionName: 'components_articles_title_articles';
  info: {
    displayName: 'TitleArticle';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.DefaultTo<''>;
    levelTitle: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
        max: 6;
      }> &
      Attribute.DefaultTo<1>;
  };
}

export interface OrderAddress extends Schema.Component {
  collectionName: 'components_order_addresses';
  info: {
    displayName: 'Address';
    description: '';
  };
  attributes: {
    city: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 250;
      }> &
      Attribute.DefaultTo<''>;
    branchNumber: Attribute.String & Attribute.DefaultTo<''>;
    street: Attribute.String & Attribute.DefaultTo<''>;
    delivery_service: Attribute.Relation<
      'order.address',
      'oneToOne',
      'api::delivery-service.delivery-service'
    >;
    idCity: Attribute.String & Attribute.DefaultTo<''>;
    postOffice: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 250;
      }> &
      Attribute.DefaultTo<''>;
    idPostOffice: Attribute.String & Attribute.DefaultTo<''>;
  };
}

export interface OrderContactInformation extends Schema.Component {
  collectionName: 'components_order_contact_informations';
  info: {
    displayName: 'contactInformation';
    description: '';
  };
  attributes: {
    firstName: Attribute.String & Attribute.DefaultTo<''>;
    lastName: Attribute.String & Attribute.DefaultTo<''>;
    phoneNumber: Attribute.String & Attribute.DefaultTo<''>;
    email: Attribute.Email & Attribute.DefaultTo<''>;
  };
}

export interface OrderProductsOrder extends Schema.Component {
  collectionName: 'components_order_products_orders';
  info: {
    displayName: 'ProductsOrder';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    product: Attribute.Relation<
      'order.products-order',
      'oneToOne',
      'api::product.product'
    >;
    count: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    sum: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    language: Attribute.Component<'product.languages'>;
  };
}

export interface ProductCharacteristic extends Schema.Component {
  collectionName: 'components_product_characteristics';
  info: {
    displayName: 'Characteristic';
    description: '';
  };
  attributes: {
    value: Attribute.String;
    characteristic: Attribute.Relation<
      'product.characteristic',
      'oneToOne',
      'api::sharacteristic.sharacteristic'
    >;
  };
}

export interface ProductLanguages extends Schema.Component {
  collectionName: 'components_product_languages';
  info: {
    displayName: 'languages';
    icon: 'earth';
  };
  attributes: {
    language: Attribute.Enumeration<['ua', 'us', 'ru']> &
      Attribute.Required &
      Attribute.DefaultTo<'ua'>;
  };
}

export interface ProductManual extends Schema.Component {
  collectionName: 'components_product_manuals';
  info: {
    displayName: 'manual';
    icon: 'bold';
    description: '';
  };
  attributes: {
    file: Attribute.Media;
    description: Attribute.String;
    languages: Attribute.Enumeration<['ua', 'us', 'ru']> &
      Attribute.DefaultTo<'ua'>;
  };
}

export interface ProductVideos extends Schema.Component {
  collectionName: 'components_product_videos';
  info: {
    displayName: 'Videos';
    icon: 'crown';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    active: Attribute.Boolean & Attribute.DefaultTo<false>;
    url: Attribute.String & Attribute.Required;
  };
}

export interface ReviewReplyReview extends Schema.Component {
  collectionName: 'components_review_reply_reviews';
  info: {
    displayName: 'ReplyReview';
    description: '';
  };
  attributes: {
    content: Attribute.Text & Attribute.Required;
    date: Attribute.DateTime;
    isPublication: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    shortContent: Attribute.String;
    firstName: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    lastName: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    user: Attribute.Relation<
      'review.reply-review',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'articles.content-image': ArticlesContentImage;
      'articles.content': ArticlesContent;
      'articles.image': ArticlesImage;
      'articles.title-article': ArticlesTitleArticle;
      'order.address': OrderAddress;
      'order.contact-information': OrderContactInformation;
      'order.products-order': OrderProductsOrder;
      'product.characteristic': ProductCharacteristic;
      'product.languages': ProductLanguages;
      'product.manual': ProductManual;
      'product.videos': ProductVideos;
      'review.reply-review': ReviewReplyReview;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
