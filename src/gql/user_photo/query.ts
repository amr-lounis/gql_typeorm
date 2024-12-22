import { extendType, nonNull, stringArg } from 'nexus';
import { AppDataSource } from '../../utils';
import { user_photo_get } from './controller';
export const UserPhotoQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('user_photo_get', {
            args: { userId: nonNull(stringArg()), },
            type: nonNull("String"),
            resolve: (parent, args: { userId: string }, context, info): Promise<string> => {
                return user_photo_get(AppDataSource.manager, args.userId)
            },
        });
    }
});