/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Sand Colors
        'sand_1': '#E8D2A6',
        'sand_2': '#FCE4B4',
        'sand_3': '#FFECC7',
        'sand_4': '#FFF5E0',
        // Aged Sand
        'aged_1': '#ECB17B',
        'aged_2': '#FDBE84',
        'aged_3': '#FFD0A5',
        'aged_4': '#FFE1C6',
        // Rust
        'rust_1': '#AD593F',
        'rust_2': '#EC7A56',
        'rust_3': '#F29274',
        'rust_4': '#F4B19C',
        // Blue
        'blue_1': '#1D3356',
        'blue_2': '#223C66',
        'blue_3': '#294C85',
        'blue_4': '#5373A6',
        // Warning
        'warning': '#FF4444',
        // Success
        'succes': '#1866F9',
        // Black
        'black_1': '#383838',
        // White
        'white_1': '#ECEEF1',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
