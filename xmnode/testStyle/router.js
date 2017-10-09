(function( global, factory ) {
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

    var defaults = [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            container: '#wrap',
            view: './home/home.html',
            script: './home/index.js',
            style: './home/style.css'
        },
        {
            path: '/about',
            container: '#wrap',
            view: './about/about.html',
            script: './about/index.js',
            style: './about/style.css'
        },
        {
            path: '/contact',
            container: '#wrap',
            view: './contact/contact.html',
            script: './contact/index.js',
            style: './contact/style.css'
        }
    ]

    var Router = function() {
        this.routes = [];

        this.curRoute = {
            path: '',
            styleID: '',
            params: {}
        };
    };

    Router.prototype = {
        route: function(routes) {
            this.routes = routes || defaults;

            this.excuteRoute(getLocationHref());

            var self = this;
            window.onhashchange = function(evt) {
                //self.excuteRoute(evt.newURL);
                self.excuteRoute(location.href);
            };
        },
        excuteRoute: function(url) {

            var self = this;
            var urlObject = parseUrl(url);

            if (urlObject.path == "") {
                return;
            }
            
            this.curRoute.styleID && this.curRoute.styleID.parentNode.removeChild(this.curRoute.styleID);
            this.curRoute.path = urlObject.path;
            this.params = urlObject.params;
    
            var item = null;
            for (var i=0; i<this.routes.length; i++) {
                if ( this.routes[i].path == urlObject.path ) {
                    item = this.routes[i];
                    break;
                }
            }
            
            $.ajax({
                type: 'GET',
                url: item.view,
                dataType: 'html',
                success: function(data){
                    $(item.container).html(data);
                    self.curRoute.styleID = loadOuterStyle(item.style);
                    loadScript(item.script);
                },
                error: function(){
                    alert('导航失败');
                }
            });
        }
    }

    function getLocationHref() {
        return location.href || "";
    }

    function parseUrl(url) {
        var url = url || location.href;

        var index, 
            pos,
            urlObject = {
                url: '',
                path: '',
                params: {}
            };

        // 从后往前解析url地址
        index = url.indexOf('?');
        if ( ~index ) {
            var paramstr = url.slice(index+1);
            var paramsArr = paramstr.split('&');
            var item = [];

            for ( var i=0; i<paramsArr.length; i++) {
                item = paramsArr[i].split('=');

                if ( item[0] !== '' ) {
                    urlObject.params[item[0]] = decodeURIComponent(item[1]);
                }
            }
        }

        pos = url.indexOf('#');
        if ( ~pos ) {
            urlObject.path = url.slice(pos+1, ~index?index:undefined);
        }

        urlObject.url = url.slice(0, pos-1);
        return urlObject;
    }

    function loadScript(url) {
        var script = document.createElement('script');
        script.onload = function() {
            document.getElementsByTagName('head')[0].removeChild(script);    
        };

        script.src = url;
        script.type = 'text/javascript';
        
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function loadOuterStyle(url) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;

        head.appendChild(link);
        return link;
    }

    function loadInnerStyle(cssStr) {
        var style = document.createElement('style');
        style.id = 'styleID';

        if ( 'styleSheet' in style ) {
            style.setAttribute('type', 'text/css');
            style.styleSheet.cssText = cssStr;
        } 
        else {
            style.innerHTML = cssStr;
        }

        document.getElementsByTagName('head')[0].appendChild(style);
        return style;
    }

    window.xmRouter = new Router;

}));