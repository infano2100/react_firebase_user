import { createContext } from 'react'

const ManageContext = createContext({
  isLogin: false,
  setLogin: status => { },
  createUsers: value => { },
  getUsers: () => { },
  updateUser: value => { },
  delUser: id => { }
})

export default ManageContext