# project-template
## 最新项目模板

* react v18.3.1
* antd v5.22.2
* nextjs v15.3.1
* node v20.17.0


## 初始化项目需要修改的点

1. src/middleware.ts 中需要修改USER_COOKIES_NEED_CHANGE，修改为自己的cookie
2. src/utils/sentry.ts 中需要修改dsn为自己的sentry dsn
3. src/page-components/login/Login.tsx 中要修改cookie.set USER_COOKIES_NEED_CHANGE
4. src/page-components/layout/MainLayout.tsx 中的 USER_COOKIES_NEED_CHANGE

#### TODO
DOCKERFILE
.gitlab-ci.yml


