(function (global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    function extend() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;
    
        if ( typeof target === "boolean" ) {
            deep = target;
    
            target = arguments[ i ] || {};
            i++;
        }
    
        if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
            target = {};
        }
    
        if ( i === length ) {
            target = this;
            i--;
        }
    
        for ( ; i < length; i++ ) {
            if ( ( options = arguments[ i ] ) != null ) {
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];
    
                    if ( target === copy ) {
                        continue;
                    }
    
                    if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
                        ( copyIsArray = jQuery.isArray( copy ) ) ) ) {
    
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray( src ) ? src : [];
    
                        } else {
                            clone = src && jQuery.isPlainObject( src ) ? src : {};
                        }
    
                        target[ name ] = jQuery.extend( deep, clone, copy );
    
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
    
        return target;
    };

    var defaultOpt = {
        routes: [],
        model: 'hash' // hash || history
    };

    function Router(options) {
        this.options = extend({}, defaultOpt, options);
        this.urlArg = [];
    }

    Router.prototype = {
        init: function() { },
        add: function() { },
        push: function() { },
        replace: function() { },
        go: function() {},
        back: function() {},
        forward: function() {}
    }

    if (!noGlobal) {
        window.Router = Router;
    }

    return Router;

}));