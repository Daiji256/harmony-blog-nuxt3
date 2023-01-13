import { visit } from 'unist-util-visit';

export default function plugin(options) {
    function transformer(tree) {
        visit(tree, 'text', function (node) {
            node.value = node.value.replace("hoge", "fuga");
        });
    }
    return transformer;
}
