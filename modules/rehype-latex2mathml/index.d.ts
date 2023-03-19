/**
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function rehypeLaTeX2MathML():
  | void
  | import('unified').Transformer<import('hast').Root, import('hast').Root>
export type Root = import('hast').Root
