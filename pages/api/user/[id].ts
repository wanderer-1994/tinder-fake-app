// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../db/models/User'
import UserModel from '../../../db/models/User'
import dbInit from '../../../db/connect'

type Data = {
  user: User | any,
  serverStatus?: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { id } = req.query;
    await dbInit()
    // '6227a69f2934017ccd93d88a';
    const user = await UserModel.findById(id);
    if (user) {
      return res.status(200).json({
        user: user,
        serverStatus: 'OK'
      })
    }
    throw new Error();
  } catch (err) {
    res.status(400).json({
      user: null,
      serverStatus: 'OK'
    })
  }
}