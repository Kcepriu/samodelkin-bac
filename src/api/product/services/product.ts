/**
 * product service
 */

import { factories } from "@strapi/strapi";
import { IFilters, createSqlText } from "../../../helpers/filtersProduct";

export default factories.createCoreService(
  "api::product.product",

  ({ strapi }) => ({
    async getFilteredProduct(
      filters: IFilters,
      category: string
    ): Promise<number[] | null> {
      const textSQL = createSqlText(filters, category);

      const resultsQuery = await strapi.db.connection.raw(textSQL);
      const rows = resultsQuery?.rows || [];
      return rows.map((elemen) => elemen.product_id);
    },
  })
);
