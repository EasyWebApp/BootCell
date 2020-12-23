![WebCell](https://web-cell.dev/WebCell-0.f1ffd28b.png)

# BootCell

[Web Components][1] UI library based on [WebCell v2][2], [BootStrap v4][3], [BootStrap Icon v1][4] & [FontAwesome v5][5]

[![NPM Dependency](https://david-dm.org/EasyWebApp/BootCell.svg)][6]
[![Build Status](https://travis-ci.com/EasyWebApp/BootCell.svg?branch=master)][7]

[![Anti 996 license](https://img.shields.io/badge/license-Anti%20996-blue.svg)][8]
[![jaywcjlove/sb](https://jaywcjlove.github.io/sb/ico/awesome.svg)][9]

[![NPM](https://nodei.co/npm/boot-cell.png?downloads=true&downloadRank=true&stars=true)][10]

## Usage

```shell
npm install boot-cell \
    iterable-observer \
    marked turndown turndown-plugin-gfm markdown-ime \
    @nuintun/qrcode
```

`index.html`

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.4/dist/dialog-polyfill.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bs-stepper@1.7.0/dist/css/bs-stepper.min.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.2.1/font/bootstrap-icons.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.1/css/all.min.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css"
/>
<script
    crossorigin
    src="https://polyfill.app/api/polyfill?features=es.array.flat,es.object.from-entries,regenerator-runtime,intersection-observer,resize-observer"
></script>
<script src="https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.4/dist/dialog-polyfill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/share-api-polyfill@1.0.20/dist/share-min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/custom-elements-es5-adapter.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/webcomponents-bundle.js"></script>
```

## Components

### Content

1. [ListItem](https://web-cell.dev/BootCell/interfaces/listitemprops.html)
2. [ListGroup](https://web-cell.dev/BootCell/interfaces/listgroupprops.html)
3. [Table](https://web-cell.dev/BootCell/interfaces/tableprops.html)
4. [TableRow](https://web-cell.dev/BootCell/interfaces/tablerowprops.html)
5. [InputCell](https://web-cell.dev/BootCell/interfaces/inputcellprops.html)
6. [Jumbotron](https://web-cell.dev/BootCell/interfaces/jumbotronprops.html)
7. [Card](https://web-cell.dev/BootCell/interfaces/cardprops.html)
8. [CardHeader](https://web-cell.dev/BootCell/interfaces/cardheaderprops.html)
9. [CardFooter](https://web-cell.dev/BootCell/interfaces/cardfooterprops.html)
10. [MediaObject](https://web-cell.dev/BootCell/interfaces/mediaobjectprops.html)
11. [EdgeDetector](https://web-cell.dev/BootCell/classes/edgedetector.html)
12. [SplitView](https://web-cell.dev/BootCell/classes/splitview.html)
13. [AccordionPanel](https://web-cell.dev/BootCell/interfaces/accordionpanelprops.html)
14. [Accordion](https://web-cell.dev/BootCell/interfaces/accordionprops.html)
15. [CollapseBox](https://web-cell.dev/BootCell/interfaces/collapseprops.html)
16. [TabPanel](https://web-cell.dev/BootCell/globals.html#tabpanel)
17. [TabView](https://web-cell.dev/BootCell/interfaces/tabviewprops.html)

### Reminder

1. [Badge](https://web-cell.dev/BootCell/interfaces/badgeprops.html)
2. [ProgressBar](https://web-cell.dev/BootCell/interfaces/progressbarprops.html)
3. [Progress](https://web-cell.dev/BootCell/interfaces/progressprops.html)
4. [Icon](https://web-cell.dev/BootCell/interfaces/iconprops.html)
5. [FAIcon](https://web-cell.dev/BootCell/interfaces/faiconprops.html)
6. [BGIcon](https://web-cell.dev/BootCell/interfaces/bgiconprops.html)

### Media

1. [Image](https://web-cell.dev/BootCell/interfaces/imageprops.html)
2. [Embed](https://web-cell.dev/BootCell/interfaces/embedprops.html)
3. [CarouselCaption](https://web-cell.dev/BootCell/interfaces/carouselcaptionprops.html)
4. [CarouselItem](https://web-cell.dev/BootCell/interfaces/carouselitemprops.html)
5. [CarouselView](https://web-cell.dev/BootCell/interfaces/carouselprops.html)

### Navigator

1. [BreadCrumb](https://web-cell.dev/BootCell/interfaces/breadcrumbprops.html)
2. [Pagination](https://web-cell.dev/BootCell/interfaces/paginationprops.html)
3. [NavLink](https://web-cell.dev/BootCell/interfaces/navlinkprops.html)
4. [Nav](https://web-cell.dev/BootCell/interfaces/navprops.html)
5. [NavBar](https://web-cell.dev/BootCell/interfaces/navbarprops.html)
6. [BannerNavBar](https://web-cell.dev/BootCell/interfaces/bannernavbarprops.html)
7. [NavBarToggler](https://web-cell.dev/BootCell/interfaces/navbartogglerprops.html)
8. [Step](https://web-cell.dev/BootCell/interfaces/stepprops.html)
9. [Stepper](https://web-cell.dev/BootCell/interfaces/stepperprops.html)
10. [DropMenuItem](https://web-cell.dev/BootCell/interfaces/dropmenuitemprops.html)
11. [DropMenu](https://web-cell.dev/BootCell/interfaces/dropmenuprops.html)
12. [ShareBar](https://web-cell.dev/BootCell/interfaces/sharebarprops.html)

### Prompt

1. [Spinner](https://web-cell.dev/BootCell/interfaces/spinnerprops.html)
2. [SpinnerBox](https://web-cell.dev/BootCell/interfaces/spinnerboxprops.html)
3. [TooltipBox](https://web-cell.dev/BootCell/interfaces/tooltipprops.html)
4. [PopoverBox](https://web-cell.dev/BootCell/interfaces/popoverprops.html)
5. [AlertBox](https://web-cell.dev/BootCell/interfaces/alertprops.html)
6. [ToastBox](https://web-cell.dev/BootCell/interfaces/toastprops.html)
7. [Modal](https://web-cell.dev/BootCell/interfaces/modalprops.html)
8. [`openDialog()`](https://web-cell.dev/BootCell/globals.html#opendialog)

### Form

1. [Form](https://web-cell.dev/BootCell/interfaces/formprops.html)
2. [Button](https://web-cell.dev/BootCell/interfaces/buttonprops.html)
3. [ButtonGroup](https://web-cell.dev/BootCell/interfaces/buttongroupprops.html)
4. [Toolbar](https://web-cell.dev/BootCell/globals.html#toolbar)
5. [IconButton](https://web-cell.dev/BootCell/globals.html#iconbuttonprops)
6. [CloseButton](https://web-cell.dev/BootCell/globals.html#closebutton)
7. [ToggleField](https://web-cell.dev/BootCell/interfaces/togglefieldprops.html)
8. [ToggleGroup](https://web-cell.dev/BootCell/interfaces/togglegroupprops.html)
9. [ScoreRange](https://web-cell.dev/BootCell/interfaces/scorerangeprops.html)
10. [Field](https://web-cell.dev/BootCell/interfaces/fieldprops.html)
11. [FormField](https://web-cell.dev/BootCell/interfaces/formfieldprops.html)
12. [GroupLabel](https://web-cell.dev/BootCell/interfaces/grouplabelprops.html)
13. [InputGroup](https://web-cell.dev/BootCell/interfaces/inputgroupprops.html)
14. [FileInput](https://web-cell.dev/BootCell/interfaces/fileinputprops.html)
15. [MarkdownEditor](https://web-cell.dev/BootCell/interfaces/markdowneditorprops.html)

### Calendar

1. [CountDown](https://web-cell.dev/BootCell/interfaces/countdownprops.html)
2. [CalendarTable](https://web-cell.dev/BootCell/interfaces/calendartableprops.html)
3. [WeekCalendar](https://web-cell.dev/BootCell/interfaces/weekcalendarprops.html)
4. [MonthCalendar](https://web-cell.dev/BootCell/interfaces/monthcalendarprops.html)

## Constants

1. [Color](https://web-cell.dev/BootCell/enums/color.html)
2. [Theme](https://web-cell.dev/BootCell/enums/theme.html)
3. [Status](https://web-cell.dev/BootCell/enums/status.html)
4. [CommonColors](https://web-cell.dev/BootCell/globals.html#commoncolors)
5. [TextColors](https://web-cell.dev/BootCell/globals.html#textcolors)
6. [BackgroundColors](https://web-cell.dev/BootCell/globals.html#backgroundcolors)
7. [Size](https://web-cell.dev/BootCell/enums/size.html)
8. [Position](https://web-cell.dev/BootCell/enums/position.html)
9. [JustifyType](https://web-cell.dev/BootCell/enums/justifytype.html)

## Utilities

1. [SafeTurnDown](https://web-cell.dev/BootCell/classes/safeturndown.html)
2. [encodeQRC](https://web-cell.dev/BootCell/globals.html#encodeqrc)

## Theme

Replace **BootStrap official CSS** file with these 3th-party libraries's directly:

-   https://bootswatch.com/
-   https://mdbootstrap.github.io/bootstrap-material-design/
-   https://daemonite.github.io/material/

[1]: https://www.webcomponents.org/
[2]: https://web-cell.dev/
[3]: https://getbootstrap.com/
[4]: https://icons.getbootstrap.com/
[5]: https://fontawesome.com/
[6]: https://david-dm.org/EasyWebApp/BootCell
[7]: https://travis-ci.com/EasyWebApp/BootCell
[8]: https://github.com/996icu/996.ICU/blob/master/LICENSE
[9]: https://github.com/jaywcjlove/awesome-uikit
[10]: https://nodei.co/npm/boot-cell/
