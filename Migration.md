# Migrating to BootCell 3

This guide covers BootCell-owned API and rendered-markup changes for downstream
applications and migration agents. It does not duplicate upstream release notes.
Use the [current API reference][1] to check exported
components and prop types; old catalog entries are not compatibility aliases.

## Upstream references

- [Bootstrap 6 migration guide][2]
- [Bootstrap 6 themes][3]
- [WebCell documentation][4]
- [MobX releases][5]
- [Font Awesome upgrade guide][6]
- [Font Awesome v7 changes][7]

## Imports and custom elements

Update both imports and handwritten custom-element markup. No old-name aliases
are provided for the following renames:

| Previous BootCell API                     | Current API                         |
| ----------------------------------------- | ----------------------------------- |
| `Layout/Offcanvas` module                 | `Layout/Drawer`                     |
| `Offcanvas`, `OffcanvasProps`             | `Drawer`, `DrawerProps`             |
| `OffcanvasBox`, `OffcanvasBoxProps`       | `DrawerBox`, `DrawerBoxProps`       |
| `OffcanvasHeader`, `OffcanvasHeaderProps` | `DrawerHeader`, `DrawerHeaderProps` |
| `OffcanvasTitle`, `OffcanvasBody`         | `DrawerTitle`, `DrawerBody`         |
| `OffcanvasNavbar`, `OffcanvasNavbarProps` | `DrawerNavbar`, `DrawerNavbarProps` |
| `<offcanvas-navbar>`                      | `<drawer-navbar>`                   |

Prefer imports from `boot-cell` or its existing public category exports over
references to removed module files. If application code accesses the navbar's
generated drawer ID, rename `offcanvasId` to `drawerId`.

## Button appearance and theme

`Button`, `IconButton`, and `ToggleButton` no longer combine appearance and color
in `variant`. Pass appearance through `variant` and color through `theme`.
`MonthCalendar` exposes the same independent props for its navigation buttons;
its weekday headings use `theme`.

```tsx
// Before
<Button variant="outline-primary">Save</Button>
<Button variant="success">Submit</Button>

// After
<Button variant="outline" theme="primary">Save</Button>
<Button variant="solid" theme="success">Submit</Button>
```

- `variant`: `solid`, `outline`, `subtle`, `text`, or `link`.
- `theme`: `primary`, `secondary`, `accent`, `success`, `info`, `warning`,
  `danger`, or `inverse`.
- `Button` leaves both props unset by default; `ToggleButton` and `MonthCalendar`
  default to `variant="solid"` and `theme="primary"`.
- Existing `variant="link"` remains valid. Values such as `primary` and
  `outline-primary` are no longer valid button variants.

## Color props and types

BootCell's `TextColor`, `BackgroundColor`, and new `ThemeColor` types no longer
accept legacy color aliases. Review each use by intent instead of globally
replacing every occurrence of `dark` or `light`.

| BootCell surface                                                       | Migration                                                                                                                                                                    |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Card` / `Badge` `bg`                                                  | Generates `bg-*`, not `theme-*`; use `BackgroundColor` values.                                                                                                               |
| `Card` / `Badge` `text`, icon `color`, spinner `variant`               | Uses `TextColor` values directly, such as `body`, `white`, `1`, or `contrast-primary`.                                                                                       |
| `Table` / `ListGroupItem` `variant`, `Alert` / `ProgressBar` `variant` | Uses semantic theme names, including `accent` and `inverse`; output uses `theme-*`.                                                                                          |
| `BGIcon`                                                               | Set `bg` and `color` independently. `color` no longer selects the background or computes an opposite foreground. Defaults are `bg="primary"` and `color="contrast-primary"`. |
| `Jumbotron` / `Navbar` `bg`                                            | Defaults to `"1"`; replace explicit old background aliases with native suffixes.                                                                                             |
| `Status`                                                               | `tertiary` is removed; `accent` and `inverse` are available.                                                                                                                 |
| `Theme`, Navbar `variant`                                              | `light` and `dark` remain color modes, not theme-color aliases.                                                                                                              |

For application-owned BootCell props, choose an explicit replacement for old
`dark`, `light`, `muted`, `body-secondary`, or `body-tertiary` values.
For example, use `theme="inverse"` for an inverse button, `color="body"` for body
foreground, or `bg="1"` for a layer background. Subtle backgrounds use values
such as `subtle-primary`, not `primary-subtle`. Check the exported prop types
instead of retaining runtime conversion helpers.

## Font Awesome components

BootCell now requires `@fortawesome/fontawesome-free` v7. Replace the previous
stylesheet with the v7 assets; do not load both versions.

- `FAIcon` defaults to `family="classic"` and `group="solid"`, emitting
  `fa-classic fa-solid` rather than the abbreviated `fas`.
- `group="brands"` emits `fa-brands` without a family class. Set it on brand
  icons, including `<FABGIcon name="github" group="brands" type="square" />`;
  the background shape remains Classic Solid.
- Replace `group="duotone"` with `family="duotone" group="solid"`. `family`
  also accepts `sharp` and `sharp-duotone`; `group` supports `thin`.
  These non-Free families/styles require separately supplied Pro assets:
  BootCell does not bundle them or provide a fallback.
- Remove `fixedWidth`; use `width="auto"` or `width="fixed"` when an explicit
  width override is needed. Omitting `width` leaves the v7 stylesheet default.
- Replace `pull="left"` / `"right"` with `pull="start"` / `"end"`.
- Replace `animation="pulse"` with `animation="spin-pulse"`.
- Icon `name` is forwarded unchanged; BootCell does not translate old icon names.
  Review downstream selectors and snapshots using abbreviated style classes.

## Responsive props

`Size` uses `2xl`, not `xxl`. Update `Container.fluid`, `Table.responsive`,
`Navbar.expand`, `DrawerNavbar.expand`, and `ListGroup.horizontal` where applicable.
Update `Modal.fullscreen="xxl-down"` to `"2xl-down"`.

`Row` and `Col` also rename the breakpoint prop; use JSX spread syntax for the
numeric-leading property name:

```tsx
<Container fluid="2xl">
    <Row {...{ '2xl': 3 }}>
        <Col {...{ '2xl': 6 }}>Content</Col>
    </Row>
