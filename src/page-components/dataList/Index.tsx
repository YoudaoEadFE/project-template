import React, { useEffect, useState } from 'react';
import {
  Select,
} from 'antd';
import s from './styles/index.module.css';


const { Option } = Select;

const Index = () => {
  const [menus, setMenus] = useState<Array<any>>();

  return (
      <div className={s.listContainer}>我是个内容页面</div>
  );
};

export default Index;
