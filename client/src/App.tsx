import { useEffect, useState } from "react"


function App() {
    const [ans,setAns ] = useState({hello: null, message:""})
    const dataLao = async ()=>{
      try{
        const response = await fetch('http://localhost:3000/set-cookie', {
          method: 'GET',
          credentials: 'include' 
        })
         const data = await response.json();
         console.log('Cookie set:', data);
         setAns(data);
      }
     
        catch(err){
          console.error(err);
        }
        
    }

    const deleteCookie = async ()=>{
      await fetch('http://localhost:3000/del-cookie',{
        method: 'GET',
        credentials: 'include'
      })
    }
  useEffect( ()=>{
    
    console.log(import.meta.env.VITE_hello);
   const func = async ()=>{
      await dataLao();
    }

    func()
    return () =>{
      console.log("Hello world useEffect unmounting")
    }
    
    
  },[])

  return (
    
    <>
    <p>Env variable value = {import.meta.env.VITE_hello}</p>
    <p>this exists {ans.hello}</p>
    <button onClick={deleteCookie}>Delete cookie value</button>
    <button onClick={dataLao}>Get cookie value</button>
    </>
  )
}

export default App
