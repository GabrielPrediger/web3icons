import { TType, TVariant } from '../types'

/**
 * Gets the type and variant of the icon from the file path
 * @param filePath The file path of the icon
 * @returns The type and variant of the icon
 */
export const getTypeAndVariant = (
  filePath: string,
): { type: TType; variant: TVariant } => {
  let type: TType = 'tokens'
  let variant: TVariant = 'branded'

  const possibleTypes: TType[] = ['tokens', 'networks']
  const possibleVariants: TVariant[] = ['branded', 'mono']

  possibleTypes.forEach((t) => {
    possibleVariants.forEach((v) => {
      if (filePath.includes(`/${t}/${v}/`)) {
        type = t
        variant = v
      }
    })
  })

  return { type, variant }
}
