import client from "./client";

export const login = (data) => {
    client
        .reAuthenticate()
        .then((auth) => console.log("User is already authenticated: ", auth))
        .catch(() => {
            const { username: email, password } = data;
            console.log("Data: ", data);
            client.authenticate({ email, password, strategy: "local" }).then(
                (auth) => console.log("User authenticated: ", auth),
                (err) => console.log("Error in authenticating user: ", err)
            );
        });
};
