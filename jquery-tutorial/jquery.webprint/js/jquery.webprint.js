;(function($) {

    var defaults = {
	};

    $.fn.webprint = function (options) {
        var opt = $.extend({}, defaults, options);
        var $element = (this instanceof jQuery) ? this : $(this);
        
        var $iframe = $("<iframe/>");
        $iframe.css({ 
            position: "absolute", 
            width: "0px", 
            height: "0px", 
            left: "-600px", 
            top: "-600px" 
        }); 

        $iframe.appendTo("body");

        var doc = $iframe[0].contentWindow.document;
        
        if ($("link[media=print]").length > 0) 
        {
            $("link[media=print]").each( function() {
                doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
            });
        }
        else 
        {
            $("link").each( function() {
                doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
            });
        }
        
        $element.each( function() { 
            var text = $(this).prop('outerHTML');
            //doc.write('<div>test</div>');
            doc.write(text); 
        });
        
        doc.close();
        
        $iframe[0].contentWindow.focus();
        setTimeout( function() { 
            $iframe[0].contentWindow.print();
        });
    }
})(jQuery);