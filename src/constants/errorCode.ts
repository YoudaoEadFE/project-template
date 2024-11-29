import { keyToValue } from '@/utils/util';

export const ERRORCODE = {
  VALID_CODE: {
    AUTHENTICATION_EXPIRED: 10000, // 认证过期
    PERMISSION_DENIED: 20000, // 权限不足
  },

  /**
   * 所有无法识别的异常默认的返回状态码
   */
  SERVICE_ERROR: 50000, // 服务器异常
};

export const NotNeedToReportSentryErrorCode = {
  // 待补充
  ...ERRORCODE.VALID_CODE,
};

export const NotNeedToReportSentryErrorCodeOBJ = keyToValue(NotNeedToReportSentryErrorCode);
