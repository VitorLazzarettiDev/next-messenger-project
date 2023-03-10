// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import { Message } from '../../typings';

type Data = {
  messages: Message[];
}

type ErrorData = {
  name: String;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ name: 'Method not Allowed' });
  };

  const messageRes = await redis.hvals('messages');

  const messages: Message[] = messageRes.map((message) => {
    try {
      return JSON.parse(message);
    } catch (error) {
      return [];
    }
  });

  const orderedMessages: Message[] = messages.sort((a, b) => b.created_at - a.created_at);

  res.status(200).json({ messages: orderedMessages });
}

