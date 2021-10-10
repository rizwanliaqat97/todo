import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import socket from "./socketio";

const client = feathers();
client.configure(socketio(socket, { timeout: 30000 }));

client.configure(auth({ storage: window.localStorage }));

client.reAuthenticate().then(
  (res) => console.log("Authenticated: ", res),
  () => {
    window.location.assign("http://localhost:3000/login");
  }
);

export default client;
