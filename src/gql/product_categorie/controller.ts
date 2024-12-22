import { EntityManager } from 'typeorm';
import { PCategories } from '../../entities/PCategories';

// **************************************************************************************************** categories
export const product_categories_get = async (manager: EntityManager,): Promise<string[]> => {
    const r = await manager.find(PCategories, {});
    return r.map((x) => x.id)
}
export const product_categorie_insert = async (manager: EntityManager, categorieId: string): Promise<boolean> => {
    await manager.insert(PCategories, { id: categorieId })
    return true
}
export const product_categorie_update = async (manager: EntityManager, categorieId: string, categorieIdNew: string): Promise<boolean> => {
    await manager.update(PCategories, { id: categorieId }, { id: categorieIdNew })
    return true
}
export const product_categorie_delete = async (manager: EntityManager, categorieId: string): Promise<boolean> => {
    await manager.delete(PCategories, { id: categorieId })
    return true
}