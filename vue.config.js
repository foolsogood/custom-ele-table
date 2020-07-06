module.exports = {
  parallel: false,
  publicPath:
    process.env.NODE_ENV === "production" &&
    process.env.VUE_APP_BUILD_MODE !== "package"
      ? "/custom-ele-table/"
      : "/",
  outputDir: process.env.VUE_APP_BUILD_MODE === "package" ? "dist" : "docs",
  chainWebpack: config => {
    if (process.env.VUE_APP_BUILD_MODE === "package") {
      config.output.libraryExport("default");
      config.externals({
        vue: {
          commonjs: "vue",
          commonjs2: "vue",
          root: "Vue",
          amd: "vue"
        }
      });
    }
  },
  css: { extract: !!process.env.NO_EXTRACT_CSS }
};
