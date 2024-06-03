/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            background: "#e5e7ff",
            blue: "#0A21C0",
            darkBlue: "#050A44",
            darkGray: "#2C2E3A",
            dark: "#141619",
            card: "#EEEFF5",
            primary: "#ff407d",
         },
      },
   },
   plugins: [],
};
