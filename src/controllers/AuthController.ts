//src\controllers\AuthController.ts
import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash, validateHash } from "../utils/BcryptUtils";

class AuthController {
    constructor() {}


    async signUp(req: Request, res: Response) {

        const {email, name, password} = req.body;

        if (!email || !password) {
            res.json({
              status: "error",
              message: "Falta parâmetros",
            });
            return;
        }

        const hashPassword = await generateHash(password);

        if (!hashPassword) {
            res.json({
            status: "error",
            message: "Erro ao criptografar a senha ...",
            });
            return;
        }

        try {
            const newuser = await AuthService.signUp({
                name: name,
                email: email,
                password: hashPassword as string,
            });
            res.json({
                status: "ok",
                newuser: newuser,
            });
            return;
            
        } catch (error) {
            res.json({
                status: "error",
                message: error,
            });
            return;
        }
         
    }

    async signIn(req: Request, res: Response) {
        
        const {email, password} = req.body;

        if (!email || !password) {
            res.json({
              status: "error",
              message: "Falta parâmetros",
            });
            return;
        }

        try{
            const user = await AuthService.signIn(email);
            if(user?.password){
                const canAccess = await validateHash(password, user?.password);
                if(canAccess){
                    res.json({
                        status: "ok",
                        message: "autenticado com sucesso",
                        token: await generateHash(password)
                      });
                    return;
                }
            }
        }catch(error){
            res.json({
                status: "error",
                message: error,
            });
            return;
        }

    }

    async signOut() {
        
    }


}

export default new AuthController();