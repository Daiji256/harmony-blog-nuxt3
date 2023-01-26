import flatMap from "unist-util-flatmap";

export default function rehypeAdjustAki() {
  const adjustAki = (tree) => {
    const JC = "ぁ-んァ-ヶ一-龠ー";
    const WC = "0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ";
    const LY = "（〔［｛〈《「『【｟〘〖〝";
    const RY = "）〕］｝〉》」』】｠〙〗〟。．、，";
    const MY = "・：；";

    const jwaClassName = "adjust-aki-mixed-aki";
    const jwaBetweenRegexp = new RegExp(
      "[" + JC + "][" + WC + "]|[" + WC + "][" + JC + "]"
    );
    flatMap(tree, (node) => {
      return insertAkiBetween(node, jwaBetweenRegexp, jwaClassName);
    });

    const lryaClassName = "adjust-aki-yakumono-aki";
    const lryaFirstRegexp = new RegExp("^[" + LY + "]");
    const lryaLastRegexp = new RegExp("[" + RY + "]$");
    const lryaBetweenRegexp = new RegExp(
      "[^" + LY + MY + "][" + LY + "]|[" + RY + "][^" + RY + MY + "]"
    );
    flatMap(tree, (node) => {
      return insertAkiFirst(node, lryaFirstRegexp, lryaClassName);
    });
    flatMap(tree, (node) => {
      return insertAkiLast(node, lryaLastRegexp, lryaClassName);
    });
    flatMap(tree, (node) => {
      return insertAkiBetween(node, lryaBetweenRegexp, lryaClassName);
    });

    const myaClassName = "adjust-aki-middle-yakumono-aki";
    const myaFirstRegexp = new RegExp("^[" + MY + "]");
    const myaLastRegexp = new RegExp("[" + MY + "]$");
    const myaBetweenRegexp = new RegExp(
      "[^" + MY + "][" + MY + "]|[" + MY + "][^" + MY + "]"
    );
    flatMap(tree, (node) => {
      return insertAkiFirst(node, myaFirstRegexp, myaClassName);
    });
    flatMap(tree, (node) => {
      return insertAkiLast(node, myaLastRegexp, myaClassName);
    });
    flatMap(tree, (node) => {
      return insertAkiBetween(node, myaBetweenRegexp, myaClassName);
    });
  };

  const insertAkiFirst = (node, regexp, className) => {
    if (node.type !== "text") return [node];
    const text = node.value;
    if (text.search(regexp) < 0) {
      return [makeText(text)];
    }
    return [makeSpan(className), makeText(text)];
  };

  const insertAkiLast = (node, regexp, className) => {
    if (node.type !== "text") return [node];
    const text = node.value;
    if (text.search(regexp) < 0) {
      return [makeText(text)];
    }
    return [makeText(text), makeSpan(className)];
  };

  const insertAkiBetween = (node, regexp, className) => {
    if (node.type !== "text") return [node];
    let ret = [];
    let text = node.value;
    while (true) {
      const idx = text.search(regexp);
      if (idx < 0) {
        ret.push(makeText(text));
        break;
      }
      ret.push(makeText(text.slice(0, idx + 1)));
      ret.push(makeSpan(className));
      text = text.slice(idx + 1);
    }
    return ret;
  };

  const makeText = (value) => {
    return { type: "text", value: value };
  };

  const makeSpan = (className, value) => {
    let children = [];
    if (value !== undefined) {
      children = [makeText(value)];
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
