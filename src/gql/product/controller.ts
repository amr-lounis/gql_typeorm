import { EntityManager, Like, Between } from 'typeorm';
import { toPage } from '../../utils';
import { Products } from '../../entities';
import { ArgsProductQ, ArgsProductM } from './type';
// **************************************************************************************************** products
export const productGetOrError = async (manager: EntityManager, productId: string) => {
    if (productId == undefined) throw new Error('product id is required');
    const product = await manager.findOne(Products, { where: { id: productId } })
    if (!product) throw new Error(`product id "${product}" not exist .`);
    return product
}
export const products_get = async (manager: EntityManager, args: ArgsProductQ) => {
    args.filter_id = args.filter_id ?? ""
    const itemsCountAll = (await manager.count(Products, {
        where: [
            { id: args.filter_id ? Like(`%${args.filter_id}%`) : undefined },
            { id: args.id ?? undefined },
            { code: args.code },
            { categorieId: args.categorieId },
            { unityId: args.unityId },
            {
                updatedAt: args.filter_update_gte && args.filter_update_lte
                    ? Between(new Date(args.filter_update_gte), new Date(args.filter_update_lte))
                    : undefined,
                insertedAt: args.filter_insert_gte && args.filter_insert_lte
                    ? Between(new Date(args.filter_insert_gte), new Date(args.filter_insert_lte))
                    : undefined,
                quantity: args.filter_quntity_gte && args.filter_quntity_lte
                    ? Between(args.filter_quntity_lte, args.filter_quntity_gte)
                    : undefined,
                date_alert: args.filter_date_alert_lte && args.filter_date_alert_gte
                    ? Between(new Date(args.filter_date_alert_gte), new Date(args.filter_date_alert_gte))
                    : undefined,
                description: args.filter_description ? Like(`%${args.filter_description}%`) : undefined
            }
        ]
    }))
    const p = toPage(itemsCountAll, args.pageNumber, args.itemsTake)
    const items = await manager.find(Products, {
        where: [
            { id: args.filter_id ? Like(`%${args.filter_id}%`) : undefined },
            { id: args.id ?? undefined },
            { code: args.code },
            { categorieId: args.categorieId },
            { unityId: args.unityId },
            {
                updatedAt: args.filter_update_gte && args.filter_update_lte
                    ? Between(new Date(args.filter_update_gte), new Date(args.filter_update_lte))
                    : undefined,
                insertedAt: args.filter_insert_gte && args.filter_insert_lte
                    ? Between(new Date(args.filter_insert_gte), new Date(args.filter_insert_lte))
                    : undefined,
                quantity: args.filter_quntity_gte && args.filter_quntity_lte
                    ? Between(args.filter_quntity_lte, args.filter_quntity_gte)
                    : undefined,
                date_alert: args.filter_date_alert_lte && args.filter_date_alert_gte
                    ? Between(new Date(args.filter_date_alert_gte), new Date(args.filter_date_alert_gte))
                    : undefined,
                description: args.filter_description ? Like(`%${args.filter_description}%`) : undefined
            }
        ],
        order: {
            insertedAt: "DESC",
        },
        skip: p.itemsSkip,
        take: p.itemsTake,
    });
    return {
        allItemsCount: itemsCountAll,
        allPagesCount: p.allPagesCount,
        itemsSkip: p.itemsSkip,
        itemsTake: p.itemsTake,
        pageNumber: p.pageNumber,
        itemsCount: items.length,
        items: items
    }
}
export const product_insert = async (manager: EntityManager, args: ArgsProductM): Promise<boolean> => {
    if (args.id == undefined) throw new Error('product id is required');
    await manager.insert(Products, args)
    return true
}
export const product_update = async (manager: EntityManager, productId: string, args: ArgsProductM): Promise<boolean> => {
    if (args.money_purchase < 0) throw new Error('money_purchase < 0');
    if (args.money_selling < 0) throw new Error('money_selling < 0');
    if (args.money_selling_gr < 0) throw new Error('money_selling_gr < 0');
    if (args.quantity < 0) throw new Error("quantity < 0)");

    await manager.update(Products, { id: productId }, args);
    return true
}
export const product_quantity_updown = async (manager: EntityManager, productId: string, quantity: number): Promise<boolean> => {//if  (quantity < 0) reduire else add
    const product = await productGetOrError(manager, productId);
    if (product.quantity + quantity < 0) throw new Error('product quantity < 0 .');
    await manager.update(Products, { id: productId }, { quantity: product.quantity + quantity })
    return true
}
export const product_delete = async (manager: EntityManager, productId: string): Promise<boolean> => {
    await manager.delete(Products, { id: productId });
    return true
}
