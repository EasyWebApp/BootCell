![WebCell](https://web-cell.dev/WebCell-0.f1ffd28b.png)

# BootCell

[Web Components][1] UI library based on [WebCell v2][2], [BootStrap v4][3] & [FontAwesome v5][4]

[![NPM Dependency](https://david-dm.org/EasyWebApp/BootCell.svg)][5]
[![Build Status](https://travis-ci.com/EasyWebApp/BootCell.svg?branch=master)][6]

[![NPM](https://nodei.co/npm/boot-cell.png?downloads=true&downloadRank=true&stars=true)][7]

## Usage

```shell
npm install boot-cell \
    snabbdom-looks-like iterable-observer \
    marked turndown turndown-plugin-gfm markdown-ime \
    @nuintun/qrcode
```

`index.html`

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.1/dist/dialog-polyfill.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.0/css/all.min.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css"
/>
<script src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=Object.fromEntries%2CArray.prototype.flat%2CIntersectionObserver%2CIntersectionObserverEntry%2CResizeObserver"></script>
<script src="https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.1/dist/dialog-polyfill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/share-api-polyfill@1.0.13/dist/share-min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.3/custom-elements-es5-adapter.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.3/webcomponents-bundle.js"></script>
```

## Components

### Content

1. [ListGroup](https://web-cell.dev/BootCell/interfaces/listgroupprops.html)
2. [Table](https://web-cell.dev/BootCell/interfaces/tableprops.html)
3. [InputCell](https://web-cell.dev/BootCell/interfaces/inputcellprops.html)
4. [Jumbotron](https://web-cell.dev/BootCell/interfaces/jumbotronprops.html)
5. [Card](https://web-cell.dev/BootCell/interfaces/cardprops.html)
6. [MediaObject](https://web-cell.dev/BootCell/interfaces/mediaobjectprops.html)
7. [EdgeDetector](https://web-cell.dev/BootCell/classes/edgedetector.html)
8. [Image](https://web-cell.dev/BootCell/interfaces/imageprops.html)
9. [Figure](https://web-cell.dev/BootCell/globals.html#figure)
10. [Embed](https://web-cell.dev/BootCell/interfaces/embedprops.html)
11. [SplitView](https://web-cell.dev/BootCell/classes/splitview.html)
12. [AccordionList](https://web-cell.dev/BootCell/interfaces/accordionprops.html)
13. [CollapseBox](https://web-cell.dev/BootCell/interfaces/collapseprops.html)
14. [TabList](https://web-cell.dev/BootCell/interfaces/tablistprops.html)
15. [CarouselView](https://web-cell.dev/BootCell/interfaces/carouselprops.html)

### Reminder

1. [Badge](https://web-cell.dev/BootCell/interfaces/badgeprops.html)
2. [Progress](https://web-cell.dev/BootCell/interfaces/progressprops.html)
3. [Icon](https://web-cell.dev/BootCell/interfaces/iconprops.html)
4. [BGIcon](https://web-cell.dev/BootCell/interfaces/bgiconprops.html)

### Navigator

1. [BreadCrumb](https://web-cell.dev/BootCell/interfaces/breadcrumbprops.html)
2. [Pagination](https://web-cell.dev/BootCell/interfaces/paginationprops.html)
3. [Nav](https://web-cell.dev/BootCell/interfaces/navprops.html)
4. [NavBar](https://web-cell.dev/BootCell/interfaces/navbarprops.html)
5. [DropMenu](https://web-cell.dev/BootCell/interfaces/dropmenuprops.html)
6. [HeaderList](https://web-cell.dev/BootCell/interfaces/headerlistprops.html)

### Prompt

1. [Spinner](https://web-cell.dev/BootCell/interfaces/spinnerprops.html)
2. [SpinnerBox](https://web-cell.dev/BootCell/interfaces/spinnerboxprops.html)
3. [TooltipBox](https://web-cell.dev/BootCell/interfaces/tooltipprops.html)
4. [PopoverBox](https://web-cell.dev/BootCell/interfaces/popoverprops.html)
5. [AlertBox](https://web-cell.dev/BootCell/interfaces/alertprops.html)
6. [ToastBox](https://web-cell.dev/BootCell/interfaces/toastprops.html)
7. [`openDialog()`](https://web-cell.dev/BootCell/globals.html#opendialog)
8. [`openModal()`](https://web-cell.dev/BootCell/globals.html#openmodal)

### Form

1. [Form](https://web-cell.dev/BootCell/interfaces/formprops.html)
2. [Button](https://web-cell.dev/BootCell/interfaces/buttonprops.html)
3. [ButtonGroup](https://web-cell.dev/BootCell/interfaces/buttongroupprops.html)
4. [Toolbar](https://web-cell.dev/BootCell/globals.html#toolbar)
5. [IconButton](https://web-cell.dev/BootCell/globals.html#iconbuttonprops)
6. [CloseButton](https://web-cell.dev/BootCell/globals.html#closebutton)
7. [ToggleField](https://web-cell.dev/BootCell/interfaces/togglefieldprops.html)
8. [ToggleGroup](https://web-cell.dev/BootCell/interfaces/togglegroupprops.html)
9. [Field](https://web-cell.dev/BootCell/interfaces/fieldprops.html)
10. [FormField](https://web-cell.dev/BootCell/interfaces/formfieldprops.html)
11. [GroupLabel](https://web-cell.dev/BootCell/interfaces/grouplabelprops.html)
12. [InputGroup](https://web-cell.dev/BootCell/interfaces/inputgroupprops.html)
13. [FileInput](https://web-cell.dev/BootCell/interfaces/fileinputprops.html)
14. [MarkdownEditor](https://web-cell.dev/BootCell/interfaces/markdowneditorprops.html)

### Extra

1. [CountDown](https://web-cell.dev/BootCell/interfaces/countdownprops.html)
2. [CalendarView](https://web-cell.dev/BootCell/interfaces/calendarprops.html)
3. [ShareBar](https://web-cell.dev/BootCell/interfaces/sharebarprops.html)

## Constants

1. [Color](https://web-cell.dev/BootCell/enums/color.html)
2. [Theme](https://web-cell.dev/BootCell/enums/theme.html)
3. [Status](https://web-cell.dev/BootCell/enums/status.html)
4. [ColorNames](https://web-cell.dev/BootCell/globals.html#colornames)
5. [BackgroundColors](https://web-cell.dev/BootCell/globals.html#backgroundcolors)
6. [Size](https://web-cell.dev/BootCell/enums/size.html)
7. [Position](https://web-cell.dev/BootCell/enums/position.html)
8. [JustifyType](https://web-cell.dev/BootCell/enums/justifytype.html)

## Utilities

1. [SafeTurnDown](https://web-cell.dev/BootCell/classes/safeturndown.html)
2. [encodeQRC](https://web-cell.dev/BootCell/globals.html#encodeqrc)

## Theme

Replace **BootStrap official CSS** file with these 3th-party libraries's directly:

-   https://bootswatch.com/
-   https://fezvrasta.github.io/bootstrap-material-design/
-   https://daemonite.github.io/material/

[1]: https://www.webcomponents.org/
[2]: https://web-cell.dev/
[3]: https://getbootstrap.com/
[4]: https://fontawesome.com/
[5]: https://david-dm.org/EasyWebApp/BootCell
[6]: https://travis-ci.com/EasyWebApp/BootCell
[7]: https://nodei.co/npm/boot-cell/
