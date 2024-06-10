//src\services\AuthService.ts
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthService {
    constructor(){}

    async signIn(email: string){
        try {
            const user = await prisma.user.findUnique({
                where:{
                    email: email
                }
                
            });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async signUp(user: Prisma.UserCreateInput){
        
        try {
            const newuser = await prisma.user.create({
                data:user,
                
            });
            return newuser;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async signOut(){}
}

export default new AuthService();