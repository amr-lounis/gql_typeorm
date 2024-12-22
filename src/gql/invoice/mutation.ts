import { booleanArg, extendType, floatArg, nonNull, nullable, stringArg } from "nexus";
import { AppDataSource, ContextType } from "../../utils";
import { INVOICE_TYPES, invoice_insert, invoice_update, invoice_update_prudect, invoice_update_prudect_type, invoice_update_type, invoice_update_validation } from "./";

export const InvoiceMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('invoice_insert_purchase', {
            args: {},
            type: nonNull('String'),
            resolve: (parent, args, context: ContextType, info): Promise<string> => {
                return invoice_insert(AppDataSource.manager, INVOICE_TYPES.PURCHASE, context.jwt.id)
            },
        });
        // --------------------------------------------------
        t.field('invoice_insert_sale', {
            args: {},
            type: nonNull('String'),
            resolve: (parent, args, context: ContextType, info): Promise<string> => {
                return invoice_insert(AppDataSource.manager, INVOICE_TYPES.SALE, context.jwt.id)
            },
        });
        // --------------------------------------------------
        t.field('invoice_insert_sale_gr', {
            args: {},
            type: nonNull('String'),
            resolve: (parent, args, context: ContextType, info): Promise<string> => {
                return invoice_insert(AppDataSource.manager, INVOICE_TYPES.SALE_GR, context.jwt.id)
            },
        });
        // --------------------------------------------------
        t.field('invoice_insert_loss', {
            args: {},
            type: nonNull('String'),
            resolve: (parent, args, context: ContextType, info): Promise<string> => {
                return invoice_insert(AppDataSource.manager, INVOICE_TYPES.LOSS, context.jwt.id)
            },
        });
        // --------------------------------------------------
        t.field('invoice_update', {
            args: {
                id: nonNull(stringArg()),
                dealerId: nullable(stringArg()),
                description: nullable(stringArg()),
                money_tax: nullable(floatArg()),
                money_stamp: nullable(floatArg()),
                money_paid: nullable(floatArg()),
            },
            type: nonNull('Boolean'),
            resolve: (parent, args: invoice_update_type, context: ContextType, info): Promise<boolean> => {
                return invoice_update(AppDataSource.manager, args.id, args)
            },
        });
        // --------------------------------------------------
        t.field('invoice_update_prudect', {
            args: {
                invoiceId: nonNull(stringArg()),
                prudectId: nonNull(stringArg()),
                description: nullable(stringArg()),
                money_unite: nullable(floatArg()),
                quantity: nullable(floatArg()),
            },
            type: nonNull('Boolean'),
            resolve: (parent, args: invoice_update_prudect_type, context: ContextType, info): Promise<boolean> => {
                return invoice_update_prudect(AppDataSource.manager, args)
            },
        });
        // --------------------------------------------------
        t.field('invoice_set_valid', {
            args: {
                invoiceId: nonNull(stringArg())
            },
            type: nonNull('String'),
            resolve: (parent, args: { invoiceId: string }, context: ContextType, info): Promise<string> => {
                return invoice_update_validation(AppDataSource.manager, args.invoiceId, true)
            },
        });
        // --------------------------------------------------
        t.field('invoice_set_invalid', {
            args: {
                invoiceId: nonNull(stringArg())
            },
            type: nonNull('String'),
            resolve: async (parent, args: { invoiceId: string }, context: ContextType, info): Promise<string> => {
                return invoice_update_validation(AppDataSource.manager, args.invoiceId, false)
            },
        });
    }
})
