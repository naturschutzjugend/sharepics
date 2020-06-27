// vue.config.js
// vue.config.js
module.exports = {
  publicPath: "/sharepics/",
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("html").tap(args => {
        args[0].title = "NAJU Sharepic-Maker";
        return args;
      });
    }
  }
};
