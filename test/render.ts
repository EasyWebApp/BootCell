import { DOMRenderer, VNode } from 'dom-renderer';

export function render(tree: VNode) {
    const root = document.createElement('div');

    new DOMRenderer().render(tree, root);

    return root;
}
