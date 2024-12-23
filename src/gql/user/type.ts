import { intArg, nonNull, nullable, objectType, stringArg } from "nexus";

// **************************************************************************************************** 
export const ArgsUserQQ = {
    id: nullable(stringArg()),
    filter_id: nullable(stringArg()),
    filter_description: nullable(stringArg()),
    filter_update_gte: nullable(stringArg()),
    filter_update_lte: nullable(stringArg()),
    filter_insert_gte: nullable(stringArg()),
    filter_insert_lte: nullable(stringArg()),
    pageNumber: nullable(intArg()),
    itemsTake: nullable(intArg()),
}
export type ArgsUserQ = {
    id?: string,
    filter_id?: string,
    filter_description?: string,
    filter_update_gte?: string,
    filter_update_lte?: string,
    filter_insert_gte?: string,
    filter_insert_lte?: string,
    itemsTake?: number,
    pageNumber?: number,
}

export const users_get_out = objectType({
    name: 'users_get_out',
    definition(t) {
        ["id", "description", "address", "first_name", "last_name", "phone", "fax", "email"].map(x =>
            t.nullable.string(x)
        );
        ["insertedAt", "updatedAt"].map(x =>
            t.nullable.float(x)
        );
    },
});
export const users_pages_out = objectType({
    name: 'users_pages_out',
    definition(t) {
        t.nullable.int('allItemsCount');
        t.nullable.int('allPagesCount');
        t.nullable.int('pageNumber');
        t.nullable.int('itemsTake');
        t.nullable.int('itemsSkip');
        t.nullable.int('itemsCount');
        t.nullable.list.field('items', { type: users_get_out });
    },
});
// **************************************************************************************************** 
export const ArgsUserMM = {
    password: stringArg(),
    description: stringArg(),
    address: stringArg(),
    first_name: stringArg(),
    last_name: stringArg(),
    phone: stringArg(),
    fax: stringArg(),
    email: stringArg(),
}
export type ArgsUserM = {
    id?: string,
    roleId?: string,
    password?: string,
    description?: string,
    address?: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
    fax?: string,
    email?: string
}
// **************************************************************************************************** 
export type user_notification_send_type = { senderId: string, receiverId: string, title: string, content: string }

export const user_notification_send_gql =
{
    receiverId: nonNull(stringArg()),
    title: nonNull(stringArg()),
    content: nonNull(stringArg()),
}

export const user_notification_receive_gql = objectType({
    name: 'user_notification_receive_gql',
    definition(t) {
        t.nullable.string('senderId');
        t.nullable.string('receiverId');
        t.nullable.string('title');
        t.nullable.string('content');
    },
});
// **************************************************************************************************** 