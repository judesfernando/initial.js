(function ($) {
    $.fn.initial = function (options) {
        return this.each(function () {

            var e = $(this);
            var settings = $.extend({
                // Default settings
                name: 'Name',
                seed: 0,
                charCount: 1,
                wordCount: 2,
                textColor: '#ffffff',
                height: 100,
                width: 100,
                fontSize: 60,
                fontWeight: 400,
                fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
                radius: 0,
                src: null

            }, options);

            // overriding from data attributes
            settings = $.extend(settings, e.data());

            if (settings.src) {
              e.css({
                'width': settings.width+'px',
                'height': settings.height+'px',
                'border-radius': settings.radius+'px',
                '-moz-border-radius': settings.radius+'px'
              }).attr("src", settings.src);
              
              return;
            }

            // making the text object
            var c = settings.name ? settings.name.split(" ", settings.wordCount).map(function (str) { return str.substr(0, settings.charCount).toUpperCase(); }).join("") : '';
            var cobj = $('<text text-anchor="middle"></text>').attr({
                'y': '50%',
                'x': '50%',
                'dy' : '0.35em',
                'pointer-events':'auto',
                'fill': settings.textColor,
                'font-family': settings.fontFamily
            }).html(c).css({
                'font-weight': settings.fontWeight,
                'font-size': settings.fontSize+'px'
            });

            function unique(name) {
              return name ? name.split('').map(function (v, k) { return v.charCodeAt(0) * Math.pow(2, k); }).reduce(function (v1, v2) { return v1 + v2; }) / Math.pow(3, name.length) : 'DaMaVaNd';
            }

            function normalize(num) {
              var border = 3;

              if (num < border) {
                while (num < border) {
                  num *= 2 * border;
                }
              } else {
                while (parseInt(num) > border) {
                  num /= 2 * border;
                }
              }

              return num;
            }

            function distribute(x, sigma) {
              return (Math.sin(x * sigma) * Math.cos(x / sigma) * 0.5) + 0.5;
            }

            var sigma = normalize(unique(settings.name)) * (settings.seed + 1);

            var color = {
              red: Math.floor(distribute(settings.name.length * (19 / 11), sigma) * 256),
              green: Math.floor(distribute(settings.name.length * (13 / 11), sigma) * 256),
              blue: Math.floor(distribute(settings.name.length * (7 / 11), sigma) * 256)
            };

            var svg = $('<svg></svg>').attr({
                'xmlns': 'http://www.w3.org/2000/svg',
                'pointer-events':'none',
                'width': settings.width,
                'height': settings.height
            }).css({
                'background-color': '#' + Number(color.red).toString(16) + Number(color.green).toString(16) + Number(color.blue).toString(16),
                'width': settings.width+'px',
                'height': settings.height+'px',
                'border-radius': settings.radius+'px',
                '-moz-border-radius': settings.radius+'px'
            });

            svg.append(cobj);
           // svg.append(group);
            var svgHtml = window.btoa(unescape(encodeURIComponent($('<div>').append(svg.clone()).html())));

            e.attr("src", 'data:image/svg+xml;base64,' + svgHtml);
        })
    };

}(jQuery));
