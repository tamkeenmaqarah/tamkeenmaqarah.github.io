const PROFILE_API = 'https://tamkeen-maqraah-teacher.ibrahiimmuhamud.workers.dev/api/account/profile';
export async function profileRequest(method = 'GET', body, signal) {
  let token;
  try {token = localStorage.getItem('tamkeen-token');} catch {}
  if (!/^[a-f0-9]{64}$/.test(token || '')) throw Error('Sign in again to update your profile.');
  const controller=new AbortController();
  const cancel=()=>controller.abort();
  signal?.addEventListener('abort',cancel,{once:true});
  if(signal?.aborted)cancel();
  const timer=setTimeout(cancel,15000);
  try {
    const response=await fetch(PROFILE_API,{method,signal:controller.signal,credentials:'omit',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
    const result=await response.json();
    if(!response.ok)throw Error(result.error||'Could not load or save your profile. Please try again.');
    if(!result.profile||typeof result.profile.name!=='string')throw Error('Could not load or save your profile. Please try again.');
    return result.profile;
  } catch(error) {
    if(signal?.aborted)throw error;
    if(error instanceof TypeError || error.name==='AbortError')throw Error('Could not load or save your profile. Please try again.');
    throw error;
  } finally {clearTimeout(timer);signal?.removeEventListener('abort',cancel);}

}
export function photoUrl(value) {
  if (typeof value !== 'string') return '';
  if (value.length <= 120000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value)) return value;
  if (value.length>1000) return '';
  try {const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password&&!url.port&&(url.hostname==='googleusercontent.com'||url.hostname.endsWith('.googleusercontent.com'))?url.href:'';} catch {return '';}
}
export async function preparePhoto(file) {
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw Error('Choose a JPG, PNG or WebP photo.');
  if (file.size > 8 * 1024 * 1024) throw Error('Choose a photo under 8 MB.');
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('This photo could not be opened. Try another one.'));img.src=url;});
    if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 40000000) throw Error('Choose a smaller photo.');
    const canvas = document.createElement('canvas');canvas.width=canvas.height=384;
    const context = canvas.getContext('2d');
    if (!context) throw Error('This photo could not be opened. Try another one.');
    const side=Math.min(image.naturalWidth,image.naturalHeight);
    context.fillStyle='#ead3ab';context.fillRect(0,0,384,384);
    context.drawImage(image,(image.naturalWidth-side)/2,(image.naturalHeight-side)/2,side,side,0,0,384,384);
    const photo=canvas.toDataURL('image/jpeg',0.84);
    if (photo.length>120000) throw Error('Choose a smaller photo.');
    return photo;
  } finally {URL.revokeObjectURL(url);}
}
