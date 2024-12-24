import { authorization_matrix } from "./authorization_matrix";
import { myLog } from "./myFunc";

export const middleware_01 = async (resolve: any, root: any, args: any, context: ContextType, info: any) => {
    if ((info?.parentType?.name == 'Query') || (info?.parentType?.name == 'Mutation')) {
        context.operation = info?.fieldName || ''
        context.fields = info.fieldNodes[0].selectionSet?.selections?.map((field) => field.name.value);
        // test if context.jwt.role can access to context.operation if can't throw error : example
        const r = authorization_matrix.authorization_test(context.jwt.role, context.operation)
        if (!r) throw Error(`role:${context.jwt.role} --- operation:${context.operation} not authorized .`)
        // log for test input request
        myLog(`args:[${Object.keys(args)}] --- context:${JSON.stringify(context)}`)
    }
    return await resolve(root, args, context, info)
}

export type ContextType = {
    operation?: string,
    fields?: string[],
    jwt?: {
        id: string,
        role: string,
        iat: number,
        exp: number
    }
}