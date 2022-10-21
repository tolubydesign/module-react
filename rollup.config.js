import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json" assert { type: 'json' };
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer';
var path = require('path');

// const packageJson = require("./package.json");
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      scss({
        processor: () => postcss([autoprefixer()]),
        includePaths: [
          path.join(__dirname, '../../node_modules/'),
          'node_modules/'
        ]
      })
    ],

    external: [
      /\.css$/,
      /\.scss$/,
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],

    // NEW
    external: [
      /\.css$/,
      /\.scss$/,
    ],
  },

  // {
  //   input: "dist/esm/index.d.ts",
  //   plugins: [
  //     resolve(),
  //     commonjs(),
  //     typescript({ tsconfig: "./tsconfig.json" }),
  //     postcss(),
  //   ],
  //   external: [
  //     "react",
  //     /\.css$/,
  //     "react-dom"
  //   ],
  // }

]

// export default [
//   {
//     input: "src/index.ts",
//     output: [
//       {
//         file: packageJson.main,
//         format: "cjs",
//         sourcemap: true,
//       },
//       {
//         file: packageJson.module,
//         format: "esm",
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       resolve(),
//       commonjs(),
//       typescript({ tsconfig: "./tsconfig.json" }),

//       // NEW
//       postcss(), 
//     ],
//     external: ["react", "react-dom"],
//   },
//   {
//     input: "dist/esm/index.d.ts",
//     external: [/\.css$/],
//   },
//   // {
//   //   input: "dist/esm/index.d.ts",
//   //   output: [{ file: "dist/index.d.ts", format: "esm" }],
//   //   plugins: [dts()],

//   //   // NEW
//   //   external: [/\.css$/],
//   // },
// ];