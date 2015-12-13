bootstrap-popover-x
=====================

[![Bower version](https://badge.fury.io/bo/bootstrap-popover-x.svg)](http://badge.fury.io/bo/bootstrap-popover-x)
[![Latest Stable Version](https://poser.pugx.org/kartik-v/bootstrap-popover-x/v/stable)](https://packagist.org/packages/kartik-v/bootstrap-popover-x)
[![License](https://poser.pugx.org/kartik-v/bootstrap-popover-x/license)](https://packagist.org/packages/kartik-v/bootstrap-popover-x)
[![Packagist Downloads](https://poser.pugx.org/kartik-v/bootstrap-popover-x/downloads)](https://packagist.org/packages/kartik-v/bootstrap-popover-x)
[![Monthly Downloads](https://poser.pugx.org/kartik-v/bootstrap-popover-x/d/monthly)](https://packagist.org/packages/kartik-v/bootstrap-popover-x)

Bootstrap Popover Extended - Popover with modal behavior, styling enhancements and more. This plugin is inspired by [BootstrapModalPopover](http://scruffles.github.io/BootstrapModalPopover/) 
for Bootstrap 2.x. This plugin enhances and simplifies these concepts for Bootstrap 3.x, and incorporates various additional styling options.

> NOTE: The latest version of the plugin v1.4.1 has been released. Refer the [CHANGE LOG](https://github.com/kartik-v/bootstrap-popover-x/blob/master/CHANGE.md) for details.

## Features  

The plugin offers these enhanced features:

- The extended popover can be rendered just like a bootstrap modal dialog with the bootstrap popover styling. Since the plugin extends the bootstrap modal,
  all features of the [bootstrap modal](http://getbootstrap.com/javascript/#modals) and its methods are also available.
- Adds a popover footer along with header. Configuration of the HTML content for the popover is much easier, just like a bootstrap modal.
- Specially styles and spaces out bootstrap buttons added in popover footer. 
- Add a close icon/button to a popover window.
- Configure various prebuilt styles/templates. In addition to a default (grey), the bootstrap 3 contextual color styles of `primary`, 
  `info`, `success`, `danger`, and `warning` can be used.
- Control popover placements with respect to the target element. The plugin supports 12 different placement options:
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
- Specially style the popover arrow to be consistent for each contextual color and popover placement.
- Prebuilt CSS styles for controlling appearance and sizes of the popovers

## Documentation and Demo

View the [plugin documentation](http://plugins.krajee.com/popover-x) and [plugin demos](http://plugins.krajee.com/popover-x/demo) at Krajee JQuery plugins. 

## Pre-requisites  

1. [Bootstrap 3.x](http://getbootstrap.com/) (Requires bootstrap `modal.js`)
2. Latest [JQuery](http://jquery.com/)
3. Most browsers supporting CSS3 & JQuery. 

## Installation

### Using Bower
You can use the `bower` package manager to install. Run:

    bower install bootstrap-popover-x

### Using Composer
You can use the `composer` package manager to install. Either run:

    $ php composer.phar require kartik-v/bootstrap-popover-x "dev-master"

or add:

    "kartik-v/bootstrap-popover-x": "dev-master"

to your composer.json file

### Manual Install

You can also manually install the plugin easily to your project. Just download the source [ZIP](https://github.com/kartik-v/bootstrap-popover-x/zipball/master) or [TAR ball](https://github.com/kartik-v/bootstrap-popover-x/tarball/master) and extract the plugin assets (css and js folders) into your project.

## Usage

### Load Client Assets

You must first load the following assets in your header. 

```html
<link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">
<link href="path/to/css/bootstrap-popover-x.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.js"></script>
<script src="path/to/js/bootstrap-popover-x.min.js" type="text/javascript"></script>
```

If you noticed, you need to load the `bootstrap.min.css`, `jquery.min.js`, and `bootstrap.min.js` in addition to the `bootstrap-popover-x.min.css` and `bootstrap-popover-x.min.js` for
the plugin to work with default settings. 

> Note: The plugin extends the **bootstrap modal plugin** and hence the `bootstrap.min.js` must be loaded before `bootstrap-popover-x.min.js`.

### Option 1: Via data attributes

After loading the assets, setup your input markup for the extended popover plugin. You can activate the extended popover without writing JavaScript. 
Set `data-toggle="popover-x"` on a controller element, like a button, along with a `data-target="#foo"` or `href="#foo"` 
to target a specific popover to toggle.

```html
<button class="btn btn-primary btn-lg" data-toggle="popover-x" data-target="#myPopover1" data-placement="top">Top</button>
<div id="myPopover1" class="popover popover-default">
    <div class="arrow"></div>
    <h3 class="popover-title"><span class="close" data-dismiss="popover-x">&times;</span>Title</h3>
    <div class="popover-content">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
    </div>
</div>
```

### Option 2: Via javascript

Alternatively, you can initialize the popover manually on your page via javascript.

```js
$('#myPopover1').popoverX(options);
```

## License

**bootstrap-popover-x** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.