import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { product_photo_get } from './controller';
import { AppDataSource } from '../../utils';
// **************************************************************************************************** 
export const ProductPhotoQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('product_photo_get', {
            args: { id: nonNull(stringArg()) },
            type: nonNull('String'),
            async resolve(parent, args: { id?: string }, context, info): Promise<string> {
                return product_photo_get(AppDataSource.manager, args.id)
            },
        });
    }
});