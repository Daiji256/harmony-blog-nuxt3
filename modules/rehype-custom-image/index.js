export default function rehypeCustomImage() {
  const replaceImgWithCustomImage = (tree) => {
    if (tree.children) {
      tree.children = tree.children.map((child) => replaceImgWithCustomImage(child));
    }
    if (tree.tagName === "img") tree.tagName = "custom-image";
    return tree;
  };

  return replaceImgWithCustomImage;
}
