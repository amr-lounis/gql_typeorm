import { extendType, nonNull, stringArg } from 'nexus';
import { AppDataSource, } from '../../utils';
import { todo_photo_set } from './controller';
// **************************************************************************************************** 
export const TodoPhotoMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('todo_photo_set', {
            args: { id: nonNull(stringArg()), photo: nonNull(stringArg()), },
            type: nonNull('String'),
            async resolve(parent, args: { id?: string, photo?: string }, context, info): Promise<boolean> {
                return todo_photo_set(AppDataSource.manager, args.id, args.photo)
            },
        });
    }
});