import fs from 'fs'
import path from 'path'
import {
  JSX_TOKENS_OUT_DIR,
  JSX_NETWORKS_OUT_DIR,
  reactRoot,
} from '../constants'

const generateIndexFile = (
  directory: string,
  category: 'tokens' | 'networks',
) => {
  const svgFiles = fs
    .readdirSync(directory)
    .filter((file) => file !== 'index.ts')
  const exports = svgFiles
    .map((svgFile) => {
      const baseName = path.basename(svgFile, '.tsx')
      return `export { ${baseName} } from './${baseName}';\n`
    })
    .join('')

  fs.writeFileSync(path.join(directory, 'index.ts'), exports)
  console.log(`✓ Generated: ${category} index file`)
}

// Generate index.ts for tokens and networks
generateIndexFile(JSX_TOKENS_OUT_DIR, 'tokens')
generateIndexFile(JSX_NETWORKS_OUT_DIR, 'networks')

// Generate icons/index.ts in src
const iconsIndexContent = `export * from './tokens';\nexport * from './networks';\n`
fs.writeFileSync(
  path.join(reactRoot, 'src', 'icons', 'index.ts'),
  iconsIndexContent,
)
console.log('✓ Generated: icons index file')

// Update the main src/index.ts
const mainIndexContent =
  `/* Generated */\n` +
  `export * from './types';\n` +
  `export { BaseIcon } from './BaseIcon';\n` +
  `export { TokenIcon } from './TokenIcon';\n` +
  `export * from './icons';\n`

fs.writeFileSync(path.join(reactRoot, 'src', 'index.ts'), mainIndexContent)
console.log('✓ Generated: Main React index file')
