# Integrations

## Setup Environment

Create a `.env` file with the contents of `.env.template` and fill in the values you need.

## UI

Majority of the UI is located on the top level page in `./src/routes/+page.svelte`.

#### Run

```
npm i
npm run dev
```

## Twitter Auth


https://user-images.githubusercontent.com/59782726/230545056-0256c412-08e3-496f-a348-e56ea1e62638.mov




#### Required `.env`

All of the TWITTER values in `.env.template` and a JWT Secret.

```
ENV_TWITTER_*
ENV_JWT_SECRET=something-secret
```

### Stage URL

First we need to use environment variables and state to generate an auth URL that we will visit.

This URL is generated via the `./src/routes/api/auth/twitter/stage` endpoint that the frontend makes a `fetch()` request to.

### Navigate to Auth URL

The frontend gives the option to navigate to the generated URL. Once the user loads the URL, they will be prompted to sign in with Twitter. Once they sign in, they will be redirected back to `./src/routes/api/auth/twitter/callback`. Once redirected, there is some logic to resolve the `code=` URL param to the users bearer token. From here you can use the API as them. There's an example of getting the signed in users profile details.
