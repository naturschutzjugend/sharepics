// vue.config.js
module.exports = {
  pwa: {
    name: "NAJU Sharepic-Maker",
    themeColor: "#277C43",
    msTileColor: "#277C43",
    appleMobileWebAppCapable: "yes",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-150x150.png",
    },
  },
  publicPath: "/sharepics/",
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("html").tap(args => {
        args[0].title = "NAJU Sharepic-Maker";
        return args;
      });
    }
  },
};
