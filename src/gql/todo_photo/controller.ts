import { EntityManager } from 'typeorm';
import { TPhotos } from '../../entities/TPhotos';
export const todo_photo_set = async (manager: EntityManager, id: string, photo: string): Promise<boolean> => {
    if (photo?.length > 524288) throw new Error("The size is greater than the maximum value");
    const photpBytes = Buffer.from(photo ?? "", 'utf8')
    await manager.save(TPhotos, { todoId: id, photo: photpBytes });//save : if not exist overwriting else insert newing() ?? ""
    return true
}
export const todo_photo_get = async (manager: EntityManager, id: string): Promise<string> => {
    const p = await manager.findOne(TPhotos, { where: { todoId: id } },);
    if (!p) throw new Error('not exist');
    return p?.photo?.toString() ?? ""
}