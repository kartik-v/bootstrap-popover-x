/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
 * @version 1.4.1
 *
 * Bootstrap Popover Extended - Popover with modal behavior, styling enhancements and more.
 *
 * For more JQuery/Bootstrap plugins and demos visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    "use strict";
    var PopoverX = function (element, options) {
        var self = this;
        self.options = options;
        self.$element = $(element);
        self.$dialog = self.$element;
        self.init();
    }, addCss = function($el, css) {
        $el.removeClass(css).addClass(css);
    };

    PopoverX.prototype = $.extend({}, $.fn.modal.Constructor.prototype, {
        constructor: PopoverX,
        init: function () {
            var self = this, $dialog = self.$element;
            addCss($dialog, 'popover-x');
            self.$body = $(document.body);
            self.$target = self.options.$target;
            self.useOffsetForPos = self.options.useOffsetForPos === undefined ? false : self.options.useOffsetForPos;
            if ($dialog.find('.popover-footer').length) {
                addCss($dialog, 'has-footer');
            }
            if (self.options.remote) {
                $dialog.find('.popover-content').load(self.options.remote, function () {
                    $dialog.trigger('load.complete.popoverX');
                });
            }
            $dialog.on('click.dismiss.popoverX', '[data-dismiss="popover-x"]', $.proxy(self.hide, self));
            $dialog.on('shown.bs.modal', function() {
                if (self.options.closeOtherPopovers) {
                    $dialog.removeClass('popover-x');
                    $('.popover-x').each(function() {
                        $(this).popoverX('hide');
                    });
                    addCss($dialog, 'popover-x');
                }
            });
        },
        getPosition: function () {
            var self = this, $element = self.$target,
                pos = self.useOffsetForPos ? $element.offset() : $element.position();
            return $.extend({}, pos, {width: $element[0].offsetWidth, height: $element[0].offsetHeight});
        },
        refreshPosition: function () {
            var self = this, $dialog = self.$element, placement = self.options.placement,
                actualWidth = $dialog[0].offsetWidth, actualHeight = $dialog[0].offsetHeight,
                position, pos = self.getPosition();
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
                    throw "Invalid popover placement '" + placement + "'.";
            }
            $dialog.css(position);
            addCss($dialog, placement + ' in');
        },
        show: function () {
            var self = this, $dialog = self.$element;
            $dialog.css({top: 0, left: 0, display: 'block', 'z-index': 1050});
            self.refreshPosition();
            $.fn.modal.Constructor.prototype.show.call(self, arguments);
            $dialog.css({'padding': 0});
        }
    });

    $.fn.popoverX = function (option) {
        var self = this;
        return self.each(function () {
            var $this = $(this);
            var data = $this.data('popover-x');
            var options = $.extend({}, $.fn.popoverX.defaults, $this.data(), typeof option === 'object' && option);
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
            }
        });
    };

    $.fn.popoverX.defaults = $.extend({}, $.fn.modal.defaults, {
        placement: 'right',
        keyboard: true,
        closeOtherPopovers: true
    });
    
    $.fn.popoverX.Constructor = PopoverX;

    $(document).ready(function () {
        $(document).on('click', '[data-toggle="popover-x"]', function (e) {
            var $this = $(this), href = $this.attr('href'),
                $dialog = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))), //strip for ie7
                option = $dialog.data('popover-x') ? 'toggle' : $.extend({remote: !/#/.test(href) && href},
                    $dialog.data(), $this.data());
            e.preventDefault();
            $dialog.trigger('click.target.popoverX');
            if (option !== 'toggle') {
                option.$target = $this;
                $dialog
                    .popoverX(option)
                    .popoverX('show')
                    .on('hide', function () {
                        $this.focus();
                    });
            }
            else {
                $dialog
                    .popoverX(option)
                    .on('hide', function () {
                        $this.focus();
                    });
            }
        });

        $(document).on('keyup', '[data-toggle="popover-x"]', function (e) {
            var $this = $(this), href = $this.attr('href'),
                $dialog = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
            if ($dialog && e.which === 27) {
                $dialog.trigger('keyup.target.popoverX');
                $dialog.popoverX('hide');
            }
        });
    });
})(window.jQuery);