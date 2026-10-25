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
- **Modal:** refs now target `HTMLDialogElement`. Header, title, body, and footer
  are direct children of the dialog; do not rely on `.modal-dialog` or
  `.modal-content` wrappers. Use `show` to control opening and handle the emitted
  `hide` event to update application state. The `centered` prop no longer adds a
  positioning class. Existing `size`, `fullscreen`, `scrollable`, and `animation`
  props now affect the dialog itself.
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
