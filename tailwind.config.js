/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
=======
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
<<<<<<< HEAD
});
=======
}
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
