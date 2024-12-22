import { booleanArg, floatArg, intArg, nonNull, nullable, objectType, stringArg } from "nexus"

export const ArgsTodoQ_get = {
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
export type ArgsTodoQ = {
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
// **************************************************************************************************** 
export const ArgsTodoM_update = {
    id: nonNull(stringArg()),
    dealerId: nullable(stringArg()),
    description: nullable(stringArg()),
    money_expenses: nullable(floatArg()),
    money_total: nullable(floatArg()),
    money_paid: nullable(floatArg()),
}
export type ArgsTodoM = {
    id?: string,
    employeeId?: string,
    dealerId?: string,
    description?: string,
    money_expenses?: number,
    money_total?: number,
    money_paid?: number,
}
// **************************************************************************************************** 
export const todos_get_out = objectType({
    name: 'todo_get_out',
    definition(t) {
        ["id", "employeeId", "dealerId", "validation", "description"].map((x) => t.nullable.string(x));
        ["money_expenses", "money_total", "money_paid", "money_unpaid", "money_margin", "insertedAt", "updatedAt"].map((x) => t.nullable.float(x));
        ["validation"].map((x) => t.nullable.boolean(x));
    },
});
export const todos_pages_out = objectType({
    name: 'todos_pages_out',
    definition(t) {
        t.nullable.int('allItemsCount')
        t.nullable.int('allPagesCount')
        t.nullable.int('pageNumber')
        t.nullable.int('itemsTake')
        t.nullable.int('itemsSkip')
        t.nullable.int('itemsCount')
        t.nullable.list.field('items', { type: todos_get_out })
    },
});
