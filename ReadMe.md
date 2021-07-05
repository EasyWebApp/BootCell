![WebCell](https://web-cell.dev/WebCell-0.f1ffd28b.png)

# BootCell

[Web Components][1] UI library based on [WebCell v2][2], [BootStrap v4][3], [BootStrap Icon v1][4] & [FontAwesome v5][5]

[![NPM Dependency](https://david-dm.org/EasyWebApp/BootCell.svg)][6]
[![CI & CD](https://github.com/EasyWebApp/BootCell/workflows/CI%20&%20CD/badge.svg)][7]

[![Anti 996 license](https://img.shields.io/badge/license-Anti%20996-blue.svg)][8]
[![jaywcjlove/sb](https://jaywcjlove.github.io/sb/ico/awesome.svg)][9]

[![NPM](https://nodei.co/npm/boot-cell.png?downloads=true&downloadRank=true&stars=true)][10]

## Usage

```shell
npm install boot-cell \
    iterable-observer \
    marked turndown turndown-plugin-gfm markdown-ime \
    quill quill-image-uploader \
    @nuintun/qrcode
```

`index.html`

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.6/dist/dialog-polyfill.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
/>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/all.min.css"
/>
<script
    crossorigin
    src="https://polyfill.app/api/polyfill?features=es.array.flat,es.object.from-entries,regenerator-runtime,intersection-observer,resize-observer"
></script>
<script src="https://cdn.jsdelivr.net/npm/dialog-polyfill@0.5.6/dist/dialog-polyfill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/share-api-polyfill@1.0.21/dist/share-min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/custom-elements-es5-adapter.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/webcomponents-bundle.js"></script>
```

## Components

### Content

1. [ListItem](https://web-cell.dev/BootCell/interfaces/content_listgroup.listitemprops.html)
2. [ListGroup](https://web-cell.dev/BootCell/interfaces/content_listgroup.listgroupprops.html)
3. [Table](https://web-cell.dev/BootCell/interfaces/content_table.tableprops.html)
4. [TableRow](https://web-cell.dev/BootCell/interfaces/content_table.tablerowprops.html)
5. [InputCell](https://web-cell.dev/BootCell/interfaces/content_table.inputcellprops.html)
6. [Jumbotron](https://web-cell.dev/BootCell/interfaces/content_jumbotron.jumbotronprops.html)
7. [Card](https://web-cell.dev/BootCell/interfaces/content_card.cardprops.html)
8. [CardHeader](https://web-cell.dev/BootCell/interfaces/content_card.cardheaderprops.html)
9. [CardFooter](https://web-cell.dev/BootCell/interfaces/content_card.cardfooterprops.html)
10. [MediaObject](https://web-cell.dev/BootCell/interfaces/content_mediaobject.mediaobjectprops.html)
11. [EdgeDetector](https://web-cell.dev/BootCell/interfaces/content_edgedetector.edgedetectorprops.html)
12. [SplitView](https://web-cell.dev/BootCell/classes/content_splitview.splitview.html)
13. [AccordionPanel](https://web-cell.dev/BootCell/interfaces/content_accordion.accordionpanelprops.html)
14. [Accordion](https://web-cell.dev/BootCell/interfaces/content_accordion.accordionprops.html)
15. [CollapseBox](https://web-cell.dev/BootCell/interfaces/content_collapse.collapseprops.html)
16. [TabPanel](https://web-cell.dev/BootCell/modules/content_tabview.html#tabpanel)
17. [TabView](https://web-cell.dev/BootCell/interfaces/content_tabview.tabviewprops.html)

### Reminder

1. [Badge](https://web-cell.dev/BootCell/interfaces/reminder_badge.badgeprops.html)
2. [ProgressBar](https://web-cell.dev/BootCell/interfaces/reminder_progress.progressbarprops.html)
3. [Progress](https://web-cell.dev/BootCell/interfaces/reminder_progress.progressprops.html)
4. [Icon](https://web-cell.dev/BootCell/interfaces/reminder_icon.iconprops.html)
5. [FAIcon](https://web-cell.dev/BootCell/interfaces/reminder_faicon.faiconprops.html)
6. [BGIcon](https://web-cell.dev/BootCell/interfaces/reminder_faicon.bgiconprops.html)

### Media

1. [Image](https://web-cell.dev/BootCell/interfaces/media_image.imageprops.html)
2. [Embed](https://web-cell.dev/BootCell/interfaces/media_embed.embedprops.html)
3. [CarouselCaption](https://web-cell.dev/BootCell/interfaces/media_carousel.carouselcaptionprops.html)
4. [CarouselItem](https://web-cell.dev/BootCell/interfaces/media_carousel.carouselitemprops.html)
5. [CarouselView](https://web-cell.dev/BootCell/interfaces/media_carousel.carouselprops.html)

### Navigator

1. [BreadCrumb](https://web-cell.dev/BootCell/interfaces/navigator_breadcrumb.breadcrumbprops.html)
2. [Pagination](https://web-cell.dev/BootCell/interfaces/navigator_pagination.paginationprops.html)
3. [NavLink](https://web-cell.dev/BootCell/interfaces/navigator_nav.navlinkprops.html)
4. [Nav](https://web-cell.dev/BootCell/interfaces/navigator_nav.navprops.html)
5. [NavBar](https://web-cell.dev/BootCell/interfaces/navigator_navbar.navbarprops.html)
6. [BannerNavBar](https://web-cell.dev/BootCell/interfaces/navigator_navbar.bannernavbarprops.html)
7. [NavBarToggler](https://web-cell.dev/BootCell/interfaces/navigator_navbar.navbartogglerprops.html)
8. [Step](https://web-cell.dev/BootCell/interfaces/navigator_stepper.stepprops.html)
9. [Stepper](https://web-cell.dev/BootCell/interfaces/navigator_stepper.stepperprops.html)
10. [DropMenuItem](https://web-cell.dev/BootCell/interfaces/navigator_dropmenu.dropmenuitemprops.html)
11. [DropMenu](https://web-cell.dev/BootCell/interfaces/navigator_dropmenu.dropmenuprops.html)
12. [ShareBar](https://web-cell.dev/BootCell/interfaces/navigator_sharebar.sharebarprops.html)

### Prompt

1. [Spinner](https://web-cell.dev/BootCell/interfaces/prompt_spinner.spinnerprops.html)
2. [SpinnerBox](https://web-cell.dev/BootCell/interfaces/prompt_spinner.spinnerboxprops.html)
3. [TooltipBox](https://web-cell.dev/BootCell/interfaces/prompt_tooltip.tooltipprops.html)
4. [PopoverBox](https://web-cell.dev/BootCell/interfaces/prompt_popover.popoverprops.html)
5. [AlertBox](https://web-cell.dev/BootCell/interfaces/prompt_alert.alertprops.html)
6. [ToastBox](https://web-cell.dev/BootCell/interfaces/prompt_toast.toastprops.html)
7. [Modal](https://web-cell.dev/BootCell/interfaces/prompt_dialog.modalprops.html)
8. [`openDialog()`](https://web-cell.dev/BootCell/modules/prompt_dialog.html#opendialog)

### Form

1. [Form](https://web-cell.dev/BootCell/interfaces/form_form.formprops.html)
2. [Button](https://web-cell.dev/BootCell/interfaces/form_button.buttonprops.html)
3. [ButtonGroup](https://web-cell.dev/BootCell/interfaces/form_buttongroup.buttongroupprops.html)
4. [Toolbar](https://web-cell.dev/BootCell/modules/form_buttongroup.html#toolbar)
5. [IconButton](https://web-cell.dev/BootCell/modules/form_button.html#iconbuttonprops)
6. [CloseButton](https://web-cell.dev/BootCell/modules/form_button.html#closebutton)
7. [ToggleField](https://web-cell.dev/BootCell/interfaces/form_togglefield.togglefieldprops.html)
8. [ToggleGroup](https://web-cell.dev/BootCell/interfaces/form_togglefield.togglegroupprops.html)
9. [ScoreRange](https://web-cell.dev/BootCell/interfaces/form_scorerange.scorerangeprops.html)
10. [Field](https://web-cell.dev/BootCell/interfaces/form_field.fieldprops.html)
11. [FormField](https://web-cell.dev/BootCell/interfaces/form_formfield.formfieldprops.html)
12. [GroupLabel](https://web-cell.dev/BootCell/interfaces/form_inputgroup.grouplabelprops.html)
13. [InputGroup](https://web-cell.dev/BootCell/interfaces/form_inputgroup.inputgroupprops.html)
14. [FileUploader](https://web-cell.dev/BootCell/interfaces/form_fileuploader.fileuploaderprops.html)
15. [FileInput](https://web-cell.dev/BootCell/interfaces/form_fileinput.fileinputprops.html)
16. [MarkdownEditor](https://web-cell.dev/BootCell/interfaces/form_markdowneditor.markdowneditorprops.html)
17. [HTMLEditor](https://web-cell.dev/BootCell/interfaces/form_htmleditor.htmleditorprops.html)

### Calendar

1. [CountDown](https://web-cell.dev/BootCell/interfaces/calendar_countdown.countdownprops.html)
2. [CalendarTable](https://web-cell.dev/BootCell/interfaces/calendar_calendartable.calendartableprops.html)
3. [WeekCalendar](https://web-cell.dev/BootCell/interfaces/calendar_weekcalendar.weekcalendarprops.html)
4. [MonthCalendar](https://web-cell.dev/BootCell/interfaces/calendar_monthcalendar.monthcalendarprops.html)

## Constants

1. [Color](https://web-cell.dev/BootCell/enums/utility_constant.color.html)
2. [Theme](https://web-cell.dev/BootCell/enums/utility_constant.theme.html)
3. [Status](https://web-cell.dev/BootCell/enums/utility_constant.status.html)
4. [CommonColors](https://web-cell.dev/BootCell/modules/utility_constant.html#commoncolors)
5. [TextColors](https://web-cell.dev/BootCell/modules/utility_constant.html#textcolors)
6. [BackgroundColors](https://web-cell.dev/BootCell/modules/utility_constant.html#backgroundcolors)
7. [Size](https://web-cell.dev/BootCell/enums/utility_constant.size.html)
8. [Position](https://web-cell.dev/BootCell/enums/utility_constant.position.html)
9. [JustifyType](https://web-cell.dev/BootCell/enums/utility_constant.justifytype.html)

## Utilities

1. [SafeTurnDown](https://web-cell.dev/BootCell/classes/utility_turndown.safeturndown.html)
2. [encodeQRC](https://web-cell.dev/BootCell/modules/utility_qrcode.html#encodeqrc)

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
[7]: https://github.com/EasyWebApp/BootCell/actions
[8]: https://github.com/996icu/996.ICU/blob/master/LICENSE
[9]: https://github.com/jaywcjlove/awesome-uikit
[10]: https://nodei.co/npm/boot-cell/
