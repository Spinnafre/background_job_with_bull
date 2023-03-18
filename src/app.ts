import "dotenv/config";

import express from "express";
import { SendNotificationController } from "./controllers/SendNotification";

import { QueuesManager } from "./providers/Queue";

import { ExpressAdapter } from "@bull-board/express";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { createBullBoard } from "@bull-board/api";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/ui");

const sendNotificationController = new SendNotificationController();

createBullBoard({
  queues: QueuesManager.queues.map((queue) => new BullAdapter(queue.queue)),
  serverAdapter,
});

const app = express();

app.use("/ui", serverAdapter.getRouter());

app.use(express.json());

app.post("/test", sendNotificationController.handler);

export { app };
