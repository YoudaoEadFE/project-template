import { Button } from 'antd';
import { useEffect } from 'react';
import Image from 'next/image';
import getConfig from 'next/config';
import router from 'next/router';
import cookies from 'js-cookie';
import { roleDefaultPage } from '@/constants';
import { myNextImgLoader, aes } from '@/utils/util';
import s from './index.module.css';

const { STATIC_ASSETS_URL } = getConfig().publicRuntimeConfig;

export default function Custom403() {
  const handleBack = () => {
    const D_USER = cookies.get('D_USER');
    if (!D_USER) {
      router.replace('/login');
      return;
    }
    const role = aes().decrypt(JSON.parse(D_USER));
    if (roleDefaultPage[role]) {
      router.replace(roleDefaultPage[role]).then(router.reload);
    } else {
      router.replace('/login');
    }
  };

  useEffect(() => {
    router.beforePopState(() => {
      window.location.href = '/403';
      return false;
    });
  }, []);

  return (
    <div className={s['custom403']}>
      <div className={s.container}>
        <div className={s.logo}>
          <Image
            loader={myNextImgLoader}
            alt="logo"
            src={`${STATIC_ASSETS_URL}/svg/logo.svg`}
            width={172}
            height={30}
          />
        </div>
        <Image
          loader={myNextImgLoader}
          alt=""
          width={120}
          height={120}
          src="https://ydlunacommon-cdn.nosdn.127.net/e51d0c3719bb576cb69f44d076f90e6a.svg"
        />
        <span className={s.message}>暂无当前页面访问权限</span>
        <span className={s.message}>返回主页看看吧</span>
        <Button type="primary" className={s.btn} onClick={handleBack}>
          返回
        </Button>
      </div>
    </div>
  );
}
