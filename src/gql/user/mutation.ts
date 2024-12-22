import { extendType, nonNull, nullable, stringArg } from 'nexus';
import { AppDataSource, ContextType } from '../../utils';
import { user_delete, user_insert, user_update } from './controller';
import { ArgsUserM, ArgsUserMM } from './type';
// **************************************************************************************************** 
export const UserMutation = extendType({
    type: 'Mutation',
    definition(t) {
        // --------------------------------------------------
        t.field('user_insert', {
            args: {
                id: nonNull(stringArg()),
                password: stringArg(),
            },
            type: nonNull("Boolean"),
            resolve: (parent, args: { id: string, password: string }, context, info): Promise<boolean> => {
                return user_insert(AppDataSource.manager, args)
            }
        });
        // --------------------------------------------------
        t.field('user_update_self', {
            args: ArgsUserMM,
            type: nonNull('Boolean'),
            resolve: (parent, args: ArgsUserM, context: ContextType, info): Promise<boolean> => {
                return user_update(AppDataSource.manager, context?.jwt?.id, args)
            }
        });
        // --------------------------------------------------
        t.field('user_update_id', {
            args: {
                userId: nonNull(stringArg()),
                userIdNew: nonNull(stringArg()),
            },
            type: nonNull('Boolean'),
            resolve: (parent, args: { userId: string, userIdNew: string }, context, info): Promise<boolean> => {
                return user_update(AppDataSource.manager, args.userId, { id: args.userIdNew })
            },
        });
        // --------------------------------------------------
        t.field('user_update_role', {
            args: {
                userId: nonNull(stringArg()),
                roleId: nullable(stringArg())
            },
            type: nullable("Boolean"),
            resolve: (parent, args: { userId: string, roleId: string }, context, info): Promise<boolean> => {
                return user_update(AppDataSource.manager, args.userId, { roleId: args.roleId })
            }
        });
        // --------------------------------------------------
        t.field('user_delete', {
            args: { userId: nonNull(stringArg()) },
            type: nonNull("Boolean"),
            resolve: (parent, args: { userId: string }, context, info): Promise<boolean> => {
                return user_delete(AppDataSource.manager, args.userId)
            },
        });
    },
});
// **************************************************************************************************** 
