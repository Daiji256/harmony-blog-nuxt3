import flatMap from "unist-util-flatmap";

export default function rehypeAdjustAki() {
  const adjustAki = (tree) => {
    const JC = "ぁ-んァ-ヶ一-龠ー";
    const WC = "0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ";
    const LY = "（〔［｛〈《「『【｟〘〖〝";
    const RY = "）〕］｝〉》」』】｠〙〗〟。．、，";
    const MY = "・：；";

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
  };

  const insertAkiFirst = (tree, regexp, className) => {
    flatMap(tree, (node) => {
      if (node.type !== "text") return [node];
      const text = node.value;
      if (text.search(regexp) < 0) {
        return [makeTextNode(text)];
      }
      return [makeSpanNode(className), makeTextNode(text)];
    });
  };

  const insertAkiLast = (tree, regexp, className) => {
    flatMap(tree, (node) => {
      if (node.type !== "text") return [node];
      const text = node.value;
      if (text.search(regexp) < 0) {
        return [makeTextNode(text)];
      }
      return [makeTextNode(text), makeSpanNode(className)];
    });
  };

  const insertAkiBetween = (tree, regexp, className) => {
    flatMap(tree, (node) => {
      if (node.type !== "text") return [node];
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
