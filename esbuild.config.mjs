import esbuild from 'esbuild'
import process from 'process'
import builtins from 'builtin-modules'
import { sassPlugin } from 'esbuild-sass-plugin'
import fs from 'fs'
import manifest from './manifest.json' assert { type: 'json' }

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`

const prod = process.argv[2] === 'production'
const testVaultPluginPath = './test-vault/.obsidian/plugins/obsidian-ttrpg-audio-manager'

const context = await esbuild.context({
  banner: {
    js: banner,
  },
  entryPoints: ['src/main.ts', 'src/styles.scss'],
  bundle: true,
  external: [
    'obsidian',
    'electron',
    '@codemirror/autocomplete',
    '@codemirror/collab',
    '@codemirror/commands',
    '@codemirror/language',
    '@codemirror/lint',
    '@codemirror/search',
    '@codemirror/state',
    '@codemirror/view',
    '@lezer/common',
    '@lezer/highlight',
    '@lezer/lr',
    ...builtins,
  ],
  plugins: [sassPlugin()],
  format: 'cjs',
  target: 'es2018',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  outdir: prod ? './' : testVaultPluginPath,
  minify: prod,
})

if (prod) {
  await context.rebuild()
  process.exit(0)
} else {
  fs.writeFileSync(testVaultPluginPath + '/manifest.json', JSON.stringify(manifest, null, 2))
  await context.watch()
}
