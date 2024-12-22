import { extendType, nonNull, stringArg } from "nexus";
import { product_photo_set } from "./controller";
import { AppDataSource } from "../../utils";
// **************************************************************************************************** 
export const ProductPhotoMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('product_photo_set', {
            args: { id: nonNull(stringArg()), photo: nonNull(stringArg()), },
            type: nonNull('String'),
            async resolve(parent, args: { id?: string, photo?: string }, context, info): Promise<boolean> {
                return product_photo_set(AppDataSource.manager, args.id, args.photo)
            },
        });
    }
});