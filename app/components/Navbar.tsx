import React from 'react'
import Link from 'next/link'
import './almostGlobal.css'

const Navbar = () => {
  return (
    <div className="navbar"><h2 >navigation</h2>
        <ul>
        <li><Link href={"/"}> home page</Link></li>
        <li><Link href={"/search"}> search </Link></li>
        <li><Link href={"/login"}> log in </Link></li>
        <li><Link href={"/account"}> account </Link></li>
        </ul>
      </div>
  )
}

export default Navbar
