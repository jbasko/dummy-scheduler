import Providers from "@/app/providers";

export async function generateMetadata({params}) {
    return {
        title: `Dummy Scheduler`,
        description: `Dummy Scheduler`,
        viewport: {
            minimumScale: 1,
            initialScale: 1,
            width: "device-width",
        },
    }
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
            <Providers>{children}</Providers>
        </body>
        </html>
    )
}
