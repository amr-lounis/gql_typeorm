import { extendType, nonNull, nullable, stringArg } from 'nexus';
import { Todos } from '../../entities';
import { AppDataSource, ContextType } from '../../utils';
import { todo_delete, todo_insert, todo_update, todo_update_validation } from './controller';
import { ArgsTodoM, ArgsTodoM_update } from './type';
// **************************************************************************************************** 
export const TodoMutation = extendType({
    type: 'Mutation',
    definition(t) {
        // -------------------------------------------------
        t.field('todo_insert', {
            args: { employeeId: nullable(stringArg()) },
            description: "return ID of new todo",
            type: nonNull('String'), // -------------------------------------------------- return ID of new todo
            resolve: async (parent: any, args: { employeeId: string }, context: ContextType, info: any): Promise<string> => {
                args.employeeId = context.jwt.id
                return await todo_insert(AppDataSource.manager, args)
            }
        });
        // --------------------------------------------------
        t.field('todo_update', {
            args: ArgsTodoM_update,
            type: nonNull('Boolean'),
            resolve: async (parent: any, args: ArgsTodoM, context: ContextType, info: any): Promise<boolean> => {
                return await AppDataSource.manager.transaction(async (manager) => {
                    // verification
                    const r = await manager.findOne(Todos, { where: { id: args.id } })
                    if (r.employeeId != context.jwt.id) throw new Error('not authorized : update only by owner');
                    //  
                    return await todo_update(manager, args.id, args)
                })
            },
        });
        // --------------------------------------------------
        t.field('todo_delete', {
            args: { id: nonNull(stringArg()), },
            type: nonNull('Boolean'),
            resolve: async (parent: any, args: { id: string }, context: ContextType, info: any): Promise<boolean> => {
                return await AppDataSource.manager.transaction(async (manager) => {
                    // verification
                    const r = await manager.findOne(Todos, { where: { id: args.id } })
                    if (r.employeeId != context.jwt.id) throw new Error('not authorized : update only by owner');
                    // 
                    return todo_delete(manager, args.id)
                })
            },
        });
        // --------------------------------------------------
        t.field('todo_set_valid', {
            args: {
                id: nonNull(stringArg()),
            },
            type: nonNull('Boolean'),
            resolve: async (parent: any, args: ArgsTodoM, context: ContextType, info: any): Promise<string> => {
                return todo_update_validation(AppDataSource.manager, args.id, true)
            },
        });
        // --------------------------------------------------
        t.field('todo_set_invalid', {
            args: {
                id: nonNull(stringArg()),
            },
            type: nonNull('Boolean'),
            resolve: async (parent: any, args: ArgsTodoM, context: ContextType, info: any): Promise<string> => {
                return todo_update_validation(AppDataSource.manager, args.id, false)
            },
        });
    }
});