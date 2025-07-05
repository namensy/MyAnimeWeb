import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { Bookmarks, SearchProps } from '../types'
import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
} from 'firebase/firestore'

export const AppContext = createContext<SearchProps>({
  searchTerm: '',
  setSearchTerm: () => {},
  loading: false,
  setLoading: () => {},
  addBookmark: async () => {},
  bookmarks: [],
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string | string[]>([])
  const [loading, setLoading] = useState(false)

  const [bookmarks, setBookmarks] = useState<Bookmarks[]>([])

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)

  useEffect(() => {
    const getBookmark = async () => {
      try {
        const bookmarksList: Bookmarks[] = []
        const q = query(collection(firestore, 'user-bookmarks'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          bookmarksList.push({
            firebaseId: doc.id,
            ...(doc.data() as { id: number; title: string }),
          })
        })
        setBookmarks(bookmarksList)
      } catch (error) {
        console.log('There is an error with getting the bookmarks', error)
      }
    }

    getBookmark()
  }, [])

  const addBookmark = async (animeId: number, animeTitle: string) => {
    try {
      const docRef = await addDoc(collection(firestore, 'user-bookmarks'), {
        id: animeId,
        title: animeTitle,
      })
      console.log('Document writtend with ID: ', docRef.id)
    } catch (error) {
      console.log('Error adding document ', error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        loading,
        setLoading,
        addBookmark,
        bookmarks,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// custom context hook
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider')
  }
  return context
}
