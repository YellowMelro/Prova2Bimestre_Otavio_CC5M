import jwt from "jsonwebtoken";

//Gerar um token
export async function generateJwt() {
    return await jwt.sign({user: 'any'}, "secret");
}

//Validação do token
export async function velidateJwt(token: string) {
    return await jwt.verify(token, "secret");
}