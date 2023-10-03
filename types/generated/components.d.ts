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
    description: Attribute.String & Attribute.Required;
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
    description: Attribute.String & Attribute.Required;
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
    description: Attribute.String & Attribute.Required;
  };
}

export interface ArticlesTitleArticle extends Schema.Component {
  collectionName: 'components_articles_title_articles';
  info: {
    displayName: 'TitleArticle';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    levelTitle: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
        max: 6;
      }> &
      Attribute.DefaultTo<1>;
  };
}

export interface OrderAdress extends Schema.Component {
  collectionName: 'components_order_adresses';
  info: {
    displayName: 'Adress';
    description: '';
  };
  attributes: {
    cyty: Attribute.String & Attribute.Required;
    branchNumber: Attribute.String;
    street: Attribute.String;
    delivery_service: Attribute.Relation<
      'order.adress',
      'oneToOne',
      'api::delivery-service.delivery-service'
    >;
  };
}

export interface OrderProductsOrder extends Schema.Component {
  collectionName: 'components_order_products_orders';
  info: {
    displayName: 'ProductsOrder';
    icon: 'bulletList';
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
    shortContent: Attribute.String & Attribute.DefaultTo<''>;
    firstName: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    secondName: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Attribute.DefaultTo<''>;
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
      'order.adress': OrderAdress;
      'order.products-order': OrderProductsOrder;
      'product.videos': ProductVideos;
      'review.reply-review': ReviewReplyReview;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
