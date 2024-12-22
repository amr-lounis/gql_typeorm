import { extendType, objectType } from "nexus";
import { AppDataSource } from "../../utils";
import { invoices_get } from "./controller";
import { ArgsInvoiceQ, ArgsInvoiceQQ, invoices_pages_out } from "./type";

export const InvoiceQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('invoices_get', {
            args: ArgsInvoiceQQ,
            description: "date format : 2000-01-01T00:00:00Z",
            type: invoices_pages_out,
            resolve: async (parent, args: ArgsInvoiceQ, context, info) => {
                return await invoices_get(AppDataSource.manager, args)
            },
        });
    }
})
