/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gradientColor: "#FF9D80",
      disabledColor: "#797979",
      pureBlackColor: "#000000",
      overlay: "rgba(0, 0, 0, 0.45)",
      "black-30": "rgba(0, 0, 0, 0.3)",

      black: "#212121",
      blackHigh: "#474747",
      blackMid: "#6C6C6C",
      blackLow: "#919191",
      blackSemi: "#616161",

      blueLight: "#F0F1FF",
      navyDark: "#202658",
      // #2ED3D2
      whiteHigh: "#FFFFFF",
      whiteMid: "#F5F5F5",
      // whiteSemi: "#F6F6F6",
      whiteSemi: "#FAFAFA",
      whiteLow: "#E8E8E8",

      successColor: "#00AE5B",

      warningColor: "#FF6D00",
      warningLightColor: "#FFEBEB",
      errorColor: "#FF4646",
      errorMidColor: "#FF6B6B",
      errorLightColor: "#FD5D5D",
      errorLowColor: "#FFEDED",
      infoColor: "#2ED3D2",
      alertColor: "#F4A100",

      primaryMain: "#515EDB",
      primaryMainDark: "#414BAF",
      primaryMainDarker: "#313883",
      primaryMainDarkest: "#202658",
      primaryMainLight: "#747EE2",
      primaryMainLighter: "#979EE9",
      primaryMainLightest: "#B9BFF1",

      secondaryMain: "#3BCE7F",
      secondaryMainDark: "#1EBB66",
      secondaryMainDarker: "#12AA58",
      secondaryMainDarkest: "#005F2C",
      secondaryMainLight: "#37B6B6",
      secondaryMainLighter: "#AFE2E2",
      secondaryMainLightest: "#D7F0F0",

      successMain: "#12AA58",
      successLight: "#EDFFF5",

      warningMain: "#FF9F43",
      warningLight: "#FFEFD1",

      fadeColor: "#969696",
      fadeLight: "#f3f3f3",
      fadeReg: "#BDBDBD",
    },
    backgroundImage: {
      "gradient-primary":
        "linear-gradient(143.77deg, rgba(255, 255, 255, 0.36) 30.9%, rgba(255, 255, 255, 0.03) 83.54%);",
      "gradient-secondary":
        "linear-gradient(175.57deg, #FC8165 -36.85%, rgba(255, 255, 255, 0.25) 107.36%);",
      authBg: "url('./assets/imges/bg.png')",
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [require("preline/plugin"), require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
