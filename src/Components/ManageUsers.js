import React, { useEffect, useState, useContext } from 'react'
import {
  Table,
  Button,
  message,
  Popconfirm,
  Spin,
} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import _ from 'lodash';
import ManageContext from '../Context/manage.context'
import { auth, database } from '../util/firebase'
import FormModal from './FormModal'
import Profile from './Profile'


const ManageUsers = () => {

  const appDB = database.ref('users');
  const { setLogin, delUser, role } = useContext(ManageContext)
  const [isVisible, setIsVisible] = useState(false)
  const [usersDate, setUsersDate] = useState([])
  const [editUser, setEditUser] = useState(null)
  useEffect(() => {
    appDB.on('value', (snapshot) => {
      setUsersDate(_.toArray(snapshot.val()))
    });
  }, [])

  const logout = () => {
    auth.signOut().then(() => {
      setLogin(false)
    })
  }

  const confirm = (key) => {
    delUser(key)
    message.success('Delete Successful')
  }

  const handleEdit = (data) => {
    setEditUser(data)
    setIsVisible(true)
  }

  const handleCancel = () => {
    setIsVisible(false)
    setEditUser(null)
  }

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'Username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName  ',
    },
    {
      title: 'Tel',
      dataIndex: 'tel',
      key: 'tel  ',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a disable style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</a>
          {record.role !== 'admin' && <Popconfirm
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => confirm(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
          }
        </span>
      ),
    },
  ];

  return (
    <>
      {role ? <div className="table-operations">
        <div>
          <Popconfirm
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => logout()}
          >
            <Button style={{ float: 'right' }} danger >Logout</Button>
          </Popconfirm>
          <br />
        </div>
        {role === 'admin' ?
          <>
            <Button type="primary" onClick={() => setIsVisible(true)}>Create Users</Button>
            <br />
            <Table columns={columns} dataSource={usersDate} />
          </>
          : <Profile handleEdit={handleEdit} />
        }
        <FormModal
          isVisible={isVisible}
          handleCancel={() => handleCancel()}
          isEdit={editUser}
        />
      </div >
        :
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      }
    </>
  )
}

export default ManageUsers
