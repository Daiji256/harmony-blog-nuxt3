import flatMap from "unist-util-flatmap";

export default function rehypeAdjustAki() {
  const JAPANESE_WESTERN_REGEXP =
    /([ぁ-んァ-ヶ一-龠ー])([0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ])/g;
  const WESTERN_JAPANESE_REGEXP =
    /([0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ])([ぁ-んァ-ヶ一-龠ー])/g;

  const adjustAki = (tree) => {
    flatMap(tree, (node) => {
      return adjustMixedAki(node, JAPANESE_WESTERN_REGEXP);
    });
    flatMap(tree, (node) => {
      return adjustMixedAki(node, WESTERN_JAPANESE_REGEXP);
    });
  };

  const adjustMixedAki = (node, regexp) => {
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
      ret.push(makeSpan("adjust-aki-mixed-aki"));
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
