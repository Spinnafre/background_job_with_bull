import Queue from "bull";
import * as jobs from "../jobs";

import { RedisConfig } from "../config";

type handler = {
  name: string;
  process: { handler: (data: any) => Promise<any> };
};

type backgroundJobs = {
  queue: Queue.Queue;
  workers: Array<handler>;
};

export class QueuesManager {
  static readonly queues: Array<backgroundJobs> = Object.values(jobs).map(
    (jobClass) => {
      return {
        queue: new Queue(jobClass.name_queue, { redis: RedisConfig }),
        workers: [
          {
            name: jobClass.name_job,
            process: new jobClass(),
          },
        ],
      };
    }
  );

  static async add({
    name_queue,
    data,
    options,
  }: {
    name_queue: string;
    data: any;
    options?: Queue.JobOptions;
  }): Promise<void> {
    const taskQueue = this.queues.find((job) => job.queue.name === name_queue);

    // Adicionar uma tarefa na fila ( um objeto que irá ser lido por um processo )
    await taskQueue?.queue.add(data, options);
  }

  static processAllWorkers(): void {
    this.queues.forEach((job) => {
      job.workers.forEach((worker) => {
        // Process irá processar qualquer dado armazenado na fila específica.
        job.queue.process(worker.process.handler);
      });
    });
  }
}
