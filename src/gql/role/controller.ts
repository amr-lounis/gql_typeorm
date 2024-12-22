import { UOperations } from "../../entities/UOperations";
import { URoles } from "../../entities/URoles";
import { URolesOperations } from "../../entities/URolesOperations";
import { EntityManager } from "typeorm";
// **************************************************************************************************** operation
export const operations_get = async (manager: EntityManager): Promise<string[]> => {
    const r = await manager.find(UOperations);
    return r.map((x) => x.id)
}
export const operation_insert = async (manager: EntityManager, id: string): Promise<boolean> => {
    await manager.insert(UOperations, { id: id })
    return true
}
export const operation_update = async (manager: EntityManager, id: string, idNew: string): Promise<boolean> => {
    await manager.update(UOperations, { id: id }, { id: idNew })
    return true
}
export const operation_delete = async (manager: EntityManager, id: string): Promise<boolean> => {
    await manager.delete(UOperations, { id: id })
    return true
}
// **************************************************************************************************** role
export const roles_get = async (manager: EntityManager,): Promise<string[]> => {
    const r = await manager.find(URoles, { select: { id: true } });
    return r.map((x) => x.id)
}
export const role_insert = async (manager: EntityManager, id: string): Promise<boolean> => {
    await manager.insert(URoles, { id: id })
    return true
}
export const role_update = async (manager: EntityManager, id: string, idNew: string): Promise<boolean> => {
    await manager.update(URoles, { id: id }, { id: idNew })
    return true
}
export const role_delete = async (manager: EntityManager, id: string): Promise<boolean> => {
    await manager.delete(URoles, { id: id })
    return true
}
// **************************************************************************************************** role_authorization
export const authorizations_get = async (manager: EntityManager, roleId: string) => {
    return await manager.findBy(URolesOperations, { roleId: roleId })
}
export const authorizations_all_get = async (manager: EntityManager) => {
    return await manager.find(URolesOperations, {})
}
export const role_authorization_set = async (manager: EntityManager, roleId: string, operationId: string, value: boolean): Promise<boolean> => {
    await manager.save(URolesOperations, { roleId: roleId, operationId: operationId, value: value });//save : if not exist ovverwriting else insert new
    return true;
}