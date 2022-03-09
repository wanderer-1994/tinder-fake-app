// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbInit from '../../../db/connect'
import UserModel from '../../../db/models/User'
import ActionModel from '../../../db/models/Action'
import mockData from '../../../db/data/mockUser'

export type Data = {
  success: Boolean,
  error: Boolean,
  errorMessage?: String
}

export async function refreshDatabase(): Promise<Data> {
  try {
    await UserModel.deleteMany();
    await ActionModel.deleteMany();
    await UserModel.insertMany(mockData);
    return {
        success: true,
        error: false
    }
  } catch (err: any) {
    return {
      success: false,
      error: true,
      errorMessage: err.message
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbInit();
  let response = await refreshDatabase()
  return res.json(response)
}