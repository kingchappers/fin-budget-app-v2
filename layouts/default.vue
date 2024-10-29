<template>
    <div class="bg-sky-300">
        <html lang="en" class="text-xs lg:text-lg container justify-center mx-auto p-4 h-screen bg-sky-100">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>

            <body>
                <header>
                    <div class="flex">
                        <NuxtLink to="/">
                            <NuxtImg src="/images/fin-wide.png" width="75" height="50" alt="Fin Logo" class="mr-3" />
                        </NuxtLink>
                        <MenusTopNavigation />
                    </div>
                </header>

                <main class="py-5 lg:py-10">
                    <slot />
                </main>
            </body>

        </html>
    </div>

</template>