import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/db";
import Creator from "@/models/Creator"; // assumes Creator.ts exists

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    const creators = await Creator.find({});
    return res.status(200).json(creators);
  }

  if (req.method === "POST") {
    const newCreator = await Creator.create(req.body);
    return res.status(201).json(newCreator);
  }

  return res.status(405).end();
}

