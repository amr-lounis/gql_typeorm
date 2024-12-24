import { Between, EntityManager, Like } from "typeorm";
import { generateID, toPage } from "../../utils";
import { IProducts, Invoices } from "../../entities";
import { productGetOrError, product_quantity_updown } from "../product/controller";
import { ArgsInvoiceQ, INVOICE_TYPES, invoice_update_prudect_type, invoice_update_type } from "./type";
// ****************************************************************************************************
export const invoices_get = async (manager: EntityManager, args: ArgsInvoiceQ) => {
    const itemsCountAll = await manager.count(Invoices, {
        where: [
            {
                id: args.id,
                employeeId: args.employeeId,
                dealerId: args.dealerId,
                validation: args.validation,
                description: args.filter_description ? Like(`%${args.filter_description}%`) : undefined,
            },
            {
                updatedAt: args.filter_update_gte && args.filter_update_lte
                    ? Between(new Date(args.filter_update_gte), new Date(args.filter_update_lte))
                    : undefined,
                insertedAt: args.filter_insert_gte && args.filter_insert_lte
                    ? Between(new Date(args.filter_insert_gte), new Date(args.filter_insert_lte))
                    : undefined,
            }
        ],
    });
    const p = toPage(itemsCountAll, args.pageNumber, args.itemsTake)

    const items = await manager.find(Invoices, {
        where: [
            {
                id: args.id,
                employeeId: args.employeeId,
                dealerId: args.dealerId,
                validation: args.validation,
                description: args.filter_description ? Like(`%${args.filter_description}%`) : undefined,
            },
            {
                updatedAt: args.filter_update_gte && args.filter_update_lte
                    ? Between(new Date(args.filter_update_gte), new Date(args.filter_update_lte))
                    : undefined,
                insertedAt: args.filter_insert_gte && args.filter_insert_lte
                    ? Between(new Date(args.filter_insert_gte), new Date(args.filter_insert_lte))
                    : undefined,
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
// ****************************************************************************************************
export const invoice_insert = async (manager: EntityManager, type: string, employeeId: string): Promise<string> => {
    if (
        type != INVOICE_TYPES.PURCHASE
        && type != INVOICE_TYPES.SALE
        && type != INVOICE_TYPES.SALE_GR
        && type != INVOICE_TYPES.LOSS
    ) throw new Error('invoice type not match');
    const r = await manager.insert(Invoices,
        {
            id: generateID(type + "_invalid_"),
            type: type,
            employeeId: employeeId,
        }
    )
    return r.identifiers[0].id;
}
export const invoice_update = async (manager: EntityManager, id: string, args: invoice_update_type): Promise<boolean> => {
    const invoice = await invoiceGetOrError(manager, id);
    if (invoice.validation == true) throw new Error('invoice is validated.');
    // 
    args.money_stamp = args.money_stamp ?? invoice.money_stamp;
    if (args.money_stamp < 0) throw new Error("money_stamp < 0")
    // 
    args.money_tax = args.money_tax ?? invoice.money_tax;
    if (args.money_tax < 0) throw new Error("money_tax < 0")
    // 
    args.money_paid = args.money_paid ?? invoice.money_paid;
    if (args.money_paid < 0) throw new Error("money_paid < 0")
    // 
    const money_net = await manager.sum(IProducts, "money_calc", { invoiceId: id })
    const money_calc = money_net + args.money_stamp + args.money_tax;
    const money_unpaid = money_calc - args.money_paid

    if (args.money_paid > money_calc) throw new Error("money_paid > money_calc")
    if (money_unpaid > money_calc) throw new Error("money_unpaid > money_calc")


    await manager.update(Invoices,
        { id: id }, {
        id: args.id,
        employeeId: args.employeeId,
        dealerId: args.dealerId,
        description: args.description,
        money_stamp: args.money_stamp,
        money_tax: args.money_tax,
        money_paid: args.money_paid,
        money_net: money_net,
        money_calc: money_calc,
        money_unpaid: money_unpaid,
    }
    )
    return true
}
export const invoice_update_prudect = async (manager: EntityManager, args: invoice_update_prudect_type): Promise<boolean> => {
    if (args?.quantity < 0) throw new Error('quantity < 0.');
    const invoice = await invoiceGetOrError(manager, args.invoiceId);
    if (invoice.validation == true) throw new Error('invoice is validated.');
    const product = await productGetOrError(manager, args.prudectId);
    const ip_exist = await manager.findOne(IProducts, { where: { invoiceId: args.invoiceId, productId: args.prudectId } })

    if (ip_exist) {
        const money_unite = (args.money_unite ?? ip_exist.money_unite);
        const quantity = (args.quantity ?? ip_exist.quantity + 1);
        const money_calc = (money_unite * quantity);
        // 
        if (quantity > 0) {
            await manager.update(IProducts, { invoiceId: args.invoiceId, productId: args.prudectId },
                {
                    description: args.description,
                    money_unite: money_unite,
                    quantity: quantity,
                    money_calc: money_calc,
                }
            )
        } else {
            await manager.delete(IProducts, { invoiceId: args.invoiceId, productId: args.prudectId })
        }
    } else {
        let defult_money_unite: number = 0;
        if (invoice.type == INVOICE_TYPES.SALE) defult_money_unite = product.money_selling;
        else if (invoice.type == INVOICE_TYPES.SALE_GR) defult_money_unite = product.money_selling_gr;
        else if (invoice.type == INVOICE_TYPES.PURCHASE) defult_money_unite = product.money_purchase;
        else if (invoice.type == INVOICE_TYPES.LOSS) defult_money_unite = product.money_purchase;

        const money_unite = args.money_unite ?? defult_money_unite;
        const quantity = (args.quantity ?? 1);
        const money_calc = (money_unite * quantity);
        if (quantity > 0) {
            await manager.insert(IProducts,
                {
                    invoiceId: args.invoiceId,
                    productId: args.prudectId,
                    description: args.description,
                    money_unite: money_unite,
                    quantity: quantity,
                    money_calc: money_calc
                }
            )
        }
    }
    // await invoice_update(tr, args.invoiceId, {})
    return true
}
export const invoice_update_validation = async (manager: EntityManager, invoiceId: string, validationNew: boolean): Promise<string> => {
    const invoice = await invoiceGetOrError(manager, invoiceId);
    // 
    const validationOld = invoice.validation;
    const invoiceType = invoice.type;
    // 
    if (validationNew == true && validationOld == true) throw new Error('invoice already validated.');
    if (validationNew == false && validationOld == false) throw new Error('invoice already invalidate.');
    // 
    let idOut;
    if (invoiceType == INVOICE_TYPES.PURCHASE) {
        if (validationNew == true && validationOld == false) {
            // to valid
            const ip = await manager.find(IProducts, { where: { invoiceId: invoiceId } })
            for (let i = 0; i < ip.length; i++) await product_quantity_updown(manager, ip[i].productId, ip[i].quantity)
            idOut = await manager.update(Invoices, { id: invoiceId }, { id: generateID(invoiceType + "_valid_"), validation: true })
        } else if (validationNew == false && validationOld == true) {
            // to invalid
            const ip = await manager.find(IProducts, { where: { invoiceId: invoiceId } })
            for (let i = 0; i < ip.length; i++) await product_quantity_updown(manager, ip[i].productId, - ip[i].quantity)
            idOut = await manager.update(Invoices, { id: invoiceId }, { id: generateID(invoiceType + "_invalid_"), validation: false })
        }
    } else if (invoiceType == INVOICE_TYPES.SALE || invoiceType == INVOICE_TYPES.SALE_GR || invoiceType == INVOICE_TYPES.LOSS) {
        if (validationNew == true && validationOld == false) {
            // to valid
            const ip = await manager.find(IProducts, { where: { invoiceId: invoiceId } })
            for (let i = 0; i < ip.length; i++) await product_quantity_updown(manager, ip[i].productId, -ip[i].quantity)
            idOut = await manager.update(Invoices, { id: invoiceId }, { id: generateID(invoiceType + "_valid_"), validation: true })
        } else if (validationNew == false && validationOld == true) {
            // to invalid
            const ip = await manager.find(IProducts, { where: { invoiceId: invoiceId } })
            for (let i = 0; i < ip.length; i++) await product_quantity_updown(manager, ip[i].productId, ip[i].quantity)
            idOut = await manager.update(Invoices, { id: invoiceId }, { id: generateID(invoiceType + "_invalid_"), validation: false })
        }
    }
    else {
        throw new Error('invoice type not recognized');
    }
    return idOut
}
export const invoice_delete = async (manager: EntityManager, invoiceId: string): Promise<boolean> => {
    const invoice = await invoiceGetOrError(manager, invoiceId);
    if (invoice.validation == true) throw new Error('invoice is validated.');
    // 
    await manager.delete(Invoices, { where: { id: invoiceId } })
    return true
}
export const invoiceGetOrError = async (manager: EntityManager, invoiceId: string) => {
    if (invoiceId == undefined) throw new Error('invoice id is required');
    const invoice = await manager.findOne(Invoices, { where: { id: invoiceId } })
    if (!invoice) throw new Error(`invoice id ${invoiceId} not exist .`);
    return invoice
}
