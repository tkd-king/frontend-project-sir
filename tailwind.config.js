import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': '320px', // 320px breakpoint
        'sm-xs': '375px', // 375px breakpoint
        'sm-md': '425px', // 425px breakpoint
      },
    },
  },

  darkMode: "class",

  plugins: [nextui()],

  // Remove the `webpack` key if you're not doing any custom webpack configurations. Otherwise, it stays as is.
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: "all",
    };
    return config;
  },
};
