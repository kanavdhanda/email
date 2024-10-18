import { useEffect } from "react"


function App() {
  useEffect(()=>{
    console.log(import.meta.env.hello);
  },[])

  return (
    
    <>
    <p>Env variable value = {import.meta.env.VITE_hello}</p>
   
    </>
  )
}

export default App
