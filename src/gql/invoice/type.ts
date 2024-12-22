import { booleanArg, floatArg, intArg, nullable, objectType, stringArg } from "nexus"

export const ArgsInvoiceQQ = {
    id: nullable(stringArg()),
    employeeId: nullable(stringArg()),
    dealerId: nullable(stringArg()),
    validation: nullable(booleanArg()),
    filter_description: nullable(stringArg()),
    filter_update_lte: nullable(stringArg()),
    filter_update_gte: nullable(stringArg()),
    filter_insert_lte: nullable(stringArg()),
    filter_insert_gte: nullable(stringArg()),
    pageNumber: nullable(intArg()),
    itemsTake: nullable(intArg()),
    money_unpaid_lte: nullable(floatArg()),
    money_unpaid_gte: nullable(floatArg()),
}
export type ArgsInvoiceQ = {
    id?: string,
    employeeId?: string,
    dealerId?: string,
    validation?: boolean,
    filter_description?: string,
    filter_update_lte?: string,
    filter_update_gte?: string,
    filter_insert_lte?: string,
    filter_insert_gte?: string,
    pageNumber?: number,
    itemsTake?: number,
    money_unpaid_lte?: number,
    money_unpaid_gte?: number,
}
export const invoices_get_out = objectType({
    name: 'invoices_get_out',
    definition(t) {
        [
            "id",
            "employeeId",
            "dealerId",
            "validation",
            "description"
        ].map((x) => t.nullable.string(x));
        [
            "money_net",
            "money_tax",
            "money_stamp",
            "money_calc",
            "money_paid",
            "money_unpaid",
            "insertedAt",
            "updatedAt"
        ].map((x) => t.nullable.float(x));
        [
            "validation"
        ].map((x) => t.nullable.boolean(x));
    },
});
export const invoices_pages_out = objectType({
    name: 'invoices_pages_out',
    definition(t) {
        t.nullable.int('allItemsCount')
        t.nullable.int('allPagesCount')
        t.nullable.int('pageNumber')
        t.nullable.int('itemsTake')
        t.nullable.int('itemsSkip')
        t.nullable.int('itemsCount')
        t.nullable.list.field('items', { type: invoices_get_out })
    },
});

// **************************************************************************************************** 
export type invoice_update_type = {
    id?: string,
    employeeId?: string,
    dealerId?: string,
    description?: string,
    money_tax?: number,
    money_stamp?: number,
    money_paid?: number,
}
export type invoice_update_prudect_type = {
    invoiceId: string,
    prudectId: string,
    description?: string,
    money_unite?: number,
    quantity?: number
}
export const INVOICE_TYPES = {
    PURCHASE: "PURCHASE",
    SALE: "SALE",
    SALE_GR: "SALE_GR",
    LOSS: "LOSS"
}
