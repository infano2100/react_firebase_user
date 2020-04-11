import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Row,
  Avatar,
} from 'antd'
import { Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { auth, database } from '../util/firebase'

const Profile = ({ handleEdit }) => {
  const appDB = database.ref('users')
  const [user, setUser] = useState(null)
  useEffect(() => {
    const email = auth.currentUser.email
    appDB.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().username === email) {
          setUser({ ...childSnapshot.val() })
        }
      });
    });
  }, [])

  return (
    <div className="site-card-border-less-wrapper">
      {user ? <Row>
        <Col span={12} offset={9}>
          <Card title={`ผู้ใช้งาน : ${user.username || ''}`} bordered={true} style={{ width: 300 }}>

            <div style={{ textAlign: 'center', marginBottom: 25 }}>
              <Avatar size={64} icon={<UserOutlined />} />
            </div>

            <p> ชื่อ : {user.firstName || ''}</p>
            <p> นามสกุล : {user.lastName || ''}</p>
            <p> เบอร์โทร : {user.tel || ''}</p>
            <p> อายุ : {user.age || ''}</p>
            <p> ที่อยู่ : {user.address || ''}</p>

            <div style={{ textAlign: 'center', marginBottom: 25 }}>
              <Button type="primary" onClick={() => handleEdit(user)}>Edit</Button>
            </div>

          </Card>
        </Col>
      </Row> : <Spin />}

    </div>
  )
}

export default Profile
