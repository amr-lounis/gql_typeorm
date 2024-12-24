import { Settings } from "../../entities";
import { EntityManager } from "typeorm";
// **************************************************************************************************** 
export const settings_get = async (manager: EntityManager) => {
    return await manager.find(Settings);
}
export const setting_get = async (manager: EntityManager, key: string): Promise<string> => {
    const r = await manager.findOne(Settings, { where: { key } });
    return r.value
}
export const setting_set = async (manager: EntityManager, key: string, value: string): Promise<boolean> => {
    await manager.save(Settings, { key, value });//save : if not exist overwriting else insert new
    return true;
};