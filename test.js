// https://github.com/mjackson/babel-plugin-transform-define
// $ babel --plugins transform-define script.js
// assuming options are { "process.env.NODE_ENV": "development", "typeof window": "object" }
process.env.NODE_ENV;
process.env.NODE_ENV === "development";
typeof window;
typeof window === "object";
