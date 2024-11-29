import { useEffect, useState, useRef } from 'react';
import getConfig from 'next/config';
import Image from 'next/image';
import router from 'next/router';
import { Button, Form, Input } from 'antd';
import { aes, myNextImgLoader } from '@/utils';
import cookie from 'js-cookie';
import { passwordIcons } from '@/constants/icons';
import s from './login.module.css';

const { STATIC_ASSETS_URL } = getConfig().publicRuntimeConfig;

const { Password } = Input;

// input 样式
const inputStyle = {
  height: 44,
  borderRadius: 6,
  background: '#F4F5F7',
  width: 320,
  border: 'none',
};

const Login = () => {
  const [initValue, setInitValue] = useState<Record<string, any>>({
    name: '',
    password: '',
  });

  const [form] = Form.useForm();

  // 提交
  const onFinish = (values: Record<string, any>) => {
    const role = 'admin';
    const params = {
      token: '123',
      userId: 123,
      email: '我是个用户',
      role: aes().encrypt(role),
    };
    cookie.set('USER_COOKIES_NEED_CHANGE', JSON.stringify(params));
    router.push('/dataList');
  };

  const checkPassword = (rule: any, value: string) => {
    return Promise.resolve();
  };

  return (
    <div className={s.login}>
      <div className={s.wrapper}>
        <div className={s.logoRow}>
          <Image
            loader={myNextImgLoader}
            src={`${STATIC_ASSETS_URL}/svg/logo.svg`}
            width={32}
            height={32}
            alt="logo"
          />
          <div className={s.headerTitle}>管理平台</div>
        </div>
        <div className={s.loginAreaContainer}>
          <div className={s.loginTitle}>登录</div>
          <div className={s.loginArea}>
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={initValue}
            >
              <Form.Item
                name="name"
                required={false}
                className={s.loginFormRow}
                validateTrigger="onBlur"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="请输入账号" style={inputStyle} />
              </Form.Item>
              <Form.Item
                name="password"
                required={false}
                className={s.loginFormRow}
                validateTrigger="onBlur"
                rules={[
                  { required: true, message: '请输入密码' },
                  { validator: checkPassword },
                ]}
              >
                <Password
                  placeholder="请输入密码"
                  iconRender={(visible) =>
                    visible ? passwordIcons.show : passwordIcons.hide
                  }
                  style={inputStyle}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" className={s.loginBtn}>
                提交
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
