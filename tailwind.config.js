const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
            primary: colors.red,
        }
    },
  },
  plugins: [],
}
