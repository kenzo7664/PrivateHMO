import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './navbar.css'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons'

function Navbar() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        {/* <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div> */}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <div className='menu-bars'>
                <AiIcons.AiOutlineCompress onClick={showSidebar} />
              </div>
            </li>
            {SidebarData.map((item, index) => {
              console.log(item)
              return (
                <li key={index} className={item.cName}>
                  {!sidebar ? (
                    <NavLink
                      to={item.path}
                      activeStyle={{
                        backgroundColor: '#f77727',
                      }}
                    >
                      <span>{item.icon}</span>
                    </NavLink>
                  ) : (
                    <NavLink
                      activeStyle={{
                        backgroundColor: '#f77727',
                      }}
                      to={item.path}
                    >
                      <span className='itemIcon'>{item.icon}</span>
                      <span>{item.title}</span>
                    </NavLink>
                  )}

                  {/* <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link> */}
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
