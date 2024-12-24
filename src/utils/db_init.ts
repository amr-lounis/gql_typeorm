import { operation_insert, product_categorie_insert, product_insert, product_unity_insert, role_insert, todo_insert, user_insert, invoice_insert, INVOICE_TYPES, invoice_update_prudect, invoice_update, user_photo_set, todo_photo_set, product_photo_set, setting_set, user_update, todo_update } from "../gql"
import { authorization_matrix } from "./authorization_matrix"
import { myLog, generateRandomString, generateRandomInt, AppDataSource } from "./"
import { Invoices, Products, Settings, Todos } from "../entities"

export const db_init = async (listOperationName: string[]) => {
    myLog(" +++++ initDB +++++")
    const admin = 'admin'
    const employee = 'employee'
    const customer = 'customer'

    await init_user_role_autorisation_matrix([admin, employee, customer], listOperationName)
    await init_setting();
    await init_todo();
    await init_product();
    await init_invoice();
}

const init_user_role_autorisation_matrix = async (list_users: string[], listOperatiosnName: string[]) => { // init autorisation matrix
    await init_operations(listOperatiosnName);
    await init_roles(list_users);
    await init_users(list_users);
    // init matrix roles
    await authorization_matrix.initMatrix()
    // ------------------------------------------------------------------------------------------
    // (set first user in list_users as admin) set allow for all operation
    if (authorization_matrix.matrix.hasOwnProperty(list_users[0])) {
        const operationIds = Object.keys(authorization_matrix?.matrix[list_users[0]]);
        for (const OperationId of operationIds) {
            authorization_matrix.matrix[list_users[0]][OperationId] = true;
        }
    }
    // stor matrix in database
    await authorization_matrix.storeMatrix()
}

const init_setting = async () => {
    await AppDataSource.manager.transaction(async (manager) => {
        let size = (await manager.count(Settings)) ?? 0;
        if (size >= 10) return;
        for (let i = 1; i < 10; i++) {
            try {
                await setting_set(manager, generateRandomString(10, 10), generateRandomString(10, 10))
            } catch (err) { }
        }
    })
}

const init_operations = async (listOperationName: string[]) => {
    await AppDataSource.manager.transaction(async (manager) => {
        for (let i = 0; i < listOperationName.length; i++)
            try {
                await operation_insert(manager, listOperationName[i])
            } catch (err) { }
    })
}

const init_roles = async (roles: string[]) => {
    await AppDataSource.manager.transaction(async (manager) => {
        for (let i = 0; i < roles.length; i++) {
            try {
                await role_insert(manager, roles[i])
            } catch (err) { }
        }
    })
}

const init_users = async (ids_users: string[]) => {
    await AppDataSource.manager.transaction(async (manager) => {
        for (let i = 0; i < ids_users.length; i++) {
            try {
                await user_insert(manager, {
                    id: ids_users[i],
                    password: ids_users[i]
                })
                await user_update(manager, ids_users[i], { roleId: ids_users[i] })
                await user_photo_set(manager, ids_users[i], generateRandomString(20, 30))
            } catch (err) { }
        }
    })
}

const init_todo = async () => {
    return await AppDataSource.manager.transaction(async (manager) => {
        let size = (await manager.count(Todos)) ?? 0;
        if (size >= 10) return;
        for (let i = 0; i < 10; i++) {
            const money_total = generateRandomInt(0, 100);
            const money_expenses = generateRandomInt(0, money_total);
            const money_paid = generateRandomInt(0, money_total);
            try {
                const id = await todo_insert(manager, {
                    employeeId: Math.random() > 0.5 ? 'admin' : 'employee',
                })
                await todo_update(manager, id, {
                    dealerId: Math.random() > 0.5 ? 'admin' : 'employee',
                    description: generateRandomString(50, 100),
                    money_total: money_total,
                    money_expenses: money_expenses,
                    money_paid: money_paid
                })
                await todo_photo_set(manager, id, generateRandomString(20, 30))
            } catch (err) { }
        }
    })
}

const init_product = async () => {
    return await AppDataSource.manager.transaction(async (manager) => {
        let size = (await manager.count(Products)) ?? 0;
        if (size > 10) return;
        for (let i = 1; i <= 10; i++) {
            const p_id = `product_${i}`
            const u_id = `unity_${i}`
            const c_id = `categorie_${i}`
            const money_purchase = generateRandomInt(0, 100);
            const money_selling = generateRandomInt(money_purchase, 1000);
            const money_selling_gr = generateRandomInt(money_purchase, money_selling);
            // 
            try {
                await product_unity_insert(manager, u_id)
            } catch (err) { }
            try {
                await product_categorie_insert(manager, c_id)
            } catch (err) { }
            try {
                await product_insert(manager, {
                    id: p_id,
                    unityId: u_id,
                    categorieId: c_id,
                    code: p_id,
                    description: p_id,
                    money_purchase: money_purchase,
                    money_selling: money_selling,
                    money_selling_gr: money_selling_gr,
                    quantity_alert: generateRandomInt(0, 10)
                })
                await product_photo_set(manager, p_id, generateRandomString(20, 30))
            } catch (err) { }
        }
    })
}

const init_invoice = async () => {
    return await AppDataSource.manager.transaction(async (manager) => {
        let size = (await manager.count(Invoices)) ?? 0;
        if (size >= 10) return;
        for (let i = 1; i < 10; i++) {
            const invoiceId = await invoice_insert(manager, INVOICE_TYPES.PURCHASE, "admin")
            // add products to this invoice
            for (let j = 1; j < 10; j++) {
                try {
                    await invoice_update_prudect(manager, {
                        invoiceId: invoiceId,
                        prudectId: `product_${j}`,
                        quantity: generateRandomInt(1, 10),
                        description: generateRandomString(50, 100),
                    })
                } catch (err) { }
            }
            // calculate this invoice
            try {
                await invoice_update(manager, invoiceId, {
                    dealerId: Math.random() > 0.5 ? 'admin' : 'employee',
                    description: generateRandomString(50, 100),
                    money_stamp: generateRandomInt(0, 100),
                    money_tax: generateRandomInt(0, 100)
                })
            } catch (err) { }
            // change value of paid
            try {
                const iii = await manager.findOne(Invoices, { where: { id: invoiceId } })
                await invoice_update(manager, invoiceId, { money_paid: iii.money_calc })
            } catch (err) { }
        }
    })
}