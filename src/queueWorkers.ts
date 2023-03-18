import "dotenv/config";

import { QueuesManager } from "./providers/Queue";

QueuesManager.processAllWorkers();
