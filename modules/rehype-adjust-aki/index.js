import flatMap from "unist-util-flatmap";

export default function rehypeAdjustAki() {
  const JAPANESE_WESTERN_AKI_REGEXP =
    /([ぁ-んァ-ヶ一-龠ー])([0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ])/;
  const WESTERN_JAPANESE_AKI_REGEXP =
    /([0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ])([ぁ-んァ-ヶ一-龠ー])/;
  const FIRST_LEFT_YAKUMONO_AKI_REGEXP = /^[（〔［｛〈《「『【｟〘〖〝]/;
  const LEFT_YAKUMONO_AKI_REGEXP =
    /([^（〔［｛〈《「『【｟〘〖〝・：；])([（〔［｛〈《「『【｟〘〖〝])/;
  const LAST_RIGHT_YAKUMONO_AKI_REGEXP =
    /[）〕］｝〉》」』】｠〙〗〟。．、，]$/;
  const RIGHT_YAKUMONO_AKI_REGEXP =
    /([）〕］｝〉》」』】｠〙〗〟。．、，])([^）〕］｝〉》」』】｠〙〗〟。．、，・：；])/;

  const adjustAki = (tree) => {
    flatMap(tree, (node) => {
      return adjustMixedAki(node, JAPANESE_WESTERN_AKI_REGEXP);
    });
    flatMap(tree, (node) => {
      return adjustMixedAki(node, WESTERN_JAPANESE_AKI_REGEXP);
    });

    flatMap(tree, (node) => {
      return adjustFirstBracketAki(node);
    });
    flatMap(tree, (node) => {
      return adjustLastBracketAki(node);
    });
    flatMap(tree, (node) => {
      return adjustBracketAki(node, LEFT_YAKUMONO_AKI_REGEXP);
    });
    flatMap(tree, (node) => {
      return adjustBracketAki(node, RIGHT_YAKUMONO_AKI_REGEXP);
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

  const adjustFirstBracketAki = (node) => {
    if (node.type !== "text") return [node];
    const text = node.value;
    if (text.search(FIRST_LEFT_YAKUMONO_AKI_REGEXP) < 0) {
      return [makeText(text)];
    }
    return [makeSpan("adjust-aki-yakumono-aki"), makeText(text)];
  };

  const adjustLastBracketAki = (node) => {
    if (node.type !== "text") return [node];
    const text = node.value;
    if (text.search(LAST_RIGHT_YAKUMONO_AKI_REGEXP) < 0) {
      return [makeText(text)];
    }
    return [makeText(text), makeSpan("adjust-aki-yakumono-aki")];
  };

  // TODO: adjustMixedAki と共通化させる
  const adjustBracketAki = (node, regexp) => {
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
      ret.push(makeSpan("adjust-aki-yakumono-aki"));
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
