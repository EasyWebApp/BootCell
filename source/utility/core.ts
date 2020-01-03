export function uniqueID() {
    return (Date.now() + parseInt((Math.random() + '').slice(2))).toString(36);
}

function readQuoteValue(raw: string) {
    const quote = raw[0];
    const index = raw.indexOf(quote, 1);

    if (index < 0) throw SyntaxError(`A ${quote} is missing`);

    return raw.slice(1, index);
}

export function parseTextTable<T = {}>(
    raw: string,
    header?: boolean,
    separator = ','
) {
    const data = raw
        .trim()
        .split(/[\r\n]+/)
        .map(row => {
            const list = [];

            do {
                let value: string;

                if (row[0] === '"' || row[0] === "'") {
                    value = readQuoteValue(row);

                    row = row.slice(value.length + 3);
                } else {
                    const index = row.indexOf(separator);

                    if (index > -1) {
                        value = row.slice(0, index);

                        row = row.slice(index + 1);
                    } else {
                        value = row;

                        row = '';
                    }
                }

                try {
                    value = value.trim();

                    list.push(JSON.parse(value));
                } catch (error) {
                    list.push(value);
                }
            } while (row);

            return list;
        });

    return !header
        ? data
        : data.slice(1).map(row =>
              row.reduce((object, item, index) => {
                  object[data[0][index]] = item;

                  return object;
              }, {} as T)
          );
}

const sandbox = document.createElement('template'),
    fragment = document.createDocumentFragment();

export function parseDOM(HTML: string) {
    sandbox.innerHTML = HTML;

    return Array.from(sandbox.content.childNodes).map(node => {
        node.remove();
        return node;
    });
}

export function insertToCursor(...nodes: Node[]) {
    fragment.append(...nodes);

    const selection = self.getSelection();

    if (!selection) return;

    const range = selection.getRangeAt(0);

    range.deleteContents();
    range.insertNode(fragment);
}
