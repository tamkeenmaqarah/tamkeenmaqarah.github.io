const origin='https://tamkeen-maqraah-teacher.ibrahiimmuhamud.workers.dev';
export async function requestJSON(path,{method='GET',body,signal,timeout=15000}={}){
 const controller=new AbortController();let expired=false,token='';
 try{token=localStorage.getItem('tamkeen-token')||'';}catch{}
 const abort=()=>controller.abort();signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();
 const timer=setTimeout(()=>{expired=true;controller.abort();},timeout);
 try{
  const response=await fetch(origin+path,{method,credentials:'omit',signal:controller.signal,headers:{Accept:'application/json',...(body===undefined?{}:{'Content-Type':'application/json'}),...(/^[a-f0-9]{64}$/.test(token)?{Authorization:'Bearer '+token}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
  let result;try{result=await response.json();}catch{throw Error('The response could not be read. Please try again.');}
  if(!response.ok){const error=Error(result.error||'The request could not be completed. Please try again.');error.status=response.status;throw error;}
  return result;
 }catch(error){if(expired)throw Error('The request took too long. Please try again.');if(error.name==='TypeError')throw Error('Could not reach the server. Your work is still here.');throw error;}
 finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
}
