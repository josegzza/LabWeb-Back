import { Form, Input, Button, Checkbox, Grid, Row, Col, Layout } from 'antd';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react';
import UserTable from './UsersDashboard/UserTable';
const { Header, Content, Footer, Sider } = Layout
const config = {
  apiUrl: 'http://localhost:8000'
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  let history = useHistory();

  const onFinish = (values) => {
    if (values.username == 'luis_miranda' && values.password == '123456')
      console.log('success')
      history.push("/users")
  };

  function handleClick() {
    
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Header style={{ zIndex: 1, width: '100%', background: '#FFFFFF', height: '100px'}}>
        <Row justify="center">
          <Col span={6}>
            <img src={'https://ii.ct-stc.com/2/logos/empresas/2003/05/08/tca-software-solutions-92226890A07C6E43thumbnail.gif'} />
          </Col>
        </Row>
      </Header>
      <Row>
        <Col span={22}>
            <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
    );
};

export default Login;