import * as Sentry from '@sentry/nextjs';
import getConfig from 'next/config';
import { generateUUID } from './util';
import { isServer } from './env-util';

const { publicRuntimeConfig } = getConfig();

const sentryDefaultOption: Sentry.NodeOptions = {
  environment: publicRuntimeConfig.NODE_ENV,
  dsn: 'your url',
  tracesSampleRate: 1,
  // 过滤错误
  ignoreErrors: [],
};

const sentryBrowserOption: () => Sentry.BrowserOptions = () => ({
  ...sentryDefaultOption,
  integrations: [new Sentry.BrowserTracing()],
});

const sentryOption = isServer() ? sentryDefaultOption : sentryBrowserOption();

interface SentryErrorOptionProps {
  level: Sentry.SeverityLevel;
}

const sentryErrorDefaultProps: SentryErrorOptionProps = {
  level: 'error',
};

export class SentryLogger {
  static init() {
    Sentry.init(sentryOption);
  }

  static error(e: Error, options: SentryErrorOptionProps = sentryErrorDefaultProps) {
    e.name = `[${isServer() ? 'Server' : 'Client'}] ${e.name || ''}`;
    Sentry.withScope((scope) => {
      const { level } = options;
      scope.setLevel(level);
      Sentry.captureException(e);
    });
  }

  static setUser(user: Sentry.User) {
    Sentry.setUser(user);
  }

  static setContext(content: Record<string, any>) {
    Sentry.setContext('character', content);
  }

  static getTraceId() {
    return generateUUID();
  }
}
