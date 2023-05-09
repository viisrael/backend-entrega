import {prisma} from "../../../database/prismaClient";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";

interface  IAuthenticateClient{
    username: string;
    password: string
}

export class AuthenticateClientUseCase {
    async execute({username, password}: IAuthenticateClient){
        //verificar se o username está cadastrado
        const client = await prisma.clients.findFirst({
            where: { username}
        });
        
        if(!client){
            throw new Error("Username or Password is invalid!");
        }
        
        //verificar se a senha está correta
        const passwordMatch = await compare(password, client.password);
        
        if(!passwordMatch){
            throw new Error("Username or Password is invalid!");
        }
        
        //gerar o token
        const token = sign(
            {username}, //payload
            "019acc25a4e242bb55ad489832ada12d", //secret
            {
                subject: client.id,
                expiresIn: "1d"
            }
        );
        
        return token;
    }
}