// pages/api/auth/hook.ts
import  prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, secret } = req.body;
  // 1
  if (req.method !== 'POST') {
    console.log("method not found")
    return res.status(403).json({ message: 'Method not allowed' });
  }
  // 2
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    console.log('secret not found')
    throw new Error();
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  // 3
  if (email) {
    // 4
    await prisma.user.create({
      data: { email },
    });
    console.log("User with  has been created successfully")
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export default handler;