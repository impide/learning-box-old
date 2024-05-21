import { Request, Response } from "express";
import { User } from "@prisma/client";
import { SignupModel } from "../../models/user";
import { Role } from "../../enums/roles.js";
import UserServices from "../../services/user";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  async signup(req: Request, res: Response): Promise<Response> {
    const { email, password, role } = req.body;
    const user: User = await UserServices.findOneByEmail(email);

    if (user)
      throw new Error("Cette adresse e-mail est déjà associée à un compte");
    if (role !== Role.USER) throw new Error("Non autorisé(e)");

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser: SignupModel = {
      ...req.body,
      password: encryptedPassword,
    };
    console.log("2", newUser.avatarUrl);

    const createdUser: User = await UserServices.createOne(newUser);
    return res.status(200).json({
      status: 200,
      result: createdUser,
    });
  },

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user: User = await UserServices.findOneByEmail(email);

    if (user === null) throw new Error("Cet utilisateur n'existe pas");

    const encryptedPassword = await bcrypt.hash(user.password, 10);
    const comparePassword = await bcrypt.compare(password, encryptedPassword);

    if (!comparePassword) throw new Error("Non autorisé(e)");
    delete user.password;
    const { SECRET } = process.env;

    return res.status(200).json({
      status: 200,
      message: "Utilisateur connecté avec succès !",
      result: user,
      token: jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" }),
    });
  },
};
