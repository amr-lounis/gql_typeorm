import { extendType, nonNull, stringArg } from "nexus";
import { product_delete, product_insert, product_update } from "./controller";
import { AppDataSource } from "../../utils";
import { ArgsProductMM, ArgsProductM } from "./type";
// **************************************************************************************************** 
export const ProductMutation = extendType({
    type: 'Mutation',
    definition(t) {
        // --------------------------------------------------
        t.field('product_insert', {
            args: ArgsProductMM,
            type: nonNull('Boolean'),
            resolve: (parent, args: ArgsProductM, context, info): Promise<boolean> => {
                return product_insert(AppDataSource.manager, args)
            },
        });
        t.field('product_update', {
            args: ArgsProductMM,
            type: nonNull('Boolean'),
            resolve: (parent, args: ArgsProductM, context, info): Promise<boolean> => {
                return product_update(AppDataSource.manager, args.id, args)
            },
        });
        t.field('product_update_id', {
            args: {
                id: nonNull(stringArg()),
                idNew: nonNull(stringArg()),
            },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id: string, idNew: string }, context, info): Promise<boolean> => {
                return product_update(AppDataSource.manager, args.id, { id: args.idNew })
            },
        });
        t.field('product_delete', {
            args: { id: nonNull(stringArg()) },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id: string }, context, info): Promise<boolean> => {
                return product_delete(AppDataSource.manager, args.id)
            },
        });
    }
});