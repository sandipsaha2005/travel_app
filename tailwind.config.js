/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        // Add your custom gradient border here
        borderWidth: {
          '10': '10px',
        },
        
      },
    },
  },
  plugins: [],
  
}


