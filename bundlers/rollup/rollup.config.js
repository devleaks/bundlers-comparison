import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import postcssAssets from 'postcss-assets'
import html from 'rollup-plugin-fill-html'
import rebasePlugin from "rollup-plugin-rebase"
import url from "rollup-plugin-url"

process.env.NODE_ENV = 'development'

const CWD = process.cwd()
const Paths = {
  SRC: `${CWD}/src`,
  DIST: `${CWD}/dist-rollup`,
  NODE_MODULES: `${CWD}/node_modules`
}
Object.assign(Paths, {
  INPUT: Paths.SRC + '/index.js',
  OUTPUT: Paths.DIST + '/index.js'
})
// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH
const rebase = rebasePlugin({
  outputFolder: Paths.DIST,
  input: Paths.INPUT,
})

export default {
  input: Paths.INPUT,
  // external: rebase.isExternal,
  output: {
    file: Paths.OUTPUT,
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    // sourcemap: true
  },
  plugins: [
    html({
      template: `${Paths.SRC}/template.html`,
      filename: 'index.html'
    }),
    // rebase,
    postcss({
      modules: true,
      plugins: [
        postcssAssets({
          loadPaths: ['**'],
          relativeTo: Paths.SRC
        })
      ]
    }),
    url({
      limit: 10 * 1024, // inline files < 10k, copy files > 10k
    }),
    resolve(), // tells Rollup how to find date-fns in node_modules
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(), // converts date-fns to ES modules
    // globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    // production && uglify() // minify, but only in production
  ]
}
