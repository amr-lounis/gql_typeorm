import { extendType, nonNull, stringArg } from "nexus";
import { product_categorie_delete, product_categorie_insert, product_categorie_update } from "./controller";
import { AppDataSource } from "../../utils";
// **************************************************************************************************** 
export const ProductCategorieMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('product_categorie_insert', {
            args: { id: nonNull(stringArg()) },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id?: string }, context, info): Promise<boolean> => {
                return product_categorie_insert(AppDataSource.manager, args.id)
            },
        });
        t.field('product_categorie_update', {
            args: { id: nonNull(stringArg()), idNew: nonNull(stringArg()), },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id?: string, idNew: string }, context, info): Promise<boolean> => {
                return product_categorie_update(AppDataSource.manager, args.id, args.idNew)
            },
        });
        t.field('product_categorie_delete', {
            args: { id: nonNull(stringArg()) },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id?: string }, context, info): Promise<boolean> => {
                return product_categorie_delete(AppDataSource.manager, args.id)
            },
        });
    }
});