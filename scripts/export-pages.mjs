// A single-file static publication can be uploaded through GitHub's file UI.
// This includes the client only; no database, server code or credentials.
import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve('dist-pages'),base=process.env.TAMKEEN_PAGES_BASE||'/Tamkeen-Maqrah-Quiz-Web-App/';
let html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
html=html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)"\s*\/?>/g,(_,url)=>{
 let css=fs.readFileSync(path.join(dir,url.slice(base.length)),'utf8');
 css=css.replace(/url\(([^)]+)\)/g,(match,asset)=>{
  if(!asset.startsWith(base))return match;
  return 'url(data:font/ttf;base64,'+fs.readFileSync(path.join(dir,asset.slice(base.length))).toString('base64')+')';
 });
 return '<style>'+css+'</style>';
});
html=html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g,(_,url)=>'<script type="module">'+fs.readFileSync(path.join(dir,url.slice(base.length)),'utf8').replace(/<\/script/gi,'<\\/script')+'</script>');
fs.writeFileSync(path.join(dir,'index.html'),html);
fs.copyFileSync('public/fonts/figtree-OFL.txt',path.join(dir,'Figtree-LICENSE.txt'));
fs.copyFileSync('public/fonts/barlowcondensed-OFL.txt',path.join(dir,'Barlow-Condensed-LICENSE.txt'));
console.log('Exported standalone Pages index.html ('+Buffer.byteLength(html)+' bytes), including fonts and license files.');
