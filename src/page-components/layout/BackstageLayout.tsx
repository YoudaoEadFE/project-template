import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import getConfig from 'next/config';
import { Layout, Menu, Divider } from 'antd';
import {
  roleChineseName,
  roleMenu,
} from '@/constants';
import { HtmlMeta } from '@/components/HtmlMeta/HtmlMeta';
import { useAuth } from '@/page-components/auth/authContext';
import { rgbDataURL, myNextImgLoader, aes } from '@/utils/util';
import SideMenu from './components/SideMenu';
import s from './styles/backstageLayout.module.css';
import cookie from 'js-cookie';

const { Header, Content } = Layout;
const { SubMenu } = Menu;
const { STATIC_ASSETS_URL } = getConfig().publicRuntimeConfig;

interface BackstageLayoutProps {
  children: React.ReactNode;
  logout: () => void;
}

const BackstageLayout: React.FC<BackstageLayoutProps> = ({
  children,
  logout,
}) => {
  // 同步初始化
  const D_USER_STR = cookie.get('D_USER') ?? '{}';
  const { role: encRole, token, email } = JSON.parse(D_USER_STR);
  const role = aes().decrypt(encRole ?? '');
  const menuOptions = roleMenu[role] || [];
  const userName = email ?? '暂未设置优选昵称';

  const getUsername = () => {
    return email ?? '暂未设置优选昵称';
  };

  return (
    <Layout
      className="layout"
      style={{ height: 'fit-content', minHeight: '100%', overflow: 'hidden' }}
    >
      <HtmlMeta title="管理平台" />
      <Header
        className={s.headerContainer}
        style={{
          height: '56px',
          padding: '0 24px',
          flexWrap: 'nowrap',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className={s['left-header']}>
          <Image
            loader={myNextImgLoader}
            alt="logo"
            src={`${STATIC_ASSETS_URL}/svg/logo.svg`}
            width={34}
            height={34}
            placeholder="blur"
            blurDataURL={rgbDataURL(243, 249, 255)}
          />
          <div className={s.headerTitle}>管理平台</div>
          {roleChineseName[role] && (
            <div className={s.roleNameContainer}>
              <div className={s.roleName}>{roleChineseName[role]}</div>
            </div>
          )}
        </div>
        <div className={s['right-header']}>
          <span className={s.userEmail}>{getUsername()}</span>
          <Divider
            type="vertical"
            style={{ height: '28px', margin: '0 16px', color: '#E6E7EB' }}
          />
          <div className={s.logoutBtn} onClick={logout}>
            退出
          </div>
        </div>
      </Header>
      <Content style={{ display: 'flex' }}>
        <SideMenu menuOptions={menuOptions}></SideMenu>
        <div className={s.layoutContainer}>{children}</div>
      </Content>
    </Layout>
  );
};

export default BackstageLayout;
