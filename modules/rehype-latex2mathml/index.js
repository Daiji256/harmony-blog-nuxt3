import temml from "temml/dist/temml.cjs";
import { visit } from "unist-util-visit";
import { removePosition } from "unist-util-remove-position";
import { toText } from "hast-util-to-text";
import { unified } from "unified";
import rehypeParse from "rehype-parse";

const assign = Object.assign;
const parseHtml = unified().use(rehypeParse, { fragment: true });

const rehypeLaTeX2MathML = (options) => {
  return (tree) => {
    visit(tree, "element", (element) => {
      const classes =
        element.properties && Array.isArray(element.properties.className)
          ? element.properties.className
          : [];
      const inlineMode = classes.includes("math-inline");
      const displayMode = classes.includes("math-display");

      if (!inlineMode && !displayMode) {
        return;
      }

      const latex = toText(element, { whitespace: "pre" });
      const mathml = temml.renderToString(
        latex,
        assign({}, options || {}, { displayMode: displayMode }),
      );

      element.children = removePosition(parseHtml.parse(mathml), true).children;
    });
  };
};

export default rehypeLaTeX2MathML;
