![WebCell](https://web-cell.dev/WebCell-0.a6336415.png)

# BootCell

[Web Components][1] UI library based on [WebCell v3][2], [BootStrap v6][3], [BootStrap Icon v1][4] & [FontAwesome v7][5]

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
    href="https://unpkg.com/@fortawesome/fontawesome-free@7.3.1/css/all.min.css"
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
8. [Drawer](https://web-cell.dev/BootCell/classes/Drawer.html)
9. [DrawerBox](https://web-cell.dev/BootCell/variables/DrawerBox.html)

### Content

1. [ListGroup](https://web-cell.dev/BootCell/variables/ListGroup.html)
2. [Table](https://web-cell.dev/BootCell/variables/Table.html)
3. [Jumbotron](https://web-cell.dev/BootCell/variables/Jumbotron.html)
4. [Card](https://web-cell.dev/BootCell/variables/Card.html)
5. [MediaObject](https://web-cell.dev/BootCell/variables/MediaObject.html)
6. [SplitView](https://web-cell.dev/BootCell/classes/SplitView.html)
7. [Accordion](https://web-cell.dev/BootCell/classes/Accordion.html)
8. [Tabs](https://web-cell.dev/BootCell/classes/Tabs.html)
9. [CodeBlock](https://web-cell.dev/BootCell/classes/CodeBlock.html)

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

### Navigator

1. [BreadCrumb](https://web-cell.dev/BootCell/variables/BreadCrumb.html)
2. [Pagination](https://web-cell.dev/BootCell/variables/Pagination.html)
3. [Pager](https://web-cell.dev/BootCell/variables/Pager.html)
4. [Nav](https://web-cell.dev/BootCell/classes/Nav.html)
5. [Navbar](https://web-cell.dev/BootCell/variables/Navbar.html)
6. [DrawerNavbar](https://web-cell.dev/BootCell/classes/DrawerNavbar.html)
7. [Stepper](https://web-cell.dev/BootCell/functions/Stepper.html)
8. [Dropdown](https://web-cell.dev/BootCell/variables/Dropdown.html)
9. [DropdownButton](https://web-cell.dev/BootCell/classes/DropdownButton.html)

### Prompt

1. [Spinner](https://web-cell.dev/BootCell/variables/Spinner.html)
2. [SpinnerBox](https://web-cell.dev/BootCell/variables/SpinnerBox.html)
3. [Tooltip](https://web-cell.dev/BootCell/variables/Tooltip.html)
4. [TooltipBox](https://web-cell.dev/BootCell/classes/TooltipBox.html)
5. [Alert](https://web-cell.dev/BootCell/variables/Alert.html)
6. [Dialog](https://web-cell.dev/BootCell/classes/Dialog.html)
7. [Modal](https://web-cell.dev/BootCell/classes/Modal.html)

### Form

1. [FormGroup](https://web-cell.dev/BootCell/variables/FormGroup.html)
2. [FloatingLabel](https://web-cell.dev/BootCell/variables/FloatingLabel.html)
3. [FormControl](https://web-cell.dev/BootCell/functions/FormControl.html)
4. [FormField](https://web-cell.dev/BootCell/functions/FormField.html)
5. [FormCheck](https://web-cell.dev/BootCell/variables/FormCheck.html)
6. [Button](https://web-cell.dev/BootCell/variables/Button.html)
7. [ButtonGroup](https://web-cell.dev/BootCell/variables/ButtonGroup.html)
8. [ButtonToolbar](https://web-cell.dev/BootCell/variables/ButtonToolbar.html)
9. [IconButton](https://web-cell.dev/BootCell/variables/IconButton.html)
10. [CloseButton](https://web-cell.dev/BootCell/variables/CloseButton.html)
11. [ToggleButton](https://web-cell.dev/BootCell/variables/ToggleButton.html)
12. [RangeInput](https://web-cell.dev/BootCell/classes/RangeInput.html)
13. [InputGroup](https://web-cell.dev/BootCell/variables/InputGroup.html)
14. [FilePicker](https://web-cell.dev/BootCell/classes/FilePicker.html)
15. [FileUploader](https://web-cell.dev/BootCell/classes/FileUploader.html)
16. [FileModel](https://web-cell.dev/BootCell/classes/FileModel.html)

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
