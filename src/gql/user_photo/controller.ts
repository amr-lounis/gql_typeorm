import "reflect-metadata";
import { EntityManager } from "typeorm";
import { UPhotos } from "../../entities/UPhotos";

export const user_photo_set = async (manager: EntityManager, id: string, photo: string): Promise<boolean> => {
    if (photo?.length > 524288) throw new Error("The size is greater than the maximum value");
    const photpBytes = Buffer.from(photo ?? "", 'utf8')
    await manager.save(UPhotos, { userId: id, photo: photpBytes });//save : if not exist overwriting else insert newing() ?? ""
    return true
}
export const user_photo_get = async (manager: EntityManager, id: string): Promise<string> => {
    const p = await manager.findOne(UPhotos, { where: { userId: id } },);
    if (!p) throw new Error('not exist');
    // return p.map((x) => x.photo?.toString() ?? "")
    return p?.photo?.toString() ?? ""
}
