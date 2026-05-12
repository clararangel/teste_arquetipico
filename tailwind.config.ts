import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#f7f0e6",
        porcelain: "#fffaf2",
        marsala: "#6f263d",
        wine: "#461725",
        coffee: "#5a3929",
        terracotta: "#9b5742",
        bronze: "#a87d3f",
        olive: "#6e6f4f",
        ink: "#2f2522"
      },
      boxShadow: {
        editorial: "0 28px 70px rgba(70, 23, 37, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
