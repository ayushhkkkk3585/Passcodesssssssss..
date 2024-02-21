import { useState , useCallback , useEffect, useRef} from 'react'
import Cards from './components/Cards'


function App() {
  // const [Name, setName] = useState("hii everyone")
  // const [color, setColor] = useState("olive")
  const [length, setlength] = useState(8)
  const [numAllow, setnumAllow] = useState(false)
  const [charAllow, setcharAllow] = useState(false)
  const [Password, setPassword] = useState("")
  const passwordRef=useRef(null)
  


  const passwordGen= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllow) {
      str+="0123456789"
      
    }
    if (charAllow) {
      str+="@#&*"
      
    }
    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
      
      
    }
    setPassword(pass)

  },[length,numAllow,charAllow])
  useEffect(() => {
    passwordGen()
    
  }, [length,numAllow,charAllow,passwordGen])

  const copyPass=useCallback(()=>{
    window.navigator.clipboard.writeText(Password)
  },[Password])


  return (
    <>
        
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-1 my-8 text-orange-500 bg-gray-600'>
      <h1 className='text-4xl my-5 text-center' >iSecure</h1>
        <div className='flex  rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3' type="text"
          value={Password}
          placeholder='Password' ref={passwordRef} readOnly/>
          <button onClick={copyPass} className='outline-none  py-1 px-3 bg-blue-500 text-black shrink-0' >Copy</button>
         

        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}} />
              <label> Length:{length} </label>

            </div>
            <div className="flex items-center gap-x-1">

              <input type="checkbox" defaultChecked={numAllow}
              id="numberInput"
              onChange={()=>{
                setnumAllow((prev)=>!prev)
              }}/>
              <label >Numbers</label>
              <input type="checkbox" defaultChecked={charAllow}
              id="characterInput"
              onChange={()=>{
                setcharAllow((prev)=>!prev)
              }}/>
              <label >Characters</label>
            </div>

          </div>

      </div>
    </>
  )
}

export default App
