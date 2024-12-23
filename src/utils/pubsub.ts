import { PubSub } from "graphql-subscriptions";

// -------------------------------------------------- PubSub
class Models {
    private static instance = new PubSub()
    public static getInstance = () => Models.instance;
}
export const pubsub = Models.getInstance();
// export const pubsub = new PubSub();