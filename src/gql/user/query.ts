import { extendType, nonNull, stringArg } from 'nexus';
import { ContextType, AppDataSource } from '../../utils';
import { userGetOrError, user_authentication, user_authentication_renewal, users_get } from './controller';
import { ArgsUserQ, ArgsUserQQ, users_pages_out } from './type';
// **************************************************************************************************** 
export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('user_authentication', {
            args: { id: nonNull(stringArg()), password: nonNull(stringArg()) },
            type: nonNull("String"),
            resolve: (parent, args: { id: string, password: string }, context, info): Promise<string> => {
                return user_authentication(AppDataSource.manager, args.id, args.password)
            },
        });
        // --------------------------------------------------
        t.field('user_authentication_renewal', {
            args: {},
            type: nonNull("String"),
            resolve(parent, args: {}, context: ContextType, info): Promise<string> {
                return user_authentication_renewal(AppDataSource.manager, context?.jwt?.id)
            },
        });
        // -------------------------------------------------- 
        t.field('user_authentication_info', {
            args: {},
            type: nonNull("String"),
            resolve: (parent, args: {}, context: ContextType, info): string => {
                const id = context.jwt.id
                const role = context.jwt.role
                const iat = new Date(context.jwt.iat * 1000).toISOString()
                const exp = new Date(context.jwt.exp * 1000).toISOString()
                return `{id:${id},role:${role},iat:${iat},exp:${exp}}`
            },
        });
        // --------------------------------------------------
        t.field('user_role_get', {
            args: { id: nonNull(stringArg()), },
            type: nonNull("String"),
            resolve: async (parent, args: { id: string }, context, info): Promise<string> => {
                return (await userGetOrError(AppDataSource.manager, args.id)).roleId
            },
        });
        // --------------------------------------------------
        t.field('users_get', {
            args: ArgsUserQQ,
            type: users_pages_out,
            description: "date format : 2000-01-01T00:00:00Z",
            resolve: (parent, args: ArgsUserQ, context, info) => {
                return users_get(AppDataSource.manager, args)
            },
        });
    }
});
