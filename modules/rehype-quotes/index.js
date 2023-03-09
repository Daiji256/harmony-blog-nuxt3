import flatMap from "unist-util-flatmap";

export default function rehypeQuotes() {
  const replaceQuotes = (tree) => {
    const rPm = "）〕］｝〉》」』】｠〙〗〟。．、，";
    const mPm = "・：；";
    replaceText(tree, new RegExp(`([${rPm}${mPm}])'`, 'g'), '$1‘');
    replaceText(tree, / '/g, " ‘");
    replaceText(tree, /' /g, "’ ");
    replaceText(tree, /^'/g, "‘");
    replaceText(tree, /'/g, "’");
    replaceText(tree, new RegExp(`([${rPm}${mPm}])"`, 'g'), '$1“');
    replaceText(tree, / "/g, " “");
    replaceText(tree, /" /g, "” ");
    replaceText(tree, /^"/g, "“");
    replaceText(tree, /"/g, "”");
  };

  const replaceText = (tree, regexp, replacement) => {
    flatMap(tree, (node, _, parent) => {
      if (
        node.type !== "text" ||
        parent?.tagName === "code" ||
        parent?.tagName === "code-inline"
      )
        return [node];
      return [
        {
          type: "text",
          value: node.value.replace(regexp, replacement),
        },
      ];
    });
  };

  return replaceQuotes;
}
