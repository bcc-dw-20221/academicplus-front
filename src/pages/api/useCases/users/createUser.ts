import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../services/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.body;

  if (!user) return res.status(400);

  try {
    prisma.student.create({
      data: {
        personalInformation: {
          create: {
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
        }
      }
    });

    return res.json({ message: `${user.type} created` });
  } catch (error) {
    res.status(500);
  }
};
