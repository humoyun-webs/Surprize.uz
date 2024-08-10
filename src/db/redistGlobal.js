import { Redis } from "ioredis";
import { promisify } from "util";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);

const client = new Redis({
  host: redisHost,
  port: redisPort,
  lazyConnect: true,
});

client.connect();

client.on("connect", function () {
  console.log("Redis has connected successfully");
});

client.on("error", function (error) {
  console.error("Redis failed to connect:", error);
});

const asyncGet = promisify(client.get).bind(client);
const asyncSet = promisify(client.set).bind(client);

async function setRedisData(key, value) {
  try {
    await asyncSet(key, JSON.stringify(value));
  } catch (error) {
    console.error("Redis failed to write data:", error);
    throw new Error("Redis failed to write data");
  }
}

async function getRedisData(key) {
  try {
    const data = await asyncGet(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Redis failed to get data:", error);
    throw Error("Redis failed to get data");
  }
}

async function updateRedisData(key, value) {
  try {
    await asyncSet(key, JSON.stringify(value));
  } catch (error) {
    console.error("Redis failed to update data:", error);
    throw new Error("Redis failed to update data");
  }
}

async function deleteRedisData(key) {
  try {
    await client.del(key);
  } catch (error) {
    console.error("Redis failed to delete data:", error);
    throw new Error("Redis failed to delete data");
  }
}

export { setRedisData, getRedisData, updateRedisData, deleteRedisData, client };
