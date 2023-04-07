// A helper for generating and decoding JWTs.
// @ts-ignore
import jwt from "jsonwebtoken";

const fifteenMinutes = 1000 * 60 * 15;
const cookieName = "token";

const cookieExp = fifteenMinutes;

import { env } from "$env/dynamic/private";

const { ENV_JWT_SECRET } = env;

const token = {
    cookie: (data: string) =>
        `${cookieName}=${data}; path=/; max-age=${cookieExp}; Secure; HttpOnly;`,

    decode: (token: string) => {
        try {
            return jwt.verify(token, ENV_JWT_SECRET);
        } catch (error) {
            return;
        }
    },

    // @ts-ignore
    sign: (data: Account, exp: number = cookieExp) =>
        jwt.sign(
            {
                data,
            },
            ENV_JWT_SECRET,
            { expiresIn: exp }
        ),
};

export default token;
