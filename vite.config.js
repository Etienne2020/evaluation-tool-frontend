import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

//const API_URL = import.meta.env.VITE_API_URL


export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        //target: 'http://be:5000',
        target: 'https://evaluation-tool-backend-1068414270982.us-central1.run.app',
        //target: API_URL,
        changeOrigin: true,
      },
    },
  },
});


