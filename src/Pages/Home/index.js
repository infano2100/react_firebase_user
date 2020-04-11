import React, { useContext } from 'react'
import './Home.css'
import { Login, ManageUsers } from '../../Components'
import ManageContext from '../../Context/manage.context'

const Home = () => {
  const { isLogin } = useContext(ManageContext)

  return (
    <>
      {isLogin ?
        <div className="fix-center-user fix-width">
          <ManageUsers />
        </div>
        :
        <div className="fix-center">
          <Login />
        </div>}
    </>
  )
}

export default Home
