(function (global, oDOC, handler) {

    var AUTO_CDN_URL = '//cdn.loc.gov';

    var CDN_URL = 		global.CDN_URL||AUTO_CDN_URL;
    var LAB_URL = 		global.LAB_URL||CDN_URL+'/js/LAB-2.0.3.min.js';
    var SHARE_URLS = 	global.SHARE_URLS||{
        JQUERY: 		global.JQUERY||CDN_URL+'/js/lib/jquery-1.7.2.min.js',
        JQUERY_UI: 		global.JQUERY_UI||CDN_URL+'/js/lib/jquery-ui-1.8.10.min.js',
        JQUERY_UI_CSS: 	global.JQUERY_UI_CSS||CDN_URL+'/css/plugins/jquery-ui-themes/base/jquery.ui.all-min.css',
        LIVEQUERY: 		global.LIVEQUERY||CDN_URL+'/js/lib/jquery.livequery-1.1.1.js',
        CLAYPOOL: 		global.CLAYPOOL||CDN_URL+'/js/lib/jquery.claypool-1.2.8-lite.min.js',
        JQUERY_UTILS: 	global.JQUERY_UTILS||CDN_URL+'/js/plugins/jquery.utils-1.0.js',
        SHARE: 			global.SHARE||CDN_URL+'/share/share-1.9.15.min.js',
        SHARE_CSS: 		global.SHARE_CSS||CDN_URL+'/share/share-1.9.15.min.css'
    };
    
    var head = oDOC.head || oDOC.getElementsByTagName("head");

    function LABjsLoaded() {
            $LAB.setGlobalDefaults({
                AllowDuplicates: false,
                AlwaysPreserveOrder: true
            })
            .script(function(){
                if(!global.jQuery){
                    return SHARE_URLS.JQUERY;
                }
            })
            .script(function(){
                if(!global.jQuery || !global.jQuery.ui){
                    loadCSS(SHARE_URLS.JQUERY_UI_CSS);
                    return SHARE_URLS.JQUERY_UI;
                }
            })
            .script(function(){
                if(!global.jQuery || !global.jQuery.livequery){
                    return SHARE_URLS.LIVEQUERY;
                }
            })
            .script(function(){
                if(!global.Claypool){
                    return SHARE_URLS.CLAYPOOL;
                }
            })
            .script(function(){
                if(!global.jQuery || !global.jQuery.json2js) {
                    return SHARE_URLS.JQUERY_UTILS;
                }
            })
            .script(function(){
                if(!global.LOCShare){
                    loadCSS(SHARE_URLS.SHARE_CSS);
                    return SHARE_URLS.SHARE;
                }
            })
            .script(function(){
                if(!global.LOCShare){
                    return SHARE_URLS.SITE;
                }
            }).wait(function(){
                global.jQuery(document).trigger('locshare-boot');
            });
        }
	
    //don't load css in wait callback!! Wont work in IE8
    //and you actually want the css for the widget 
    //to load early
    function loadCSS(url){
	 	var link = document.createElement("link");
		link.setAttribute("rel","stylesheet");
		link.setAttribute("type","text/css");
		link.setAttribute("href",url);
        if ("item" in head) {
            // reassign from live node list ref to pure node ref -- 
            // avoids nasty IE bug where changes to DOM invalidate live 
            // node lists
            head = head[0]; 
        }
		head.appendChild(link);
    }
    
	if (!global.$LAB) {
        // loading code borrowed directly from LABjs itself
        setTimeout(function(){
            if ("item" in head) { // check if ref is still a live node list
                if (!head[0]) { // append_to node not yet ready
                    setTimeout(arguments.callee, 25);
                    return;
                }
                // reassign from live node list ref to pure node ref -- 
                // avoids nasty IE bug where changes to DOM invalidate live 
                // node lists
                head = head[0]; 
            }
            var scriptElem = oDOC.createElement("script"), scriptdone = false;
            scriptElem.onload = scriptElem.onreadystatechange = function(){
                if ((scriptElem.readyState && 
                     scriptElem.readyState !== "complete" && 
                     scriptElem.readyState !== "loaded") || scriptdone) {
                    return false;
                }
                scriptElem.onload = scriptElem.onreadystatechange = null;
                scriptdone = true;
                LABjsLoaded();
            };
            scriptElem.src = LAB_URL;
            head.insertBefore(scriptElem, head.firstChild);
        }, 0);
        
        // required: shim for FF <= 3.5 not having document.readyState
        if (oDOC.readyState == null && oDOC.addEventListener) {
            oDOC.readyState = "loading";
            oDOC.addEventListener("DOMContentLoaded", handler = function(){
                oDOC.removeEventListener("DOMContentLoaded", handler, false);
                oDOC.readyState = "complete";
            }, false);
        }
    } else {
        LABjsLoaded();
    }
	
})(window, document);

Site = { Plugins: {
    share: function($){
        $.env({ 
            defaults:{ locshare:{
                root:'/share/',
                app_id:'spe5RA7u',
                site_name: 'Ask a Librarian',
                subscribe_url: '/share/sites/ask-a-librarian/subscribe.php'
            }}
        });
    }
} };