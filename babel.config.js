// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['next/babel']],
  };
};

