import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'

const App = () => {
  const [creators, setCreators] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'creators'))
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, 
...doc.data() }))
        setCreators(data)
      } catch (err) {
        setError('Failed to fetch creators from Firestore.')
        console.error(err)
      }
    }
    fetchCreators()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Creator List</h1>
      {error && <p className="text-red-400">{error}</p>}
      <ul className="space-y-4">
        {creators.map(creator => (
          <li key={creator.id} className="bg-gray-800 p-4 rounded-lg 
shadow">
            <p className="text-xl font-semibold">{creator.name}</p>
            <p>{creator.followers} followers</p>
            <p>{creator.engagement} engagement</p>
            <p className="italic text-gray-300">“{creator.quote}”</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

