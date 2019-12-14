// /* Simple JavaScript Inheritance
//  * By John Resig http://ejohn.org/
//  * MIT Licensed.
//  */
// // Inspired by base2 and Prototype
(function ()
{
    "use strict";

    window.copy = function(object)
    {
        var c = null;

        if(!object || typeof (object) !== 'object' || (typeof HTMLElement !== 'undefined' && object instanceof HTMLElement) || object instanceof Class || (typeof THREE !== 'undefined' && object instanceof THREE.Object3D) || (typeof jQuery !== 'undefined' && object instanceof jQuery))
        {
            return object;
        }
        else if(object instanceof Array)
        {
            c = [];
            for(var i = 0, l = object.length; i < l; i++)
            {
                c[i] = copy(object[i]);
            }

            return c;
        }
        else
        {
            c = {};
            for(var i in object)
            {
                c[i] = copy(object[i]);
            }

            return c;
        }
    };

    window.merge = function (original, extended)
    {
          for(var key in extended)
          {
              var ext = extended[key];
              if(typeof (ext) !== 'object' || ext instanceof HTMLElement || ext instanceof Class || (typeof THREE !== 'undefined' && ext instanceof THREE.Object3D) || (typeof ext !== 'undefined' && ext instanceof jQuery))
              {
                  original[key] = ext;
              }
              else
              {
                  if(!original[key] || typeof (original[key]) !== 'object')
                  {
                      original[key] = (ext instanceof Array) ? [] : {};
                  }
                  merge(original[key], ext);
              }
          }
          return original;
      };

    var initializing = false,
        fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\b_super\b/ : /.*/;
    window.Class = function () {};
    var inject = function (prop) {
        var proto = this.prototype;
        var _super = {};
        for(var name in prop)
        {
            if(typeof (prop[name]) === "function" && typeof (proto[name]) === "function" && fnTest.test(prop[name]))
            {
                _super[name] = proto[name];
                proto[name] = (function (name, fn)
                {
                    return function()
                    {
                        var tmp     = this._super;
                        this._super = _super[name];
                        var ret     = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]);
            }
            else
            {
                proto[name] = prop[name];
            }
        }
    };
    window.Class.extend = function(prop)
    {
        var _super    = this.prototype;
        initializing  = true;
        var prototype = new this();
        initializing  = false;
        for(var name in prop)
        {
            if(typeof (prop[name]) === "function" && typeof (_super[name]) === "function" && fnTest.test(prop[name]))
            {
                prototype[name] = (function(name, fn)
                {
                    return function()
                    {
                        var tmp     = this._super;
                        this._super = _super[name];
                        var ret     = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]);
            }
            else
            {
                prototype[name] = prop[name];
            }
        }

        function Class() {
            if(!initializing)
            {
                if(this.staticInstantiate)
                {
                    var obj = this.staticInstantiate.apply(this, arguments);
                    if (obj)
                    {
                        return obj;
                    }
                }
                for(var p in this)
                {
                    if (typeof (this[p]) === 'object')
                    {
                        this[p] = copy(this[p]);
                    }
                }
                if(this.init)
                {
                    this.init.apply(this, arguments);
                }
            }
            return this;
        }
        Class.prototype             = prototype;
        Class.prototype.constructor = Class;
        Class.extend                = window.Class.extend;
        Class.inject                = inject;
        return Class;
    };
})();

var APP = {};
APP.CORE = {};
APP.TOOLS = {};
APP.COMPONENTS = {};

//http://html5.by/blog/what-is-requestanimationframe/
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

// Polyfill Object.assign
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target, firstSource) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

!function () {
    "use strict";
    /*! npm.im/one-event */
    function e(e, n, t, o) {
        e.addEventListener(n, t, o), e.addEventListener(n, function r() {
            e.removeEventListener(n, t, o), e.removeEventListener(n, r, o)
        }, o)
    }

    function n() {
        return window.pageYOffset || document.body.scrollTop
    }

    function t() {
        return window.pageXOffset || document.body.scrollLeft
    }

    function o() {
        e(window, "scroll", scrollTo.bind(window, t(), n()))
    }

    e.promise = function (n, t, o) {
        return new Promise(function (r) {
            return e(n, t, r, o)
        })
    };
    var r = "auto";
    "scrollRestoration" in history || Object.defineProperty(history, "scrollRestoration", {
        enumerable: !0,
        get: function () {
            return r
        },
        set: function (e) {
            e !== r && ("auto" === e ? (window.removeEventListener("popstate", o), r = e) : "manual" === e && (window.addEventListener("popstate", o), r = e))
        }
    })
}();

(function()
{
    'use strict';

    APP.CORE.Abstract = Class.extend(
    {
        options: {},

        /**
         * INIT
         */
        init: function(options)
        {
            if(typeof options === 'undefined')
                options = {};

            this.$ = {};

            this.options = merge(this.options, options);
        },

        /**
         * START
         */
        start: function()
        {

        },

        /**
         * IGNITE DAT FIRE!
         */
        ignite: function()
        {
            return this.start();
        },

        /**
         * DESTROY
         */
        destroy: function()
        {

        }
    });
})();

(function()
{
    'use strict';

    APP.CORE.Event_Emitter = APP.CORE.Abstract.extend(
    {
        options: {},

        /**
         * INIT
         */
        init : function( options )
        {
            this._super( options );

            this.callbacks      = {};
            this.callbacks.base = {};
        },

        /**
         * ON
         */
        on : function( name, action )
        {
            // Errors
            if( typeof name === 'undefined' || name === '' )
            {
                console.warn( 'Wrong name' );
                return false;
            }

            if( typeof action === 'undefined' )
            {
                console.warn( 'Wrong action' );
                return false;
            }

            var that  = this,
                names = [];

            // Clean
            name  = name.replace( /[^a-zA-Z0-9 ,\/.]/g,'' );
            name  = name.replace( /[,\/]+/g,' ' );

            // Split
            names = name.split( ' ' );

            // Each name
            names.forEach( function( name )
            {
                name = that.resolve_name( name );

                // Create tag if not exist
                if( !( that.callbacks[ name.tag ] instanceof Object ) )
                    that.callbacks[ name.tag ] = {};

                // Create action if not exist
                if( !( that.callbacks[ name.tag ][ name.value ] instanceof Array ) )
                    that.callbacks[ name.tag ][ name.value ] = [];

                // Add action
                that.callbacks[ name.tag ][ name.value ].push( action );
            });

            return this;
        },

        /**
         * OFF
         */
        off : function( name )
        {
            // Errors
            if( typeof name === 'undefined' || name === '' )
            {
                console.warn( 'Wrong name' );
                return false;
            }

            var that  = this,
                names = [];

            // Clean
            name  = name.replace( /[^a-zA-Z0-9 ,\/.]/g,'' );
            name  = name.replace( /[,\/]+/g,' ' );

            // Split
            names = name.split( ' ' );

            // Each name
            names.forEach( function( name )
            {
                name = that.resolve_name( name );

                // Remove tag
                if( name.tag !== 'base' && name.value === '' )
                {
                    delete that.callbacks[name.tag];
                }

                // Remove specific action in tag
                else
                {
                    // Default
                    if( name.tag === 'base' )
                    {
                        // Try to remove from each tag
                        for( var tag in that.callbacks )
                        {
                            if( that.callbacks[ tag ] instanceof Object && that.callbacks[ tag ][ name.value ] instanceof Array )
                            {
                                delete that.callbacks[ tag ][ name.value ];

                                // Remove tag if empty
                                if( Object.keys(that.callbacks[ tag ] ).length === 0 )
                                    delete that.callbacks[ tag ];
                            }
                        }
                    }

                    // Specified tag
                    else if( that.callbacks[ name.tag ] instanceof Object && that.callbacks[ name.tag ][ name.value ] instanceof Array )
                    {
                        delete that.callbacks[ name.tag ][ name.value ];

                        // Remove tag if empty
                        if( Object.keys( that.callbacks[ name.tag ] ).length === 0 )
                            delete that.callbacks[ name.tag ];
                    }
                }
            });

            return this;
        },

        /**
         * TRIGGER
         */
        trigger : function( name, args )
        {
            // Errors
            if( typeof name === 'undefined' || name === '' )
            {
                console.warn( 'Wrong name' );
                return false;
            }

            var that         = this,
                final_result = undefined,
                result       = undefined;

            // Default args
            if( !( args instanceof Array ) )
                args = [];

            name = that.resolve_name( name );

            // Clean (need some work)
            name.value = name.value.replace( /[^a-zA-Z0-9 ,\/.]/g, '' );
            name.value = name.value.replace( /[,\/]+/g, ' ' );

            // Default tag
            if( name.tag === 'base' )
            {
                // Try to find action in each tag
                for( var tag in that.callbacks )
                {
                    if( that.callbacks[ tag ] instanceof Object && that.callbacks[ tag ][ name.value ] instanceof Array )
                    {
                        that.callbacks[ tag ][ name.value ].forEach( function( action )
                        {
                            result = action.apply( that,args );

                            if( typeof final_result === 'undefined' )
                                final_result = result;
                        } );
                    }
                }
            }

            // Specified tag
            else if( this.callbacks[ name.tag ] instanceof Object )
            {
                if( name.value === '' )
                {
                    console.warn( 'Wrong name' );
                    return this;
                }

                that.callbacks[ name.tag ][ name.value ].forEach( function( action )
                {
                    result = action.apply( that, args );

                    if( typeof final_result === 'undefined' )
                        final_result = result;
                });
            }

            return final_result;
        },

        /**
         * TRIGGA NIGGA WUT
         */
        trigga : function( name, args )
        {
            return this.trigger( name, args );
        },

        /**
         * CLEAN NAME
         */
        clean_name : function( name )
        {
            name = name.toLowerCase();
            name = name.replace( '-', '_' );

            return name;
        },

        /**
         * RESOLVE NAME
         */
        resolve_name : function( name )
        {
            var new_name = {},

            parts = name.split( '.' );

            new_name.original = name;
            new_name.value    = parts[ 0 ];
            new_name.tag      = 'base'; // Base tag

            // Specified tag
            if( parts.length > 1 && parts[ 1 ] !== '' )
                new_name.tag = parts[ 1 ];

            return new_name;
        }
    } );
} )();

(function () {
    'use strict';

    APP.CORE.App = APP.CORE.Abstract.extend({
        options: {
            page: 'home'
        },

        /**
         * INIT
         */
        init: function (options) {
            this._super(options);

            this.page = null;
            this.can_navigate = true;
            this.mapsLoaded = false;
            this.ticker = new APP.TOOLS.Ticker();
            this.browser = new APP.TOOLS.Browser({
                disable_hover_on_scroll: false,
                add_classes_to: ['']
            })
            this.navigation = new APP.TOOLS.Navigation();
            this.mouse = new APP.TOOLS.Mouse();
            // this.footer = new APP.COMPONENTS.Footer();
            this.$ = {};

            this.$.body = $('body');
            this.$.title = $('head title');


            this.initStateAudio();
            this.initAudioAnimation();

            this.initPage(this.options.page);

            this.loadGoogleMaps();
            this.updateAudioAnimation();

            this.handlerOrientations();


            this.initAjax();
            this.initColumns();
            this.initLoader()


            this.gMapsCallback = this.gMapsCallback.bind(this);
            window.googleMapsInitialized = this.gMapsCallback;

        },

        /**
         * START
         */
        start: function () {
            this.browser.start();
            this.ticker.start(true);
        },

        initLoader: function () {

            if (this.browser.mobile.all) {
                return false;
            }


            var i = 0;
            var loader = document.getElementById('preloader');
            var dateUpdate = Date.now();
            $('.column').imagesLoaded()
                .always( function() {
                    $('#preloader').fadeOut("slow");

                    setTimeout(function () {
                        $('#preloader').remove();
                    },700);

                })
                .progress(function (instance, image) {
                    var date = Date.now(),
                        amount = 0;
                    if (date - dateUpdate < 300) {
                        amount = amount + date - dateUpdate;
                    }
                    var count = instance.images.length;
                    i++;
                    var result = image.isLoaded ? 'loaded' : 'broken';
                    var percentLoaded = parseInt(((i / count) * 100));
                    loader.getElementsByClassName('loader-line')[0].style.width = percentLoaded + '%';
                    loader.getElementsByClassName('loader-percent')[0].innerHTML = '<span>' + percentLoaded + '</span>%';
                });

        },
        initStateAudio: function () {


            // off audio mobile
            if (this.browser.mobile.all) {
                return false;
            }

            this.audio = document.getElementById("audio");

/*            if (typeof(localStorage.getItem("audio")) === 'undefined' || localStorage.getItem('audio') === null) {
                localStorage.setItem('audio', 'running');
            }*/

/*            if (localStorage.getItem("audio") === 'running') {
                this.audio.play();
            }*/

            this.audio.loop = true;
            this.audio.volume = 0.08;
        },
        initAudioAnimation: function () {

            //off animation mobile
            if (this.browser.mobile.all) {
                return false;
            }

            this.sheet = document.createElement('style');
            this.sheet.type = 'text/css';
            this.$.body.append(this.sheet);
            this.animationAudio = document.querySelectorAll(".animation-audio-menu > .linecol");
        },
        updateAudioAnimation: function () {

            //off  update audioAnimation mobile init object page
            if (this.browser.mobile.all) {
                return false;
            }
            var self = this, itemAnimation = {}, state = '';
            itemAnimation = this.animationAudio;
            state = this.page.state;

            this.audioAnimation(itemAnimation, state);

            this.page.on('animation_audio', function (state) {
                self.audioAnimation(itemAnimation, state);
                if (state === 'paused') {
                    self.audio.pause();
                } else {
                    self.audio.play();
                }
            });
        },
        gMapsCallback: function () {
            this.mapsLoaded = true;
            this.page.trigger('maps_loaded');
        },
        loadGoogleMaps: function () {
            if (this.page.type !== 'contact') {
                return false;
            }


            if (this.mapsLoaded) return this.gMapsCallback();

            var script_tag = document.createElement('script');
            script_tag.setAttribute("type", "text/javascript");
            script_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8Nq1S-PgvBlbSeA7H4dnww_sfBRrVk70&callback=googleMapsInitialized");
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
        },
        /**
         * INIT PAGE
         */
        initPage: function (pageName) {
            var self = this,
                page = null;

            switch (pageName) {
                case 'home':
                    page = new APP.COMPONENTS.Home();
                    break;
                case 'contact':
                    page = new APP.COMPONENTS.Contact();
                    break;
                case 'portfolio':
                    page = new APP.COMPONENTS.Portfolio();
                    break;
                case 'portfolio_app':
                    page = new APP.COMPONENTS.PortfolioApp();
                    break;
                case 'cases':
                    page = new APP.COMPONENTS.Cases();
                    break;
                case 'about':
                    page = new APP.COMPONENTS.About();
                    break;
                case 'page':
                    page = new APP.COMPONENTS.Page();
                    break;
            }

            if (page === null) {
                console.log('Not init Class');
            }

            this.page = page;
        },


        handlerOrientations: function () {
            var self = this;

            this.browser.on('resize', function (width, height) {
                self.page.trigger('resize', [width, height]);
            });

            this.browser.on('scroll', function (top) {
                self.page.trigger('scroll', [top]);
            });

            this.browser.on('breakpoint', function (pointCurrent) {
                self.page.trigger('breakpoint', [pointCurrent]);
            });

            this.mouse.on('wheel', function (delta) {
                self.page.trigger('sections', [delta]);
            });

            this.browser.on('touch', function (start, end) {
                if (start > end) {
                    self.page.trigger('sections', [-1]);
                } else if (end > start) {
                    self.page.trigger('sections', [1]);
                }
            });
        },

        /**
         * INIT AJAX
         */
        initAjax: function ($container) {
            var self = this;

            this.ajax = {};
            this.ajax.$links = $();
            this.ajax.instance = null;

            this.beforeUpdateAjax();

            self.navigation.on('pop', function (state, url, direction) {

                // Load and force because url = window.location.href
                self.load(url, true, state);
            });
        },

        /**
         *  BEFORE  UPDATE AJAX
         */
        beforeUpdateAjax: function ($container) {
            var self = this;
            $container = $container || $('body');

            // Remove previous event listener
            this.ajax.$links.off('click.ajax');

            // Find ajax links
            this.ajax.$links = $container.find('a.ajax');

            // Ajax links click event
            this.ajax.$links.on('click.ajax', function () {
                var $this = $(this);
                // test if ajax already running
                if (!self.ajax.instance) {

                    self.page.trigger('before_ajax');

                    setTimeout(function () {
                        self.load($this.attr('href'), false);
                    }, 100);

                }
                return false;
            });
        },

        afterUpdateAjax: function () {

            if (this.browser.breakpoints.current != null) {
                this.page.trigger('breakpoint', [this.browser.breakpoints.current]);
            }


            this.updateAudioAnimation();
            this.loadGoogleMaps();

            this.page.trigger('after_ajax');

        },

        /**
         * LOAD
         */
        load: function (url, from_pop, state) {
            var that = this;

            if (!from_pop) {
                this.loadContent(url, from_pop)
            } else {
                this.loadHistory(url, state);
            }


        },
        loadContent: function (url, from_pop) {
            var that = this;

            // Prevent navigation
            this.can_navigate = false;


            // Prepare columns //
            var $column = $('<div class="column">').css({display: "none"});

            setTimeout(function () {
                that.$.columns.addClass('zoom-out-sm');
            }, 5);

            that.updateStyleColumns();

            that.$.columns.find('.column');


            // Ajax call
            this.ajax.instance = $.ajax({
                url: url,
                localCache: false,
                cacheTTL: 0.5,
                error: function (res) {
                    that.ajax.instance = null;
                }
            });


            this.ajax.instance.fail(function () {
                that.ajax.instance = null;
            });


            this.ajax.instance.done(function (res) {

                // Set column
                var $content = $(res);
                $content = $content.find('.column');
                that.removeSrcImage($content);
                $column.append($content.html());

                window.setTimeout(function () {

                    // Identification  page
                    var page = $content.data('type'),
                        title = $content.data('title'),
                        body = $content.data('body');

                    that.$.body.removeClass().addClass(body);

                    that.$.columns.append($column);

                    // Update ajax/
                    that.beforeUpdateAjax(that.$.columns);

                    // Deactivate page
                    if (that.page)
                        that.page.active = false;

                    // Navigation push
                    if (!from_pop)
                        that.navigation.push({ title: document.title, position:window.pageYOffset }, url);

                    document.title = title;


                    that.$.columns.find('.column').not($column).remove();

                    that.initPage(page);

                        if (that.$.columns.find('.portfolio-page').length > 0) {
                            that.$.columns.find('.portfolio-page').imagesLoaded({background: true}, function () {
                                that.addSrcImage();
                                that.showContent($column, url);
                            });
                        } else {
                            that.showContent($column, url);
                        }
                }, 240);
            });
        },

        showContent: function ($column, url) {
            var that = this;

            window.setTimeout(function () {

                that.$.columns.removeClass('zoom-out-sm').addClass('zoom-in-sm');
                setTimeout(function () { $('.loader.active').remove() }, 200);

                $column.css({display: "block"});

                if ('positionElement' in that.page) {

                    var $destination = $(that.page.positionElement).offset().top;
                    window.scrollTo(0, $destination);

                }

                // Allow navigation
                that.can_navigate = true;
                that.afterUpdateAjax();

                that.ajax.instance = null;


            }, 450);
        },

        loadHistory: function (url, state ) {

            var that = this;

            // Prevent navigation
            this.can_navigate = false;

            // Prepare columns //
            var $column = $('<div class="column">').css({display: "none"});
            that.$.columns.find('.column');


          //  alert('Test 1');
            console.log('прошло');

            // Ajax call
            this.ajax.instance = $.ajax({
                url: url,
                localCache: true,
                cacheTTL: 0.5,
                error: function (res) {
                    that.ajax.instance = null;
                }
            });


            this.ajax.instance.fail(function () {
                that.ajax.instance = null;
            });


            this.ajax.instance.done(function (res) {

               // alert('Test 2');

                that.$.columns.removeAttr('style').removeClass('zoom-in-sm');
             /*   that.$.columns.removeAttr('style').removeClass('zoom-in-sm');
                that.$.columns.html('<div style="width:100%; height:100%; background-color: white">TEST 5</div>');
                return false;*/

              /*  window.setTimeout(function () {*/
                    // Set column
                    var $content = $(res);
                    $content = $content.find('.column');


                    $column.append($content.html());

                    // Identification  page
                    var page = $content.data('type'),
                        title = $content.data('title'),
                        body = $content.data('body');

                    that.$.body.removeClass().addClass(body);

                    that.$.columns.append($column);

                    // Update ajax/
                    that.beforeUpdateAjax(that.$.columns);

                    // Deactivate page
                    if (that.page)
                        that.page.active = false;

                    document.title = title;


                    that.$.columns.find('.column').not($column).remove();

                    that.initPage(page);

                 /*   window.setTimeout(function () {*/

                       // that.$.columns.removeClass('zoom-out-sm').addClass('zoom-in-sm');

                        $column.css({display: "block"});



                            var $destination = state.position
                            window.scrollTo(0, $destination);


                        // Allow navigation
                        that.can_navigate = true;
                        that.afterUpdateAjax();

                        that.ajax.instance = null;

                  /*  }, 50);*/

              /*  }, 40);*/
            });

        },

        addSrcImage: function(){

            this.$.columns.find('img').each(function(index,item){
                var $item = $(item),
                    $src = $item.attr('data-src');
                $item.attr('src',$src);
            });

            this.$.columns.find('source').each(function(index,item){
                var $item = $(item),
                    $src = $item.attr('data-src');
                $item.attr('srcset',$src);
            });
        },
        removeSrcImage: function($content){

            if( $content.find('.portfolio-page').length > 0){
                $content.find('img').each(function(index,item){
                    var $item = $(item),
                        $src = $item.attr('src');
                    $item.removeAttr('src').attr('data-src',$src);
                });

                $content.find('source').each(function(index,item){
                    var $item = $(item),
                        $src = $item.attr('srcset');
                    $item.removeAttr('srcset').attr('data-src',$src);
                });
            }

            return $content;
        },
        /**
         * INIT COLUMNS
         */
        initColumns: function () {
            this.$.columns = $('.columns');
            this.updateStyleColumns();
        },

        updateStyleColumns: function () {

            if(this.$.columns.attr('style') > 0){
                return true;
            }

            this.$.columns.css({
                'animation-duration': "600ms",
                'opacity': 1,
                '-webkit-animation-fill-mode': 'bot',
                'animation-fill-mode': 'both'

            })
        },
        audioAnimation: function (items, state) {
            var res = '';
            var an = function an(nY, nH, id, dur) {
                var st = state; // paused
                return '\n      .' + id + ' {\n       -webkit-animation: pic' + id + ' ' + dur + ' infinite linear;\n       -webkit-animation-play-state: ' + st + ';\n      }\n      @keyframes pic' + id + ' {\n        50% {\n          y: ' + nY + ';\n          height: ' + nH + 'px;\n        }\n      }\n    ';
            };
            var data = [{
                nY: 23,
                nH: 20,
                dur: '1.2s'
            },
                {
                    nY: 8,
                    nH: 50,
                    dur: '1s'
                },
                {
                    nY: 17,
                    nH: 32,
                    dur: '1s'
                },
                {
                    nY: 6,
                    nH: 54,
                    dur: '1s'
                },
                {
                    nY: 0,
                    nH: 66,
                    dur: '1s'
                },
                {
                    nY: 9,
                    nH: 48,
                    dur: '1s'
                },
                {
                    nY: 21,
                    nH: 24,
                    dur: '1s'
                }];
            Array.prototype.forEach.call(items, function (el, index) {
                if (data[index] != -1) {
                    var d = data[index];
                    res += an(d.nY, d.nH, el.getAttribute("data-rect"), d.dur);
                }
            });

            this.sheet.innerHTML = res;
        },


    });
})();

/* global transformicons, data_forms */
(function () {
    'use strict';

    APP.COMPONENTS.Common = APP.CORE.Event_Emitter.extend(
        {
            init: function (options) {
                this._super(options);

                this.mainContent = $('.column');
                this.$.navLeft = $('.nav-left');
                this.$.navPanel = $('.nav-panel');
                this.$.modal = $('.modal');
                this.state = localStorage.getItem('audio');
                SmoothScroll.enableWheel();

                    if(device.mobile()){
                        this.$.modal.find('.modal-text').remove();
                    }


                this.initEventCommon();
                this.placeholderFiled();
            },
            initEventCommon: function () {
                var self = this;


                /* Open close  navigation menu */
                transformicons.add('.nav-left_toggle');
                this.$.navLeft.on('click', '.nav-left_toggle', function () {
                    self.$.navPanel.toggleClass("nav-panel-open");
                    self.closeModal();
                });
                /* Open close  navigation menu */



                /* Open close modal form */
                this.mainContent.on('click', '.hire-us-open', {self: this}, this.handlerOpenModal);
                this.mainContent.on('click', '.modal-close',{self: this}, this.handlerCloseModal);
                this.mainContent.on('click','.hire-us-left-open, .modal-back',function (e) {
                    e.preventDefault();
                    self.$.navPanel.toggleClass("modal-left-opened");
                });
                this.mainContent.on('mouseup', function (e) {
                    if (!$(e.target).closest(".modal-top-opened").length) {
                        self.closeModal();
                    }
                });
                /* end Open close modal form*/

                this.mainContent.on('click', '.volume-control', {self: this}, this.volumeControl);


                if(window.location.hash && window.location.hash=='#hire-form'){
                    this.mainContent.find('.hire-us-open').trigger('click');
                }


                this.on('before_ajax', function () {
                    this.closeMenu();
                    this.closeModal();
                });


                this.mainContent.find('form').on('click', 'button', function (e) {
                    e.preventDefault();
                    var idForm = $(e.target).closest('form').attr('id');
                    $('#'+idForm).trigger('submit');
                });
                $('#form-callback-footer, #form-callback-modal, #form-callback-menu').on('submit', {self:this}, this.sendForm);
                this.mainContent.find('form').find('.form-group').on( "focus", 'input',function(){
                   var $this = $(this).parent();
                   $this.removeClass('form-error').find('.form-error-text').remove();
                })
            },
            sendForm: function (event) {
                var self = event.data.self,
                    $form = $(event.target).closest('form');

                var $current_box = $('#'+$form.attr('id')),
                    notice = [];

                try {

                    notice = self.filedValidation($current_box);

                    if (notice.length > 0) {
                        throw new SyntaxError('Not true the data entered');
                    }


                    var data = {
                        type: "POST",
                        url: data_forms.ajax_url,
                        data: $(event.target).serialize() + "&action=form_process"
                    }

                    if($('.ns-box').length > 0){
                        $('.ns-box').remove();
                    }


                    var notification = new NotificationFx({
                        message: '<div class="notification"></div><span class="close-notification">' +
                        '<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/themes/azrostudio/img/icons.svg#close"></use>' +
                        '</svg></span>',
                        layout: 'bar',
                        effect: 'exploader',
                        ttl: 9000000,
                        type: 'notice',
                        onClose: function () {
                        }
                    });

                    notification.show();

                    $.ajax(data).done(function (data) {
                        if(data.success != undefined  ){
                            $(document).find('.notification').append(data.success);
                            self.clearFiled($current_box);
                        } else if (data.error != undefined ){
                            $(document).find('.notification').addClass('error').append(data.error);
                        }
                    });


                } catch (err) {
                    var divError = $('.form-error').first();
                }
                event.preventDefault();
            },
            filedValidation: function ($current_box) {
                var self = this,
                    notice = [];

                /*clear div validation*/
                $current_box.find('.ui-required').removeClass('form-error').find('.form-error-text').remove();




                $current_box.find('.ui-required:not(.hidden) input').each(function (index, item) {
                    var $item = $(item);
                    if (self.isRequired($item.val())) {
                        notice.push({name: $item.attr('name')});
                        $item.closest('div').addClass('form-error').append('<span class="form-error-text">'+ data_forms.i18n.field_required + '</span>');
                    }
                })



                if (notice.length > 0)
                    return notice;


                var $email = $current_box.find('input[type=email]');

                if ( !self.isValidEmailAddress($email.val())) {
                    notice.push({name: $email.attr('name')});
                    $email.closest('div').addClass('form-error');
                }

                return notice;
            },
            isRequired: function (value) {

                if (value.trim() === '') {
                    return true;
                }
            },
            isValidEmailAddress: function (emailAddress) {
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                return pattern.test(emailAddress);
            },
            clearFiled: function ($form) {
                $form.find('input[type=text],input[type=email],input[type=tel] ').val('');
            },
            handlerOpenModal: function (e) {
                var self = e.data.self;

                self.$.modal.toggleClass("modal-top-opened");
                self.closeMenu();
                e.preventDefault();
            },
            handlerCloseModal:function(e){
                var self = e.data.self;
                self.closeModal();
                e.preventDefault();
            },
            closeMenu:function(){

                if (this.$.navPanel.hasClass('nav-panel-open')) {
                    this.$.navPanel.removeClass('nav-panel-open');
                    transformicons.toggle('.nav-left_toggle');
                }
            },
            closeModal: function () {
                if (this.$.modal.hasClass('modal-top-opened')) {
                    this.$.modal.removeClass("modal-top-opened");
                }
            },
            volumeControl: function (e) {
                var self = e.data.self;
                self.state = localStorage.getItem('audio');
                self.state = e.data.self.state === 'running' ? 'paused' : 'running';
                localStorage.setItem('audio', self.state);
                self.trigger('animation_audio', [self.state]);
            },
            placeholderFiled: function () {
                var formControl = $(".form-control"),
                    formGroup = ".form-group",
                    formGroupFocus = "form-group-focus";

                formControl.focus(function () {
                    $(this).closest(formGroup).addClass(formGroupFocus);
                });

                formControl.blur(function () {
                    $(this).closest(formGroup).removeClass(formGroupFocus);
                });
            }
        });
})();





(function () {
    'use strict';

    APP.COMPONENTS.Home = APP.COMPONENTS.Common.extend(
        {
            /**
             * INIT
             */
            init: function (options) {
                this._super(options);

                this.type = 'home';
                this.positionElement = 'body';
                this.browser = new APP.TOOLS.Browser();

                // this.$.video = $('#movie');

                var self = this;
                this.video = document.getElementsByTagName('video')[0];

                /*      this.video.addEventListener('progress',function() {

                 if (!self.video.buffered || !self.video.buffered.length) { return; }

                 var percentLoaded = parseInt(((self.video.buffered.end(0) / self.video.duration) * 100));
                 // loader.style.width = percentLoaded+'%';
                 console.log('xxx');
                 //     loader[0].getElementsByClassName('loader-percent')[0].innerHTML = '<span>'+ percentLoaded +'</span>%';



                 },false);*/

                this.$.window = $(window);

                /*Box section*/
                this.$.homeHeader = $('.home-header');
                this.ourMission = '.our-mission';
                this.$.ourMission = $(this.ourMission);


                this.ourWork = '.our-work';
                this.$.ourWork = $(this.ourWork);

                this.positionWork = '.position-work';
                this.$.positionWork = $('.position-work');

                this.updatePosition();

                this.objectsParalax = {};
                this.listParalax = [
                    'case-children-one-1', 'case-children-two-1',
                    'case-children-one-2', 'case-children-two-2',
                    'case-children-one-3', 'case-children-two-3',
                    'case-children-one-4', 'case-children-two-4'];

                this.initParallax(this.listParalax);

                this.initEvent();
                this.initSlide();

                 this.playVideo('play');


            },
            initEvent: function () {
                var self = this;

                this.on('after_ajax', function () {
                    $('html').addClass('no-scroll');
                    this.updatePosition();
                });





                if(window.location.hash && window.location.hash=='#hire-form'){





                  /*  for (var i = 1; i < 4; i++) {
                        var scroll = function (n) {
                            setTimeout(function () {
                                if(n === 3){

                                    $('html, body').animate({
                                        scrollTop: $('#form-callback-footer').offset().top
                                    }, 800, function () {
                                    });
                                } else {
                                    self.trigger('sections', [-1]);
                                }
                            }, 900 * n)
                        }
                        scroll(i);
                    }*/
                }

                this.on('scroll', function (top) {

                    console.log(top);
                    if (top > self.ourMissionPosition) {
                        self.$.ourMission.addClass('main-nav-fixed');
                    } else {
                        self.$.ourMission.removeClass('main-nav-fixed');
                    }
                })
            },
            playVideo: function (state) {

                if (this.browser.mobile.all)
                    return false;

                if (state === 'play' && this.video.paused) {
                    this.video.play();
                } else if (state === 'pause' && !this.video.paused) {
                    this.video.pause();
                }
            },
            initParallax: function (listParallax) {
                var self = this;
                if (this.browser.mobile.all)
                    return false

                listParallax.forEach(function (item) {
                    if (document.getElementById(item))
                        self.objectsParalax[item] = new Parallax(document.getElementById(item));
                })
            },
            enableParallax: function () {
                if ($.isEmptyObject(this.objectsParalax))
                    return false;

                for (var key in this.objectsParalax) {
                    this.objectsParalax[key].enable();
                }
            },
            disableParallax: function (listParallax) {
                if ($.isEmptyObject(this.objectsParalax))
                    return false;

                for (var key in this.objectsParalax) {
                    this.objectsParalax[key].disable();
                }

            },
            initSlide: function () {
                this.canScroll = true;
                this.section = 1;
                this.afterSectionLoadsId = 0;
                SmoothScroll.disableWheel();

                this.on('sections', this.mouseWheelHandler);
                this.$.ourMission.on('click', 'a.next-layer', {self: this}, function (e) {
                    var self = e.data.self
                    self.canScroll = false;
                    self.moveSectionDown();
                    self.performMovement();
                    e.preventDefault();
                })
            },
            mouseWheelHandler: function (delta) {

                var positionScroll = this.$.window.scrollTop();

                if (this.section === 1 || this.section === 2) {
                    positionScroll = 0;
                }

                if (positionScroll > 0) {
                    return false;
                }

                if (this.canScroll) {

                    this.canScroll = false;
                    if (delta > 0) {
                        this.moveSectionUp();
                        this.performMovement();
                    } else {
                        this.moveSectionDown();
                        this.performMovement();
                    }


                }


            },
            moveSectionUp: function () {

                var self = this;
                if (this.section === 3) {
                    this.section = 2;
                    this.disableParallax(this.listParalax);
                    this.$.ourWork.removeClass('active-work');
                    this.$.ourMission.addClass('second-active');
                }
                else if (this.section === 2) {
                    this.section = 1;

                    this.$.ourMission.removeClass('block-out second-active');
                    this.$.homeHeader.removeClass('header-out');

                    setTimeout(function () {
                        self.playVideo('play');
                    }, 810);

                    /*  this.$.ourMission.removeClass('second-active');*/


                } else if (this.section === 1) {

                    this.$.ourMission.removeClass('second-active');
                }
            },
            moveSectionDown: function () {
                if (this.section === 1) {

                    this.section = 2;
                    this.$.homeHeader.addClass('header-out');
                    this.$.ourMission.addClass('second-active block-out');

                    this.playVideo('pause');

                } else if (this.section === 2) {
                    this.section = 3;
                    this.enableParallax(this.listParalax);
                }
            },
            performMovement: function () {
                var self = this;
                if (this.section === 3) {

                    this.$.ourMission.removeClass('second-active');
                    this.$.ourWork.addClass('active-work');
                    setTimeout(function () {
                        SmoothScroll.enableWheel();
                        $('html').removeClass('no-scroll');
                    }, 760);
                }
                else {
                    $('html').addClass('no-scroll');
                    SmoothScroll.disableWheel();
                }

                clearTimeout(this.afterSectionLoadsId);

                this.afterSectionLoadsId = setTimeout(function () {
                    self.canScroll = true;
                }, 850);

            },
            updatePosition: function () {
                this.ourMissionPosition = $(this.ourMission).offset().top;
                this.positionWorkPosition = this.$.positionWork.offset().top;
            }
        });
})();





(function () {
    'use strict';

    APP.COMPONENTS.Contact = APP.COMPONENTS.Common.extend(
        {
            /**
             * INIT
             */
            init: function (options) {
                this._super(options);
                this.type = 'contact';
                this.positionElement = 'h1';
                this.initEvent();

            },
            initEvent: function () {
                var self = this,
                    $maps = $('#map-canvas'),
                    $long = $maps.attr('data-long'),
                    $lat = $maps.attr('data-lat'),
                    $zoom = $maps.attr('data-zoom');

                $zoom = ($zoom != '') ? parseInt($zoom, 10) : 11;


                this.on('after_ajax', function () {
                    $('html').removeClass('no-scroll');
                });

                this.on('maps_loaded', function () {
                    var
                        mapOptions = {
                            // How zoomed in you want the map to start at (always required)
                            zoom: $zoom,

                            // The latitude and longitude to center the map (always required)
                            center: new google.maps.LatLng($lat, $long), // New York

                            // How you would like to style the map.
                            // This is where you would paste any style found on Snazzy Maps.
                            styles:[
                                {
                                    "featureType": "all",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "saturation": 36
                                        },
                                        {
                                            "color": "#a1a1a1"
                                        },
                                        {
                                            "lightness": 40
                                        },
                                        {
                                            "visibility": "on"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "all",
                                    "elementType": "labels.text.stroke",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        },
                                        {
                                            "lightness": 16
                                        }
                                    ]
                                },
                                {
                                    "featureType": "all",
                                    "elementType": "labels.icon",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.country",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.country",
                                    "elementType": "geometry.stroke",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        },
                                        {
                                            "color": "#d1d1d1"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.country",
                                    "elementType": "labels.text",
                                    "stylers": [
                                        {
                                            "visibility": "simplified"
                                        },
                                        {
                                            "color": "#c0c0c0"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.province",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.locality",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.locality",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "visibility": "simplified"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.locality",
                                    "elementType": "geometry.stroke",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.locality",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#c4c4c4"
                                        },
                                        {
                                            "visibility": "simplified"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.locality",
                                    "elementType": "labels.icon",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.neighborhood",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.neighborhood",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#707070"
                                        },
                                        {
                                            "visibility": "simplified"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.land_parcel",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "simplified"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "landscape",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "saturation": "-100"
                                        },
                                        {
                                            "lightness": "-64"
                                        },
                                        {
                                            "gamma": "0.74"
                                        },
                                        {
                                            "weight": "0.01"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "landscape",
                                    "elementType": "geometry.stroke",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        },
                                        {
                                            "lightness": "-59"
                                        },
                                        {
                                            "saturation": "-71"
                                        },
                                        {
                                            "gamma": "0.81"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "lightness": 21
                                        },
                                        {
                                            "visibility": "on"
                                        },
                                        {
                                            "color": "#404040"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi",
                                    "elementType": "labels.text",
                                    "stylers": [
                                        {
                                            "color": "#898787"
                                        },
                                        {
                                            "visibility": "simplified"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi.business",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "color": "#797979"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "geometry.stroke",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#c8c8c8"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.arterial",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#000000"
                                        },
                                        {
                                            "lightness": 18
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.arterial",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "color": "#6b6b6b"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.arterial",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#ffffff"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.arterial",
                                    "elementType": "labels.text.stroke",
                                    "stylers": [
                                        {
                                            "color": "#2c2c2c"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.local",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#000000"
                                        },
                                        {
                                            "lightness": 16
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.local",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "color": "#2c2c2c"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.local",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#999999"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.local",
                                    "elementType": "labels.text.stroke",
                                    "stylers": [
                                        {
                                            "saturation": "-52"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "transit",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#000000"
                                        },
                                        {
                                            "lightness": 19
                                        }
                                    ]
                                }
                            ]

                        },
                        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng($lat, $long),
                            map: map,
                            title: 'Snazzy!'
                        });
                    //   setTimeout(function () {
                    $(window).resize();
                    // google.maps.event.trigger(map, 'resize');

                    //  },500);

                })

            },
        });
})();





(function () {
    'use strict';

    APP.COMPONENTS.Portfolio = APP.COMPONENTS.Common.extend(
        {
            /**
             * INIT
             */
            init: function (options) {
                this._super(options);

                this.browser = new APP.TOOLS.Browser();

                this.type = 'portfolio';
                this.positionElement = '.column';

                this.$.navLeft = $('.nav-left');
                this.direction = '';


                if (this.browser.mobile.all) {
                    this.$.navLeft.addClass('mobile');
                }

                this.windowShowHeight = $(window).height();

                this.$.resultNav = $('.result-nav');
                this.$.navPanel = $('.nav-panel');
                this.$.portfolioHeaderBox = $('.portfolio-header');
                this.$.resultBox = $('.result.container');
                this.$.resultProjectBox = this.$.resultBox.find('.result-project');
                this.$.adaptivityBox = $('.adaptivity');


                this.initEvent();
                this.initScrolling();

                this.$.resultNav.on('click', 'li', {self: this}, function (event) {
                    event.preventDefault();

                    var $this = $(this),
                        self = event.data.self,
                        $parent = $this.closest('.result'),
                        $listImageProject = $parent.find('.result-project'),
                        $listLink = $this.closest('ul').find('li');

                    $listLink.removeClass('active');
                    $this.addClass('active');

                    $listImageProject.removeClass('active');

                    $this.closest('ul').find('li').each(function (index, item) {

                        if ($(item).hasClass('active')) {
                            $listImageProject.eq(index).addClass('active');
                        }
                    });

                    $listImageProject.each(function (index, item) {
                        var $item = $(item);
                        if ($item.hasClass('active')) {

                            if (!self.browser.mobile.all) {
                                if (self.iScrollInstances.length > 0)
                                    self.iScrollInstances[index].refresh();
                            } else {
                                $item.scrollTop(0);
                            }
                        }
                    });
                });
                this.adaptiveInstances = false;

                this.scrollTimeout = { showNavMenu: null };

            },
            initEvent: function () {
                var self = this;

                /* automatic triggered in initialization */
                this.on('breakpoint', function (pointCurrent) {
                    /* update setTimeout when you rebuild document */
                    setTimeout(function () {
                        self.updatePosition(pointCurrent.name);
                    }, 500);
                });


                this.on('after_ajax', function () {
                    $('html').removeClass('no-scroll');
                });

                this.on('resize', function (width, height) {
                    this.windowShowHeight = height;
                })

                this.on('scroll', function (top) {



                    if (this.browser.mobile.all) {
                        this.setInitialPositionBoxResultProjectWhenScrolling(top);
                        this.showNavMenuWhenScrolling(top);
                    }

                });

                this.on('sections', function (delta) {
                    this.direction = delta > 0 ? 'up' : 'down'
                });


            },
            initScrolling: function () {

                this.iScrollInstances = [];
                this.caseInstances = false;
                var self = this,
                    iScrollInstances = {},
                    iScrollOptions = {
                        disablePointer: true,
                        disableTouch: false,
                        disableMouse: false,
                        momentum: true,
                        scrollbars: 'custom',
                        interactiveScrollbars: true,
                        shrinkScrollbars: false,
                        bounce: false,
                    };


                $('.result-project').each(function (index, item) {
                    if (!self.browser.mobile.all) {

                        iScrollInstances = new IScroll(item, iScrollOptions);
                        self.iScrollInstances.push(iScrollInstances);

                    } else {

                        $(item).on('click', function (e) {

                            var $this = $(this);
                            $this.addClass('scrolling');
                            $this.parent().find('.result-touch').removeClass('active');

                            self.caseInstances = true;
                        })
                    }
                });
            },
            updateHeightBoxResultProject: function (pointCurrent) {

                var windowShowHeight = this.windowShowHeight;

                if (pointCurrent != 'large') {
                    windowShowHeight = windowShowHeight - 70;
                } else {
                    windowShowHeight = windowShowHeight - 40;
                }


                this.$.resultProjectBox.css({'height': windowShowHeight});
            },
            /* Устанавливаем исходное положенеи при скролинге */
            setInitialPositionBoxResultProjectWhenScrolling: function (top) {

                if (top > this.setPositioningBottomResultBox && this.direction === 'down' && this.caseInstances) {
                    this.$.resultProjectBox.each(function (index, item) {
                        var $item = $(item)
                        if ($item.hasClass('active')) {
                            $item.scrollTop(0);
                            $item.removeClass('scrolling');
                            $item.parent().find('.result-touch').addClass('active');
                        }
                    });
                    this.caseInstances = false;
                }
            },
            showNavMenuWhenScrolling: function (top) {
                var self = this;

                /* Pattern scroll*/

                if (this.scrollTimeout.showNavMenu) {
                    // clear the timeout, if one is pending
                    clearTimeout(this.scrollTimeout.showNavMenu);
                    this.scrollTimeout.showNavMenu = null;
                }

                this.scrollTimeout.showNavMenu = setTimeout(function () {

                    if (top > self.setPositioningBottomPortfolioHeaderBox) {
                        self.$.navLeft.addClass('fixed');
                    } else {
                        self.$.navLeft.removeClass('fixed');

                    }
                }, 50);

            },
            updatePosition: function (point) {


                this.setPositioningBottomPortfolioHeaderBox = this.$.portfolioHeaderBox.offset().top + this.$.portfolioHeaderBox.height() || 0;

                this.setPositioningBottomResultBox = this.$.resultBox.offset().top + this.$.resultBox.height() || 999999;
                this.updateHeightBoxResultProject(point);


                if (this.iScrollInstances.length > 0) {
                    this.iScrollInstances.forEach(function (item) {
                        item.refresh();
                    })
                }

                this.adaptivePositonTop = this.$.adaptivityBox.offset().top || 99999;

            },
        });
})();





(function () {
    'use strict';

    APP.COMPONENTS.PortfolioApp = APP.COMPONENTS.Common.extend(
        {
            /**
             * INIT
             */
            init: function (options) {
                this._super(options);
                this.type = 'portfolio_app';
                this.positionElement = '.column';

                this.browser = new APP.TOOLS.Browser();


                this.$.portfolioHeaderBox = $('.portfolio-header');
                this.$.navLeft = $('.nav-left');

                if (this.browser.mobile.all) {
                    this.$.navLeft.addClass('mobile');
                }

                this.initEvent();
                this.initSlider();

                this.scrollTimeout = { showNavMenu: null };

            },
            initEvent: function () {
                var self = this;
                this.on('breakpoint', function (pointCurrent) {

                    setTimeout(function () {
                        self.updatePosition();
                    }, 300);


                });

                this.on('after_ajax', function () {
                    $('html').removeClass('no-scroll');
                    this.sliderTop.update(true);
                    this.sliderThumbs.update(true);

                });


                this.on('scroll', function (top) {
                    if (this.browser.mobile.all) {
                        this.showNavMenuWhenScrolling(top);
                    }
                });
            },


            initSlider: function () {





                this.sliderTop = new Swiper(".slider-top", {
                    spaceBetween: 10,
                    nextButton: '.slick-next',
                    prevButton: '.slick-prev'
                });
                this.sliderThumbs = new Swiper(".slider-thumbs", {
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: "auto",
                    touchRatio: 0.2,
                    slideToClickedSlide: true,
                   slidesOffsetBefore: -340,
                });

                this.sliderTop.params.control = this.sliderThumbs;
                this.sliderThumbs.params.control = this.sliderTop;
            },
            showNavMenuWhenScrolling: function (top) {
                var self = this;

                /* Pattern scroll*/

                if (this.scrollTimeout.showNavMenu) {
                    // clear the timeout, if one is pending
                    clearTimeout(this.scrollTimeout.showNavMenu);
                    this.scrollTimeout.showNavMenu = null;
                }

                this.scrollTimeout.showNavMenu = setTimeout(function () {

                    if (top > self.setPositioningBottomPortfolioHeaderBox) {
                        self.$.navLeft.addClass('fixed');
                    } else {
                        self.$.navLeft.removeClass('fixed');

                    }
                }, 50);

            },
            updatePosition: function () {
                this.setPositioningBottomPortfolioHeaderBox = this.$.portfolioHeaderBox.offset().top + this.$.portfolioHeaderBox.height();
               // this.setWitheSliderPreview =
            },
        });

})();





(function () {
    'use strict';

    APP.COMPONENTS.Cases = APP.COMPONENTS.Common.extend(
        {
            /**
             * INIT
             */
            init: function (options) {
                this._super(options);
                this.type = 'cases';

                this.browser = new APP.TOOLS.Browser();

                this.positionElement = 'h2';
                this.mainContent = $('.column');


                this.initEvent();

            },
            initEvent: function () {
                var self = this;


                this.on('after_ajax', function () {
                    $('html').removeClass('no-scroll');
                })

                this.containerCollection();


            },
            containerCollection:function () {

                if (this.browser.mobile.all)
                    return false;

                var $collection = $('.parallax-count');

                $collection.each(function (index,item) {
                    var $item = $(item);
                 //   new Parallax(item);

                    $item.find('.project-content-left').each(function (index,item) {
                        new Parallax(item);
                    })

                    $item.find('.project-content-left').each(function (index,item) {
                        new Parallax(item);
                    })

                    $item.find('.project-content-media').each(function (index,item) {
                        new Parallax(item);
                    })

                })


                   /* $leftCollection = $collection.find('.project-content-left'),
                    $rightCollection = $collection.find('.project-content-right');*/


            }
        });
})();





(function () {
    'use strict';

    APP.COMPONENTS.About = APP.COMPONENTS.Common.extend(
        {
            /**
             * INIT
             */
            init: function (options) {
                this._super(options);
                this.type = 'about';
                this.positionElement = 'h1';

                this.initEvent();

            },
            initEvent: function () {
                var self = this;

                this.on('after_ajax', function () {
                    $('html').removeClass('no-scroll');
                })

            },
        });
})();





/* global data_forms*/
(function () {
    'use strict';

    APP.COMPONENTS.Footer = APP.CORE.Event_Emitter.extend(
        {

            init: function (options) {
                this._super(options);

                this.$.footer = $('footer');
                this.initEvents();
            },
            /**
             * INIT EVENTS
             */
            initEvents: function () {
                var self = this;


                this.$.footer.find('form').on('click', 'button', function (e) {
                    e.preventDefault();
                    $('#form-callback').trigger('submit');
                });

                $('#form-callback').on('submit', {self:this}, this.sendForm);
            },
            sendForm: function (event) {
                var self = event.data.self;

                var $current_box = $('#form-callback'),
                    notice = [];
                try {

                    notice = self.filedValidation($current_box);

                    if (notice.length > 0) {
                        throw new SyntaxError('Not true the data entered');
                    }


                    var data = {
                        type: "POST",
                        url: data_forms.ajax_url,
                        data: $(event.target).serialize() + "&action=form_process"
                    }

                    if($('.ns-box').length > 0){
                        $('.ns-box').remove();
                    }

                    var notification = new NotificationFx({
                        message: '<div class="notification"></div><span class="close-notification">' +
                        '<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/themes/azrostudio/img/icons.svg#close"></use>' +
                        '</svg></span>',
                        layout: 'bar',
                        effect: 'exploader',
                        ttl: 9000000,
                        type: 'notice',
                        onClose: function () {
                        }
                    });

                    notification.show();

                    $.ajax(data).done(function (data) {
                        if(data.success != undefined  ){
                            $(document).find('.notification').append(data.success);
                        } else if (data.error != undefined ){
                            $(document).find('.notification').addClass('error').append(data.error);
                        }
                    });


                } catch (err) {
                    var divError = $('.ui-error-field').first();
                }
                event.preventDefault();
            },
            filedValidation: function ($current_box) {
                var self = this,
                    notice = [];

                /*clear div validation*/
                $('.ui-error-field-text').remove();
                $current_box.find('.ui-required').removeClass('ui-error-field');


                $current_box.find('.ui-required:not(.hidden) input').each(function (index, item) {
                    var $item = $(item);

                    if (self.isRequired($item.val())) {

                        notice.push({name: $item.attr('name')});
                        $item.closest('div').addClass('ui-error-field');
                        $item.after('<span class="ui-error-field-text">Please, fill this field</span>');

                    }
                })

                if (notice.length > 0)
                    return notice;


                var $email = $('input[type=email]');

                if ( $email.parent().hasClass('ui-required') &&  !self.isValidEmailAddress($email.val())) {
                    notice.push({name: $email.attr('name')});
                    $email.closest('div').addClass('ui-error-field');
                }

                return notice;
            },
            isRequired: function (value) {

                if (value.trim() === '') {
                    return true;
                }
            },
            isValidEmailAddress: function (emailAddress) {
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                return pattern.test(emailAddress);
            }
        });
})();





(function () {
    'use strict';

    APP.COMPONENTS.Page = APP.COMPONENTS.Common.extend(
        {
            /**
             * INIT
             */
            init: function (options) {
                this._super(options);
                this.type = 'page';
                this.positionElement = '.column';


                this.initEvent();

            },
            initEvent: function () {
                var self = this;

                this.on('after_ajax', function () {
                    $('html').removeClass('no-scroll');
                })

            },
        });
})();





(function () {
    "use strict";

    APP.TOOLS.Browser = APP.CORE.Event_Emitter.extend(
        {
            options: {
                disable_hover_on_scroll: false,
                disable_hover_on_scroll_duration: 300,
                add_classes_to: [
                    'body'
                ],
                listen_to: [
                    'resize',
                    'scroll',
                    'touch'
                ],
                breakpoints: [
                    {
                        name: 'large',
                        limits: {
                            width: {
                                value: 993,
                                extreme: 'min',
                                included: false
                            }
                        }
                    },
                    {
                        name: 'medium',
                        limits: {
                            width: {
                                value: 993,
                                extreme: 'max',
                                included: true
                            }
                        }
                    },
                    {
                        name: 'small',
                        limits: {
                            width: {
                                value: 414,
                                extreme: 'max',
                                included: true
                            }
                        }
                    }
                ]
            },

            /**
             * SINGLETON
             */
            staticInstantiate: function () {
                if (APP.TOOLS.Browser.prototype.instance === null)
                    return null;
                else
                    return APP.TOOLS.Browser.prototype.instance;
            },

            /**
             * INIT
             */
            init: function (options) {
                this._super(options);

                this.ticker = new APP.TOOLS.Ticker();
                this.top = 0;
                this.left = 0;
                this.direction = {};
                this.direction.x = null;
                this.direction.y = null;
                this.mouse = {};
                this.mouse.x = 0;
                this.mouse.y = 0;
                this.mouse.ratio = {};
                this.mouse.ratio.x = 0;
                this.mouse.ratio.y = 0;
                this.is = null;
                this.version = null;
                this.mobile = this.mobile_detection();
                this.window = $(window);
                this.document = $(document);
                this.width = this.window.width();
                this.height = this.window.height();
                this.pixel_ratio = window.devicePixelRatio || 1;
                this.shall_trigger = {};
                this.touchStartY = 0;
                this.touchStartX = 0;
                this.touchEndY = 0;
                this.touchEndX = 0;


                this.set_browser();
                this.set_browser_version();

                this.listening_to = {};

                this.listening_to.resize = this.options.listen_to.indexOf('resize') !== -1;
                this.listening_to.scroll = this.options.listen_to.indexOf('scroll') !== -1;
                this.listening_to.touch = this.options.listen_to.indexOf('scroll') !== -1;


                this.init_events();
                this.init_breakpoints();

                if (this.options.add_classes_to.length)
                    this.add_classes();

                if (this.options.disable_hover_on_scroll)
                    this.disable_hover_on_scroll();

                APP.TOOLS.Browser.prototype.instance = this;
            },

            /**
             * START
             */
            start: function () {
                if (this.listening_to.scroll)
                    this.window.trigger('scroll');

                if (this.listening_to.resize)
                    this.window.trigger('resize');

            },

            /**
             * INIT BREAKPOINTS
             */
            init_breakpoints: function () {
                this.breakpoints = {};
                this.breakpoints.items = [];
                this.breakpoints.current = null;
                this.add_breakpoints(this.options.breakpoints);
            },

            /**
             * ADD BREAKPOINTS
             */
            add_breakpoint: function (breakpoint) {
                this.breakpoints.items.push(breakpoint);
            },

            /**
             * ADD BREAKPOINTS
             */
            add_breakpoints: function (breakpoints) {
                for (var i = 0; i < breakpoints.length; i++) {
                    this.add_breakpoint(breakpoints[i]);
                }
            },

            /**
             * TEST BREAKPOINTS
             */
            test_breakpoints: function () {
                // Default to null
                var current_breakpoint = null;

                // Each breakpoint
                for (var i = 0, len = this.breakpoints.items.length; i < len; i++) {
                    var breakpoint = this.breakpoints.items[i],
                        width = !breakpoint.limits.width,
                        height = !breakpoint.limits.height;

                    // Width must be tested
                    if (!width) {

                        // Min
                        if (breakpoint.limits.width.extreme === 'min') {
                            if (
                                // Included
                            ( breakpoint.limits.width.included && this.width >= breakpoint.limits.width.value ) ||

                            // Not included
                            ( !breakpoint.limits.width.included && this.width > breakpoint.limits.width.value )
                            )
                                width = true;
                        }

                        // Max
                        else {
                            if (
                                // Included
                            ( breakpoint.limits.width.included && this.width <= breakpoint.limits.width.value ) ||

                            // Not included
                            ( !breakpoint.limits.width.included && this.width < breakpoint.limits.width.value )
                            )
                                width = true;
                        }
                    }

                    // Height must be tested
                    if (!height) {
                        // Min
                        if (breakpoint.limits.height.extreme === 'min') {
                            if (
                                // Included
                            ( breakpoint.limits.height.included && this.height >= breakpoint.limits.height.value ) ||

                            // Not included
                            ( !breakpoint.limits.height.included && this.height > breakpoint.limits.height.value )
                            )
                                height = true;
                        }

                        // Max
                        else {
                            if (
                                // Included
                            ( breakpoint.limits.height.included && this.height <= breakpoint.limits.height.value ) ||

                            // Not included
                            ( !breakpoint.limits.height.included && this.height < breakpoint.limits.height.value )
                            )
                                height = true;
                        }
                    }

                    if (width && height) {
                        current_breakpoint = breakpoint;
                    }
                }

                if (current_breakpoint !== this.breakpoints.current) {

                    var old_breakpoint = this.breakpoints.current;
                    this.breakpoints.current = current_breakpoint;
                    this.shall_trigger.breakpoint = [this.breakpoints.current, old_breakpoint];
                }
            },

            /**
             * DISABLE HOVER ON SCROLL
             * Huge gain in performance when scrolling
             */
            disable_hover_on_scroll: function () {
                var that = this,
                    body = $('body');

                this.body = document.body;
                this.timer = null;

                var disable = function () {
                    clearTimeout(that.timer);

                    if (!body.hasClass('disable-hover'))
                        body.addClass('disable-hover');

                    that.timer = setTimeout(function () {
                        body.removeClass('disable-hover');
                    }, that.options.disable_hover_on_scroll_duration);
                };

                if (window.addEventListener)
                    window.addEventListener('scroll', disable, false);
                else
                    window.attachEvent('scroll', disable, false);
            },

            /**
             * GET BROWSER
             */
            set_browser: function () {
                var is = {},
                    agent = navigator.userAgent.toLowerCase();

                // Detect browser
                is.opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                is.firefox = typeof InstallTrigger !== 'undefined';
                is.safari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                is.chrome = !!window.chrome && !is.opera;
                is.internet_explorer = ( ( agent.indexOf('msie') !== -1 ) && ( agent.indexOf('opera') === -1 ) );// For use within normal web clients
                is.ipad = agent.indexOf('ipad') !== -1;

                // // For use within iPad developer UIWebView
                // // Thanks to Andrew Hedges!
                // var ua = navigator.userAgent;
                // var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);

                // Alias
                is.O = is.opera;
                is.FF = is.firefox;
                is.SAF = is.safari;
                is.CH = is.chrome;
                is.IE = is.internet_explorer;
                is.MSIE = is.internet_explorer;
                is.IPAD = is.ipad;

                this.is = is;
            },

            /**
             * GET BROWSER VERSION
             * Actually only for IE
             */
            set_browser_version: function () {
                this.version = false;

                if (this.is.IE) {
                    var user_agent = navigator.userAgent.toLowerCase();
                    this.version = user_agent.indexOf('msie') !== -1 ? parseInt(user_agent.split('msie')[1], 10) : false;

                    this.is['internet_explorer_' + this.version] = true;
                    this.is['IE_' + this.version] = true;
                }
            },

            /**
             * GET MOBILE
             */
            mobile_detection: function () {
                var checker = {};

                checker.iphone = navigator.userAgent.match(/(iPhone|iPod|iPad)/);
                checker.blackberry = navigator.userAgent.match(/BlackBerry/);
                checker.android = navigator.userAgent.match(/Android/);
                checker.opera = navigator.userAgent.match(/Opera Mini/i);
                checker.windows = navigator.userAgent.match(/IEMobile/i);
                checker.all = ( checker.iphone || checker.blackberry || checker.android || checker.opera || checker.windows );

                return checker;
            },

            /**
             * ADD CLASSES
             * Add browser class to wanted elements like <body> or <html>
             */
            add_classes: function () {
                var target = null;
                for (var i = 0, len = this.options.add_classes_to.length; i < len; i++) {
                    target = $(this.options.add_classes_to[i]);

                    if (target.length) {
                        for (var key in this.is) {
                            if (this.is[key]) {
                                target.addClass(key);
                                if (this.is.IE && this.version) {
                                    target.addClass(key + '-' + this.version);
                                }
                            }
                        }
                    }
                }
            },

            /**
             * INIT EVENTS
             * Start listening events
             */
            init_events: function () {
                var that = this;

                // Ticker
                this.ticker.on('tick', function () {
                    that.frame();
                });

                // Scroll
                if (this.listening_to.scroll) {

                    this.window.on('scroll', function (e) {

                        if (that.is.IE && document.compatMode === 'CSS1Compat') {
                            that.direction.y = window.document.documentElement.scrollTop > that.top ? 'down' : 'up';
                            that.direction.x = window.document.documentElement.scrollLeft > that.top ? 'right' : 'left';
                            that.top = window.document.documentElement.scrollTop;
                            that.left = window.document.documentElement.scrollLeft;
                        }
                        else {
                            that.direction.y = window.pageYOffset > that.top ? 'down' : 'up';
                            that.direction.x = window.pageXOffset > that.top ? 'right' : 'left';
                            that.top = window.pageYOffset;
                            that.left = window.pageXOffset;
                        }
                        that.shall_trigger.scroll = [that.top, that.left];

                    });
                }

                // Resize
                if (this.listening_to.resize) {

                    this.window.on('resize', function (e) {
                        that.width = window.innerWidth;
                        that.height = window.innerHeight;
                        that.shall_trigger.resize = [that.width, that.height];

                        that.test_breakpoints();
                    });
                }


                if (this.listening_to.touch) {

                    this.window.on('touchstart', function (event) {

                        var e = event.originalEvent;

                        //stopping the auto scroll to adjust to a section

                        var touchEvents = that.getEventsTouchPage(e);
                        that.touchStartY = touchEvents.y;
                        that.touchStartX = touchEvents.x;
                    });

                    this.window.on('touchmove', function (event) {

                        var e = event.originalEvent,
                            touchEvents = that.getEventsTouchPage(e);

                        that.touchEndY = touchEvents.y;
                        that.touchEndX = touchEvents.x;

                        that.shall_trigger.touch = [that.touchStartY, that.touchEndY];
                    });
                }


            },

            match_media: function (condition) {
                if (!( 'matchMedia' in window ) || typeof condition !== 'string' || condition === '')
                    return false;

                return !!window.matchMedia(condition).matches;
            },

            /**
             * FRAME
             */
            frame: function () {

                var keys = Object.keys(this.shall_trigger);
                for (var i = 0; i < keys.length; i++) {
                    this.trigger(keys[i], this.shall_trigger[keys[i]]);
                }
                if (keys.length)
                    this.shall_trigger = {};
            },
            getEventsTouchPage: function (e) {
                var events = [];

                events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
                events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

                //in touch devices with scrollBar:true, e.pageY is detected, but we have to deal with touch events. #1008
                /* if (isTouch && isReallyTouch(e) && options.scrollBar) {
                 events.y = e.touches[0].pageY;
                 events.x = e.touches[0].pageX;
                 }*/

                return events;
            },
        });
})();

(function()
{
    "use strict";

    APP.TOOLS.Ticker = APP.CORE.Event_Emitter.extend(
    {
        /**
         * SINGLETON
         */
        staticInstantiate:function()
        {
            if( APP.TOOLS.Ticker.prototype.instance === null )
                return null;
            else
                return APP.TOOLS.Ticker.prototype.instance;
        },

        /**
         * INIT
         */
        init: function( options )
        {
            this._super(options);

            this.started      = false;
            this.running      = false;
            this.start_time   = 0;
            this.time         = 0;
            this.elapsed_time = 0;

            APP.TOOLS.Ticker.prototype.instance = this;

        },

        /**
         * START
         */
        start: function( run )
        {
            var that = this;

            this.started      = true;
            this.start_time   = + ( new Date() );
            this.time         = 0;
            this.elapsed_time = 0;


            if( run )
                this.run();
        },

        /**
         * RUN
         */
        run: function()
        {
            var that     = this;
            this.running = true;

            var loop = function()
            {
                if(that.running)
                    window.requestAnimationFrame( loop );
                that.tick();
            };

            loop();
        },

        /**
         * STOP
         */
        stop: function()
        {
            this.running = false;
        },

        /**
         * TICK
         */
        tick: function()
        {


            if(!this.started)
                this.start();

            this.time         = + ( new Date() );
            this.delta        = this.time - this.start_time - this.elapsed_time;
            this.elapsed_time = this.time - this.start_time;

            this.trigger( 'tick', [ this.elapsed_time, this.time, this.start_time ] );
        }
    });
})();

(function () {
    "use strict";

    APP.TOOLS.Navigation = APP.CORE.Event_Emitter.extend(
        {
            options: {},

            /**
             * SINGLETON
             */
            staticInstantiate: function () {
                if (APP.TOOLS.Navigation.prototype.instance === null)
                    return null;
                else
                    return APP.TOOLS.Navigation.prototype.instance;
            },


            /**
             * INIT
             */
            init: function (options) {
                this._super(options);

                this.history = history.pushState ? window.history : false;
                this.state_id = 0;

                // Support
                if (this.history) {
                    // Save title in current state
                    this.update_state({
                        _prevent_default_tag: 1,
                        title: document.title,
                        id: this.state_id
                    });

                    if ('scrollRestoration' in history) {
                        this.history.scrollRestoration = 'manual';
                    }
                }

                this.init_events();

                APP.TOOLS.Navigation.prototype.instance = this;
            },

            /**
             * INIT EVENTS
             */
            init_events: function () {
                var that = this;

                // Support
                if (!this.history)
                    return;

                window.addEventListener('popstate', function (e) {

                    // Create result object
                    var result = Object.create(e.state);

                    // Set title
                    if (result.title)
                        document.title = result.title;

                    // State direction
                    //  result.direction = result.id < that.state_id ? 'backward' : 'frontward';
                    // that.state_id    = result.id;

                    // Trigger
                    that.trigger('pop', [result, window.location.href]);
                });


                /*    window.onpopstate = function( e )
                 {
                 // Create result object
                 var result = Object.create( e.state );


                 // Set title
                 if( result.title )
                 document.title = result.title;

                 // State direction
                 //  result.direction = result.id < that.state_id ? 'backward' : 'frontward';
                 // that.state_id    = result.id;

                 // Trigger
                 that.trigger( 'pop', [ result, window.location.href] );
                 };*/
            },

            /**
             * SET IN STATE
             */
            update_state: function (data, replace_state) {
                // Support
                if (!this.history)
                    return;

                // Tag
                // data._prevent_default_tag = 1;

                // Replace the complete state or state not existing yet
                if (replace_state || !this.history.state) {
                    this.history.replaceState(data, document.title, window.location.href);

                    try {
                        this.history.state = data;
                    }
                    catch (error) {
                        console.log('catch');
                    }
                }

                // Add each value to current state
                else {
                    for (var key in data) {
                        try {
                            this.history.state[key] = data[key];
                        }
                        catch (error) {
                            console.log('catch');
                        }
                    }

                    this.history.replaceState(this.history.state, document.title, window.location.href);
                }
            },

            /**
             * PUSH
             */
            push: function (state, url) {
                // Support
                if (!this.history)
                    return;

                // Set title
                /* if( state.title )
                 document.title = state.title;*/

                // console.log(state);

                // State ID
                state.id = ++this.state_id;

                // console.log(url);
                // Push state into history

                this.update_state(state);

                this.history.pushState(state, state.title, url);

                this.trigger('push', [state, url]);
            }
        });
})();

(function () {
    "use strict";

    APP.TOOLS.Mouse = APP.CORE.Event_Emitter.extend(
        {
            /**
             * SINGLETON
             */
            staticInstantiate: function () {
                if (APP.TOOLS.Mouse.prototype.instance === null)
                    return null;
                else
                    return APP.TOOLS.Mouse.prototype.instance;
            },

            /**
             * INIT
             */
            init: function (options) {
                this._super(options);

                this.ticker = new APP.TOOLS.Ticker();
                this.browser = new APP.TOOLS.Browser();
                this.shall_trigger = {};
                this.down = false;
                this.x = 0;
                this.y = 0;
                this.ratio = {};
                this.ratio.x = 0;
                this.ratio.y = 0;
                this.wheel = {};
                this.wheel.delta = 0;

                this.init_events();

                APP.TOOLS.Mouse.prototype.instance = this;
            },

            /**
             * INIT EVENTS
             */
            init_events: function () {
                var that = this;

                // Ticker
                this.ticker.on('tick', function () {
                    that.frame();
                });

                /*  // Down
                 window.onmousedown = function( e )
                 {
                 // e.preventDefault();
                 that.down = true;

                 that.trigger( 'down', [ e.target ] );
                 };

                 // Up
                 window.onmouseup = function( e )
                 {
                 // e.preventDefault();
                 that.down = false;

                 that.trigger( 'up', [ e.target ] );
                 };

                 // Move
                 window.onmousemove = function( e )
                 {
                 // e.preventDefault();
                 that.x = e.clientX;
                 that.y = e.clientY;

                 that.ratio.x = that.x / that.browser.width;
                 that.ratio.y = that.y / that.browser.height;

                 that.trigger( 'move', [ e.target ] );
                 };*/

                var lastMouseWheelStep = 0;

                // Wheel

                var mouse_wheel_handler = function (e) {

                    if (Date.now() - lastMouseWheelStep > 760) {

                        lastMouseWheelStep = Date.now();

                        var value = e.wheelDelta || -e.deltaY || -e.detail;
                        that.wheel.delta = Math.max(-1, Math.min(1, value));
                        /*      that.wheel.delta = e.wheelDeltaY || e.wheelDelta || - e.detail;*/

                        if (that.trigger('wheel', [that.wheel.delta]) === false) {
                            e.preventDefault();
                            return false;
                        }
                    }
                };


                var prefix = '';
                var _addEventListener;

                if (window.addEventListener) {
                    _addEventListener = "addEventListener";
                } else {
                    _addEventListener = "attachEvent";
                    prefix = 'on';
                }

                // detect available wheel event
                var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
                    document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
                        'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


                if (support === 'DOMMouseScroll') {
                    document[_addEventListener](prefix + 'MozMousePixelScroll', mouse_wheel_handler, false);
                }

                //handle MozMousePixelScroll in older Firefox
                else {
                    document[_addEventListener](prefix + support, mouse_wheel_handler, false);
                }
            },

            /**
             * FRAME
             */
            frame: function () {
                var keys = Object.keys(this.shall_trigger);
                for (var i = 0; i < keys.length; i++)
                    this.trigger(keys[i], [this.shall_trigger[keys[i]]]);

                if (keys.length)
                    this.shall_trigger = {};
            }
        });
})();
