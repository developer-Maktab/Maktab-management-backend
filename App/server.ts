import { Server } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv"
import app from "./app";

dotenv.config();

let server: Server;
const PORT = process.env.PORT

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("✅ Mongodb connect successfully");

        server =
            app.listen(PORT, () => {
                console.log("✅ Server is running.");
            })
    } catch (error) {
        console.log(error);
    }
}


(async () => {
    await startServer();
})()


process.on("SIGTERM", (err) => {
    console.log('SIGTERM signal received. Server shutting down', err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1);
    }
})
process.on("SIGINT", (err) => {
    console.log('SIGINT signal received. Server shutting down', err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1);
    }
})
process.on("unhandledRejection", (err) => {
    console.log('An unhandled rejection detected. server shutting down..', err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1);
    }
})

process.on("uncaughtException", (err) => {
    console.log('An uncaughtException rejection detected. server shutting down..', err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1);
    }
})
