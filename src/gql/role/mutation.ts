import { booleanArg, extendType, nonNull, stringArg } from 'nexus';
import { AppDataSource } from '../../utils';
import { role_authorization_set, role_delete, role_insert, role_update } from './controller';
// **************************************************************************************************** 
export const RoleMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('role_insert', {
            args: { id: nonNull(stringArg()), },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id: string }, context, info): Promise<boolean> => {
                return role_insert(AppDataSource.manager, args.id)
            },
        });
        // --------------------------------------------------
        t.field('role_update', {
            args: { id: nonNull(stringArg()), idNew: nonNull(stringArg()), },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id: string, idNew: string }, context, info): Promise<boolean> => {
                return role_update(AppDataSource.manager, args.id, args.idNew)
            }
        });
        // --------------------------------------------------
        t.field('role_delete', {
            args: { id: nonNull(stringArg()) },
            type: nonNull('Boolean'),
            resolve: (parent, args: { id: string }, context, info): Promise<boolean> => {
                return role_delete(AppDataSource.manager, args.id)
            }
        });
        // --------------------------------------------------
        t.field('role_authorization_set', {
            args: { roleId: nonNull(stringArg()), operationId: nonNull(stringArg()), value: nonNull(booleanArg()) },
            type: nonNull('Boolean'),
            resolve: (parent, args: { roleId: string, operationId: string, value: boolean }, context, info): Promise<boolean> => {
                return role_authorization_set(AppDataSource.manager, args.roleId, args.operationId, args.value)
            }
        });
    }
});
