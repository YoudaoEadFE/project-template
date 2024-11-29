import { MainLayout as Layout } from '@/page-components/layout/MainLayout';
import { ConfigProvider, message } from 'antd';
import useUserInfoStore from '@/store/userInfo';
import { useEffect } from 'react';
import { setAuth } from '@/utils';
import { SentryLogger } from '@/utils/sentry';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import '@/styles/global.css';

dayjs.locale('zh-cn');

message.config({
  maxCount: 3,
});

const themeToken = {
  token: {
    colorPrimary: '#ff472e',
    colorTextBase: '#232426',
    colorLink: '#ff472e',
  },
};

SentryLogger.init();

function CustomApp({ Component, pageProps }: any) {
  useEffect(() => {
    const {
      user: { token },
    } = useUserInfoStore.getState();
    setAuth({ token });
  }, []);

  return (
    <ConfigProvider locale={zhCN} theme={themeToken}>
      <div id="root">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ConfigProvider>
  );
}

export default CustomApp;
