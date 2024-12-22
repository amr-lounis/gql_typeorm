import { EntityManager } from 'typeorm';
import { PUnits } from '../../entities/PUnits';

export const product_units_get = async (manager: EntityManager,): Promise<string[]> => {
    const r = await manager.find(PUnits, {});
    return r.map((x) => x.id)
}
export const product_unity_insert = async (manager: EntityManager, unityId: string): Promise<boolean> => {
    await manager.insert(PUnits, { id: unityId })
    return true
}
export const product_unity_update = async (manager: EntityManager, unityId: string, unityIdNew: string): Promise<boolean> => {
    await manager.update(PUnits, { id: unityId }, { id: unityIdNew })
    return true
}
export const product_unity_delete = async (manager: EntityManager, unityId: string): Promise<boolean> => {
    await manager.delete(PUnits, { id: unityId })
    return true
}