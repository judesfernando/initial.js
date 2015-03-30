(function ($) {
    $.fn.initial = function (options) {

        // Defining Colors
        var colors = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#f69785", "#9ba37e", "#b49255", "#b49255", "#a94136"];

        return this.each(function () {

            var e = $(this);
            var settings = $.extend({
                // Default settings
                name: 'Name',
                charCount: 1,
                textColor: '#ffffff',
                height: 100,
                width: 100,
                fontSize: 0.45, // default font size is 45% of height
                fontWeight: 400,
                fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif'
            }, options);

            // overriding from data attributes
            settings = $.extend(settings, e.data());
            
            if (settings.fontSize < 1) {
				// if font size < 1 presume that this is a percentage of height
				// e.g. - settings.fontSize: .45
				settings.fontSize = parseInt(settings.height * settings.fontSize);
			}
			else if (settings.fontSize.toString().indexOf("%") > 1) {
				// if font size has % character calculate it from height
				// e.g. - settings.fontSize: "45%"
				settings.fontSize = parseInt(settings.height * (parseInt(settings.fontSize.replace("%", "")) / 100));
			}

            // making the text object
            var c = settings.name.substr(0, settings.charCount).toUpperCase();
            var cobj = $('<text text-anchor="middle"></text>').attr({
                'y': '50%',
                'x': '50%',
                'dy' : '0.35em',
                'pointer-events':'auto',
                'fill': settings.textColor,
                'font-family': settings.fontFamily
            }).html(c).css({
                'font-weight': settings.fontWeight,
                'font-size': settings.fontSize + 'px',
            });

            var colorIndex = Math.floor((c.charCodeAt(0) - 65) % colors.length);

            var svg = $('<svg></svg>').attr({
                'xmlns': 'http://www.w3.org/2000/svg',
                'pointer-events':'none',
                'width': settings.width,
                'height': settings.height
            }).css({
                'background-color': colors[colorIndex],
                'width': settings.width + 'px',
                'height': settings.height + 'px'
            });

            svg.append(cobj);
           // svg.append(group);
            var svgHtml = window.btoa(unescape(encodeURIComponent($('<div>').append(svg.clone()).html())));

            e.attr("src", 'data:image/svg+xml;base64,' + svgHtml);

        })
    };

}(jQuery));
