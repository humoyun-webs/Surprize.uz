import { Server } from "socket.io";

let io;

export function initSocket(server) {
  io = new Server(server);
  console.log("hi"); 

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("confirmOrderReceipt", (orderId) => {
      io.emit("orderStatusUpdate", { orderId, status: "confirmed" });
    });

    socket.on("orderArrived", (orderId) => {
      io.emit("orderStatusUpdate", { orderId, status: "arrived" });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

export function getSocket() {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
}
