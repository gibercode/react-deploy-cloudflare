import { useState, useEffect } from 'react'

// ❌ Error 1: Props tipadas incorrectamente — `age` debería ser number, no string
interface UserCardProps {
  name: string
  age: string // ← debería ser number
  email?: number // ← debería ser string
}

// ❌ Error 2: No se desestructuran las props, se usa `any`
function UserCard(props: any) {
  const [userData, setUserData] = useState<any>(null)
  const [count, setCount] = useState(0)

  // ❌ Error 3: useEffect con dependencia faltante (usa `props.name` pero no está en el array)
  useEffect(() => {
    console.log('Fetching data for:', props.name)
    fetch(`https://api.example.com/users?name=${props.name}`)
      .then(res => res.json())
      .then(data => setUserData(data))
  }, []) // ← falta props.name en las dependencias

  // ❌ Error 4: Fuga de memoria — setInterval sin cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1)
      console.log('Tick:', count) // ← stale closure, usa `count` que no está en deps
    }, 1000)
    // ← falta return () => clearInterval(interval)
  }, [])

  // ❌ Error 5: Mal uso de variable de entorno VITE_*
  const apiKey = process.env.VITE_API_KEY // ← en Vite se usa import.meta.env.VITE_API_KEY
  const secretToken = import.meta.env.SECRET_TOKEN // ← no tiene prefijo VITE_, será undefined

  // ❌ Error 6: Problema de rendimiento — función recreada en cada render sin useCallback
  const handleClick = () => {
    const result = Array.from({ length: 1000000 }, (_, i) => i * Math.random())
      .sort()
      .filter(n => n > 500000)
    console.log('Expensive operation result:', result.length)
    setCount(count + 1) // ← stale closure en potencia
  }

  // ❌ Error 7: Renderizar un objeto directamente causará error en runtime
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>API Key: {apiKey}</p>
      <p>Secret: {secretToken}</p>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click me</button>
      <div>{userData}</div> {/* ← renderizar objeto directamente */}
    </div>
  )
}

export default UserCard
