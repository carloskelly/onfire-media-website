;(function($, window, document, undefined) {
	"use strict";

	/*============================*/
	/* INIT */
	/*============================*/

	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);


	if (_ismobile) {

	}

	/*============================*/
	/* PAGE CALCULATIONS */
	/*============================*/

	if("function"!==typeof pageCalculations){var winW,winH,winS,pageCalculations,onEvent=window.addEventListener;pageCalculations=function(a){winW=window.innerWidth;winH=window.innerHeight;winS=document.body.scrollTop;a&&(onEvent("load",a,!0),onEvent("resize",a,!0),onEvent("orientationchange",a,!1))};pageCalculations(function(){pageCalculations()})};


    /*=================================*/
    /* 04 - SWIPER SLIDER */
    /*=================================*/

    function initSwiper() {
        var initIterator = 0;
        $('.swiper-container').each(function() {
            var $t = $(this);

            if( ! $t.attr('counts_item') ) {

                $t.attr('counts_item', $t.find('.swiper-slide').length);

            }

            if ($t.find('.swiper-slide').length <= 1) { 
                $t.find('.pagination').hide(); 
                $t.find('.swiper-slide').css('width','100%');
                return 0; 
            }

            var count_item = $t.attr('counts_item');
            var setThumb = function(activeIndex){
            var url_thumb,
                left_img = $t.find('.slide-prev'),
                right_img = $t.find('.slide-next'),
                activeIndexLeft, activeIndexRight;

                activeIndexLeft = ( activeIndex - 1 >= 0 ) ? activeIndex - 1 :  count_item - 1;
                activeIndexRight = ( activeIndex + 1 < count_item ) ? activeIndex+1 :  0;

                url_thumb = $t.find('.swiper-slide[data-val="' + activeIndexLeft + '"] img').attr('data-thumb');
                left_img.find('.bg-arrow').attr('style', 'background-image: url(' + url_thumb + ')' );

                url_thumb = $t.find('.swiper-slide[data-val="' + activeIndexRight + '"] img').attr('data-thumb');
                right_img.find('.bg-arrow').attr('style', 'background-image: url(' + url_thumb + ')' );

           }

            var index = 'swiper-unique-id-' + initIterator;

            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.pagination').addClass('pagination-' + index);

            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var centerVar = parseInt($t.attr('data-center'), 10);
            var simVar = ($t.closest('.circle-description-slide-box').length) ? false : true;

            var slidesPerViewVar = $t.attr('data-slides-per-view');
            if (slidesPerViewVar == 'responsive') {
                slidesPerViewVar = updateSlidesPerView($t);
            } else slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            var loopVar = parseInt($t.attr('data-loop'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                speed: speedVar,
                pagination: '.pagination-' + index,
                loop: loopVar,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVar,
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: simVar,
                centeredSlides: centerVar,
                roundLengths: true,
                mode: mode || 'horizontal',
                onInit: function(swiper) {
                    setThumb(0);
                    $t.find('.swiper-slide').addClass('active');
                    coming_timer(); 
                    
                },
                onSlideChangeEnd: function(swiper) {
                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                    setThumb(activeIndex);
                    coming_timer();

                },
                onSlideChangeStart: function(swiper) {
                    $t.find('.swiper-slide.active').removeClass('active');

                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                   
                },
                onSlideClick: function(swiper) {

                }

            });

            swipers['swiper-' + index].reInit();
            if (!centerVar) {
                if ($t.attr('data-slides-per-view') == 'responsive') {
                    var paginationSpan = $t.find('.pagination span');
                    var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                    if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                    else $t.removeClass('pagination-hidden');
                    paginationSlice.show();
                }
            }
            initIterator++;
        });

    }

    $('.slide-prev').on('click', function() {
        swipers['swiper-' + $(this).closest('.slider-wrap').find('.swiper-container').attr('id')].swipePrev();
        return false;
    });

    $('.slide-next').on('click', function() {
        swipers['swiper-' + $(this).closest('.slider-wrap').find('.swiper-container').attr('id')].swipeNext();
        return false;
    });

    function updateSlidesPerView(swiperContainer) {
        if (winW >= addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
        else if (winW >= lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
        else if (winW >= mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
        else if (winW >= smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
        else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
    }

    pageCalculations(function(){
        initSwiper();
    });

	/*============================*/
	/* HEADER NAVIGATOR SHOW */
	/*============================*/

	if( $(window).width() >= 993 ) {

		$(".wpc-nav-menu-icon").on( 'click', function () {

			var wpc_header = $('.wpc-header');
            
            if( wpc_header.hasClass( 'header-animate') ){
                $('.wpc-navigation').css('overflow','hidden');
                wpc_header.removeClass( 'header-animate');
                wpc_header.find("nav").removeClass('slide-active');
            }
            else {
                wpc_header.find("nav").addClass('slide-active');
                wpc_header.addClass('header-animate');
                setTimeout(function(){
                    $('.wpc-navigation').css('overflow','visible');
                }, 500);
            }


		});
		
	}	


	/*=================================*/
    /* RESPONSIVE MENU */
    /*=================================*/

    function menu_responsive() {

        if( $(window).width() <= 992 ) {
    	
    		$('.main-menu').addClass('dl-menu dl-menuopen');
    		$('.menu-item-has-children').find('.sub-menu').addClass('dl-submenu');
    		var wpc_nav = $('.wpc-navigation');

    	    $('.wpc-nav-menu-icon').on('click', function() {

    	        if ( wpc_nav.hasClass('slide-menu') ) {
    	            wpc_nav.removeClass('slide-menu');
    	            $(this).removeClass('active');

    	        } else {
    	            wpc_nav.addClass('slide-menu');
    	            $(this).addClass('active');
    	        }

    	        return false;
    	    });



    	    $('.close-menu').on('click', function() {
    	        wpc_nav.removeClass('slide-menu');
    	        $('.close-menu').removeClass('active');
    	        $('body').removeClass('act');

    	        return false;
    	    });

    	    $('#dl-menu').dlmenu({
    	        animationClasses: { classin: 'dl-animate-in-2', classout: 'dl-animate-out-2' }
    	    });

    	}
    
    }


    




    pageCalculations(function(){
        menu_responsive();
    });

	/*=================================*/
    /*   		SEARCH POPUP           */
    /*=================================*/

    $('.wpc-search-btn').on('click', function() {
    	
        if( ! $('.layer-dark').length ) {
            var search_form = $('.search-form-popup');

            search_form.addClass('popup-search');
            search_form.append('<span class="close-search"></span>');
            $('body').append('<div class="layer-dark"></div>').addClass('act');

        }

        return false;

    });

    $('body').on('click', '.close-search, .layer-dark', function() {

        $('.search-form-popup').removeClass('popup-search');
        $('body').removeClass('act');
        $('.layer-dark').remove();

        return false;

    });


    /*============================*/
	/* BACKGROUND BANNER IMAGES */
	/*============================*/

    function bg_block() {
        $('.bg-banner').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-banner').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });

        $('.bg-item').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-item').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });

        $('.bg-banner-full').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-banner-full').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });

        $('.bg-coming-soon').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-coming-soon').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });

        $('.post-comments').find('.avatar').addClass('bg-post-author');

        $('.bg-post-author').each(function() {
            var bgSrc = $(this).attr('src');
            $(this).parent().addClass('background-post-author').css({
                'background-image': 'url(' + bgSrc + ')'
            });
            $(this).hide();
        });
    } 


    /*=================================*/
    /*    POPUP VIDEO	   */
    /*=================================*/

    // $('.video-btn').magnificPopup({
    //         type: 'iframe'
    // });

$('.befolio-video-banner a').on('click', function (e) {
    e.preventDefault()
    player.playVideo();
});



    /*==================================================*/
	/* TIMES */
	/*==================================================*/


    function coming_timer() {

        $('.coming-time').each(function() {

            if ( $(this).hasClass('active') ) {
                return;
            }
            
    		$(this).ClassyCountdown({
    	        theme: "flat-colors",
    	        end:  $(this).attr('data-time'),
    	        now: $.now() / 1000,
    	        style: {
    				element: '',
    				labels: false,
    				days: {gauge: {fgColor: 'rgba(255,255,255,0)'}},
    				hours: {gauge: {fgColor: 'rgba(255,255,255,0)'}},
    				minutes: {gauge: {fgColor: 'rgba(255,255,255,0)'}},
    				seconds: {gauge: {fgColor: 'rgba(255,255,255,0)'}}
    			}
    	    });
            $(this).addClass('active');

        });

    }

	if( winW <= 650 ) {

		var Classy_wrapper = $('.ClassyCountdown-wrapper');

		Classy_wrapper.find('div').css({'height':'100px','width':'100px'});
		Classy_wrapper.find('.ClassyCountdown-value').css('height','100px');
		Classy_wrapper.find('.ClassyCountdown-value div').css('height','100px');

	}

	/*==================================================*/
	/* SHARE POPUP */
	/*==================================================*/

	$('[data-share]').on('click',function(){
	 
		var w = window,
			url = this.getAttribute('data-share'),
			title = '',
			w_pop = 600,
			h_pop = 600,
			scren_left = w.screenLeft != undefined ? w.screenLeft : screen.left,
			scren_top = w.screenTop != undefined ? w.screenTop : screen.top,
			width = w.innerWidth,
			height = w.innerHeight,
			left = ((width / 2) - (w_pop / 2)) + scren_left,
			top = ((height / 2) - (h_pop / 2)) + scren_top,
			newWindow = w.open(url, title, 'scrollbars=yes, width=' + w_pop + ', height=' + h_pop + ', top=' + top + ', left=' + left);
	 
		if (w.focus) {
		    newWindow.focus();
		}
	 
		return false;
	});


	/*=================================*/
    /*   		GOOGLE MAP             */
    /*=================================*/

    if ($('.befolio-map').length) {
        $('.befolio-map').each(function() {
            initialize(this);
        });
    }

    function initialize(_this) {

        var stylesArray = {
            //style 1
            'style-1': [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
        };

        var styles, map, marker, infowindow,
            lat = $(_this).attr("data-lat"),
            lng = $(_this).attr("data-lng"),
            contentString = $(_this).attr("data-string"),
            image = $(_this).attr("data-marker"),
            styles_attr = $(_this).attr("data-style"),
            zoomLevel = parseInt($(_this).attr("data-zoom"), 10),
            myLatlng = new google.maps.LatLng(lat, lng);


        // style_1
        if (styles_attr == 'style-1') {
            styles = stylesArray[styles_attr];
        }
        // custom
        if (typeof hawa_style_map != 'undefined' && styles_attr == 'custom') {
            styles = hawa_style_map;
        }
        // or default style

        var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

        var mapOptions = {
            zoom: zoomLevel,
            disableDefaultUI: true,
            center: myLatlng,
            scrollwheel: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };

        map = new google.maps.Map(_this, mapOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        infowindow = new google.maps.InfoWindow({
            content: contentString
        });


        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: image
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

    }

    /*============================*/
    /*           SKILLS           */
    /*============================*/

    var run_skills = function () {
        if ( $('.skill-line').length ) {

            $('.skill-line').not('.animated').each(function(){
                if($(window).scrollTop() >= $(this).offset().top-$(window).height() * 0.9 ) {

                    $(this).addClass('animated').find('.timer').countTo();

                    $(this).find('.skill-run').each(function(){
                        var objel = $(this);
                        var pb_width = objel.attr('data-width-pb');
                        objel.css({'width':pb_width});
                    });
                }
            });
        }
    }

    /*============================*/
    /*          ACCORDION         */
    /*============================*/

    var wpcRemoveClass = function( el, _class ){
        if (el.classList)
            el.classList.remove( _class ? _class : 'active' );
        else
            el.className = panel.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
    
    $('.befolio-accordion').on('click', '.panel-title', function(){
        
        var panel_parent = this.parentNode,
            panel_container = panel_parent.parentNode,
            panels_wrap = panel_container.querySelectorAll('.panel-wrap');
 
        Array.prototype.forEach.call(panels_wrap, function(panel, i){
            if(panel !== panel_parent) {
               wpcRemoveClass(panel);
            }
        });

        if ( -1 !== this.parentNode.className.indexOf( 'active' ) ) {
            wpcRemoveClass(panel_parent);
        } else {
            panel_parent.className += ' active';
        }
            
    });


    /*============================*/
    /* ISOTOPE */
    /*============================*/

    var izotope_portfolio = function () {
        
        if ( $('.izotope-container').length ) { 

            $('.izotope-container').each(function(){

                var $container = $(this).find('.befolio-portfolio-content');
                var $filter = $(this).find('.befolio-portfolio-filter');

                /* Init isotope */
                if( $container.hasClass('befolio_masonry') ) {
                    $container.isotope({
                        itemSelector: '.portfolio-item',
                        layoutMode: 'masonry',
                        masonry: {
                            columnWidth: '.grid-sizer'
                            // percentPosition: true
                        }
                    });
                } else {
                    $container.isotope({
                        itemSelector: '.portfolio-item',
                        layoutMode: 'fitRows'
                    });
                }

                /* Filter */
                $filter.on('click', '.but', function() {

                    $filter.find('.but').removeClass('activbut');
                    $(this).addClass('activbut');

                    var filterValue = $(this).attr('data-filter');
                        $container.isotope({filter: filterValue});
                    return false;

                });
            });     
        }
    }
    
    pageCalculations(function(){
       //izotope_portfolio();
    });

    // Load More Portfolio

    function portfolioLoadMore() {

        if (window.load_more_post) {
            var pageNum = parseInt(load_more_post.startPage) + 1;

            // The maximum number of pages the current query can return.
            var max = parseInt(load_more_post.maxPage);

            // The link of the next page of posts.
            var nextLink = load_more_post.nextLink;

            $('.wpc-load-more').on('click', function (e) {

                var $izotop = $('.befolio-portfolio-content');
            if( pageNum <= max ) {

                $.ajax({
                    url: nextLink,
                    type: "get",
                    success: function(data){

                        var newElements = $(data).find('.befolio-portfolio-content .portfolio-item');
                        var elems = [];

                        newElements.each(function(i){
                            elems.push(this);
                        });

                        $izotop.isotope( 'insert', elems );

                        pageNum++;
                        nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ pageNum);

                        if( pageNum == ( max + 1 ) ) {
                            $('.wpc-load-more').hide('fast');
                        }
                    }
                });
            }

            return false;

            });
        }
    }

    portfolioLoadMore();

    // Blog masonry

    var blog_post_masonry = $('.befolio-blog-content');
    if( blog_post_masonry.find('.post-item').hasClass('special') ) {
        blog_post_masonry.imagesLoaded(function() {
            blog_post_masonry.masonry({

                itemSelector: '.classic-special',
                columnWidth: '.grid-sizer',
                percentPosition: true

            });
        });
    }


    // Post load more

    function postLoadMore() {

        if (window.load_more_post) {
            var pageNum = parseInt(load_more_post.startPage) + 1;

            // The maximum number of pages the current query can return.
            var max = parseInt(load_more_post.maxPage);

            // The link of the next page of posts.
            var nextLink = load_more_post.nextLink;

            var container = $('.befolio-blog-content');

            $('.wpc-load-more-post').on('click', function (e) {

                if( pageNum <= max ) {

                    $.ajax({
                        url: nextLink,
                        type: "get",
                        success: function(data){

                            var newElements = $(data).find('.befolio-blog-content').html();
                            console.log(newElements);
                            container.append(newElements);
                            bg_block();

                            pageNum++;
                            nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ pageNum);

                            if( pageNum == ( max + 1 ) ) {
                                $('.wpc-load-more-post').hide('fast');
                            }
                        }
                    });
                }

                return false;

            });
        }
    }

    postLoadMore();
    

    /*============================*/
    /* POPUP PORTFOLIO */
    /*============================*/

    if ($('.popup-gallery').length) {
        $('.popup-gallery').magnificPopup({
            delegate: '.view-item',
            type: 'image',
            removalDelay: 100,
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade',
            closeBtnInside: false,
            gallery: {
                enabled: true,
            },
            callbacks: {
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated ' + this.st.el.attr('data-effect'));
                }
            }

        });
    }

    /*============================*/
    /* TABS */
    /*============================*/

    $('.tabs-header').on('click', 'li:not(.active)', function(event) {
        
        event.preventDefault();

        var index_el = $(this).index();

        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.befolio-tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');

    });

    $('.tabs-header').on('click', 'li:not(.active)', function(event) {
        
        event.preventDefault();

        var index_el = $(this).index();

        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.befolio-tabs-tow-column').find('.tab-block').removeClass('active').eq(index_el).addClass('active');

    });

    /***********************************/
    /*TABS FAQ*/
    /**********************************/             
                 
    var tabFinish = 0;
    $('.nav-tab-item').on('click',  function(){
        var $t = $(this);
        if(tabFinish || $t.hasClass('active')) return false;
        tabFinish = 1;
        $t.closest('.nav-tab').find('.nav-tab-item').removeClass('active');
        $t.addClass('active');
        var index = $t.parent().parent().find('.nav-tab-item').index(this);
        $t.closest('.tab-wrapper').find('.tab-info:visible').fadeOut(500, function(){
            $t.closest('.tab-wrapper').find('.tab-info').eq(index).fadeIn(500, function() {
                tabFinish = 0;
            });
        });

        return false;
    });

	/*============================*/
	/* WINDOW LOAD */
	/*============================*/

	$(window).load(function(){

		/** Preloader **/
		
        $("#loading").fadeOut();
        // $(".loader").delay(1000).fadeOut("slow");

        /** Skills **/
        run_skills();

        /** Coming timer **/
        coming_timer();

        /** Bg block **/

        bg_block();

	});

	/***********************************/
	/* WINDOW SCROLL */
	/**********************************/

	$(window).scroll(function() {
        run_skills();

	});


    $(window).on("load", function() {
        izotope_portfolio();
    });

    /***********************************/
    /*BACKGROUND*/
    /**********************************/
    
    //sets child image as a background
    $('.s-back-switch').each(function(){
        var $img = $(this).find('.s-img-switch');
        var $imgSrc =  $img.attr('src');
        var $imgDataHidden =  $img.data('s-hidden');
        $(this).css('background-image' , 'url(' + $imgSrc + ')');
        if($imgDataHidden){
            $img.css('visibility', 'hidden');
        }else{
            $img.hide();
        }
    });


    /***********************************/
    /*          SAME HEIGHT           */
    /**********************************/

    function sectionSameHeight() {
        $(".b-bg-h").css("height", $(".b-info-h").outerHeight(true));
        $(".b-bg-h-1").css("height", $(".b-info-h-1").outerHeight(true));
    }

    sectionSameHeight();


    function abouteHeight() {
        $(".about-bg").css("height", $(".about-h").outerHeight(true));
    }

    abouteHeight();



    $(".btn-more").on("click", function(){
        $(".hide-item").fadeIn(500);
        $(this).fadeOut(500);
        izotope_portfolio();
    });


    function heightSidebar() {
        var cols = $('.sidebar-h'); 
        var contentH = $(".home-h").outerHeight(true)+20;
        if($(window).width()>991) {                  
            cols.css('height', '100%');
            setTimeout(function(){
                cols.outerHeight(contentH);    
            },1000);  

        } else{
            cols.css('height', '100%');
        }       
    }



    /***********************************/
    /*        RUN LOAD FUNCTION       */
    /**********************************/

    $(window).on("load", function() {
        heightSidebar();
    })


    /***********************************/
    /*        RUN RESIZE FUNCTION      */
    /**********************************/

    $(window).on("resize", function() {
        sectionSameHeight();
        heightSidebar();
        abouteHeight();
    });
    

})(jQuery, window, document);


(function(cash) { 

    "use strict";

      $('.js-contact-form').submit(function(e){

        $('.ajax-loader').show();

        var url = 'mail.php',
            form = this;

        $(form).find('[name="fields[code]"]').remove();

        function result(class_key, data){
          setTimeout(function(){
            $('.ajax-loader').hide();
            $('.ajax-result').find(class_key).show().text(data);
          },500);
        }

        $.ajax({
          type: "POST",
          url: url,
          data: $(form).serialize(),
        })
        .done(function(data) {
          result('.success', data);
        }).error(function(data){
          result('.error', data);
        })

        e.preventDefault(); 

      });
                 
})(jQuery);   