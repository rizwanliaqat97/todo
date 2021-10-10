import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import socket from "./socketio";

const client = feathers();
client.configure(socketio(socket, { timeout: 30000 }));

client.configure(auth({ storage: window.localStorage }));

export default client;
