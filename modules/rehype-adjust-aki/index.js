export default function rehypeAdjustAki() {
  const adjustAki = (tree) => {
    const jpn = "ぁ-んァ-ヶ一-龠ー";
    const wrn = "0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ";
    const lPm = "（｟「『［〚｛【〖〈《〔〘〝";
    const rPm = "）｠」』］〛｝】〗〉》〕〙〟。．、，";
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
    flatMapText(tree, (node) => {
      const text = node.value;
      if (text.search(regexp) < 0) return [makeTextNode(text)];
      return [makeSpanNode(className), makeTextNode(text)];
    });
  };

  const insertAkiLast = (tree, regexp, className) => {
    flatMapText(tree, (node) => {
      const text = node.value;
      if (text.search(regexp) < 0) return [makeTextNode(text)];
      return [makeTextNode(text), makeSpanNode(className)];
    });
  };

  const insertAkiBetween = (tree, regexp, className) => {
    flatMapText(tree, (node) => {
      const ret = [];
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
    flatMapText(tree, (node) => {
      const ret = [];
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
    flatMapText(tree, (node) => {
      const ret = [];
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

  const makeTextNode = (value) => {
    return { type: "text", value: value };
  };

  const makeSpanNode = (className, value) => {
    const children = [];
    if (value !== undefined) {
      children.push(makeTextNode(value));
    }
    return {
      type: "element",
      tagName: "span",
      properties: { className: [className] },
      children: children,
    };
  };

  const flatMapText = (tree, block) => {
    const ignoreTags = ["code", "code-inline", "pre", "mi", "mn", "mo", "ms"];
    const _flatMapText = (node) => {
      if (ignoreTags.includes(node.tagName)) return [node];
      if (node.children) {
        node.children = node.children.flatMap((child) => _flatMapText(child));
      }
      if (node.type !== "text") return [node];
      return block(node);
    };

    return _flatMapText(tree)[0];
  };

  return adjustAki;
}
