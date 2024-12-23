import { extendType } from 'nexus';
import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../utils';
import { user_notification_receive_gql, user_notification_send_type } from './type';

export const UserSubscription = extendType({
    type: 'Subscription',
    definition(t) {
        t.field('user_subscription', {
            type: user_notification_receive_gql,
            args: {},
            subscribe: withFilter(
                () => pubsub.asyncIterableIterator('user_notification_sender'),
                (payload: user_notification_send_type, args, context, info) => {
                    if (context?.jwt?.id == payload?.receiverId) return true
                },
            ),
            resolve: async (payload: user_notification_send_type, args, context, info) => {
                return new Promise((resolve, reject) => {
                    try {
                        resolve(payload);
                    } catch (error) {
                        reject(new Error('---- ERROR : subscription .'));
                    }
                })
            },
        });
    },
});