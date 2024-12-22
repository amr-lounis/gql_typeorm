import { extendType } from 'nexus';
import { ArgsTodoQ, ArgsTodoQ_get, todos_pages_out } from '.'
import { AppDataSource } from '../../utils';
import { todos_get } from './controller';
// **************************************************************************************************** 
export const TodoQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('todos_get', {
            args: ArgsTodoQ_get,
            description: "date format : 2000-01-01T00:00:00Z",
            type: todos_pages_out,
            resolve: async (parent, args: ArgsTodoQ, context, info) => {
                return await AppDataSource.manager.transaction(async (manager) => {
                    return await todos_get(manager, args)
                })
            },
        });
    }
});
