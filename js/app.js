/*------------------------------------------------

  Table Of Content

  01. Start Js App - DOM
  02. Hero Slider
  03. Slider Animations
  04. Isotope Portfolio
  05. Portfolio Filter
  06. Social Links Animate
  07. Hero Parallax Images
  08. Page Hero Height Calculation
  09. Progressbar Calculation
  10. Scroll Event Track
  11. IsMobile
  12. Main Navigation Push 
  13. Device Oriantation Control
  14. Ajax Portfolio
  15. Isotope Control
  16. Mobile Scroll
  17. Window Resize
  18. Window Orientation Change
  19. Wow Init
  20. Contact Form

  -------------------------------------------------*/

jQuery(function ($) {

	$(document).ready(function () {
		"use strict";

		App.dom();
		App.heroSlider();
		App.portfolioFilter();
		App.socialLinks();
		App.parallax();
		App.pageDom();
		App.progressBar();
		App.windowScroll();
		App.isMobile();
		App.navPush();
		App.ajaxPortfolio();

	});
	var body = $('body');
	var App = {
	/*------------------------------------------------
	01. Start Js App
	-------------------------------------------------*/	
		dom : function () {
			
			var filterWrap 		= $('.header .filter-wrap'), 
				filterMenu 		= $('.filter-menu'),
				filterItem 		= 0,
				filterMobileWrap= $('.filter-mobile-wrapper');

			//Filter Module
			filterMobileWrap.css("display", "flex").hide();
			filterWrap.find('a').each(function () { 
					filterItem += 22;
			});
			filterWrap.hover(function () {		
				filterMenu.css({
  					'margin-top':-filterItem
  				});
			},function() {
				filterMenu.css({
  					'margin-top':'50vh'
  				});
			});
			$(document).on('click',function(e) {
			     if (!$(e.target).is('.filter-wrap')) {
			        $('.open #filterpush').trigger('click');
			     }
			});
			var headerHeight 	= $('.header').height(),
				headerSocial 	= $('.header .social').height() + 30,
				headerHsocial 	= headerSocial + 48 + 48 + 25,
				totalHeight 	= headerHeight - headerHsocial,
				contactNav 		= $('.contact-nav'),
				filterPush 		= $('.filter-push'),
				filterPushId 	= $('#filterpush'),
				gridItem 		= $('.grid-item'),
				blogItem 		= $('.blog-entry');
				
			filterPushId.fadeOut(0);
			contactNav.height(totalHeight / 2);
			filterPush.height(totalHeight / 2);

			$('.grid').imagesLoaded( function() {
	  			//Grid Item Animate Calculations
				gridItem.each(function () {
					var $this = $(this), gridItemAheight = $this.find('a').height();
					$this.find('.title').width(gridItemAheight / 2);
					$this.find('.category').width(gridItemAheight / 2);
					$this.find('.category').css({'top': gridItemAheight / 2 + 30});
					$this.find('.category').attr('data-top',gridItemAheight / 2 + 30);
				});
			});


			$('.blog-list').imagesLoaded( function() {
				//Blog Item Animate Calculations
				blogItem.each(function () {
					var $this = $(this), blogItemAheight = $this.height();
					$this.find('.title').width(blogItemAheight / 2);
					$this.find('.category').width(blogItemAheight / 2);
					$this.find('.category').css({'top': blogItemAheight / 2 + 30});
					$this.find('.category').attr('data-top',blogItemAheight / 2 + 30);
				});
			});


			//Slide Item Calculations
			var sliderNav 		= $('.slider-nav'),
				slideNavh 		= 0,
				winHeightHalf 	= $(window).height() / 2,
				mouse 			= $('.mouse');

			sliderNav.find('.nav-item').each(function () {
				slideNavh 		+= $(this).height();
			});
			var slideNavhx 		= slideNavh / 2,
				sliderTop 		= winHeightHalf - slideNavhx,
				mouseTop 		= sliderTop + slideNavh + sliderTop / 4;

			sliderNav.css({
				'margin-top':sliderTop - 50
			});
			mouse.css({
				'top':mouseTop
			});

			//Parallax Bg Calculations
			$('.parallax-bg').each(function () {
				var bgi = $(this).children('img').attr('src');
				$(this).children('img').remove();
				$(this).height($(this).attr('data-h'));
				$(this).css({
					'background-image': 'url('+bgi+')'
				});
			});

			//Grid / Blog Item Hover Effect
			$('.title-category').hover(function () {
				$(this).children('.category').css({'top':0});
				
			},function () {
				var dataTop = $(this).children('.category').attr('data-top');
				
					$(this).children('.category').css({

						'top':dataTop+'px'

					});
			});
			
			//Hero Default Height
			$('.hero').attr('data-n',$(window).height());
		},
	/*------------------------------------------------
	02. Hero Slider
	-------------------------------------------------*/	
		heroSlider: function() {
			
			var heroSlider 		= $('.slider-main'), 
				heroNav 		= $('.slider-nav'), 
				hero 			= $('.hero');

				hero.css({
					'height':'100vh'
				});

			heroSlider.on('init', function(event, slick){

  				var thisflex 				= $('.slick-current').find('[data-animation]'),
  					slideDescription 		= $('.slick-current').find('.slider-description'),
  					slideDescriptionHalf 	= slideDescription.height() / 2,
  					windowHeightHalf 		= $(window).height() / 2,
  					marginForCenter 		= windowHeightHalf - slideDescriptionHalf;

  				slideDescription.css({
  					'margin-top':marginForCenter
  				});
  				App.doAnimations(thisflex);
  				 
			});
			var heroSliderOptions = {
				slidesToShow: 1,
				slidesToScroll: 1,
				initialSlide:2,
				arrows:false,
				vertical:true,
				swipe:false,
				asNavFor:'.sync-slider',
				autoplay:true,
  				autoplaySpeed:5000,
  				infinite:false,
  				easing :'ease-in'
      		};
			heroSlider.slick(heroSliderOptions);
			heroNav.slick({
				slidesToShow: 5,
			  	slidesToScroll: 1,
			  	asNavFor:'.sync-slider',
			  	initialSlide:2,
			   	dots:false,
			   	centerMode:true,
			    arrows:false,
			    useTransform:false ,
  				vertical:true,
				verticalSwiping:true,
				infinite:false
			});
		
			heroSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
  				var thisflex = $('[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
  				App.doAnimations(thisflex);
  				var y = $('[data-slick-index="' + nextSlide + '"]').find('.slider-description');
  				var z = y.height() / 2;
  				var q = $(window).height() / 2;
  				var x = q - z;
  				y.css({
  					'margin-top':x
  				});
  				 
			});	

			$('.slider-nav').on('click','.slick-slide',function () {

				var index = $(this).attr('data-slick-index');
				$('.slider-main').slick('slickGoTo',index);
				return false;
			});
			$('.hero').on('click','.slide-arrow-left',function () {
				heroSlider.slick('slickPrev');
			});
			$('.hero').on('click','.slide-arrow-right',function () {
				heroSlider.slick('slickNext');
			});
		},

	/*------------------------------------------------
	03. Slider Animations
	-------------------------------------------------*/	
		doAnimations : function(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    	},
    /*------------------------------------------------
	04. Isotope Portfolio
	-------------------------------------------------*/	
		isotope:function () {
		    var grid 		= $('.grid-wrapper'),
		    	gridParend 	= $('.grid'),
		    	filterMenuA = $('.filter-menu a');
		    	//gridTop 	= gridParend.offset().top;
		    	
		    grid.isotope({
		    	itemSelector: '.grid-item',
		    });
		    body.find('.filter-mobile-wrapper').fadeOut(0);
			$(document).on( 'click', '.filter-menu a', function() {
				filterMenuA.removeClass('active-filter');
				body.find('.filter-mobile-wrapper').fadeOut();
				var gridTop 	= gridParend.offset().top;
            	$('html,body').animate({scrollTop: gridTop}, 500);
				$(this).addClass('active-filter');
			 	var filterValue = $(this).attr('data-filter');
			  	grid.isotope({ filter: filterValue });
			  	return false;
			});

			$(document).on('click','#filtermobile',function () {
				body.find('.filter-mobile-wrapper').fadeIn();
			});
		},
	/*------------------------------------------------
	05. Portfolio Filter
	-------------------------------------------------*/	
		portfolioFilter:function (){
			var filter = $('#filterpush');
			filter.on('click',function () {
				body.toggleClass('open mouse-close');
				return false;
			});
		},
	/*------------------------------------------------
	06. Social Links Animate
	-------------------------------------------------*/	
		socialLinks:function (){
			var socialLink 			= $('.footer-social a'),
				regtangle 			= $('.regtangle');

			socialLink.first().addClass('social-hover');

			setTimeout(function () {
				var position = socialLink.first().position().left;
				regtangle.css({'left':position + 1});
			},500);

			socialLink.hover(function () {
				var dataDomain 		= $(this).attr('data-domain'), 
					dataAccount 	= $(this).attr('data-account'),
					dataSpanDomain 	= $('.social-domain'), 
					dataSpanAccount = $('.social-account'),
					position 		= $(this).position().left;

				socialLink.removeClass('social-hover');
				dataSpanDomain.text(dataDomain);
				dataSpanAccount.text(dataAccount);

				regtangle.stop(false,false).animate({'left':position +1});
				$(this).addClass('social-hover');
			},function (){
				//
			});
		},
	/*------------------------------------------------
	07. Hero Parallax Images
	-------------------------------------------------*/	
		parallax:function (ismobile){

			var parallaxTop 			= $('.parallax-top img'), 
				parallaxRight 			= $('.parallax-right'),
				parallaxRightRtl 		= $('.rtl .parallax-right'), 
				sliderDescription 		= $('.slider-description'),
				sliderDescriptionRtl 	= $('.slider-description'),
				closeFilter 			= $('.open.mouse-close .close-filter');

			if(ismobile) {

				sliderDescription.css({
					'left':'initial',
					'top':'initial'
				});
			}

			$(window).mousemove(function( event ) {
				parallaxTop.css({
					'position':'relative',
					'left':-event.pageX / 30,
					'top':-event.pageY / 20
				});
				parallaxRight.css({
					'right':-event.pageX / 40,
					'top':-event.pageY / 24
				});
				parallaxRightRtl.css({
					'left':-event.pageX / 40,
					'top':event.pageY / 24
				});
				if($(window).width() > 768) {
					sliderDescription.css({
						'left':event.pageX / 30,
						'top':-event.pageY / 24
					});
					sliderDescriptionRtl.css({
						'right':event.pageX / 20,
						'top':-event.pageY / 24

					});
				}
				closeFilter.css({
					'left':event.pageX,
					'top':event.pageY,
				});
			});
		},
	/*------------------------------------------------
	08. Page Hero Height Calculation
	-------------------------------------------------*/	
		pageDom:function () {
			if($(window).width() < 768) {

			} else {

				$('.page-title').height($(window).height());

			}
			
		},
	/*------------------------------------------------
	09. Progressbar Calculation
	-------------------------------------------------*/	
		progressBar: function () {
			var skillBox 		= $('.skill-box');
			skillBox.each(function () {
				var dataValue 	= $(this).attr('data-value');
				if(dataValue == '100%') {
					$(this).find('.skill-value').addClass('skill-full');
				}
				$(this).find('.skill-value').height(dataValue);
			});
		},
	/*------------------------------------------------
	10. Scroll Event Track
	-------------------------------------------------*/	
		windowScroll:function () {
				var heroheight 	= $(window).height(),
					hero 		= $('.hero');
				hero.height(heroheight);
				hero.attr('data-h',heroheight);
				hero.css({'max-height':heroheight});
				hero.css({
						'max-height':heroheight - $(window).scrollTop() ,
				});
				$(window).scroll(function () {

					//App.oriantation();
					var scrolltop = $(window).scrollTop();

						if($(window).width() > 769) {
							
							if($(window).scrollTop() < 1) {
								$('.hero').animate({
									'height':$('.hero').attr('data-h')
								});
							}
							if(scrolltop > 200) {
								$('#filterpush').fadeIn(200);
					
							} else {
								$('#filterpush').fadeOut(200);
								if(body.hasClass('open')) {
									$('#filterpush').trigger('click');
								}
							}

							if(scrolltop > heroheight / 2 ) {

								}else {

									hero.css({
											'max-height':heroheight - $(window).scrollTop() ,
										});
							}


						} //mobile	
				
				});
		},
	/*------------------------------------------------
	11. IsMobile
	-------------------------------------------------*/	
		isMobile:function() {
			var windowWidth = $(window).width();
			if(windowWidth < 769) {

			$('.footer-social').on("click",'.social-hover',function () {
				
				var hc = $(this).hasClass('firstclick');
				$('.footer-social a').removeClass('firstclick');
					$(this).addClass('firstclick');
				if(hc) {
					console.log('hc');
					return true;
				} else {
					return false;
				
				}

				$(this).trigger('mouseenter');
				
			});

				$('.wow').each(function () {
					$(this).removeClass('wow');
					$(this).removeClass('fadeInUp');
				});

			}
			if(windowWidth < 991) {
				$('.filter-mobile-wrapper .filter-wrap').remove();
				$('.header-fixed nav,#filtermobile').remove();
				$('.header nav').clone().appendTo('.header-fixed');
				$('#filterpush').clone().appendTo('.header-fixed').attr('id','filtermobile');
				$('.filter-wrap').clone().appendTo('.filter-mobile-wrapper');
				$('.header-fixed').find('.push').removeClass('mt-5');
				$('#filtermobile').attr('style','');
			} else {
				$('.header-fixed nav,#filtermobile').remove();
				$('.filter-wrap').clone().appendTo('.filter-mobile-wrapper');
				$('.filter-mobile-wrapper .filter-wrap').remove();
			}
		},
	/*------------------------------------------------
	12. Main Navigation Push 
	-------------------------------------------------*/	
		navPush:function(){
			$(document).on('click','.push',function () {
				$('.nav-wrapper').fadeIn();
			});
			$('.close-menu').on('click',function () {
				$('.nav-wrapper,.filter-mobile-wrapper').fadeOut();
			});
		},
	/*------------------------------------------------
	13. Device Oriantation Control
	-------------------------------------------------*/	
		oriantation:function () {

			var oSelectors 			= $('.hero,.hero .container,.page-title .slide-img-wrapper,.hero-single,.hero-single .slide-img-wrapper,.page-title,.slider-content ,.slider-content .slide-img-wrapper,.slick-list'),
				scurr 				= $('.slider-main .slick-current'),
				dataSlickIndex 		= scurr.attr('data-slick-index'),
				slickCurrentHeight 	= $('.hero').attr('data-h');

			oSelectors.css({
				'max-height':$('.hero').attr('data-h')
			});

				body.find('.slider-main .slide-item').css({
					'height':$('.hero').attr('data-h')
				});

				body.find('.hero-single .slide-img-wrapper,.hero-single .slide-img-wrapper img ,.hero-single,.hero-single .page-title').css({
					'height':$('.hero').attr('data-n')
				});

			if(dataSlickIndex == -1) {
			
				$('.slider-main .slick-track').css({
					'transform': 'translate3d(0px, -'+slickCurrentHeight+'px, 0px)'
				});

			} else if (dataSlickIndex == 0) {

				$('.slider-main .slick-track').css({
					'transform': 'translate3d(0px, -'+ 2 * slickCurrentHeight+'px, 0px)'
				});
			} else {
				body.find('.slider-main .slick-track').css({
					'transform': 'translate3d(0px, -'+ ( parseInt(dataSlickIndex) + 1) * slickCurrentHeight+'px, 0px)'
				});
			}

		},
	/*------------------------------------------------
	14. Ajax Portfolio
	-------------------------------------------------*/	
		ajaxPortfolio:function() {
			var gridItem 			= $('.grid-item'),
				positionAbsolute 	= $('.position-absolute'),
				ajaxContainer 		= $('.ajax-wrapper .container'),
				ajaxContent 		= $('.ajax-content'),
				ajaxWrapper 		= $('.ajax-wrapper'),
				heroPositionAbsolute = $('.hero .position-absolute');

			gridItem.on('click','.ajax-item',function () {

				var ajaxValue = $(this).attr('data-ajax');
				var ajaxUrl = $(this).attr('href');

				if(ajaxValue == 'true') {
					var bstop 	= $(window).scrollTop();
				
					body.attr('bst',bstop);
					body.addClass('newline');
					positionAbsolute.clone();
					ajaxContainer.prepend(positionAbsolute);

					setTimeout(function () {
						$('.overlay-wrapper').css({
							'display':'block'
							}).animate({
							'bottom':'0',
						},500,
						function () {
							setTimeout(function () {
								body.find('.position-absolute').attr('style','position:relative !important');
								body.find('.header-fixed #filtermobile').attr('style','display:none !important');
								ajaxContent.load(''+ajaxUrl+' .portfolio-detail',function () {
									ajaxWrapper.show().removeClass('closemove').addClass('move');
									heroPositionAbsolute.addClass('aktiveHeader');
									setTimeout(function () {
										$('html,body').animate({scrollTop: 0},500);
									},1000);
									setTimeout(function () {
										body.addClass('fixflow');
									},1500);
									body.find('.header-fixed').append('<a class="close-menu-ajax" href="#"></a>');

								});
							},750);
						});
					},500);
				  return false;
				}
			});
			$(document).on('click','.close-menu-ajax',function () {
				positionAbsolute.clone();
					$('.hero .container').prepend(positionAbsolute);
				$('.ajax-wrapper').removeClass('move').addClass('closemove');
				setTimeout(function () {
					$('.ajax-content').html('');
					$('.hero .position-absolute').removeClass('aktiveHeader');
					body.removeClass('fixflow');
					$(window).scrollTop(body.attr('bst'));
					body.find('.close-menu-ajax').remove();

					$('.overlay-wrapper').animate({
							'bottom':'-100vh'
						},750,function() {
							$(this).css({
								'display':'none'
						});
					});

					body.find('.position-absolute').attr('style','');
					body.find('.header-fixed #filtermobile').attr('style','display:none');
					body.find('#filtermobile').attr('style','display:block');
					body.removeClass('newline');
					$('.ajax-wrapper .container .position-absolute').remove();
				},1000);
			});
			$('.ajax-content').on('click','.page-nav a',function (e) {
				e.preventDefault();
				var nextPrev = $(this).attr('href');
				$('.ajax-content').animate({
					'height':0
				},1300,afterRemove);
				function afterRemove() {
					$('.ajax-content').html('');
					setTimeout(function () {
						$('.ajax-content').load(''+nextPrev+' .portfolio-detail',function () {
							$('.ajax-content').animate({
								'height':'100%'
							},'slow',ajaxContentHeightRemove);
							function ajaxContentHeightRemove() {
								$('.ajax-content').attr('style','');
							}	
						});
					},500);
				}
				return false;
			});
		}
};//APP

	/*------------------------------------------------
	15. Isotope Control
	-------------------------------------------------*/	

	var isotopePage = body.find('.grid-wrapper').hasClass('grid-wrapper');
	if(isotopePage){
		$('.grid-wrapper').imagesLoaded( function() {
	  		App.isotope();
		});
	}

	/*------------------------------------------------
	16. Mobile Scroll
	-------------------------------------------------*/	
	if($(window).width() > 769) {
		App.windowScroll();
	}

	/*------------------------------------------------
	17. Window Resize
	-------------------------------------------------*/	
	$(window).resize(function () {
	
		if($(window).scrollTop() == 0 ) {
			App.windowScroll();

		}
			App.pageDom();
			App.isMobile();
			App.oriantation();

		setTimeout(function () {
	

			App.socialLinks();
		    App.parallax(true);
			App.dom();
		},1000);

	});

	/*------------------------------------------------
	18. Window Orientation Change
	-------------------------------------------------*/	
	$(window).on('orientationchange', function() {
		console.log('oriantasyon değiştir');

			App.pageDom();
			App.oriantation();
		setTimeout(function () {
	    	App.windowScroll();
	    	App.parallax(true);
		},500);

	});
	function debounce(func){
	  var timer;
	  return function(event){
	    if(timer) clearTimeout(timer);
	    timer = setTimeout(func,100,event);
	  };
	}

	window.addEventListener("resize",debounce(function(e){
		if($(window).width() > 769) {
			var scrolltop = $(window).scrollTop();
				var WindowHeightResize = $(window).height();
			$('.hero').css({
				'max-height':WindowHeightResize - scrolltop ,
				'height':WindowHeightResize - scrolltop
			});
		}
	}));

	/*------------------------------------------------
	19. Wow Init
	-------------------------------------------------*/		
	new WOW().init();

	/*------------------------------------------------
	20. Contact Form
	-------------------------------------------------*/	
	$('form#contact-us').submit(function() {
		$('form#contact-us .error').remove();
		var hasError = false;
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var labelText = $(this).prev('label').text();
				$(this).parent().append('<span class="error">'+labelText+' This field is required</span>');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).hasClass('email')) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					$(this).parent().append('<span class="error"> Please enter a valid email address</span>');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		if(!hasError) {
			var formInput = $(this).serialize();
			$.post('contacts.php',formInput, function(data){
				$('form#contact-us').slideUp("fast", function() {				   
					$(this).before('<p class="tick"><strong>Thank You! </strong> Your mail has arrived. The return will be made as soon as possible..</p>');
				});
			});
		}
		
		return false;	
	});

});//JQuery
