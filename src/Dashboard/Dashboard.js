import './Dashboard.css'
import Main from './Main'
import Navbar from '../sidebar/Navbar'
import Welcomemessage from '../Dashboard/Welcomemessage'

function Dashboard() {
  return (
    <section className='dashboard'>
      <Navbar />

      <Main />

      <Welcomemessage />
    </section>
  )
}

export default Dashboard
