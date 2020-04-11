import React, { useEffect, useState, useContext } from 'react'
import {
  Form,
  Input,
  Button,
  message,
} from 'antd'
import { auth } from '../util/firebase'
import ManageContext from '../Context/manage.context'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const Login = () => {
  const { setLogin, errorLogin, clearErrorLogin } = useContext(ManageContext)
  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    setLoading(true)
    const { username, password } = values
    setTimeout(() => {
      auth
        .signInWithEmailAndPassword(username, password)
        .then(() =>{
          setLogin(true)
        })
        .catch(error => {
          message.error(error.message)
        })
        .finally(setLoading(false))
    }, 1000)
  }

  useEffect(() => {
    if (errorLogin === 'Login Error') {
      message.error('Login Error')
      clearErrorLogin('')
    }
  }, [errorLogin])

  const onFinishFailed = errorInfo => {
    message.error('Login Error')
  }

  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
