/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      const { characteristics: filterCharacteristics = null } =
        ctx.request.query.filters &&
        typeof ctx.request.query.filters === "object"
          ? ctx.request.query.filters
          : {};
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filter = { characteristics: "" };

      console.log("filterCharacteristics", filterCharacteristics);

      const { characteristics, ...tmpFilter } =
        sanitizedQueryParams.filters &&
        typeof sanitizedQueryParams.filters === "object"
          ? {
              ...sanitizedQueryParams.filters,
              ...filter,
            }
          : filter;

      sanitizedQueryParams.filters = tmpFilter;

      const { results, pagination } = await strapi
        .service("api::product.product")
        .find(sanitizedQueryParams);
      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },

    async findOne(ctx) {
      const { id } = ctx.params;

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filter = !isNaN(+id) ? { id: id } : { slug: id };

      sanitizedQueryParams.filters =
        sanitizedQueryParams.filters &&
        typeof sanitizedQueryParams.filters === "object"
          ? {
              ...sanitizedQueryParams.filters,
              ...filter,
            }
          : filter;

      const { results, pagination } = await strapi
        .service("api::product.product")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },

    async getProductsByList(ctx) {
      const data = ctx.request.body;
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      sanitizedQueryParams.filters = {
        id: {
          $in: data,
        },
      };

      const entries = await strapi.entityService.findMany(
        "api::product.product",
        sanitizedQueryParams
      );

      const sanitizedResults = await this.sanitizeOutput(entries, ctx);

      return this.transformResponse(sanitizedResults);
    },

    async getFilters(ctx) {
      const { categories } = ctx.params;
      const filter = !!categories ? `and c.slug='${categories}'` : "";
      const resultsQuery = await strapi.db.connection.raw(
        `select subquery.characteristics_id  as id,
              subquery.sort,
              subquery.icon,
              subquery.title_characteristic as title,                
              json_agg(subquery.value_characteristic) as value, 
              json_agg(subquery.count) as count
        from 
            (
              select CAST(s.id AS TEXT) as characteristics_id,
                2 as sort,
                s.icon as icon,
                s.title as title_characteristic,
                cpc.value as value_characteristic,
                count(p.id) as count                     
                    from products as p
                      INNER JOIN products_components as pcomp  on p.id = pcomp.entity_id and field='characteristics'
                      INNER JOIN components_product_characteristics_characteristic_links as cpccl on pcomp.component_id = cpccl.characteristic_id
                      INNER JOIN components_product_characteristics as cpc on cpccl.characteristic_id = cpc.id
                      INNER JOIN sharacteristics as s on s.id = cpccl.sharacteristic_id and s.is_filter=true
                      INNER JOIN products_categories_links as pcl on p.id = pcl.product_id
                      INNER JOIN categories as c on pcl.category_id = c.id  ${filter}
              GROUP BY  characteristics_id, title_characteristic, value_characteristic, icon
                
              UNION ALL
                
              select 'price' as characteristics_id,  				
                  1 as sort,
                  '',
                  'Ціна' as title_characteristic,
                    CAST(max(p.price) as TEXT) as value_characteristic,  
                    count(p.id) as count  				
                      from products as p
                        INNER JOIN products_categories_links as pcl on p.id = pcl.product_id
                        INNER JOIN categories as c on pcl.category_id = c.id  ${filter}
                      GROUP BY characteristics_id, title_characteristic
                    ) as subquery
        GROUP BY  characteristics_id, title_characteristic, sort, icon
        order BY  sort`
      );

      const result = this.transformResponse(resultsQuery.rows);

      return result;
    },
  })
);
