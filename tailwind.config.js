const colors = require("tailwindcss/colors")

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    corePlugins: {preflight: false,},
    theme: {
        extend: {
            colors: {
                primary: colors.red,
            }
        },
    },
    plugins: [],
}
