/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                yappersLightBlue: "#A0D8EF",
                yappersCream: "#F5EBDD",
                yappersLavender: "#C2A3E1",
                yappersPeach: "#F7B678",
            },
        },
    },
    plugins: [],
};
