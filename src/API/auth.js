import client from "./client";
import { UserService } from "./services";

export const signup = (data) => {
  const { confirmPassword, ...rest } = data;
  const { password, email } = rest;
  UserService.create(rest).then(
    (res) => {
      console.log("user created: ", res);
      login({ email, password });
    },
    (error) => console.log("Error in creating user: ", error)
  );
};

export const login = (data) => {
  client
    .reAuthenticate()
    .then((auth) => console.log("User is already authenticated: ", auth))
    .catch(() => {
      const { email, password } = data;
      client.authenticate({ email, password, strategy: "local" }).then(
        (auth) => console.log("User authenticated: ", auth),
        (err) => console.log("Error in authenticating user: ", err)
      );
    });
};

export const logout = () => {
  client.logout().then((e) => console.log("user logged out: ", e));
};
