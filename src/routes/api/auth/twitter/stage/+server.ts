import { env } from "$env/dynamic/private";
import token from "$lib/util/token";

import { auth } from "twitter-api-sdk";

const {
    ENV_TWITTER_OAUTH_CLIENT,
    ENV_TWITTER_OAUTH_CLIENT_SECRET,
    ENV_TWITTER_OAUTH_CALLBACK = "",
    ENV_JWT_SECRET,
} = env;

export async function GET() {
    // Some secret state to go along for the ride and come back to
    // the app upon successful authentication. This will be somthing like a user ID
    // or some reference to an account to link the twitter response to.
    // Encode as JWT using the secret key.
    const state = token.sign({
        id: "user-id-xxx-xxx-xxxx",
    });

    const authClient = new auth.OAuth2User({
        callback: ENV_TWITTER_OAUTH_CALLBACK,
        client_id: ENV_TWITTER_OAUTH_CLIENT || "",
        client_secret: ENV_TWITTER_OAUTH_CLIENT_SECRET,
        scopes: ["tweet.read", "users.read"],
    });

    const authUrl = authClient.generateAuthURL({
        code_challenge: "challenge",
        code_challenge_method: "plain",
        state,
    });

    return new Response(
        JSON.stringify({
            url: authUrl,
        })
    );
}
