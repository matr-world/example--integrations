<script>
    let twitterAuthUrl = "";
    let isStagingTwitterAuth = false;

    const stageTwitterAuth = async () => {
        isStagingTwitterAuth = true;

        try {
            const response = await fetch("/api/auth/twitter/stage");
            ({ url: twitterAuthUrl } = await response.json());
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }

        isStagingTwitterAuth = false;
    };
</script>

<div class="my-4">
    <div class="flex items-center justify-between">
        <h1 class="text-4xl font-bold">Integrations</h1>
        <a
            href="https://github.com/matr-world/integrations"
            target="_blank"
            class="btn">Github</a
        >
    </div>
    <p class="">Example integrations with various services.</p>
</div>
<div class="rounded-xl border border-gray-600 p-5">
    <h2 class="mb-3 text-2xl font-semibold">Sign in With Twitter</h2>
    <h3 class="text-lg">1) Generate temporary auth URL</h3>
    <button
        on:click={stageTwitterAuth}
        class="btn-sm btn border-gray-600 bg-gray-800  text-white"
        class:loader={isStagingTwitterAuth}
        class:disabled={isStagingTwitterAuth}>Stage Auth URL</button
    >

    <div
        class:opacity-50={!twitterAuthUrl}
        class:pointer-events-none={!twitterAuthUrl}
    >
        <h3 class="mt-4 text-lg">2) Visit time sensitive auth url</h3>
        <p class="text-xs text-orange-500">{twitterAuthUrl}</p>
        <a
            class="btn-sm btn bg-blue-500 text-white"
            target="_blank"
            href={twitterAuthUrl}>Visit Twitter Auth URL</a
        >
    </div>
</div>
