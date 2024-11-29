export const dateFormat = 'YYYY-MM-DD';

export const dateFormat2 = 'YYYY-MM-DD HH:mm:ss';

export const dateFormat3 = 'YYYY-MM-DD HH:mm';

// 角色: 超级管理员-ADMIN，
export enum UserRole  {
  ADMIN = 'admin',
  OP = 'operator',
}

export const roleAuthRoutesRegex: Record<string, RegExp[]> = {
  [UserRole.ADMIN]: [
    /^\/dataList/
  ],
  [UserRole.OP]: [
    /^\/dataList/
  ],
}

export const roleDefaultPage: Record<string, string> = {
  [UserRole.ADMIN]: '/dataList',
  [UserRole.OP]: '/dataList',
};

export const roleChineseName: Record<string, string> = {
  [UserRole.ADMIN]: '超级管理员',
  [UserRole.OP]: '运营',
}


