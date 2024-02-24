export interface IFilters {
  [key: string]: string | string[];
}

const getSelectQuery = () => {
  return `select DISTINCT
	          p.id as product_id
          from products as p`;
};

const getFilterCategories = (category: string) => {
  if (!category) return "";

  return `	INNER JOIN products_categories_links as pcl on p.id = pcl.product_id
           	INNER JOIN categories as c on pcl.category_id = c.id  and c.slug='${category}' `;
};

const getWherePrice = (price = "") => {
  return !price ? "" : `p.price < ${price}`;
};

const getFilterValueCharacteristic = (
  value: string | string[],
  fieldName = "cpc.value"
) => {
  const values = typeof value === "string" ? [value] : value;

  const filters = values
    .map((valueFilter) => `${fieldName} = '${valueFilter}'`)
    .join(" or ");

  return filters;
};

const getCharacteristicSQL = (id: string, value: string | string[]): string => {
  // and cpc.value = '${value}'
  if (id !== "language")
    return `
        select pcomp.entity_id from products_components as pcomp 
				INNER JOIN components_product_characteristics_characteristic_links as cpccl 
					on pcomp.component_id = cpccl.characteristic_id
					 and pcomp.field='characteristics'
					 and cpccl.sharacteristic_id = ${id}
				INNER JOIN components_product_characteristics as cpc 
					on cpccl.characteristic_id = cpc.id 
					and  (${getFilterValueCharacteristic(value)})
          `;

  return `
        select pcomp.entity_id from products_components as pcomp 
				INNER JOIN components_product_languages as cpl
            on pcomp.component_id = cpl.id
              and pcomp.field='languages'
              and  (${getFilterValueCharacteristic(value, "cpl.language")})
        `;
};

const getWhereCharacteristic = (
  id: string,
  value: string | string[]
): string => {
  return `
      p.id in(
			    ${getCharacteristicSQL(id, value)}
			)
  `;
};

const getArrayWhere = (filters: IFilters): string[] => {
  return Object.keys(filters).map((id) => {
    const characteristic_id = id.replace("id_", "");
    const valuePrice = filters[id];

    if (characteristic_id === "price")
      return getWherePrice(
        typeof valuePrice === "string" ? valuePrice : valuePrice[0]
      );

    return getWhereCharacteristic(characteristic_id, filters[id]);
  });
};

const getWhere = (filters: IFilters) => {
  const arrayWhere = getArrayWhere(filters);

  const textWhere = arrayWhere.join(" and ");

  return !textWhere ? "" : `where ${textWhere}`;
};

export const createSqlText = (filters: IFilters, category: string): string => {
  return `${getSelectQuery()}
          ${getFilterCategories(category)}
          ${getWhere(filters)}
          `;
};

export const createSqlTextGetListFilters = (filterCategory: string): string => {
  const filter = !!filterCategory ? `and c.slug='${filterCategory}'` : "";

  return `select subquery.characteristics_id  as id,
              subquery.sort,
              subquery.icon,
              subquery.title_characteristic as title,                
              json_agg(subquery.value_characteristic ORDER BY subquery.value_characteristic) as value, 
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
              
              UNION ALL

              select 'language' as characteristics_id,
                2 as sort,
                'language' as icon,
                'Мова' as title_characteristic,
                cpl.language as value_characteristic,
				        count(p.id) as count                     
              from products as p
                    INNER JOIN products_components as pcomp  on p.id = pcomp.entity_id and field='languages'
					          INNER JOIN components_product_languages as cpl on pcomp.component_id = cpl.id
					          INNER JOIN products_categories_links as pcl on p.id = pcl.product_id
                    INNER JOIN categories as c on pcl.category_id = c.id  ${filter}
              GROUP BY  characteristics_id, title_characteristic, value_characteristic, icon


                    ) as subquery
        GROUP BY  characteristics_id, title_characteristic, sort, icon
        order BY  sort`;
};
// ! ------------
`select DISTINCT
	p.id as product_id
from products as p
			INNER JOIN products_categories_links as pcl on p.id = pcl.product_id
     	INNER JOIN categories as c on pcl.category_id = c.id  and c.slug='voyovnichi'
				
where p.id in(
		    select pcomp.entity_id from products_components as pcomp 
				INNER JOIN components_product_characteristics_characteristic_links as cpccl 
					on pcomp.component_id = cpccl.characteristic_id
					 and pcomp.field='characteristics'
					 and cpccl.sharacteristic_id = 2
				INNER JOIN components_product_characteristics as cpc 
					on cpccl.characteristic_id = cpc.id 
					and (cpc.value = '18+' or cpc.value = '18+')
			)
			
	and 
			
	p.id in(
			    select pcomp.entity_id from products_components as pcomp 
				INNER JOIN components_product_characteristics_characteristic_links as cpccl 
					on pcomp.component_id = cpccl.characteristic_id
					 and pcomp.field='characteristics'
					 and cpccl.sharacteristic_id = 1
				INNER JOIN components_product_characteristics as cpc 
					on cpccl.characteristic_id = cpc.id 
					and cpc.value = '5-8'
			)

      and p.price < 100
			`;
