## ReactJS of E-commerce Website
### Creating React+Vite
Run the following syntax in the PowerCell/Command Prompt of the project folder

```
npm create vite@latest ecom
```
* Select----->React
* Then Select-----> JavaScript

```
cd ecom
```
### Install Important Packages
1. tailwindcss/vite
```
npm install tailwindcss @tailwindcss/vite
```
* **Edit vite.config.js**
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //Add tailwindcss
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
```
2. tailwindcss/postcss
```
npm install tailwindcss @tailwindcss/postcss postcss
```
3. react-router-dom
```
npm i react-router-dom
```
4. react-icons
```
npm install react-icons --save
```
### Change/Update files in src folder with the given src folder
