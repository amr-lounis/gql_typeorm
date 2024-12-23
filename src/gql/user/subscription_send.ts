import { extendType, nullable } from 'nexus';
import { pubsub } from '../../utils';
import { user_notification_send_gql, user_notification_send_type } from './type';
// **************************************************************************************************** 
export const UserSubscriptionSend = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('user_notification_send', {
            args: user_notification_send_gql,
            type: nullable("Boolean"),
            resolve: (parent, args: user_notification_send_type, context, info): boolean => {
                const payload = { senderId: context.jwt.id, receiverId: args.receiverId, title: args.title, content: args.content }
                pubsub.publish("user_notification_sender", payload);
                return true
            },
        });
    },
});
// **************************************************************************************************** 