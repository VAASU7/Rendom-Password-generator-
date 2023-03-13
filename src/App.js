import React,{useState} from 'react'
import './App.css'
import {Numbers,uperCaseLetters,lowerCaseLetters,specialCharacters} from './Password'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './Message'

const App = () => {
  const [password, setPassword] = useState('')
  const [legth, setLength] = useState(20)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const handleGeneratePassword = (e) => {
    if(!uppercase && !lowercase && !numbers && !symbols){
      notify('You Must Select Atleast One Option',true)
    }
    let charcterList = ''

    if(lowercase) {
      charcterList = charcterList + lowerCaseLetters
    }
    if (uppercase){
      charcterList = charcterList + uperCaseLetters
    }
    if (numbers){
      charcterList = charcterList + Numbers
    }
    if (symbols){
      charcterList = charcterList + specialCharacters
    }
    
   // Restricting the length
    setPassword(creatPassword(charcterList))
  }
  const creatPassword = (characterList) =>{
    let password = ''
    const characterListLength = characterList.length

    for(let i = 0; i < legth; i++){
      const characterIndex = Math.random() * characterListLength
      password = password + characterList.charAt(characterIndex)

    }
    return password
  }
  // coping generated text

  const copyToClipboard =() =>{
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify =(message, hasError = false) =>{
    if(hasError){
      toast.error(message,{
        position:'top-center',
        autoClose:5000,
      hideProgressBar:false,
      closeOnClick:true,
      pauseOnHover:true,
      progress:undefined,
      })

    }else{
    toast(message,{
      position:'top-center',
      autoClose:5000,
      hideProgressBar:false,
      closeOnClick:true,
      pauseOnHover:true,
      progress:undefined,

    })
  }
  }


  const handleCopyPassword = (e) =>{
    if(password === ''){
      notify('Nothing To Copy',true)
    }else{
    copyToClipboard()
    notify(COPY_SUCCESS)
    }
  }


  return (
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2 className='generator_header'>
            Password Generator
          </h2>
          <div className='generator_password'>
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className='btn'>
            Copy
            </button>
          </div>
          <div className='form'>
            <label htmlFor='password_str'>Password Length</label>
            <input defaultValue={legth} 
            onChange={(e) => setLength(e.target.value)}
            type='number' id='password_str'
            max='25' min='8'/>
            
          </div>
          <div className='form'>
            <label htmlFor='upper'>Include Uppercase Letters</label>
            <input checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            type='checkbox' id='upper' name='upper'
          />
            
          </div>
          <div className='form'>
            <label htmlFor='lower'>Include Lowercase Letters</label>
            <input checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            type='checkbox' id='lower' name='lower'
            />
          </div>
          <div className='form'>
            <label htmlFor='number'>Include Numbers</label>
            <input checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            type='checkbox' id='number' name='number'
            />
          </div>
          <div className='form'>
            <label htmlFor='symbol'>Include Symbols</label>
            <input checked={symbols} 
            onChange={(e) => setSymbols(e.target.checked)}
            type='checkbox' id='symbol' name='symbol'
            />
          </div>
          <button onClick={handleGeneratePassword} 
          className='generate_btn'>Generate Password</button>
          <ToastContainer
          position = 'top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        </div>
      </div>
    </div>
  )
}

export default App