</Container>
```

BootCell now emits prefixed responsive classes such as `lg:list-group-horizontal`
and `2xl:navbar-expand`. Update application-owned selectors and snapshots that
depend on the old generated class names; changing the prop value alone does not
update those selectors.

## DOM-dependent integrations

Review custom CSS, DOM queries, refs, event handlers, accessibility checks, and
snapshots for these BootCell-rendered changes:

- **Accordion:** `AccordionItem` renders `<details>` and accepts native `open`;
  `AccordionHeader` renders `<summary>` with an icon, not a heading containing a
  button. `AccordionBody` is a plain `<div>`, not a `Collapse`; remove its old
  collapse-specific props. Native details interaction controls expansion.
  `alwaysOpen` still determines whether other items may remain open.
- **Drawer:** renders an `HTMLDialogElement`, not a div plus a separate backdrop.
  Keep application `show` state in sync with `onHide`. `backdrop={false}` uses
  non-modal `show()`; other values use `showModal()`. Close buttons use the passed
  `onHide` callback. Recheck refs and any queries for a separate backdrop element.
  Updating `show` or `backdrop` synchronizes the existing dialog without
  remounting it; refs are forwarded to the native dialog.
- **Modal:** refs now target `HTMLDialogElement`. Header, title, body, and footer
  are direct children of the dialog; do not rely on `.modal-dialog` or
  `.modal-content` wrappers. Use `show` to control opening and handle the emitted
  `hide` event to update application state. The `centered` prop no longer adds a
  positioning class. Existing `size`, `fullscreen`, `scrollable`, and `animation`
  props now affect the dialog itself.
  Like Drawer, changes to `show` and `backdrop` apply to the existing dialog.
  `backdrop={false}` uses non-modal `show()`; other values use `showModal()`.
- **FormCheck:** renders a `.form-field` wrapper. Radio and checkbox classes are
  on the input; a switch wraps its input inside `.switch`. Check label/input
  selectors and `inline` / `reverse` layouts.
- **ToggleButton:** the input is inside the label. Remove assumptions that the
  input and label are adjacent siblings.
- **RangeInput:** its native range input is now nested inside a `.form-range`
  wrapper instead of being a direct child of the shadow root. Update selectors
  that depend on its previous position.
- **Carousel:** controls and indicators share an overlay-controls container.
  `CarouselCaption` is identified by `[data-carousel-caption]`, which BootCell
  also uses to derive indicator labels. Update `.carousel-caption` queries.

## Styles and shadow roots

`BootstrapStyles` is a new exported component that renders Bootstrap and Bootstrap
Icons stylesheet links. BootCell's shadow-root components now reuse it instead
of embedding individual older stylesheet URLs. If a downstream application
supplies local styles or overrides loading, review both the document stylesheets
and styles inside component shadow roots; document-level CSS does not style
shadow-root content automatically.

## Legacy v1 migration

The archived `v1` implementation has been retired. Import migrated components
from `boot-cell`; do not copy its WebCell 1 decorators, `defaultSlot` handling,
VNode inspection, or global Less overrides into an application.

New and enhanced APIs use [React-Bootstrap v2.10.10][8] naming where applicable.
This is API guidance, not a React runtime dependency: BootCell still uses WebCell
and Bootstrap 6 markup. In particular, Bootstrap 6 button appearance and theme
remain separate, and native CSS transitions replace Bootstrap 4/5 transition
class manipulation.

The old `isField`, `isToggleField`, `isNavLink`, and `isDropMenuItem` helpers
inspected WebCell 1 VNode internals. Their callers now compose fields, navigation,
and menus explicitly; inspect rendered elements with native DOM selectors when
DOM detection is actually needed. They are not re-exported as compatibility
aliases. Current `isButton` and `isStep` inspect the current renderer's VNodes.

### Selection and ownership

- `Tabs` uses `activeKey`, `defaultActiveKey`, `onSelect(key, event)`, and each
  `Tab.eventKey`. `Carousel` uses `activeIndex`, `defaultActiveIndex`, and
  `onSelect(index, event)`. Supplying the active prop makes selection controlled:
  update that prop in the callback to accept a requested change.
- Existing `currentIndex` remains available for uncontrolled WebCell consumers.
  Do not use it as a second source of truth alongside a controlled active prop.
- `Carousel.interval` defaults to 5000 milliseconds. Set it to `null` or `0` to
  disable automatic cycling; individual items may override the interval.
- `Tab.title` keeps the native string title. Use `caption` or `tabTitle` for JSX
  tab labels, because a custom element cannot safely widen `HTMLElement.title`
  to React's arbitrary-node type.
- `Wizard` reuses Tab panes but owns linear progression and native form
  validation. Submit advances a valid current pane; reset goes back. The final
  submit invokes `onComplete` without advancing beyond the final pane. It does
  not perform network submission.
- `DropdownButton` uses `show` / `defaultShow`, `onToggle(show, metadata)`,
  `autoClose`, `drop`, and `align`. `caption` remains available; new code can use
  the React-Bootstrap-style `title`. Menu contents remain explicit children.
- Overlay callbacks use `show`, `onHide`, or `onToggle`; document listeners and
  timers are released when components disconnect. No Bootstrap JavaScript
  runtime is injected, so application code must not also attach Bootstrap
  plugins to the same controlled elements.

```tsx
import { Tab, Tabs, Wizard } from 'boot-cell';

