import flatMap from 'unist-util-flatmap';

export default function rehypeAkikumi() {
    function transformer(tree) {
        flatMap(tree, function (node) {
            if (node.type !== 'text') return [node];
            if (node.value !== 'hoge') return [node];
            return [
                {
                    type: 'text',
                    value: 'text '
                },
                {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                        className: ['kumi-aki-4']
                    },
                    children: [
                        {
                            type: 'text',
                            value: 'span'
                        }
                    ]
                },
                {
                    type: 'text',
                    value: ' text'
                }
            ];
        });
    }
    return transformer;
}
