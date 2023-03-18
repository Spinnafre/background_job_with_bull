import { Request, Response } from "express";
import { QueuesManager } from "../providers/Queue";

interface SendNotificationDTO {
  name: string;
  email: string;
  password: string;
}

class SendNotificationController {
  constructor() {}

  async handler(req: Request, res: Response): Promise<any> {
    const { name, email, password } = req.body as SendNotificationDTO;

    console.log(`Enviando email para ${email}`);

    await QueuesManager.add({
      name_queue: "notification",
      data: {
        name,
        email,
      },
      options: {
        delay: 1000,
      },
    });

    return res.status(202).json({
      msg: "Recebemos o seu email, enviaremos o email assim que possível.",
      data: { name, email, password },
    });
  }
}

export { SendNotificationController };
