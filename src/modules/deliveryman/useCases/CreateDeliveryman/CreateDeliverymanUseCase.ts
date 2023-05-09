import {prisma} from "../../../../database/prismaClient";
import {hash} from "bcrypt";

interface ICreateDeliveryMan{
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {
    async execute({username, password}: ICreateDeliveryMan){
        
        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });
        
        
        if (deliverymanExist){
            throw new Error("Deliveryman already exists")
        }
        
        const hashPassword = await hash(password, 10);
        
        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPassword
            }
        });
        
        return deliveryman;
    }
}