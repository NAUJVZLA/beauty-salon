import { ILoginRequest } from "@/app/(main)/core/application/dto";
import { AuthService } from "@/app/infrastucture/services/auth.services";
import NextAuth ,{NextAuthOptions,Session} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
    token?: string;
}

interface AuthUser{
    id:string;
    name: string;
    email: string;
    token: string;  
}

interface CustomSession extends Session{
    user : {
        id?: string;
        token?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}

 const authOptions : NextAuthOptions = {

    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                username:{label:"Correo Electronico", type: "text"},
                password : {label: "Clave ", type : "password"},
            },
            authorize : async (Credentials) => {
                if (!Credentials?.password || !Credentials.username){
                    console.log("Credentiales faltantes")
                    return null;
                }
                const loginResquest : ILoginRequest = {
                    password : Credentials.password,
                    userName : Credentials.username
                }

                try {
                    const authService = new AuthService()
                    const response = await authService.login(loginResquest)
                
                    return {
                        email: loginResquest.userName,
                        id: loginResquest.userName,
                        name:loginResquest.userName,
                        token: response.token
                    } as AuthUser 
                } catch (error){
                    console.log (error)
                    return Promise.reject(new Error(JSON.stringify(error)));
                }

            },
        }),
    ],
    session : {
        strategy: "jwt",

    },
    callbacks: {
        async jwt ({token,user}){
            if (user){
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.token = authUser.token;
            }
            return token;

        },
        async session ({session, token}){
            const CustomSession = session as CustomSession;
            CustomSession.user.id = (token as AuthToken).id;
            CustomSession.user.token = (token as AuthToken).token;
            return CustomSession;
            
        }

    }

 };

 export default NextAuth(authOptions);
 export const GET  = NextAuth(authOptions);
 export const POST = NextAuth(authOptions);