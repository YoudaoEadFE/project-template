/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isLocal = process.env.NODE_ENV === 'dev';

const STATIC_ASSETS_URL = '/static/assets'

// 接口地址
const API_HOST_DEV = 'http://dev.com';
const API_HOST_TEST = 'http://test.com';
const API_HOST_PROD = 'http://prod.com';

// 上传文件目录
const uploadDir = path.resolve(path.dirname(process.argv[1]), '../uploads');
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir);
  } catch (e) {
    throw new Error(
      `no upload directory ${uploadDir}, make it first before start service`,
    );
  }
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:8][ext]',
        },
      },
    ],
  },
  publicRuntimeConfig: {
    API_HOST: isProduction
      ? API_HOST_PROD
      : isTest
        ? API_HOST_TEST
        : API_HOST_DEV,
    API_VERSION: 'v1.0.0',
    STATIC_ASSETS_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  images: {
    // disable static image imports
    disableStaticImages: true,
    // The expiration (or rather Max Age)
    minimumCacheTTL: 60,
    //  a list of allowed hostnames for external images
    domains: [],
  },
  transpilePackages: [
    // https://github.com/vercel/next.js/issues/58817
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-notification",
    "rc-pagination",
    "re-motion",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
};
