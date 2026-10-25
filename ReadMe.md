![WebCell](https://web-cell.dev/WebCell-0.a6336415.png)

# BootCell

[Web Components][1] UI library based on [WebCell v3][2], [BootStrap v6][3], [BootStrap Icon v1][4] & [FontAwesome v6][5]

[![NPM Dependency](https://img.shields.io/librariesio/github/EasyWebApp/BootCell.svg)][6]
[![CI & CD](https://github.com/EasyWebApp/BootCell/actions/workflows/main.yml/badge.svg)][7]

[![Anti 996 license](https://img.shields.io/badge/license-Anti%20996-blue.svg)][8]
[![jaywcjlove/sb](https://jaywcjlove.github.io/sb/ico/awesome.svg)][9]

[![NPM](https://nodei.co/npm/boot-cell.png?downloads=true&downloadRank=true&stars=true)][10]

## Usage

### Installation

```shell
npm install dom-renderer web-cell boot-cell
npm install parcel @parcel/config-default @parcel/transformer-typescript-tsc -D
```

#### `package.json`

```json
{
    "scripts": {
        "start": "parcel source/index.html --open",
        "build": "parcel build source/index.html --public-url ."
    }
}
```

#### `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "ES2020",
        "moduleResolution": "Node",
        "useDefineForClassFields": true,
        "jsx": "react-jsx",
        "jsxImportSource": "dom-renderer"
    }
}
```

#### `.parcelrc`

```json
{
    "extends": "@parcel/config-default",
    "transformers": {
        "*.{ts,tsx}": ["@parcel/transformer-typescript-tsc"]
    }
}
```

### `source/index.html`

```html
<link
    rel="stylesheet"
    href="https://unpkg.com/bootstrap@6.0.0-alpha.1/dist/css/bootstrap.min.css"
/>
<link
    rel="stylesheet"
    href="https://unpkg.com/bootstrap-icons@1.13.1/font/bootstrap-icons.css"
/>
<link
    rel="stylesheet"
    href="https://unpkg.com/@fortawesome/fontawesome-free@6.5.1/css/all.min.css"
/>
<script src="https://polyfill.web-cell.dev/feature/ECMAScript.js"></script>
<script src="https://polyfill.web-cell.dev/feature/WebComponents.js"></script>
<script src="https://polyfill.web-cell.dev/feature/ElementInternals.js"></script>
<script src="https://polyfill.web-cell.dev/feature/Dialog.js"></script>
<script src="https://polyfill.web-cell.dev/feature/Share.js"></script>
```

## Components

See the [migration guide](./Migration.md) when upgrading an existing project.

### Styles & Layout

1. [BootstrapStyles](https://web-cell.dev/BootCell/variables/BootstrapStyles.html)
2. [Container](https://web-cell.dev/BootCell/variables/Container.html)
3. [Row](https://web-cell.dev/BootCell/variables/Row.html)
4. [Col](https://web-cell.dev/BootCell/variables/Col.html)
5. [Ratio](https://web-cell.dev/BootCell/variables/Ratio.html)
6. [ScrollBoundary](https://web-cell.dev/BootCell/variables/ScrollBoundary.html)
7. [Collapse](https://web-cell.dev/BootCell/variables/Collapse.html)
8. [Drawer](https://web-cell.dev/BootCell/variables/Drawer.html)
9. [DrawerBox](https://web-cell.dev/BootCell/variables/DrawerBox.html)
10. [DrawerHeader](https://web-cell.dev/BootCell/variables/DrawerHeader.html)
11. [DrawerTitle](https://web-cell.dev/BootCell/variables/DrawerTitle.html)
12. [DrawerBody](https://web-cell.dev/BootCell/variables/DrawerBody.html)

### Content

1. [ListGroup](https://web-cell.dev/BootCell/variables/ListGroup.html)
2. [ListGroupItem](https://web-cell.dev/BootCell/variables/ListGroupItem.html)
3. [Table](https://web-cell.dev/BootCell/variables/Table.html)
4. [Jumbotron](https://web-cell.dev/BootCell/variables/Jumbotron.html)
5. [Card](https://web-cell.dev/BootCell/variables/Card.html)
6. [CardHeader](https://web-cell.dev/BootCell/variables/CardHeader.html)
7. [CardBody](https://web-cell.dev/BootCell/variables/CardBody.html)
8. [CardFooter](https://web-cell.dev/BootCell/variables/CardFooter.html)
9. [CardTitle](https://web-cell.dev/BootCell/variables/CardTitle.html)
10. [CardImg](https://web-cell.dev/BootCell/variables/CardImg.html)
11. [MediaObject](https://web-cell.dev/BootCell/variables/MediaObject.html)
12. [SplitView](https://web-cell.dev/BootCell/classes/SplitView.html)
13. [Accordion](https://web-cell.dev/BootCell/classes/Accordion.html)
14. [AccordionItem](https://web-cell.dev/BootCell/variables/AccordionItem.html)
15. [AccordionHeader](https://web-cell.dev/BootCell/variables/AccordionHeader.html)
16. [AccordionBody](https://web-cell.dev/BootCell/variables/AccordionBody.html)
17. [Tabs](https://web-cell.dev/BootCell/classes/Tabs.html)
18. [Tab](https://web-cell.dev/BootCell/classes/Tab.html)
19. [CodeBlock](https://web-cell.dev/BootCell/classes/CodeBlock.html)

### Reminder

1. [Badge](https://web-cell.dev/BootCell/variables/Badge.html)
2. [ProgressBar](https://web-cell.dev/BootCell/variables/ProgressBar.html)
3. [Icon](https://web-cell.dev/BootCell/variables/Icon.html)
4. [BGIcon](https://web-cell.dev/BootCell/variables/BGIcon.html)
5. [FAIcon](https://web-cell.dev/BootCell/variables/FAIcon.html)
6. [FABGIcon](https://web-cell.dev/BootCell/variables/FABGIcon.html)

### Media

1. [Image](https://web-cell.dev/BootCell/variables/Image.html)
2. [ImagePreview](https://web-cell.dev/BootCell/classes/ImagePreview.html)
3. [FilePreview](https://web-cell.dev/BootCell/variables/FilePreview.html)
4. [FileTypeMap](https://web-cell.dev/BootCell/variables/FileTypeMap.html)
5. [Carousel](https://web-cell.dev/BootCell/classes/Carousel.html)
6. [CarouselCaption](https://web-cell.dev/BootCell/variables/CarouselCaption.html)
7. [CarouselItem](https://web-cell.dev/BootCell/variables/CarouselItem.html)

### Navigator

1. [BreadCrumb](https://web-cell.dev/BootCell/variables/BreadCrumb.html)
2. [BreadcrumbItem](https://web-cell.dev/BootCell/variables/BreadcrumbItem.html)
3. [Pagination](https://web-cell.dev/BootCell/variables/Pagination.html)
4. [PaginationItem](https://web-cell.dev/BootCell/variables/PaginationItem.html)
5. [Pager](https://web-cell.dev/BootCell/variables/Pager.html)
6. [NavLink](https://web-cell.dev/BootCell/variables/NavLink.html)
7. [Nav](https://web-cell.dev/BootCell/classes/Nav.html)
8. [NavDropdown](https://web-cell.dev/BootCell/variables/NavDropdown.html)
9. [Navbar](https://web-cell.dev/BootCell/variables/Navbar.html)
10. [NavbarBrand](https://web-cell.dev/BootCell/variables/NavbarBrand.html)
11. [NavbarToggle](https://web-cell.dev/BootCell/variables/NavbarToggle.html)
12. [DrawerNavbar](https://web-cell.dev/BootCell/classes/DrawerNavbar.html)
13. [Step](https://web-cell.dev/BootCell/functions/Step.html)
14. [Stepper](https://web-cell.dev/BootCell/functions/Stepper.html)
15. [Dropdown](https://web-cell.dev/BootCell/variables/Dropdown.html)
16. [DropdownItem](https://web-cell.dev/BootCell/variables/DropdownItem.html)
17. [DropdownMenu](https://web-cell.dev/BootCell/variables/DropdownMenu.html)
18. [DropdownToggle](https://web-cell.dev/BootCell/variables/DropdownToggle.html)
19. [DropdownButton](https://web-cell.dev/BootCell/classes/DropdownButton.html)

### Prompt

1. [Spinner](https://web-cell.dev/BootCell/variables/Spinner.html)
2. [SpinnerBox](https://web-cell.dev/BootCell/variables/SpinnerBox.html)
3. [Tooltip](https://web-cell.dev/BootCell/variables/Tooltip.html)
4. [TooltipBox](https://web-cell.dev/BootCell/classes/TooltipBox.html)
5. [Alert](https://web-cell.dev/BootCell/variables/Alert.html)
6. [AlertLink](https://web-cell.dev/BootCell/variables/AlertLink.html)
7. [Dialog](https://web-cell.dev/BootCell/classes/Dialog.html)
8. [DialogClose](https://web-cell.dev/BootCell/classes/DialogClose.html)
9. [Modal](https://web-cell.dev/BootCell/variables/Modal.html)
10. [ModalHeader](https://web-cell.dev/BootCell/variables/ModalHeader.html)
11. [ModalTitle](https://web-cell.dev/BootCell/variables/ModalTitle.html)
12. [ModalBody](https://web-cell.dev/BootCell/variables/ModalBody.html)
13. [ModalFooter](https://web-cell.dev/BootCell/variables/ModalFooter.html)

### Form

1. [FormGroup](https://web-cell.dev/BootCell/variables/FormGroup.html)
2. [FormLabel](https://web-cell.dev/BootCell/variables/FormLabel.html)
3. [FloatingLabel](https://web-cell.dev/BootCell/variables/FloatingLabel.html)
4. [FormControl](https://web-cell.dev/BootCell/functions/FormControl.html)
5. [FormField](https://web-cell.dev/BootCell/functions/FormField.html)
6. [FormCheck](https://web-cell.dev/BootCell/variables/FormCheck.html)
7. [Button](https://web-cell.dev/BootCell/variables/Button.html)
8. [ButtonGroup](https://web-cell.dev/BootCell/variables/ButtonGroup.html)
9. [ButtonToolbar](https://web-cell.dev/BootCell/variables/ButtonToolbar.html)
10. [IconButton](https://web-cell.dev/BootCell/variables/IconButton.html)
11. [CloseButton](https://web-cell.dev/BootCell/variables/CloseButton.html)
12. [ToggleButton](https://web-cell.dev/BootCell/variables/ToggleButton.html)
13. [RangeInput](https://web-cell.dev/BootCell/classes/RangeInput.html)
14. [InputGroup](https://web-cell.dev/BootCell/variables/InputGroup.html)
15. [InputGroupText](https://web-cell.dev/BootCell/variables/InputGroupText.html)
16. [FilePicker](https://web-cell.dev/BootCell/classes/FilePicker.html)
17. [FileUploader](https://web-cell.dev/BootCell/classes/FileUploader.html)
18. [FileModel](https://web-cell.dev/BootCell/classes/FileModel.html)

### Calendar

1. [CountDown](https://web-cell.dev/BootCell/classes/CountDown.html)
2. [MonthCalendar](https://web-cell.dev/BootCell/classes/MonthCalendar.html)

## Types & Helpers

1. [Theme](https://web-cell.dev/BootCell/enums/Theme.html)
2. [Status](https://web-cell.dev/BootCell/enums/Status.html)
3. [ThemeColor](https://web-cell.dev/BootCell/types/ThemeColor.html)
4. [BasicColor](https://web-cell.dev/BootCell/types/BasicColor.html)
5. [TextColor](https://web-cell.dev/BootCell/types/TextColor.html)
6. [BackgroundColor](https://web-cell.dev/BootCell/types/BackgroundColor.html)
7. [Size](https://web-cell.dev/BootCell/types/Size.html)
8. [PositionY](https://web-cell.dev/BootCell/types/PositionY.html)
9. [isButton](https://web-cell.dev/BootCell/functions/isButton.html)
10. [isStep](https://web-cell.dev/BootCell/functions/isStep.html)

## Theme

Replace **BootStrap official CSS** file with these 3th-party libraries's directly:

- https://bootswatch.com/
- https://mdbootstrap.com/docs/standard/getting-started/installation/#section-cdn

[1]: https://www.webcomponents.org/
[2]: https://web-cell.dev/
[3]: https://getbootstrap.com/
[4]: https://icons.getbootstrap.com/
[5]: https://fontawesome.com/
[6]: https://libraries.io/npm/boot-cell
[7]: https://github.com/EasyWebApp/BootCell/actions/workflows/main.yml
[8]: https://github.com/996icu/996.ICU/blob/master/LICENSE
[9]: https://github.com/jaywcjlove/awesome-uikit
[10]: https://npm.im/boot-cell/
