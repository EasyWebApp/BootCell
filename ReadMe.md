![WebCell](https://web-cell.dev/WebCell-0.f1ffd28b.png)

# BootCell

[Web Components][1] UI library based on [WebCell v2][2] & [BootStrap v4][3]

[![NPM Dependency](https://david-dm.org/EasyWebApp/BootCell.svg)][4]
[![Build Status](https://travis-ci.com/EasyWebApp/BootCell.svg?branch=master)][5]

[![NPM](https://nodei.co/npm/boot-cell.png?downloads=true&downloadRank=true&stars=true)][6]

## Usage

```shell
npm install boot-cell web-cell \
    classnames iterable-observer \
    marked turndown turndown-plugin-gfm markdown-ime
```

`index.html`

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.0/dist/dialog-polyfill.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/github-markdown-css@3.0.1/github-markdown.min.css"
/>
<script src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=Object.fromEntries%2CArray.prototype.flat%2CIntersectionObserver%2CIntersectionObserverEntry"></script>
<script src="https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.0/dist/dialog-polyfill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.1/custom-elements-es5-adapter.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.1/webcomponents-bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/web-animations-js@2.3.2/web-animations-next.min.js"></script>
```

## Components

### Content

1. [ListGroup](https://web-cell.dev/BootCell/interfaces/listgroupprops.html)
2. [Table](https://web-cell.dev/BootCell/interfaces/tableprops.html)
3. [InputCell](https://web-cell.dev/BootCell/globals.html#inputcellprops)
4. [Jumbotron](https://web-cell.dev/BootCell/interfaces/jumbotronprops.html)
5. [Card](https://web-cell.dev/BootCell/interfaces/cardprops.html)
6. [MediaItem](https://web-cell.dev/BootCell/interfaces/mediaitemprops.html)
7. [EdgeDetector](https://web-cell.dev/BootCell/classes/edgedetector.html)
8. [SplitView](https://web-cell.dev/BootCell/classes/splitview.html)
9. [AccordionList](https://web-cell.dev/BootCell/interfaces/accordionprops.html)
10. [CollapseBox](https://web-cell.dev/BootCell/interfaces/collapseprops.html)
11. [TabList](https://web-cell.dev/BootCell/interfaces/tablistprops.html)
12. [CarouselView](https://web-cell.dev/BootCell/interfaces/carouselprops.html)

### Reminder

1. [Badge](https://web-cell.dev/BootCell/interfaces/badgeprops.html)
2. [Progress](https://web-cell.dev/BootCell/interfaces/progressprops.html)

### Navigator

1. [BreadCrumb](https://web-cell.dev/BootCell/interfaces/breadcrumbprops.html)
2. [Pagination](https://web-cell.dev/BootCell/interfaces/paginationprops.html)
3. [Nav](https://web-cell.dev/BootCell/interfaces/navprops.html)
4. [NavBar](https://web-cell.dev/BootCell/interfaces/navbarprops.html)

### Prompt

1. [Spinner](https://web-cell.dev/BootCell/interfaces/spinnerprops.html)
2. [SpinnerBox](https://web-cell.dev/BootCell/interfaces/spinnerboxprops.html)
3. [AlertBox](https://web-cell.dev/BootCell/interfaces/alertprops.html)
4. [ModalDialog](https://web-cell.dev/BootCell/interfaces/modaldialogprops.html)

### Form

1. [Button](https://web-cell.dev/BootCell/interfaces/buttonprops.html)
2. [ToggleField](https://web-cell.dev/BootCell/interfaces/togglefieldprops.html)
3. [ToggleGroup](https://web-cell.dev/BootCell/interfaces/togglegroupprops.html)
4. [FormField](https://web-cell.dev/BootCell/interfaces/fieldprops.html)
5. [FileInput](https://web-cell.dev/BootCell/interfaces/fileinputprops.html)
6. [MarkdownEditor](https://web-cell.dev/BootCell/interfaces/markdowneditorprops.html)

### Advanced

1. [CountDown](https://web-cell.dev/BootCell/interfaces/countdownprops.html)

## Constants

1. [Color](https://web-cell.dev/BootCell/enums/color.html)
2. [Theme](https://web-cell.dev/BootCell/enums/theme.html)
3. [Size](https://web-cell.dev/BootCell/enums/size.html)
4. [Status](https://web-cell.dev/BootCell/enums/status.html)
5. [ColorNames](https://web-cell.dev/BootCell/globals.html#colornames)

## Utilities

1. [uniqueID()](https://web-cell.dev/BootCell/globals.html#uniqueid)
2. [parseTextTable()](https://web-cell.dev/BootCell/globals.html#parsetexttable)
3. [parseDOM()](https://web-cell.dev/BootCell/globals.html#parsedom)
4. [insertToCursor()](https://web-cell.dev/BootCell/globals.html#inserttocursor)
5. [SafeTurnDown](https://web-cell.dev/BootCell/classes/safeturndown.html)

## Theme

Replace **BootStrap official CSS** file with these 3th-party libraries's directly:

-   https://bootswatch.com/
-   https://fezvrasta.github.io/bootstrap-material-design/
-   https://daemonite.github.io/material/

[1]: https://www.webcomponents.org/
[2]: https://web-cell.dev/
[3]: https://getbootstrap.com/
[4]: https://david-dm.org/EasyWebApp/BootCell
[5]: https://travis-ci.com/EasyWebApp/BootCell
[6]: https://nodei.co/npm/boot-cell/
