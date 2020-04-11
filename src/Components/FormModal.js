import React, { useEffect, useState, useContext } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
} from 'antd'
import ManageContext from '../Context/manage.context'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
};

const FormModal = ({
  isVisible,
  handleCancel,
  isEdit,
}) => {

  const [form] = Form.useForm();
  const {
    createUsers,
    submitStatus,
    clearSubmitStatus,
    updateUser
  } = useContext(ManageContext)
  const [fields, setFields] = useState([]);

  const onFinish = values => {
    isEdit ? updateUser(isEdit.key, values) : createUsers(values)
  };

  useEffect(() => {
    if (isEdit) {
      const arrData = []
      Object.entries(isEdit).forEach(([key, value]) => {
        arrData.push({
          name: [key],
          value: value,
        })
      })
      setFields(arrData)
    }
  }, [isEdit])

  useEffect(() => {
    if (submitStatus === 'successful') {
      message.success('Successful')
      form.resetFields()
      handleCancel()
      clearSubmitStatus()
    } else if (submitStatus === 'error') {
      message.error('Fail')
    }
  }, [submitStatus])

  return (
    <>
      <Modal
        maskClosable={false}
        title={isEdit ? 'Edit User' : 'Create User'}
        visible={isVisible}
        footer={null}
        onCancel={() => handleCancel()}
        afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          {...layout}
          name="basic"
          initialValues={validateMessages}
          onFinish={onFinish}
          fields={fields}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input disabled={!!isEdit} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password! & must be minimum 8 characters', min: 8 }]}
          >
            <Input.Password disabled={!!isEdit} />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your Last Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tel"
            name="tel"
            rules={[{ required: true, message: 'Please input your First Tel!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, type: 'number' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your Address!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default FormModal
