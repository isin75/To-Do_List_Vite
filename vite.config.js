/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['client/**/*.js', 'client/**/*.jsx', 'client/**/*.ts', 'client/**/*.tsx'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  ]
})
