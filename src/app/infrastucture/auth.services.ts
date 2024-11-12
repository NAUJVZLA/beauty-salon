import { ILoginRequest, ILoginResponse } from "@/app/(main)/core/application/dto";

import { PAuth } from "@/app/(main)/core/application/ports/auth.port";
import { HttpClient } from "./utils/client-http";

export class AuthService  implements PAuth {
    private clientHttp : HttpClient;
    private basePath : string = "auth";
    
    constructor(){
        this.clientHttp = new HttpClient();
    }

    async login(req: ILoginRequest): Promise<ILoginResponse> {

        return this.clientHttp.post<ILoginResponse,ILoginRequest >(
            `${this.basePath}/login`,
            req
        )
    }
}