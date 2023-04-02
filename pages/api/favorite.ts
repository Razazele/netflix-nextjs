import { NextApiRequest,NextApiResponse  } from "next";
import { without } from "lodash";


import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

//API TO ADD OR DELETE MOVIES FROM FAVORITE LIST
export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
        if(req.method == 'POST') {
            const {currentUser} = await serverAuth(req);
            const {movieId} = req.body;
            //CHECK IF USER EXISTS
            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id:movieId,
                }
            })
            //
            if (!existingMovie) {
                throw new Error("ID Invalida");

            }
            //Add ID from Current Movie to FAVORITES
            const user = await prismadb.user.update({
                where:{
                    email:currentUser.email || '',
                },
                data: {
                    favoriteIds:{
                        push:movieId,
                    }
                }
            })

            return res.status(200).json(user);
        }
        //Delete From favorites
        if (req.method == 'DELETE') {
            const {currentUser} = await serverAuth(req);

            const {movieId} = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id:movieId,
                }

            })

            if (!existingMovie) {
                throw new Error("ID INVALIDA");
            }
            //Creates a favorite id list excluding the selected movieID
            const updateFavoriteIds = without(currentUser.favoriteIds,movieId);
            //Updates the favoriteIds list in the current user using the array above, it could be considered as deleting the selected movieId from favoriteIds
            const updatedUser = await prismadb.user.update({
                where:{
                    email:currentUser.email || '',
                },
                data: {
                    favoriteIds:updateFavoriteIds,
                }
            })

            return res.status(200).json(updatedUser);
        }


        return res.status(405).end()
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}