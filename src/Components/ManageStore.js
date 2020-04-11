import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import ManageContext from '../Context/manage.context'
import { auth, database } from '../util/firebase'
require('dotenv').config()

const ManageStore = ({ children }) => {

  const appDB = database.ref('users')
  const [isLogin, setIsLogin] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [role, setRole] = useState(null)
  const [errorLogin, setErrorLogin] = useState('')

  const setLogin = (status) => {
    setIsLogin(status)
    if (status) {
      const email = auth.currentUser.email
      appDB.orderByChild("username").equalTo(email).once("value", (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((childSnapshot) => {
            setRole(childSnapshot.val().role)
          });
        } else {
          setErrorLogin('Login Error')
          auth.signOut().then(() => {
            setIsLogin(false)
          })
        }
      })
    }
  }

  const onComplete = (error) => {
    if (error) {
      setSubmitStatus('error')
    } else {
      setSubmitStatus('successful')
    }
  };

  const clearSubmitStatus = () => {
    setSubmitStatus('')
  }

  const clearErrorLogin = () => {
    setErrorLogin('')
  }

  const createUsers = (value) => {
    value.key = uuid();
    value.role = 'user';
    appDB.push({ ...value }, onComplete);
    auth.createUserWithEmailAndPassword(value.username, value.password)
  }

  const delUser = (id) => {
    appDB.orderByChild('key').equalTo(id)
      .once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          appDB.child(childSnapshot.key).remove();
        });
      });
  }

  const updateUser = (key, value) => {
    appDB.orderByChild("key").equalTo(key).once("value", (snapshot) => {
      snapshot.forEach((user) => {
        appDB.child(user.key).update({ ...value }, onComplete);
        value.key = key
      });
    })
  }

  const manageState = {
    isLogin,
    setLogin,
    submitStatus,
    createUsers,
    delUser,
    clearSubmitStatus,
    updateUser,
    role,
    errorLogin,
    clearErrorLogin,
  }

  return (
    <ManageContext.Provider value={manageState}>
      {children}
    </ManageContext.Provider>
  )

}

export default ManageStore
