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
        const q = query(collection(firestore, 'user-bookmarks')) // ชี้จุดว่าไปเอาจากกล่อง user-bookmarks นะ
        const querySnapshot = await getDocs(q) // สร้างภาชนะ(กล่อง) มาเพื่อรองรับข้อมูล getDocs() คือไปดำเนินการ
        querySnapshot.forEach((doc) => {
          /*  เข้าถึงเอกสารภายในกล่องทีละอันต้องใช้ forEach
          querySnapshot = กล่องใหญ่
            ├── doc1 (เอกสาร 1)
            ├── doc2 (เอกสาร 2)  
            └── doc3 (เอกสาร 3) */
          bookmarksList.push({
            firebaseId: doc.id,
            ...(doc.data() as { id: number; title: string; image: string }),
          })
        })
        console.log(bookmarksList)

        setBookmarks(bookmarksList)
        /*  1. Collection = โฟลเดอร์ในคอมพิวเตอร์
            2. Query = คำสั่ง "copy ไฟล์จากโฟลเดอร์ A"
            3. getDocs() = กดปุ่ม Enter เพื่อรันคำสั่ง
            4. QuerySnapshot = ZIP file ที่มีไฟล์ทั้งหมด
            5. forEach = แตกไฟล์ ZIP ดูทีละไฟล์
            6. doc.data() = เนื้อหาในแต่ละไฟล์ */
      } catch (error) {
        console.log('There is an error with getting the bookmarks', error)
      }
    }

    getBookmark()
  }, [])

  const addBookmark = async (
    animeId: number,
    animeTitle: string,
    animeImage: string
  ) => {
    const tempId = `temp-${Date.now()}`
    const newBookmark: Bookmarks = {
      firebaseId: tempId,
      id: animeId,
      title: animeTitle,
      image: animeImage,
    }

    try {
      setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark])

      const docRef = await addDoc(collection(firestore, 'user-bookmarks'), {
        id: animeId,
        title: animeTitle,
        image: animeImage,
      })

      setBookmarks((prevBookmarks) =>
        prevBookmarks.map((bookmark) =>
          bookmark.firebaseId === tempId
            ? { ...bookmark, firebaseId: docRef.id }
            : bookmark
        )
      )

      console.log('Document writtend with ID: ', docRef.id)
    } catch (error) {
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.firebaseId !== tempId)
      )
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
