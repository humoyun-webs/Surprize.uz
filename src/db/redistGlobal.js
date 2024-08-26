import { createClient } from "redis";

const redisPassword = process.env.REDIS_PASS 
const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT


const client = createClient({
  password: redisPassword,
  socket: {
    host: redisHost,
    port: redisPort,
  },
});
client.connect(); 



client.on("connect", function () {
  console.log("Redis has connected successfully");
});

client.on("error", function (error) {
  console.error("Redis failed to connect:", error);
});


async function setRedisData(key, value) {
  try {
   await client.set(key,value);
  } catch (error) {
    console.error("Redis failed to write data:", error);
    throw new Error("Redis failed to write data");
  }
}

async function getRedisData(key) {
  try {
    const data = await client.get(key);
    return data
  } catch (error) {
    console.error("Redis failed to get data:", error);
    throw Error("Redis failed to get data");
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

export { setRedisData, getRedisData, deleteRedisData, client };

