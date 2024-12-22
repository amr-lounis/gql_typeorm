
import { extendType, nonNull, stringArg } from "nexus";
import { AppDataSource } from "../../utils";
import { product_unity_delete, product_unity_insert, product_unity_update } from "./controller";
// **************************************************************************************************** 
export const ProductUnityMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('product_unity_insert', {
            args: { id: nonNull(stringArg()) },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id?: string }, context, info): Promise<boolean> => {
                return product_unity_insert(AppDataSource.manager, args.id)
            },
        });
        t.field('product_unity_update', {
            args: { id: nonNull(stringArg()), idNew: nonNull(stringArg()), },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id: string, idNew: string }, context, info): Promise<boolean> => {
                return product_unity_update(AppDataSource.manager, args.id, args.idNew)
            },
        });
        t.field('product_unity_delete', {
            args: { id: nonNull(stringArg()) },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id: string }, context, info): Promise<boolean> => {
                return product_unity_delete(AppDataSource.manager, args.id)
            },
        });
    }
});