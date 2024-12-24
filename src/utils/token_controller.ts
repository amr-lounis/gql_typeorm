import jwt from "jsonwebtoken";
import { config_server } from "./";

export type jwtType = {
    id: string,
    role: string
}
class token_controller {
    constructor() { }

    Token_generate(id, role) {
        const payload: jwtType = { id: id, role: role };
        const token = jwt.sign(payload, config_server.JWT_Secret, { expiresIn: config_server.JWT_ExpiresDay });
        return token;
    }

    Token_Verifay(_token) {
        try {
            const tv = jwt.verify(_token, config_server.JWT_Secret);
            return tv;
        } catch (error) {
            return { id: null, role: null }
        }
    }
}

export const MyToken = new token_controller();