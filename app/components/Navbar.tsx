import React from 'react'
import Link from 'next/link'
import './almostGlobal.css'

const Navbar = () => {
  return (
    <div className="navbar"><h2 >navigation</h2>
        <ul>
        <li>home page</li>
        <li><Link href={"/sub"}><b>temp example link that works</b></Link></li>
        <li>page 3</li>
        <li>page 4</li>
        </ul>
      </div>
  )
}

export default Navbar
