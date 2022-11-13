import type { NextApiRequest, NextApiResponse } from "next";

import { UserModel } from "../../models/UserModel";
import { prisma } from "../../services";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const user: UserModel = req.body;

  if (!user) return res.status(400);

  try {
    prisma.user.create({
      data: {
        address: {
          create: {
            country: user.address.country,
            city: user.address.city,
            rua: user.address.street,
            number: user.address.number
          }
        },
        type: user.type,
        cpf: user.cpf,
        password: user.password,
        name: user.name,
        email: user.email,
        sex: user.sex,
        motherName: user.motherName,
        birthDate: user.birthDate
      }
    });

    return res.json({ message: `${user.type} created` });
  } catch (error) {
    res.status(500);
  }
};
