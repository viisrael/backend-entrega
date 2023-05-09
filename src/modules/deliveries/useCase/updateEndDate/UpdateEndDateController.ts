import {Request, Response} from "express";
import {UpdateEndDateUseCase} from "./UpdateEndDateUseCase";


export class UpdateEndDateController {
    async handle(request: Request, response: Response){
        
        const {id_deliveryman} = request;
        const {id_delivery} = request.params;
        
        const updateEndDateUseCase = new UpdateEndDateUseCase();
        
        var result = await updateEndDateUseCase.execute({id_delivery, id_deliveryman});
        
        return response.json(result);
    }
}