<Tabs defaultActiveKey="overview" variant="pills">
    <Tab eventKey="overview" title="Overview">
        Overview content
    </Tab>
    <Tab eventKey="details" title="Details">
        Details content
    </Tab>
</Tabs>;

<Wizard onComplete={() => console.log('Ready to submit')}>
    <Tab title="Details">
        <form>
            <input name="name" required aria-label="Name" />
            <button type="submit">Next</button>
        </form>
    </Tab>
    <Tab title="Confirm">
        <form>
            <button type="reset">Back</button>
            <button type="submit">Finish</button>
        </form>
    </Tab>
</Wizard>;
```

| Legacy surface                                            | Migration                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CollapseBox`                                             | `Collapse in={open}`. The default dimension is `height`; `dimension="width"` selects horizontal collapse. Use native transition events or `onEntered` / `onExited` for transition completion instead of the old custom `open` / `close` events. Bootstrap 6 handles intrinsic-size animation; browsers without that CSS capability change size immediately. |
| `Card` convenience props and automatic child partitioning | Compose `Card`, `CardHeader`, `CardBody`, `CardTitle`, `CardImg`, `CardFooter`, and native text elements. Use Grid for horizontal cards and explicit overlay positioning instead of the old `direction` / `overlay` rendering branches.                                                                                                                     |
| `Nav.itemMode`, `itemWidth`, background and scrolling     | Use `variant`, `fill` / `justify`, `bg`, `direction`, `align`, and `scrollable`. Replace the old custom `masthead` style with `underline` or application-owned CSS. Use `NavDropdown` explicitly instead of detecting a menu from its children.                                                                                                             |
| `NavBar` and its custom offcanvas implementation          | Use `Navbar` / `DrawerNavbar`, `NavbarBrand`, `NavbarToggle`, and `Container`. Bootstrap 6 responsive navigation uses Drawer, not the old translated `.offcanvas-collapse` panel.                                                                                                                                                                           |
| `BannerNavBar`                                            | Use `BannerNavbar`, or compose Navbar + Collapse for the top-expanding layout. Narrow layout is a Container choice; reverse alignment uses flex utilities.                                                                                                                                                                                                  |
| `DropMenu`                                                | Use `DropdownButton` and `DropdownItem` with explicit menu structure; Bootstrap 6 uses `.menu` rather than `.dropdown-menu`.                                                                                                                                                                                                                                |
| `PopoverBox` and `ToastBox`                               | Use the current popover/overlay and toast components. JSX content stays in the DOM; do not convert it to unsanitized HTML. Remove old Tooltip Less and JS fade sequencing.                                                                                                                                                                                  |
| `Field`                                                   | Use `FormControl as="input" / "select" / "textarea"`, native file inputs, `RangeInput`, or native `output`. Numeric HTML sizing uses `htmlSize`; validation uses `isValid` / `isInvalid`.                                                                                                                                                                   |
| `Form`, `ValidMessage`, and enhanced `FormField`          | Use the current form, feedback, help text, and field wrappers. Client validation uses `data-bs-validate` and native constraints, not `.needs-validation` / `.was-validated`. Keep business validation and submission state outside presentation components.                                                                                                 |
| `ToggleField`                                             | Use `FormCheck` for checkbox/radio/switch and `ToggleButton` for button-like choices. Use `variant` + `theme`, not old `color` + `outline`.                                                                                                                                                                                                                 |
| `Table` automatic head/body/foot partitioning             | Use explicit `thead`, `tbody`, and `tfoot`. `theme`, `small`, and `border` become `variant`, `size="sm"`, and `bordered` / `borderless`. Centering uses `text-center align-middle`; image constraints are application CSS.                                                                                                                                  |
| `TableRow` / `InputCell`                                  | Selectable rows and editable cells remain available. `InputCell` uses `as`, and separates table-cell attributes in `cellProps`. `TableSelectionModel` manages all/partial row selection without coupling it to rendering.                                                                                                                                   |
| `TabView` navigation modes                                | Use `Tabs` / `Tab` for pane selection and `Wizard` for step workflows. Ordinary tabs no longer depend on `bs-stepper` styles.                                                                                                                                                                                                                               |
| `CarouselView`                                            | Use `Carousel` / `CarouselItem`. Intervals are **milliseconds**, not legacy seconds. Native scroll snap replaces custom swipe-vector and transition-class algorithms.                                                                                                                                                                                       |
| `CalendarTable` / `WeekCalendar`                          | The table helper uses native table sections. WeekCalendar builds distinct local dates for every weekday, validates time ranges, supports partial final slots, and passes both slot boundaries to `renderCell`. It is not a date picker.                                                                                                                     |
| `ShareBar`                                                | Metadata uses `url`, not `URL`. Platform URLs are encoded and use HTTPS. Web Share is detected at action time; Weixin QR codes are generated locally, without sending page URLs to a QR service. Sharing failures emit an `error` event and are displayed; cancellation emits `cancel`. Platform endpoints remain subject to the providers' availability.   |
| `utility/constant` and Less declarations                  | Use current public theme/color/size types and native CSS utilities. The old numeric breakpoint enum and global style overrides are not compatibility APIs.                                                                                                                                                                                                  |

