import { extendType, list, nonNull, objectType, stringArg } from 'nexus';
import { authorizations_get, operations_get, roles_get } from './controller'
import { AppDataSource } from '../../utils';
// **************************************************************************************************** 
export const RoleQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('operations_get', {
            args: {},
            type: list('String'),
            resolve: (parent, args: void, context, info): Promise<string[]> => {
                return operations_get(AppDataSource.manager)
            },
        });
        // --------------------------------------------------
        t.field('roles_get', {
            args: {},
            type: list('String'),
            resolve: (parent, args: void, context, info): Promise<string[]> => {
                return roles_get(AppDataSource.manager)
            },
        });
        // --------------------------------------------------
        t.field('role_authorizations_get', {
            args: { roleId: nonNull(stringArg()) },
            type: list(objectType({
                name: 'authorizations_get_out',
                definition(t) {
                    t.nullable.string("operationId")
                    t.nullable.boolean("value")
                },
            })),
            resolve: (parent, args: { roleId?: string }, context, info) => {
                return authorizations_get(AppDataSource.manager, args.roleId)
            }
        });
    }
});
