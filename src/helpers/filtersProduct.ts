export interface IFilters {
  [key: string]: string;
}

const getSelectQuery = () => {
  return `select DISTINCT
	          p.id as product_id
          from products as p`;
};

const getFilterCategories = (category: string) => {
  if (!category) return "";

  return `	INNER JOIN products_categories_links as pcl on p.id = pcl.product_id
           	INNER JOIN categories as c on pcl.category_id = c.id  and c.slug='${category}'`;
};

const getWherePrice = (price = "") => {
  return !price ? "" : `p.price < ${price}`;
};

const getCharacteristicSQL = (id: string, value: string): string => {
  return `
        select pcomp.entity_id from products_components as pcomp 
				INNER JOIN components_product_characteristics_characteristic_links as cpccl 
					on pcomp.component_id = cpccl.characteristic_id
					 and pcomp.field='characteristics'
					 and cpccl.sharacteristic_id = ${id}
				INNER JOIN components_product_characteristics as cpc 
					on cpccl.characteristic_id = cpc.id 
					and cpc.value = '${value}'
        `;
};

const getWhereCharacteristic = (id: string, value: string): string => {
  return `
      p.id in(
			    ${getCharacteristicSQL(id, value)}
			)
  `;
};

const getArrayWhere = (filters: IFilters): string[] => {
  return Object.keys(filters).map((id) => {
    const characteristic_id = id.replace("id_", "");

    if (characteristic_id === "price") return getWherePrice(filters[id]);

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
					and cpc.value = '18+'
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
