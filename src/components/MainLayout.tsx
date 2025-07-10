import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

// ✅ รับ children เข้ามา
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar />
      <main>{children}</main> {/* แสดง Page ที่เปลี่ยนไปตรงนี้ */}
      <Footer />
    </div>
  )
}

export default MainLayout
