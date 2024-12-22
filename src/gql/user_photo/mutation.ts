import { extendType, nonNull, stringArg } from 'nexus';
import { AppDataSource } from '../../utils';
import { user_photo_set } from './controller';
// **************************************************************************************************** 
export const UserPhotoMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('user_photo_set', {
            args: { id: nonNull(stringArg()), photo: nonNull(stringArg()), },
            type: nonNull('String'),
            async resolve(parent, args: { id?: string, photo?: string }, context, info): Promise<boolean> {
                return user_photo_set(AppDataSource.manager, args.id, args.photo)
            },
        });
    },
});
// **************************************************************************************************** 
