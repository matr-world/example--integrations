/* eslint-disable max-statements */
import type { RequestEvent } from "@sveltejs/kit";

import token from "$lib/util/token";

import { env } from "$env/dynamic/private";

const {
    ENV_TWITTER_OAUTH_CLIENT,
    ENV_TWITTER_OAUTH_CLIENT_SECRET,
    ENV_TWITTER_OAUTH_CALLBACK,
} = env;

const getBearer = async (url: URL) => {
    const oauthCode = url.searchParams.get("code") || "";

    // Will build this along the way
    let queryString = "";

    queryString += `code=${oauthCode}&`;
    queryString += "grant_type=authorization_code&";
    queryString += "code_verifier=challenge&";
    queryString += `redirect_uri=${ENV_TWITTER_OAUTH_CALLBACK}&`;
    queryString += `client_id=${ENV_TWITTER_OAUTH_CLIENT}&`;
    queryString += `client_secret=${ENV_TWITTER_OAUTH_CLIENT_SECRET}`;

    const basicAuth = Buffer.from(
        `${ENV_TWITTER_OAUTH_CLIENT}:${ENV_TWITTER_OAUTH_CLIENT_SECRET}`,
        "binary"
    ).toString("base64");

    const response = await fetch("https://api.twitter.com/2/oauth2/token", {
        body: queryString,
        headers: new Headers({
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
        method: "POST",
    });

    const authentication = await response.json();

    return authentication.access_token;
};

const getTwitterUser = async (bearer: string) => {
    const response = await fetch(
        "https://api.twitter.com/2/users/me?user.fields=public_metrics,created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld",
        {
            headers: {
                Authorization: `Bearer ${bearer}`,
            },
        }
    );

    const json = await response.json();

    const { data: user = false } = json;

    if (!user) {
        throw new Error("Invalid user");
    }

    return user;
};

export async function GET({ url }: RequestEvent) {
    const state = token.decode(url.searchParams.get("state"));

    const bearer = await getBearer(url);

    const user = await getTwitterUser(bearer);

    return new Response(
        JSON.stringify(
            {
                bearer,
                state,
                url,
                user,
            },
            null,
            4
        )
    );
}
