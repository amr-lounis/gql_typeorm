import { floatArg, intArg, nonNull, nullable, objectType, stringArg } from "nexus"

// **************************************************************************************************** 
export const ArgsProductMM = {
    id: nonNull(stringArg()),
    categorieId: nullable(stringArg()),
    unityId: nullable(stringArg()),
    code: nullable(stringArg()),
    description: nullable(stringArg()),
    money_purchase: nullable(floatArg()),
    money_selling: nullable(floatArg()),
    money_selling_gr: nullable(floatArg()),
    date_alert: nullable(stringArg()),
    quantity_alert: nullable(floatArg()),
    // quantity: nullable(floatArg()),
}

export type ArgsProductM = {
    id?: string,
    categorieId?: string,
    unityId?: string,
    code?: string,
    description?: string,
    // 
    money_purchase?: number,
    money_selling?: number,
    money_selling_gr?: number,
    date_alert?: string,
    quantity_alert?: number,
    quantity?: number,
}
// **************************************************************************************************** 
export const ArgsProductQQ = {
    id: nullable(stringArg()),
    categorieId: nullable(stringArg()),
    unityId: nullable(stringArg()),
    code: nullable(stringArg()),
    // 
    filter_id: nullable(stringArg()),
    filter_description: nullable(stringArg()),
    filter_update_gte: nullable(stringArg()),
    filter_update_lte: nullable(stringArg()),
    filter_insert_gte: nullable(stringArg()),
    filter_insert_lte: nullable(stringArg()),
    filter_quntity_gte: nullable(floatArg()),
    filter_quntity_lte: nullable(floatArg()),
    filter_date_alert_gte: nullable(stringArg()),
    filter_date_alert_lte: nullable(stringArg()),
    // 
    pageNumber: nullable(intArg()),
    itemsTake: nullable(intArg()),
}

export type ArgsProductQ = {
    id?: string,
    categorieId?: string,
    unityId?: string,
    code?: string,
    // 
    filter_id: string,
    filter_description?: string,
    filter_update_gte?: string,
    filter_update_lte?: string,
    filter_insert_gte?: string,
    filter_insert_lte?: string,
    filter_quntity_gte?: number,
    filter_quntity_lte?: number,
    filter_date_alert_gte?: string,
    filter_date_alert_lte?: string,
    // 
    pageNumber?: number,
    itemsTake?: number
}
// **************************************************************************************************** 
export const products_get_out = objectType({
    name: 'products_get_out',
    definition(t) {
        ["id", "categorieId", "unityId", "code", "description"].map((x) => t.nullable.string(x));
        ["money_purchase", "money_selling", "money_selling_gr", "quantity", "quantity_alert", "date_alert", "insertedAt", "updatedAt"].map((x) => t.nullable.float(x));
    },
});

export const products_pages_out = objectType({
    name: 'products_pages_out',
    definition(t) {
        t.nullable.int('allItemsCount')
        t.nullable.int('allPagesCount')
        t.nullable.int('pageNumber')
        t.nullable.int('itemsTake')
        t.nullable.int('itemsSkip')
        t.nullable.int('itemsCount')
        t.nullable.list.field('items', { type: products_get_out })
    },
});