/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yellow: '#FECC0B', // Yellow from the speech bubbles and "SEND" button 
        blue: '#22297C', // Blue from the user's speech bubbles and input area 
        /* Extra Coolrs */
        white: '#FFFFFF', // Background color 
        black: '#000000', // Text color 
        green: '#00FF00', // Dot indicating online status
        gray: '#f3f4f6'
      },
      fontFamily: {
        jaldi: ['Jaldi', 'sans-serif'],
      },
    
    },
  },
  plugins: [],
};
