/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2020
 * @version 1.4.8
 *
 * Bootstrap Popover Extended - Popover with modal behavior, styling enhancements and more.
 *
 * For more JQuery/Bootstrap plugins and demos visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function (factory) {
    "use strict";
    //noinspection JSUnresolvedVariable
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";
    var $h, PopoverButton, PopoverX;
    // global helper object
    $h = {
        NAMESPACE: '.popoverX',
        kvLog: function (msg) {
            msg = 'bootstrap-popover-x: ' + msg;
            if (window.console && window.console.log) {
                window.console.log(msg);
            } else {
                window.alert(msg);
            }
        },
        addCss: function ($el, css) {
            $el.removeClass(css).addClass(css);
        },
        handler: function ($el, event, callback) {
            var ev = event + $h.NAMESPACE;
            return $el.off(ev).on(ev, callback);
        },
        raise: function ($el, event, prefix) {
            var ev = event + (prefix === undefined ? '.target' : prefix) + $h.NAMESPACE;
            return $el.trigger(ev);
        }
    };
    // popover button plugin
    PopoverButton = function (element, options) {
        var self = this;
        self.options = options;
        self.$element = $(element);
        self.init();
    };
    // popover extended plugin
    PopoverX = function (element, options) {
        var self = this;
        self.options = options;
        self.$element = $(element);
        self.$dialog = self.$element;
        self.init();
    };
    // popover button plugin prototype
    PopoverButton.prototype = {
        constructor: PopoverButton,
        init: function () {
            var self = this, $el = self.$element, options = self.options || {}, triggers, $dialog,
                href = $el.attr('href'), initException;
            initException = function (msg) {
                $h.kvLog('PopoverX initialization skipped! ' + msg);
            };
            self.href = href;
            if (!$el || !$el.length) {
                initException('PopoverX triggering button element could not be found.');
                return;
            }
            if (options.target) {
                $dialog = $(options.target);
            } else {
                $dialog = $($el.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
            }
            $h.addCss($dialog, 'popover-x');
            self.$dialog = $dialog;
            if (!$dialog.length) {
                initException('PopoverX dialog element could not be found.');
                return;
            }
            if (!$dialog.data('popover-x')) {
                var opts = $.extend(true, {remote: href && !/#/.test(href)}, $dialog.data(), $el.data(), options);
                opts.$target = $el;
                $dialog.popoverX(opts);
            }
            triggers = options.trigger;
            if (typeof triggers !== 'string') {
                initException('Invalid or improper configuration for PopoverX trigger.');
                return;
            }
            triggers = triggers.split(" ");
            $.each(triggers, function (key, event) {
                self.listen(event);
            });
        },
        listen: function (ev) {
            var self = this, $el = self.$element, $dialog = self.$dialog, isHover = false, evIn, evOut,
                href = self.href;
            if (ev === 'manual') {
                return;
            }
            if (ev !== 'click' && ev !== 'keyup') {
                isHover = true;
            }
            if (isHover) {
                evIn = ev === 'hover' ? 'mouseenter' : 'focusin';
                evOut = ev === 'hover' ? 'mouseleave' : 'focusout';
                $h.handler($el, evIn, function () {
                    $h.raise($dialog, evIn).popoverX('show');
                });
                $h.handler($el, evOut, function () {
                    $h.raise($dialog, evOut).popoverX('hide');
                });
            } else {
                $h.handler($el, ev, function (e) {
                    if (ev === 'keyup') {
                        if ($dialog && e.which === 27) {
                            $h.raise($dialog, ev).popoverX('hide');
                        }
                        return;
                    }
                    if (href && ev === 'click') {
                        e.preventDefault();
                    }
                    $h.raise($dialog, ev).popoverX('toggle');
                    $h.handler($dialog, 'hide', function () {
                        $el.focus();
                    });
                });
            }
        },
        destroy: function () {
            var self = this;
            self.$element.off($h.NAMESPACE);
            self.$dialog.off($h.NAMESPACE);
        }
    };
    // popover extended plugin prototype
    PopoverX.prototype = $.extend({}, $.fn.modal.Constructor.prototype, {
        constructor: PopoverX,
        init: function () {
            var self = this, $dialog = self.$element, $container = self.options.$container;
            if ($container && $container.length) {
                self.$body = $container;
            }
            if (!self.$body || !self.$body.length) {
                self.$body = $(document.body);
            }
            self.bodyPadding = self.$body.css('padding');
            self.$target = self.options.$target;
            self.$marker = $(document.createElement('div')).addClass('popover-x-marker').insertAfter($dialog).hide();
            if ($dialog.find('.popover-footer').length) {
                $h.addCss($dialog, 'has-footer');
            }
            if (self.options.remote) {
                $dialog.find('.popover-content').load(self.options.remote, function () {
                    $dialog.trigger('load.complete.popoverX');
                });
            }
            $dialog.on('click.dismiss' + $h.NAMESPACE, '[data-dismiss="popover-x"]', $.proxy(self.hide, self));

            $(window).resize(function () {
                if ($dialog.hasClass('kv-popover-active')) {
                    self.hide();
                    setTimeout(function () {
                        self.show(true);
                    }, 50);
                }
            });
        },
        getPlacement: function () {
            var self = this, pos = self.getPosition(), placement = self.options.placement,
                de = document.documentElement, db = document.body, cw = de.clientWidth, ch = de.clientHeight,
                scrollTop = Math.max(db.scrollTop || 0, de.scrollTop), isH = placement === 'horizontal',
                scrollLeft = Math.max(db.scrollLeft || 0, de.scrollLeft), isV = placement === 'vertical',
                pageX = Math.max(0, pos.left - scrollLeft), pageY = Math.max(0, pos.top - scrollTop),
                autoPlace = placement === 'auto' || isH || isV,
                width = window.innerWidth || de || document.body.clientWidth;
            if (self.options.autoPlaceSmallScreen && width < self.options.smallScreenWidth) {
                autoPlace = true;
            }
            if (autoPlace) {
                if (pageX < cw / 3) {
                    if (pageY < ch / 3) {
                        return isH ? 'right right-top' : 'bottom bottom-left';
                    }
                    if (pageY < ch * 2 / 3) {
                        return isV ? (pageY <= ch / 2 ? 'bottom bottom-left' : 'top top-left') : 'right';
                    }
                    return isH ? 'right right-bottom' : 'top top-left';
                }
                if (pageX < cw * 2 / 3) {
                    if (pageY < ch / 3) {
                        return isH ? (pageX <= cw / 2 ? 'right right-top' : 'left left-top') : 'bottom';
                    }
                    if (pageY < ch * 2 / 3) {
                        return isH ? pageX <= cw / 2 ? 'right' : 'left' : pageY <= ch / 2 ? 'bottom' : 'top';
                    }
                    return isH ? pageX <= cw / 2 ? 'right right-bottom' : 'left left-bottom' : 'top';
                }
                if (pageY < ch / 3) {
                    return isH ? 'left left-top' : 'bottom bottom-left';
                }
                if (pageY < ch * 2 / 3) {
                    return isV ? pageY <= ch / 2 ? 'bottom-right' : 'top-right' : 'left';
                }
                return isH ? 'left left-bottom' : 'top top-left';
            }
            switch (placement) {
                case 'auto-top':
                    return pageX < cw / 3 ? 'top top-left' : (pageX < cw * 2 / 3 ? 'top' : 'top top-right');
                case 'auto-bottom':
                    return pageX < cw / 3 ? 'bottom bottom-left' : (pageX < cw * 2 / 3 ? 'bottom' : 'bottom bottom-right');
                case 'auto-left':
                    return pageY < ch / 3 ? 'left left-top' : (pageY < ch * 2 / 3 ? 'left' : 'left left-bottom');
                case 'auto-right':
                    return pageY < ch / 3 ? 'right right-top' : (pageY < ch * 2 / 3 ? 'right' : 'right right-bottom');
                default:
                    return placement;
            }
        },
        getPosition: function () {
            var self = this, $el = self.$target, elRect = $el[0].getBoundingClientRect(), $container = self.$body,
                cssPos = $container.css('position');
            if ($container.is(document.body) || cssPos === 'static') {
                return $.extend({}, $el.offset(), {
                    width: $el[0].offsetWidth || elRect.width,
                    height: $el[0].offsetHeight || elRect.height
                });
            }
            if (cssPos === 'relative') {
                return {
                    top: $el.offset().top - $container.offset().top,
                    left: $el.offset().left - $container.offset().left,
                    width: $el[0].offsetWidth || elRect.width,
                    height: $el[0].offsetHeight || elRect.height
                };
            }
            // else cssPos = 'fixed'
            var containerRect = $container[0].getBoundingClientRect();
            return {
                top: elRect.top - containerRect.top + $container.scrollTop(),
                left: elRect.left - containerRect.left + $container.scrollLeft(),
                width: elRect.width,
                height: elRect.height
            };
        },
        refreshPosition: function () {
            var self = this, $dialog = self.$element, pos = self.getPosition(), position,
                actualWidth = $dialog[0].offsetWidth, actualHeight = $dialog[0].offsetHeight,
                placement = self.getPlacement();
            switch (placement) {
                case 'bottom':
                    position = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
                    break;
                case 'bottom bottom-left':
                    position = {top: pos.top + pos.height, left: pos.left};
                    break;
                case 'bottom bottom-right':
                    position = {top: pos.top + pos.height, left: pos.left + pos.width - actualWidth};
                    break;
                case 'top':
                    position = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2};
                    break;
                case 'top top-left':
                    position = {top: pos.top - actualHeight, left: pos.left};
                    break;
                case 'top top-right':
                    position = {top: pos.top - actualHeight, left: pos.left + pos.width - actualWidth};
                    break;
                case 'left':
                    position = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
                    break;
                case 'left left-top':
                    position = {top: pos.top, left: pos.left - actualWidth};
                    break;
                case 'left left-bottom':
                    position = {top: pos.top + pos.height - actualHeight, left: pos.left - actualWidth};
                    break;
                case 'right':
                    position = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width};
                    break;
                case 'right right-top':
                    position = {top: pos.top, left: pos.left + pos.width};
                    break;
                case 'right right-bottom':
                    position = {top: pos.top + pos.height - actualHeight, left: pos.left + pos.width};
                    break;
                default:
                    $h.kvLog("Invalid popover placement '" + placement + "'.");
            }
            $dialog.removeClass('bottom top left right bottom-left top-left bottom-right top-right ' +
                'left-bottom left-top right-bottom right-top').css(position).addClass(placement + ' in');
        },
        validateOpenPopovers: function () {
            var self = this, $dialog = self.$element;
            if (!self.options.closeOpenPopovers) {
                return;
            }
            self.$body.find('.popover:visible').each(function () {
                var $popover = $(this);
                if (!$popover.is($dialog)) {
                    $popover.popoverX('hide');
                }
            });
        },
        hide: function () {
            var self = this, $dialog = self.$element;
            self.$body.removeClass('popover-x-body');
            $dialog.removeClass('kv-popover-active');
            $dialog.modal('hide');
            $dialog.insertBefore(self.$marker);
        },
        show: function (skipValidation) {
            var self = this, $dialog = self.$element;
            $dialog.addClass('kv-popover-active');
            $dialog.css(self.options.dialogCss).appendTo(self.$body);
            if (!skipValidation) {
                self.validateOpenPopovers();
            }
            $h.addCss(self.$body, 'popover-x-body');
            $dialog.modal('show');
            self.$body.css({'padding': self.bodyPadding});
            $dialog.css({'padding': 0});
            self.refreshPosition();
        },
        destroy: function () {
            var self = this;
            self.$element.off($h.NAMESPACE);
        }
    });

    $.fn.popoverButton = function (option) {
        var self = this;
        return self.each(function () {
            var $this = $(this), data = $this.data('popover-button'),
                options = $.extend({}, $.fn.popoverButton.defaults, $this.data(), typeof option === 'object' && option);
            if (!data) {
                $this.data('popover-button', (data = new PopoverButton(this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    $.fn.popoverX = function (option) {
        var self = this;
        return self.each(function () {
            var $this = $(this), data = $this.data('popover-x'),
                options = $.extend({}, $.fn.popoverX.defaults, $this.data(), typeof option === 'object' && option);
            if (!options.$target) {
                if (data && data.$target) {
                    options.$target = data.$target;
                } else {
                    options.$target = option.$target || $(option.target);
                }
            }
            if (!data) {
                $this.data('popover-x', (data = new PopoverX(this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            } else {
                if (options.show) {
                    data.show(true);
                }
            }
        });
    };

    $.fn.popoverButton.defaults = {trigger: 'click keyup'};
    $.fn.popoverX.defaults = $.extend(true, {}, $.fn.modal.defaults, {
        placement: 'auto',
        dialogCss: {top: 0, left: 0, display: 'block', 'z-index': 1050},
        keyboard: true,
        autoPlaceSmallScreen: true,
        smallScreenWidth: 640,
        closeOpenPopovers: true,
        backdrop: false,
        show: false
    });
    $.fn.popoverButton.Constructor = PopoverButton;
    $.fn.popoverX.Constructor = PopoverX;

    $(document).ready(function () {
        var $btns = $("[data-toggle='popover-x']");
        if ($btns.length) {
            $btns.popoverButton();
        }
    });
}));