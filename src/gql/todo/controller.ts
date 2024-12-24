import { EntityManager, Between, Like } from 'typeorm';
import { generateID, toPage } from '../../utils';
import { Todos } from '../../entities';
import { ArgsTodoM, ArgsTodoQ } from './type';

// **************************************************************************************************** 
export const todoGetOrError = async (manager: EntityManager, todoId: string) => {
    if (todoId == undefined) throw new Error('todo id is required');
    const todo = await manager.findOne(Todos, { where: { id: todoId } })
    if (!todo) throw new Error(`todo id ${todoId} not exist .`);
    return todo
}
export const todos_get = async (manager: EntityManager, args: ArgsTodoQ) => {
    const itemsCountAll = await manager.count(Todos, {
        where: [
            {
                id: args.id,
                employeeId: args.employeeId,
                dealerId: args.dealerId,
                validation: args.validation
            },
            {
                updatedAt: args.filter_update_gte && args.filter_update_lte
                    ? Between(new Date(args.filter_update_gte), new Date(args.filter_update_lte))
                    : undefined,
                insertedAt: args.filter_insert_gte && args.filter_insert_lte
                    ? Between(new Date(args.filter_insert_gte), new Date(args.filter_insert_lte))
                    : undefined,
                description: args.filter_description ? Like(`%${args.filter_description}%`) : undefined,
            }
        ],
    });
    const p = toPage(itemsCountAll, args.pageNumber, args.itemsTake)

    const items = await manager.find(Todos, {
        where: [
            {
                id: args.id,
                employeeId: args.employeeId,
                dealerId: args.dealerId,
                validation: args.validation
            },
            {
                updatedAt: args.filter_update_gte && args.filter_update_lte
                    ? Between(new Date(args.filter_update_gte), new Date(args.filter_update_lte))
                    : undefined,
                insertedAt: args.filter_insert_gte && args.filter_insert_lte
                    ? Between(new Date(args.filter_insert_gte), new Date(args.filter_insert_lte))
                    : undefined,
                description: args.filter_description ? Like(`%${args.filter_description}%`) : undefined,
            }
        ],
        order: {
            insertedAt: "DESC",
        },
        skip: p.itemsSkip,
        take: p.itemsTake
    });
    return {
        allItemsCount: itemsCountAll,
        allPagesCount: p.allPagesCount,
        itemsSkip: p.itemsSkip,
        itemsTake: p.itemsTake,
        pageNumber: p.pageNumber,
        itemsCount: items.length,
        items: items
    }
}
export const todo_insert = async (manager: EntityManager, args: { employeeId: string }): Promise<string> => {
    const result = await manager.insert(Todos, { id: generateID(args.employeeId + ".invalid"), employeeId: args.employeeId });
    const newId = result.identifiers[0].id;
    return newId
}
export const todo_update = async (manager: EntityManager, todoId: string, args: ArgsTodoM) => {
    const todo = await todoGetOrError(manager, todoId);
    if (todo.validation == true) throw new Error('todo is validated.');
    const money_expenses = (args.money_expenses ?? todo.money_expenses);
    const money_total = (args.money_total ?? todo.money_total);
    const money_paid = (args.money_paid ?? money_total);
    // 
    if (args.money_expenses < 0) throw new Error("error : money_expenses < 0")
    if (args.money_total < 0) throw new Error("error : money_total < 0")
    if (args.money_paid < 0) throw new Error("error : money_paid  < 0")
    if (args.money_paid > args.money_total) throw new Error("error : money_paid  > money_total")
    const r = await manager.update(Todos, { id: todoId },
        {
            id: args.id,
            employeeId: args.employeeId,
            dealerId: args.dealerId,
            description: args.description,
            money_expenses: money_expenses,
            money_total: money_total,
            money_paid: money_paid,
            money_unpaid: money_total - money_paid,
            money_margin: money_total - money_expenses
        }
    );
    return true
}
export const todo_delete = async (manager: EntityManager, todoId: string) => {
    const todo = await todoGetOrError(manager, todoId);
    if (todo.validation == true) throw new Error('todo is validated.');
    await manager.delete(Todos, { where: { id: todoId } })
    return true
}
export const todo_update_validation = async (manager: EntityManager, todoId: string, validationNew: boolean): Promise<string> => {
    const todo = await todoGetOrError(manager, todoId);
    if (validationNew == true && todo.validation == true) throw new Error('invoice already validated.');
    if (validationNew == false && todo.validation == false) throw new Error('invoice already invalidate.');
    if (validationNew == true && todo.validation == false) {// to valid
        await manager.update(Todos, { id: todoId }, { validation: true, id: generateID(todo.employeeId + ".valid") })
    }
    if (validationNew == false && todo.validation == true) { // to invalid
        await manager.update(Todos, { id: todoId }, { validation: false, id: generateID(todo.employeeId + ".invalid") })
    }
    return ""
}