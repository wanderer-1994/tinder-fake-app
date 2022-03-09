// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel, { User } from '../../../db/models/User'
import ActionModel, { Action, Tendency } from '../../../db/models/Action'

export type GetResponse = {
  data: User[]
  serverStatus?: String
}

export type PostResponse = {
  success: boolean,
  error: boolean,
  errorMessage?: String,
  serverStatus?: string
}

export async function addNotFancy (subject: String, target: String): Promise<PostResponse> {
  try {
    await ActionModel.findOneAndUpdate({ subject, target }, { tendency: Tendency.PASS }, { upsert: true });
    return {
      success: true,
      error: false
    }
  } catch (err: Error | any) {
    return {
      success: false,
      error: true,
      errorMessage: err.message
    }
  }
}

export async function getNotFancy (subject: String): Promise<GetResponse> {
  try {
    let nFancyList = await ActionModel.find({ subject, tendency: Tendency.PASS });
    if (nFancyList && nFancyList.length) {
      let idList = nFancyList.map(item => item.target);
      let users = await UserModel.find({ _id: {$in: idList}});
      return {
        data: users
      }
    }
    return {
      data: []
    }
  } catch (err) {
    return {
      data: []
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse>
) {
  if (req.method === 'GET') {
    let { subjectId } = req.query;
    let response = await getNotFancy(subjectId as String);
    res.status(200).json(response)
  } else if (req.method === 'POST') {
    let { subject, target } = req.body;
    let response =  await addNotFancy(subject, target)
    res.status(200).json(response)
  }
}