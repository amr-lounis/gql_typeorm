import http from "http";
import { myLog } from "./myFunc";

export const http_server = (_app_express: any) => {
    myLog(" +++++ http_server +++++ ")
    return http.createServer(_app_express);
}
