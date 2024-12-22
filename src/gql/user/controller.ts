import "reflect-metadata";
import { EntityManager, Between, Like } from "typeorm";
import { MyToken, encodeB64, toPage } from "../../utils"
import { Users } from "../../entities/Users";
import { ArgsUserM, ArgsUserQ } from "./type";
// **************************************************************************************************** 
export const userGetOrError = async (manager: EntityManager, userId: string) => {
    if (userId == undefined) throw new Error('user id is required');
    const user = await manager.findOne(Users, { where: { id: userId } })
    if (!user) throw new Error(`user id : ${userId} is not exist`);
    return user
}
export const user_authentication = async (manager: EntityManager, id: string, password: string): Promise<string> => {
    try {
        const exist = await manager.findOne(Users, { where: { id: id, password: encodeB64(password) } })
        return MyToken.Token_generate(exist.id, exist.roleId)
    } catch (error) {
        return ""
    }
}
export const user_authentication_renewal = async (manager, id: string): Promise<string> => {
    try {
        const exist = await manager.findOne(Users, { where: { id } })
        return MyToken.Token_generate(id, exist.roleId)
    } catch (error) {
        return ""
    }
}
export const users_get = async (manager: EntityManager, args: ArgsUserQ) => {
    const itemsCountAll = await manager.count(Users, {
        where: [
            { id: args.filter_id ? Like(`%${args.filter_id}%`) : undefined },
            { id: args.id ?? undefined },
            {
                updatedAt: args.filter_update_gte && args.filter_update_lte
                    ? Between(new Date(args.filter_update_gte), new Date(args.filter_update_lte))
                    : undefined,
                insertedAt: args.filter_insert_gte && args.filter_insert_lte
                    ? Between(new Date(args.filter_insert_gte), new Date(args.filter_insert_lte))
                    : undefined,
                description: args.filter_description ? Like(`%${args.filter_description}%`) : undefined,
            }
        ],
    });
    const p = toPage(itemsCountAll, args.pageNumber, args.itemsTake)
    const items = await manager.find(Users, {
        where: [
            { id: args.filter_id ? Like(`%${args.filter_id}%`) : undefined },
            { id: args.id ?? undefined },
            {
                updatedAt: args.filter_update_gte && args.filter_update_lte
                    ? Between(new Date(args.filter_update_gte), new Date(args.filter_update_lte))
                    : undefined,
                insertedAt: args.filter_insert_gte && args.filter_insert_lte
                    ? Between(new Date(args.filter_insert_gte), new Date(args.filter_insert_lte))
                    : undefined,
                description: args.filter_description ? Like(`%${args.filter_description}%`) : undefined,
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
export const user_insert = async (manager: EntityManager, args: { id: string, password: string }): Promise<boolean> => {
    await manager.insert(Users, { id: args.id, password: encodeB64(args.password) });
    return true;
}
export const user_update = async (manager: EntityManager, id: string, args: ArgsUserM): Promise<boolean> => {
    args.password = args.password != undefined ? encodeB64(args.password) : undefined
    await manager.update(Users, { id: id }, args);
    return true;
}
export const user_delete = async (manager: EntityManager, id: string): Promise<boolean> => {
    await manager.delete(Users, { id: id })
    return true;
}
