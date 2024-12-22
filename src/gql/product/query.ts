import { extendType } from 'nexus';
import { products_get } from './controller';
import { AppDataSource } from '../../utils';
import { ArgsProductQ, ArgsProductQQ, products_pages_out } from './type';
// **************************************************************************************************** 
export const ProductQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('products_get', {
            args: ArgsProductQQ,
            description: "date format : 2000-01-01T00:00:00Z",
            type: products_pages_out,
            resolve: async (parent, args: ArgsProductQ, context, info) => {
                return products_get(AppDataSource.manager, args)
            },
        });
    }
});