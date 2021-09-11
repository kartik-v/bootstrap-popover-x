Change Log: `bootstrap-popover-x`
=================================

## Version 1.4.9

**Date:** 11-Sep-2021

- (enh #45): Enhance popover-x to be initialized effectively via custom JS.
  Popover-x can be initialized separately via custom javascript using the `popoverButton` plugin
```js
$('#myCustomButton').popoverButton({
    target: '#myCustomDialog',
    placement: 'auto'
});
```
- (enh #44): Enhancements to popover-x to work effectively with bootstrap modals.
- Enhance plugin to work better with NPM module.

## Version 1.4.8

**Date:** 05-Sep-2021

- (enh #43): Enhancements to support Bootstrap v5.x.
- (enh #41): Correct jQuery load.
- (enh #40): Correct arrow CSS styles

## Version 1.4.7

**Date:** 14-Sep-2018

- New `dialogCss` property to allow setting dialog CSS style attributes before load.

## Version 1.4.5

**Date:** 13-Sep-2018

- Enhance bootstrap 4 arrow positioning via CSS class `is-bs4` on popover container.
- (enh #32): Enhancements to support Bootstrap v4.x framework.

## Version 1.4.4

**Date:** 07-Sep-2017

- (enh #31): Code enhancements for jQuery 3.x.
- (enh #30): More intuitive screen placement depending on media size. New PopoverX plugin properties:
    - `autoPlaceSmallScreen`: _boolean_, defaults to `true`, and if `true` will attempt to auto place the popover on smaller screens or on window resize.
    - `smallScreenWidth`: _boolean_, defaults to `640`, above rule will be applied for device screen width less than this size.
- Implement `package.json` for npm update.
- (enh #29): Add `img` folder and indicator for the `popover-loading` css style.

## Version 1.4.3

**Date:** 04-Jan-2017

- (bug #28): Correct popover marker div rendering.
- More correct styles for popover-x positioning behind BS navbar.

## Version 1.4.2

**Date:** 04-Dec-2016

- Add github contribution templates.
- (enh #26): Allow scrolling of the page body after popover is shown.
- (enh #25): Add ability to set `trigger` events other than click for popover button.
- (enh #24): Enhance ability to register plugin via javascript.
- (enh #22): Add support for require.js.
- (enh #21): Add ability to support auto placement with various new auto placement settings.

## Version 1.4.1

**Date:** 18-Mar-2015

- (enh #10): Refactor code for bootstrap v3.3.4.
- (enh #9): Set document ready to be compatible with jquery.turbolinks.

## Version 1.4.0

**Date:** 17-Feb-2015

- Update copyright year.
- (enh #8): Implement reusable constructor for extending plugin if needed.
- (enh #7): Lint changes & code formatting updates for JS & CSS.
- (enh #6): Add new `useOffsetForPos` property to allow using offset instead of position.

## Version 1.3.0

**Date:** 24-Nov-2014

- (enh #3): Modal styling fix for eliminating unnecessary modal padding in BS 3.3.1 for popover-x

## Version 1.2.0

**Date:** 08-Nov-2014

- Set release to stable in composer.json.
- Updated CHANGE log to reflect user friendly date time formats.

## Version 1.1.0

**Date:** 24-Oct-2014

- enh #2: Add eight additional placement positions. With this release, the popover-x will support these new placement options:
    - right
    - left
    - top
    - bottom
    - top top-left
    - top top-right
    - bottom bottom-left
    - bottom bottom-right
    - left left-top
    - left left-bottom
    - right right-top
    - right right-bottom

## Version 1.0.0

**Date:** 15-Jul-2014

Initial release.

- The extended popover can be rendered just like a bootstrap modal dialog with the bootstrap popover styling. Since the plugin extends the bootstrap modal,
  all features of the [bootstrap modal](http://getbootstrap.com/javascript/#modals) and its methods are also available.
- Adds a popover footer along with header. Configuration of the HTML content for the popover is much easier, just like a bootstrap modal.
- Specially styles and spaces out bootstrap buttons added in popover footer. 
- Add a close icon/button to a popover window.
- Configure various prebuilt styles/templates. In addition to a default (grey), the bootstrap 3 contextual color styles of `primary`, 
  `info`, `success`, `danger`, and `warning` can be used.
- Control popover placements `top`, `bottom`, `left`, or `right` of the target element.
- Specially style the popover arrow to be consistent for each contextual color and popover placement.
- Prebuilt CSS styles for controlling appearance and sizes of the popovers