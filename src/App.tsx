import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserCard from './components/UserCard'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<any>(null)

  // ❌ Error: useEffect con fetch sin AbortController (fuga de memoria en unmount)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(json => setData(json))
    // ← sin cleanup, sin AbortController
  }, [])

  // ❌ Error: Acceso incorrecto a variable de entorno
  const appTitle = process.env.VITE_APP_TITLE ?? 'Default Title' // ← debería ser import.meta.env

  return (
    <>
      <div>
        <h1>{appTitle}</h1>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          counting starts is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      {/* ❌ Error: Pasando props con tipos incorrectos */}
      <UserCard name={123} age="veinticinco" email={true} />
      <UserCard /> {/* ❌ Error: props requeridas faltantes */}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