### Week schedule and row selection

```tsx
import { TableSelectionModel, WeekCalendar } from 'boot-cell';

const selection = new TableSelectionModel(['first', 'second']);
selection.toggle('first');
// selection.indeterminate is true; selection.checked is false.

<WeekCalendar
    date={new Date(2026, 9, 26)}
    weekStartsOn={1}
    startTime="08:00"
    endTime="18:00"
    hourInterval={0.5}
    renderCell={(start, end) => `${start.getHours()}-${end.getHours()}`}
/>;
```

`WeekCalendar` rejects invalid dates, invalid `HH:mm` values, non-positive
intervals, and an end time not after the start. `24:00` is accepted as a day-end
boundary. `weekStartsOn` follows JavaScript weekday numbering (`0` is Sunday).
ShareBar's optional Weixin target uses the bundled QR encoder; it does not depend
on the old missing QRCode utility.

## Downstream verification checklist

1. Update imports, custom-element tags, button props, color props, and breakpoint
   props. Run the application's type checker without adding legacy aliases.
2. Review selectors and snapshots against the rendered structures above.
3. Exercise accordion expansion, modal/drawer opening and closing, navbar
   toggling, form submission, range inputs, and carousel navigation.
4. Check the application's customized styles in both light and dark modes and at
   every responsive breakpoint it uses.

[1]: https://web-cell.dev/BootCell/
[2]: https://github.com/twbs/bootstrap/blob/v6.0.0-alpha.1/site/src/content/docs/guides/migration.mdx
[3]: https://github.com/twbs/bootstrap/blob/v6.0.0-alpha.1/site/src/content/docs/customize/theme.mdx
[4]: https://web-cell.dev/
[5]: https://github.com/mobxjs/mobx/releases
[6]: https://docs.fontawesome.com/upgrade/upgrade-from-older-versions
[7]: https://docs.fontawesome.com/upgrade/whats-changed
[8]: https://github.com/react-bootstrap/react-bootstrap/releases/tag/v2.10.10
