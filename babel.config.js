module.exports = function (api) {
  api.cache(false);
  const opts = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: false,
          debug: false,
          targets: {
            node: true,
          },
        },
      ],
    ],
  };

  return opts;
};

