import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './welcom.css'
import * as AiIcons from 'react-icons/ai'

class Welcomemessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    if (sessionStorage.getItem('token')) {
      console.log('Call User Feed')
    } else {
      this.setState({ redirect: true })
    }
  }

  logout() {
    sessionStorage.setItem('token', ' ')
    sessionStorage.clear()
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/'} />
    }

    if (sessionStorage.getItem('token'))
      return (
        <>
          {/* <AiIcons.AiOutlineLogout className="logout" onClick={this.logout}/> */}
          <div className='logout' onClick={this.logout}>
            Logout
          </div>
        </>
      )
  }
}

export default Welcomemessage
