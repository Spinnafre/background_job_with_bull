import { IJobs } from "./protocols/jobsProtocol";

import MailProvider from "../providers/Mail";

import { QueueOptions } from "./protocols/QueueOptions";

interface IUserProps {
  email: string;
  name: string;
}

export class SendNotification implements IJobs<IUserProps, void> {
  public static readonly name_job = "SendNotification";
  public static readonly name_queue = "notification";

  public static readonly queue_options: QueueOptions = {
    limiter: {
      max: 100,
      duration: 5000,
    },
  };

  async handler(data: any): Promise<void> {
    const {
      data: { name, email },
    } = data;

    await MailProvider.sendMail({
      from: "Queue Test <queue@queuetest.com.br>",
      to: `${name} <${email}>`,
      subject: "Cadastro de usuário",
      html: `Olá, ${name}, bem-vindo ao sistema de filas`,
    });
  }
}
