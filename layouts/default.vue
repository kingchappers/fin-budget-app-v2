<template>
    <html lang="en" class="text-xs lg:text-lg container justify-center mx-auto p-4 bg-sky-100">
    <div>

        <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>

        <body>
            <header>
                <div class="flex">
                    <NuxtLink to="/"><img src="/images/fin-wide.png" width={100} height={100} alt="Fin Logo" class="mr-3" /></NuxtLink>
                    <ul class="flex mt-5 lg:text-xl">
                        <li class="lg:mx-5 mx-2">
                            <p>Budget Menu Placeholder</p><!-- <BudgetMenu />--->
                        </li>
                        <li class="lg:mx-5 mx-2">
                            <p>Account Menu Placeholder</p><!-- <AccountMenu /> -->
                        </li>
                        <li class="lg:mx-5 mx-2">
                            <NuxtLink href="/utilities">Utilities</NuxtLink>
                        </li>
                        <li class="lg:mx-5 mx-2">
                            <NuxtLink href="/help">Help</NuxtLink>
                        </li>
                    </ul>
                </div>
            </header>

            <main class="py-5 lg:py-10">
                <slot />
            </main>
        </body>
    </div>

    </html>
</template>