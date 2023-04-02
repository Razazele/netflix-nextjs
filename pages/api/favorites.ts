import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

//GET THE MOVIES FROM THE FAVORITES LIST OF THE CURRENT USER
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);
    //GET ALL MOVIES THAT HAVE BEEN ADDED TO THE FAVORITEIDS LIST
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(405).end();
  }
}
