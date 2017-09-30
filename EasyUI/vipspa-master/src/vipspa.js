(function(){
    function Vipspa(){
        
    }
    Vipspa.prototype.start = function(config){
        // 1. self没啥用
        // 2. config应该使用对象扩展方法设置默认值
        // 3. errorTemplateId可以不用设置，当无法匹配路由的时候默认展示出错页
        var self = this;
        self.routerMap = config.router;
        self.mainView = config.view;
        self.errorTemplateId = config.errorTemplateId;
        
        startRouter();

        window.onhashchange = function(){
            startRouter();
        };
    };

    var messageStack = [];
    // {
    //     'id': 'home_bindcard',
    //     'content': {
    //     }
    // }

    Vipspa.prototype.getMessage = function(id){
        var msg = {};

        // each里面id匹配应该直接就返回， for循环就好
        $.each(messageStack, function(i,e){
            if(e.id===id){
                msg = e;
            }
        });
        return msg;
    };

    Vipspa.prototype.setMessage = function(obj){
        // 默认obj为标准的json格式对象，进行深拷贝
        var _obj = JSON.parse(JSON.stringify(obj));
        $.each(messageStack,function(i,e){
            if(e.id===_obj.id){
                e = _obj;
                return false;  // 这里只是退出each循环，所以这里会存在重复对象
            }
        });

        messageStack.push(_obj);
    };
    Vipspa.prototype.delMessage = function(id){
        if(typeof id==='undefined'){
            return false;
        }

        // 数组方法 indexOf与splice可以替代
        var index = 0;
        $.each(messageStack,function(i,e){
            if(e.id===id){
                index = i;
            }
        });

        $.each(messageStack,function(i,e){
            if(i>index){
                messageStack[i-1] = e;
            }
        });
    };
    Vipspa.prototype.clearMessage = function(id){
        var index = 0;
        messageStack = [];
    };
    
    // 为何跟JSON的方法重名？  组合url + 参数
    Vipspa.prototype.stringify = function(routerUrl, paramObj){
        var paramStr='', hash;
        for(var i in  paramObj){
            paramStr += i + '=' + encodeURIComponent(paramObj[i]) + '&';
        }
        if(paramStr === ''){
            hash = routerUrl;
        }
        else{
            paramStr = paramStr.substring(0,paramStr.length-1);
            hash = routerUrl + '?' + paramStr;
        }
        return hash;
    };


    Vipspa.prototype.parse = function(routerHash){
        var hash = typeof routerHash ==='undefined'?location.hash:routerHash;
        //var hash = routerHash || location.hash;  这样子比上面的好

        var obj = {
            url:'',
            param: {}
        };
        var param = {},url='';
        var pIndex = hash.indexOf('?');
        if(hash===''){
            return obj;
        }

        if(pIndex>-1){
            url = hash.substring(1,pIndex);
            var paramStr = hash.substring(pIndex+1);
            var paramArr = paramStr.split('&');
            
            $.each(paramArr,function(i,e){
                var item = e.split('='),
                    key,
                    val;
                key = item[0];
                val = item[1];
                if(key!==''){
                    param[key] = decodeURIComponent(val);
                }
            });
        }
        else{
            url = hash.substring(1);
            param = {};
        }
        return {
            url:url,
            param: param
        };
    };
    function routerAction (routeObj){
        var routerItem = vipspa.routerMap[routeObj.url];
        // 没有找到hash
        if(typeof routerItem==='undefined'){
            var defaultsRoute = vipspa.routerMap.defaults;
            routerItem = vipspa.routerMap[defaultsRoute];
            location.hash = defaultsRoute;
            return false;
        }
        
        $.ajax({
            type: 'GET',
            url: routerItem.templateUrl,
            dataType: 'html',
            success: function(data, status, xhr){
                $(vipspa.mainView).html(data);
                loadScript(routerItem.controller);
            },
            error: function(xhr, errorType, error){
                if($(vipspa.errorTemplateId).length===0){
                    return false;
                }
                var errHtml = $(vipspa.errorTemplateId).html();
                errHtml = errHtml.replace(/{{errStatus}}/,xhr.status);
                errHtml = errHtml.replace(/{{errContent}}/,xhr.responseText);
                $(vipspa.mainView).html(errHtml);
            }
        });
    }
   
    function startRouter  () {
        var hash = location.hash;
        var routeObj = vipspa.parse(hash);
        routerAction(routeObj);
    }
    
    function loadScript(src, callback) {
        
        var script = document.createElement('script'),
            loaded;
        script.setAttribute('src', src);
        /* script.onreadystatechange =  */script.onload = function() {
            //script.onreadystatechange = null;
            document.documentElement.removeChild(script);
            script = null;
            if (!loaded) {
                if(typeof callback==='function')
                    callback();
            }
            loaded = true;
        };
        document.documentElement.appendChild(script);
    }

    window.vipspa = new Vipspa();
})();