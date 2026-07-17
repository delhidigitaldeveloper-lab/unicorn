import { promises as fs } from "fs";
import path from "path";

// All content lives in flat JSON files under /data. This avoids requiring
// an external database server or native binaries — the admin panel reads
// and writes these files directly, which is ideal for a self-hosted site
// like this one. Writes are serialized per-file with a simple in-memory
// queue to avoid corrupting a file if two requests hit at once.

const DATA_DIR = path.join(process.cwd(), "data");

const writeQueues = new Map<string, Promise<unknown>>();

function queueWrite<T>(file: string, task: () => Promise<T>): Promise<T> {
  const previous = writeQueues.get(file) ?? Promise.resolve();
  const next = previous.then(task, task);
  writeQueues.set(
    file,
    next.catch(() => undefined)
  );
  return next;
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readJSON<T>(file: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJSON<T>(file: string, data: T): Promise<T> {
  return queueWrite(file, async () => {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, file);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return data;
  });
}

export function generateId(prefix = "id"): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${random}`;
}
