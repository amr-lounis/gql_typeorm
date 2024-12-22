import { extendType, list } from 'nexus';
import { AppDataSource } from '../../utils';
import { product_units_get } from './controller';
// **************************************************************************************************** 
export const ProductUnityQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('product_units_get', {
            args: {},
            type: list('String'),
            async resolve(parent, args, context, info): Promise<string[]> {
                return product_units_get(AppDataSource.manager)
            },
        });
    }
});