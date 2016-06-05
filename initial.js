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

            settings.name = settings.name || 'DaMaVaNd';

            // making the text object
            var c = settings.name.split(" ", settings.wordCount).map(function (str) { return str.substr(0, settings.charCount).toUpperCase(); }).join("");
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
              return name.split('').map(function (v, k) { return v.charCodeAt(0) * Math.pow(2, k); }).reduce(function (v1, v2) { return v1 + v2; }) / Math.pow(3, name.length);
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

            function hsv2rgb(hue, saturation, brightness) {
              var chroma = brightness * saturation;
              var faceColor = { red: 0, green: 0, blue: 0 };
              var hp = hue * 6;
              var x = chroma * (1 - Math.abs((hp % 2) - 1));
              switch (Math.floor(hp)) {
                case 0:
                  faceColor.red = chroma;
                  faceColor.green = x;
                  break;

                case 1:
                  faceColor.red = x;
                  faceColor.green = chroma;
                  break;

                case 2:
                  faceColor.green = chroma;
                  faceColor.blue = x;
                  break;

                case 3:
                  faceColor.green = x;
                  faceColor.blue = chroma;
                  break;

                case 4:
                  faceColor.red = x;
                  faceColor.green = chroma;
                  break;

                case 5:
                case 6:
                  faceColor.red = chroma;
                  faceColor.green = x;
                  break;
              }

              var m = brightness - chroma;
              var color = {
                red: faceColor.red + m,
                green: faceColor.green + m,
                blue: faceColor.blue + m
              };

              return Number(color.red).toString(16) + Number(color.green).toString(16) + Number(color.blue).toString(16);
            }

            var sigma = normalize(unique(settings.name)) * (settings.seed + 1);

            var color = {
              hue: distribute(settings.name.length, sigma),
              saturation: 0.8, // 0: White
              brightness: 0.3 // 0: Black
            };

            var svg = $('<svg></svg>').attr({
                'xmlns': 'http://www.w3.org/2000/svg',
                'pointer-events':'none',
                'width': settings.width,
                'height': settings.height
            }).css({
                'background-color': '#' + hsv2rgb(color.hue, color.saturation, color.brightness),
                'width': settings.width+'px',
                'height': settings.height+'px',
                'border-radius': settings.radius+'px',
                '-moz-border-radius': settings.radius+'px'
            });

            svg.append(cobj);
           // svg.append(group);
            var svgHtml = window.btoa(unescape(encodeURIComponent($('<div>').append(svg.clone()).html())));

            e.attr("src", 'data:image/svg+xml;base64,' + svgHtml);
        });
    };

}(jQuery));
