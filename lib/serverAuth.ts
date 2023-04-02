import { NextApiRequest } from "next";;
import  {getSession} from 'next-auth/react';

import prismadb from '@/lib/prismadb'

//Protecting Routes: Returns current user logged
const serverAuth = async (req:NextApiRequest) => {
    //get current session by current token
    const session = await getSession({req});
    //Revisa si ha iniciado sesion
    if(!session?.user?.email) {
        throw new Error("No ha iniciado sesion");

    }

    const currentUser = await prismadb.user.findUnique({
        where:{
            email:session.user.email,
        }
    })

    if(!currentUser) {
        throw new Error("No ha iniciado sesion");

    }

    return {
        currentUser
    };
}

export default serverAuth;