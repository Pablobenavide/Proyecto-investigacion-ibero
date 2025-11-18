import "express"
import { UsuarioJwtPayload } from "./auth.middleware"

declare module "express-serve-static-core"{
    interface Request{
        usuario?:UsuarioJwtPayload;
    }
}