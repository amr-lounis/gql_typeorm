import { extendType, list } from 'nexus';
import { product_categories_get } from './controller';
import { AppDataSource } from '../../utils';
// **************************************************************************************************** 
export const ProductCategorieQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('product_categories_get', {
            args: {},
            type: list('String'),
            async resolve(parent, args, context, info): Promise<string[]> {
                return product_categories_get(AppDataSource.manager)
            },
        });
    }
});