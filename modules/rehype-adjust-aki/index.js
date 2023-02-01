import flatMap from "unist-util-flatmap";

export default function rehypeAdjustAki() {
  const adjustAki = (tree) => {
    const jpn = "ぁ-んァ-ヶ一-龠ー";
    const wrn = "0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ";
    const lPm = "（〔［｛〈《「『【｟〘〖〝";
    const rPm = "）〕］｝〉》」』】｠〙〗〟。．、，";
    const mPm = "・：；";
    const dPm = "！？‼⁇⁈⁉";
    const emSp = "　";

    const jwAkiSC = "aa--jw-aki";
    insertAkiBetween(tree, new RegExp(`[${jpn}][${wrn}]|[${wrn}][${jpn}]`), jwAkiSC);

    const lrPmAkiSC = "aa--lr-pm-aki";
    insertAkiFirst(tree, new RegExp(`^[${lPm}]`), lrPmAkiSC);
    insertAkiLast(tree, new RegExp(`[${rPm}]$`), lrPmAkiSC);
    insertAkiBetween(tree, new RegExp(`[^${lPm}${mPm}][${lPm}]|[${rPm}][^${rPm}${mPm}]`), lrPmAkiSC);

    const mPmAkiSC = "aa--m-pm-aki";
    insertAkiFirst(tree, new RegExp(`^[${mPm}]`), mPmAkiSC);
    insertAkiLast(tree, new RegExp(`[${mPm}]$`), mPmAkiSC);
    insertAkiBetween(tree, new RegExp(`[^${mPm}][${mPm}]|[${mPm}][^${mPm}]`), mPmAkiSC);

    const dPmAkiSC = "aa--d-pm-aki";
    replaceDpAki(tree, new RegExp(`[${dPm}]${emSp}`), dPmAkiSC);

    const lPmSC = "aa--l-pm";
    const rPmSC = "aa--r-pm";
    const mPmSC = "aa--m-pm";
    eraseAki(tree, new RegExp(`[${lPm}]`), lPmSC);
    eraseAki(tree, new RegExp(`[${rPm}]`), rPmSC);
    eraseAki(tree, new RegExp(`[${mPm}]`), mPmSC);
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
