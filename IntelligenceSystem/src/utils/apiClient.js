export const apiClient = { get:(u)=>fetch(u).then(r=>r.json()).catch(()=>({})), post:(u,b)=>fetch(u,{method:'POST',body:JSON.stringify(b)}).then(r=>r.json()).catch(()=>({})) }
