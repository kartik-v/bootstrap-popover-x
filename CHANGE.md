version 1.4.1
=============
**Date:** 18-Mar-2015

1. (enh #9): Set document ready to be compatible with jquery.turbolinks.
2. (enh #10): Refactor code for bootstrap v3.3.4.

version 1.4.0
=============
**Date:** 17-Feb-2015

1. (enh #6): Add new `useOffsetForPos` property to allow using offset instead of position.
2. (enh #7): Lint changes & code formatting updates for JS & CSS.
3. (enh #8): Implement reusable constructor for extending plugin if needed.
4. Update copyright year.

version 1.3.0
=============
**Date:** 24-Nov-2014

1. (enh #3): Modal styling fix for eliminating unnecessary modal padding in BS 3.3.1 for popover-x

version 1.2.0
=============
**Date:** 08-Nov-2014

1. Set release to stable in composer.json.
2. Updated CHANGE log to reflect user friendly date time formats.

version 1.1.0
=============
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

version 1.0.0
=============
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