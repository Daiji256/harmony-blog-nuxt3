import { TeX } from "mathjax-full/js/input/tex.js";
import { HTMLDocument } from "mathjax-full/js/handlers/html/HTMLDocument.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { STATE } from "mathjax-full/js/core/MathItem.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";
import { SerializedMmlVisitor } from "mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js";
import { visit } from "unist-util-visit";
import { removePosition } from "unist-util-remove-position";
import { toText } from "hast-util-to-text";
import { unified } from "unified";
import rehypeParse from "rehype-parse";

const rehypeLaTeX2MathML = function () {
  const packages = AllPackages.filter((name) => name !== "bussproofs");
  const tex = new TeX({ packages: packages });
  const html = new HTMLDocument("", liteAdaptor(), { InputJax: tex });
  const visitor = new SerializedMmlVisitor();
  const latex2mathml = (latex, display) => {
    return visitor.visitTree(
      html.convert(latex || "", { display: display, end: STATE.CONVERT }),
      html,
    );
  };
  const parseHtml = unified().use(rehypeParse, { fragment: true });

  return (tree) => {
    visit(tree, "element", (element) => {
      const classes =
        element.properties && Array.isArray(element.properties.className)
          ? element.properties.className
          : [];
      const inline = classes.includes("math-inline");
      const display = classes.includes("math-display");

      if (!inline && !display) {
        return;
      }

      const latex = toText(element, { whitespace: "pre" });
      let mathml = latex2mathml(latex, display);

      element.children = removePosition(parseHtml.parse(mathml), true).children;
    })
  };
};

export default rehypeLaTeX2MathML;
