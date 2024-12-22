import { extendType, nonNull, stringArg } from 'nexus';
import { AppDataSource } from '../../utils';
import { todo_photo_get } from './controller';
// **************************************************************************************************** 
export const TodoPhotoQuery = extendType({
    type: 'Query',
    definition(t) {
        // --------------------------------------------------
        t.field('todo_photo_get', {
            args: { todoId: nonNull(stringArg()) },
            type: nonNull("String"),
            resolve: async (parent, args: { todoId: string }, context, info): Promise<string> => {
                return await AppDataSource.manager.transaction(async (manager) => {
                    return await todo_photo_get(manager, args.todoId)
                })
            },
        });
    }
});
