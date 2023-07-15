"use client"
import {MantineProvider} from "@mantine/core"

import "@/styles/globals.css"

export default function Providers({children}) {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                /** Put your mantine theme override here */
                colorScheme: "light",
            }}
        >
            {children}
        </MantineProvider>
    )
}