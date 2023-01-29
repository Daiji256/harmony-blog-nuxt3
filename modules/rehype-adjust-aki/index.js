import flatMap from "unist-util-flatmap";

export default function rehypeAdjustAki() {
  const adjustAki = (tree) => {
    const JC = "ぁ-んァ-ヶ一-龠ー";
    const WC = "0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ";
    const SQ = "'";
    const LSQ = "‘";
    const RSQ = "’";
    const DQ = '"';
    const LDQ = "“";
    const RDQ = "”";
    const LYJ = "（〔［｛〈《「『【｟〘〖〝";
    const RYJ = "）〕］｝〉》」』】｠〙〗〟。．、，";
    const LY = LYJ + LSQ + LDQ;
    const RY = RYJ + RSQ + RDQ;
    const MY = "・：；";
    const DP = "！？‼⁇⁈⁉";
    const FS = "　";

    const lsqRegexp = new RegExp("(\\s" + SQ + ")|(^" + SQ + ")", "g");
    const rsqRegexp = new RegExp("(" + SQ + "\\s)|(" + SQ + "$)", "g");
    replaceText(tree, lsqRegexp, LSQ);
    replaceText(tree, rsqRegexp, RSQ);

    const ldqRegexp = new RegExp("(\\s" + DQ + ")|(^" + DQ + ")", "g");
    const rdqRegexp = new RegExp("(" + DQ + "\\s)|(" + DQ + "$)", "g");
    replaceText(tree, ldqRegexp, LDQ);
    replaceText(tree, rdqRegexp, RDQ);

    const jwaClassName = "aa-mixed-aki";
    const jwaBetweenRegexp = new RegExp(
      "[" + JC + "][" + WC + "]|[" + WC + "][" + JC + "]"
    );
    insertAkiBetween(tree, jwaBetweenRegexp, jwaClassName);

    const lryaClassName = "aa-yakumono-aki";
    const lryaFirstRegexp = new RegExp("^[" + LY + "]");
    const lryaLastRegexp = new RegExp("[" + RY + "]$");
    const lryaBetweenRegexp = new RegExp(
      "[^" + LY + MY + "][" + LY + "]|[" + RY + "][^" + RY + MY + "]"
    );
    insertAkiFirst(tree, lryaFirstRegexp, lryaClassName);
    insertAkiLast(tree, lryaLastRegexp, lryaClassName);
    insertAkiBetween(tree, lryaBetweenRegexp, lryaClassName);

    const myaClassName = "aa-middle-yakumono-aki";
    const myaFirstRegexp = new RegExp("^[" + MY + "]");
    const myaLastRegexp = new RegExp("[" + MY + "]$");
    const myaBetweenRegexp = new RegExp(
      "[^" + MY + "][" + MY + "]|[" + MY + "][^" + MY + "]"
    );
    insertAkiFirst(tree, myaFirstRegexp, myaClassName);
    insertAkiLast(tree, myaLastRegexp, myaClassName);
    insertAkiBetween(tree, myaBetweenRegexp, myaClassName);

    const lyeClassName = "aa-left-yakumono";
    const lyeRegexp = new RegExp("[" + LYJ + "]");
    eraseAki(tree, lyeRegexp, lyeClassName);

    const ryeClassName = "aa-right-yakumono";
    const ryeRegexp = new RegExp("[" + RYJ + "]");
    eraseAki(tree, ryeRegexp, ryeClassName);

    const myeClassName = "aa-middle-yakumono";
    const myeRegexp = new RegExp("[" + MY + "]");
    eraseAki(tree, myeRegexp, myeClassName);

    const dpaClassName = "aa-dividing-punctuation-aki";
    const dpaRegexp = new RegExp("[" + DP + "][" + FS + "]");
    replaceDpAki(tree, dpaRegexp, dpaClassName);
  };

  const replaceText = (tree, regexp, replacement) => {
    flatMap(tree, (node, _, parent) => {
      if (!isProcessingNode(node, parent)) return [node];
      const text = node.value;
      return [makeTextNode(text.replace(regexp, replacement))];
    });
  };

  const insertAkiFirst = (tree, regexp, className) => {
    flatMap(tree, (node, _, parent) => {
      if (!isProcessingNode(node, parent)) return [node];
      const text = node.value;
      if (text.search(regexp) < 0) {
        return [makeTextNode(text)];
      }
      return [makeSpanNode(className), makeTextNode(text)];
    });
  };

  const insertAkiLast = (tree, regexp, className) => {
    flatMap(tree, (node, _, parent) => {
      if (!isProcessingNode(node, parent)) return [node];
      const text = node.value;
      if (text.search(regexp) < 0) {
        return [makeTextNode(text)];
      }
      return [makeTextNode(text), makeSpanNode(className)];
    });
  };

  const insertAkiBetween = (tree, regexp, className) => {
    flatMap(tree, (node, _, parent) => {
      if (!isProcessingNode(node, parent)) return [node];
      let ret = [];
      let text = node.value;
      while (true) {
        const idx = text.search(regexp);
        if (idx < 0) {
          ret.push(makeTextNode(text));
          break;
        }
        ret.push(makeTextNode(text.slice(0, idx + 1)));
        ret.push(makeSpanNode(className));
        text = text.slice(idx + 1);
      }
      return ret;
    });
  };

  const eraseAki = (tree, regexp, className) => {
    flatMap(tree, (node, _, parent) => {
      if (!isProcessingNode(node, parent)) return [node];
      let ret = [];
      let text = node.value;
      while (true) {
        const idx = text.search(regexp);
        if (idx < 0) {
          ret.push(makeTextNode(text));
          break;
        }
        ret.push(makeTextNode(text.slice(0, idx)));
        ret.push(makeSpanNode(className, text.charAt(idx)));
        text = text.slice(idx + 1);
      }
      return ret;
    });
  };

  const replaceDpAki = (tree, regexp, className) => {
    flatMap(tree, (node, _, parent) => {
      if (!isProcessingNode(node, parent)) return [node];
      let ret = [];
      let text = node.value;
      while (true) {
        const idx = text.search(regexp);
        if (idx < 0) {
          ret.push(makeTextNode(text));
          break;
        }
        ret.push(makeTextNode(text.slice(0, idx + 1)));
        ret.push(makeSpanNode(className));
        text = text.slice(idx + 2);
      }
      return ret;
    });
  };

  const isProcessingNode = (node, parent) => {
    return !(
      node.type !== "text" ||
      parent?.tagName === "code" ||
      parent?.tagName === "code-inline"
    );
  };

  const makeTextNode = (value) => {
    return { type: "text", value: value };
  };

  const makeSpanNode = (className, value) => {
    let children = [];
    if (value !== undefined) {
      children = [makeTextNode(value)];
    }
    return {
      type: "element",
      tagName: "span",
      properties: { className: [className] },
      children: children,
    };
  };

  return adjustAki;
}
