import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./static-site',import.meta.url));
const base=process.env.TAMKEEN_PAGES_BASE||'/Tamkeen-Maqrah-Quiz-Web-App/';
export default defineConfig({
 root,base,publicDir:fileURLToPath(new URL('./public',import.meta.url)),
 plugins:[react()],
 define:{
  __TAMKEEN_API_ORIGIN__:JSON.stringify('https://tamkeen-maqraah-learning.modest-mink-0683.chatgpt.site'),
  __TAMKEEN_BASE_PATH__:JSON.stringify(base)
 },
 build:{outDir:fileURLToPath(new URL('./dist-pages',import.meta.url)),emptyOutDir:true}
});
