// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../db/models/User';
import dbInit from '../../../db/connect';
import UserModel from '../../../db/models/User';

export type Data = {
  data: User[] | any,
  total: Number,
  page: Number,
  limit: Number,
  serverStatus?: String
}

export async function getData(page: number, pageSize: number): Promise<Data> {
  try {
    const count = await UserModel.countDocuments();
    const data = await UserModel.find().skip(pageSize * (page - 1)).limit(pageSize).exec();
    return {
      data: data,
      total: count,
      page: page,
      limit: pageSize,
      serverStatus: 'OK'
    };
  } catch (err) {
    return {
      data: null,
      total: 0,
      page: 0,
      limit: 0,
    };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbInit();
  const page = req.query.page || '1';
  const pageSize = 15;
  const data = await getData(page as unknown as number, pageSize);
  if (data.data) {
    return res.status(200).json(data);
  } else {
    return res.status(404).json(data);
  }
}