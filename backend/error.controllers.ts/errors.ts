import {Request, Response, NextFunction} from 'express'; 

function handleErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if(err.msg){
        res.status(err.status).send({status: err.status, msg: err.msg})
    }
    res.status(500).send();
}

export default handleErrors;