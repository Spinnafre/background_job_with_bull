import { QueueOptions } from "./protocols/QueueOptions";
import { IJobs } from "./protocols/jobsProtocol";

interface IUserProps {
  email: string;
  name: string;
}

export class UserReport implements IJobs<IUserProps, void> {
  public static readonly name_job = "UserReport";
  public static readonly name_queue = "reports";

  public static readonly queue_options: QueueOptions | null = null;

  async handler(data: any): Promise<void> {
    const { name } = data;

    console.log(`Hello, ${name} :)`);
  }
}
