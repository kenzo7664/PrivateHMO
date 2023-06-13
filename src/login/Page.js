import React, { Component } from 'react'
import { PostData } from '../../src/services/PostData'
import { Redirect } from 'react-router-dom'
import Modal from './modal/Modal'
import medi from './medicalimg.jpg'
import './login.css'
import RingLoader from 'react-spinners/ClipLoader'
import * as FaIcons from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailAddress: '',
      password: '',
      redirect: false,
      error: null,
      post: false,
      data: '',
      toggle: false,
    }

    this.Login = this.Login.bind(this)
    this.togglePassword = this.togglePassword.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  togglePassword(e) {
    this.setState({ toggle: !this.state.toggle })
    console.log('clicked')
  }

  Login(e) {
    this.setState({ post: true })
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.post = setTimeout(() => {
      this.setState({ post: false })
    }, 8000)
    e.preventDefault()
    if (this.state.emailAddress && this.state.password) {
      PostData('Login', this.state).then((result) => {
        let responseJSON = result

        if (responseJSON.details) {
          sessionStorage.setItem('token', responseJSON.token)
          sessionStorage.setItem('id', responseJSON.details.idProvider)
          sessionStorage.setItem(
            'providername',
            responseJSON.details.providerName
          )
          this.setState({ redirect: true })
        } else {
          console.log('login error')
          this.setState({ error: 'Wrong Login details !' })
          this.setState({ data: result })
        }
      })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/dash'} />
    }

    if (sessionStorage.getItem('token')) {
      return <Redirect to={'/dash'} />
    }

    return (
      <section className='form'>
        <Images />
        <div className='formm'>
          {this.state.post ? <RingLoader></RingLoader> : ``}
          <form>
            <span className='er'>{this.state.error} </span>

            <h2>Email</h2>
            <label htmlFor='email'></label>
            <input
              type='email'
              name='emailAddress'
              placeholder='Email'
              className='emailInput'
              onChange={this.onChange}
            />
            <h2>PASSWORD</h2>
            <div className='password'>
              <label htmlFor='password'></label>
              <input
                type={this.state.toggle ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                className='passwordInput'
                onChange={this.onChange}
              />
              {this.state.toggle ? (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={this.togglePassword}
                  className='togglePassword'
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={this.togglePassword}
                  className='togglePassword'
                />
              )}
            </div>

            <button type='submit' className='btn1' onClick={this.Login}>
              Login
            </button>

            <p className='desc'>
              Dont have an account yet ?
              <Modal />
            </p>
          </form>
        </div>
      </section>
    )
  }
}
const Images = () => {
  return <img src={medi} alt='' className='img' />
}

export default Page
