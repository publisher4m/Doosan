$(document).ready(function(){
		
	init();
	
		
	// Scroll Event
	$('#main #fullpage').on('scroll touchmove mousewheel', function(event) {	
		
		//console.log(current_idx);

		if(last_y > $("html").scrollTop() && !onpage_on){
			
			//원페이지 스크롤 진입
			console.log(":: 원페이지 시작 ::");
			onpage_on = true;
			isScroll = false;
		}
		
		if(!onpage_on) return;
		
		//스크롤 이벤트 막기
		event.preventDefault();
		event.stopPropagation();		
		if(isScroll) return; // 현재 스크롤이 동작중이면 종료
		
		
		isScroll = true;		
		var direction = event.originalEvent.wheelDelta; //마우스 휠 방향
		var y = 0;

		if(direction > 0){
			// up
			current_idx --;
			if(current_idx < 0){current_idx = -1;}
			y = current_idx * page_h;
		}
		else{
			// down
			current_idx ++;
			if(current_idx > total_section){
				current_idx = total_section;
				onpage_on = false;
				return;
			}
			
			y = current_idx * page_h;		
		}

		$('html').animate({scrollTop: y}, 500, function(){isScroll=false;});	
	});
});

$( window ).resize(function() {
	
	// 반응형
	setHeight();
});


function init(){
	
	setHeight();
	
	total_section = $('#main #fullpage > section').length;
	last_y = page_h * total_section;
}	

function setHeight(){
	
	// 높이 설정
	screen_h = document.body.clientHeight;
	page_h = screen_h - 80;
	$("#main #fullpage > section").height(page_h);
}


/* -------------------------------------------------- */

$(function(){

	//********************************** AOS initialization
    AOS.init({
		once : true,
		throttleDelay : 99,
		duration: 1000,
	});
	
	$(".side_nav").on("click", function(){
		$(".side_nav_wrap .bg").toggleClass("on");
	});
	

    function getParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    var s_cate = getParameter("s_cate");
    console.log(s_cate)
    if(s_cate){
        $(".sub .lnb .w1400 > ul > li.lnb_depth p span").text(s_cate)
        $(".sub .lnb .w1400 > ul > li.lnb_depth2").hide()
    };


	//********************************** 메인 슬라이더

	// var speed = 1400;
	// var autoplaySpeed = 3000; 
	// var slideWidth  = $(window).width();
	// var w = slideWidth / 1.2 * -1;
	// var mvSlide = $(".mv .slide_ctn");
	// var mtSlide = $(".mv .slide_txt .w1565");

	// //풀페이지 부수기 (커스텀 앵커시)
	// var fullPageCreated = false;
	// var resizeControl = false;
	// createFullpage();
	// fullResize();
	
	// function createFullpage() {
	// 	 if (fullPageCreated === false) {
	// 		 fullPageCreated = true;
	// 		 $("#main #fullpage").fullpage({
	// 			// fitToSection: false,
	// 			onLeave: function(index, nextIndex, direction){
	// 				var idx = nextIndex - 1;
	// 				$("#main .section:eq("+idx+")").addClass("a_on");

	// 				if(nextIndex == 1){
						
	// 				}
	// 				if(nextIndex == 4){
	// 					// $.fn.fullpage.destroy();
						
	// 				}
	// 				if(nextIndex == 5){
						
	// 				}
	// 			},
				
	// 		})
	// 	}
	// }

	

	// var control02 = true;
	// 	function fullResize(){
	// 		if($(window).width() <= 1200){
	// 			fullPageCreated = false;
	// 			control02 = true;
	// 			 if(!resizeControl){
	// 				$.fn.fullpage.destroy('all');
	// 				resizeControl = true;
	// 				console.log(resizeControl)
	// 				$("#main .section").removeClass("a_on");
	// 				$(window).scroll(function(){
	// 					var windowH = $(this).height();
	// 					var percentage = windowH * 80 / 100;
	// 					var windowS = $(this).scrollTop() + percentage 
	// 					$(".ani").each(function(){
	// 						var thisTop = $(this).offset().top;						
	// 						if (thisTop < windowS) {
	// 							$(this).addClass("m_ani");
	// 						}
	// 					});
	// 				})
	// 			 }
	// 		}else {
	// 			createFullpage();
	// 			resizeControl = false;
	// 			if ($(window).width() >= 1200 && control02){
	// 				control02 = false;
	// 				$.fn.fullpage.moveTo('page01', 0);
	// 				$(".ani").removeClass("m_ani")
	// 			}
	// 		}
	// 	}

	var total_section = 0; //전체 원페이지 수
	var current_idx = 0;
	var screen_h = 0; // 화면 높이
	var page_h = 0;
	var last_y = 0; // 스크롤 마지막 하단 높이
	var onpage_on = true;
	var isScroll = false;
	


	//********************************** 메인 슬라이더

	mvSlide.on("init", function(e, slick){
		var count = slick.slideCount;
		$(".mv .all").text("0"+count)
		//chkW(w)
		$(".play .p_bar").animate({strokeDashoffset: "0"},autoplaySpeed )
	})
	mvSlide.slick({ //비주얼
		arrows:false,
		speed: speed,
		pauseOnHover:false,
		pauseOnFocus:false,
		autoplay:true,
		fade:true,
		autoplaySpeed:autoplaySpeed,
		asNavFor: mtSlide
	})
	mtSlide.slick({ //텍스트
		arrows:false,
		speed: speed,
		fade:true,
		asNavFor: mvSlide 
	})

	mvSlide.on("beforeChange", function (e, slick, currentSlide, nextSlide) {
		mvSlide.slick("setPosition");
		var count = slick.slideCount;
		var selectors = [nextSlide, nextSlide - count, nextSlide + count].map(function(n){
		return '.mv [data-slick-index="'+n+'"]'
		}).join(',');
		$('.mv .slick_now').removeClass('slick_now');
		$(selectors).addClass('slick_now');
		
		$(".play .p_bar").stop()
		$(".play .p_bar").animate({strokeDashoffset: "116"},0)
		$(".mv .current").text("0" + (nextSlide + 1))

		var bgEle = $(this).find(".item").not(".slick-cloned").find(".bg0" + (nextSlide + 1))
		if(bgEle.find("video").length){
			var video = bgEle.find("img")[0]
			video.currentTime=0;
			video.play();
		}
	})
	
	mvSlide.on("afterChange", function (e, slick, currentSlide, nextSlide) {
		var bgEle = $(this).find(".item").not(".slick-cloned").find(".bg0" + (currentSlide + 1))
		var video = bgEle.find("img")[0]
		// autoplaySpeed = video.duration - img.currentTime;
		autoplaySpeed = 5000;
		mvSlide.slick('slickSetOption','autoplaySpeed', autoplaySpeed, true);
		$(".play .p_bar").animate({strokeDashoffset: "0"}, autoplaySpeed)
	})
	$('.mv').find($('.slick-slide[data-slick-index="0"]')).addClass('slick_now');
	function top(slideWidth){
		if(slideWidth > 1200){
			$(".footer .top_btn").off().on("click",function(){
				$.fn.fullpage.moveTo(1);
			})
		} else{
			$(".footer .top_btn").off().on("click", function(){
				$("html,body").animate({scrollTop: 0},600)
			})
		}
	}

	$(".slide_btn > div").on("click", function(e){
		var name = e.currentTarget.className
		if(name == "prev" || name == "prev on"){
			$(this).parents().siblings(".slide_ctn").slick("slickPrev")
		} else{
			$(this).parents().siblings(".slide_ctn").slick("slickNext")
		}
	})

 /* section2 */
	$(".m_pro .slide_ctn").on("init", function(e, slick){
		var $slick = $(".m_pro .slide_ctn");
		
		// $(".num_box .all").text("0"+count);
		// $(".pro-bar").animate({ "width": (25 * (idx))+"%" }, 500);
		var time = 1;
		var $bar,
			isPause,
			tick;



		/*************************************************************** get 2 ***************************************************************/
		
		$bar = $('.slider-progress .progress');
		function startProgressbar() {
			resetProgressbar();
			percentTime = 0;
			isPause = false;
			tick = setInterval(interval, 30);
		}

		function interval() {
			if (isPause === false) {
				percentTime += 1 / (time + 0.1);
				$bar.css({
					width: percentTime + "%"
				});
				if (percentTime >= 100) {
					$slick.slick('slickNext');
					startProgressbar();
				}
			}
		}

		function resetProgressbar() {
			$bar.css({
			width: 0 + '%'
			});
			clearTimeout(tick);
		}

		$(".m_pro").hasClass('a_on') ? startProgressbar() : resetProgressbar();

		$('.next, .prev').click(function() {
			startProgressbar();
		});
		
		/*************************************************************************************************************************************/
		
	}).slick({
		arrows:false,
		speed: 1000,
		pauseOnHover:false,
		pauseOnFocus:false,
		//autoplay:true,
		autoplaySpeed:3000,
		fade:true,
	}).on("beforeChange", function (e, slick, currentSlide, nextSlide) {
		$(".m_pro .slide_dots .dot, .m_pro .slide_article .tit").removeClass("on");
		$(".m_pro .slide_dots .dot").eq(nextSlide).addClass("on");
		$(".m_pro .slide_article .tit").eq(nextSlide).addClass("on");
		//$(".num_box .current").text("0" + (nextSlide + 1))
	})

	

	$(".m_pro .slide_wrap .slide_ui .slide_dots .dot").on("click", function(){
		var idx = $(this).index();
		var tit = $(".m_pro .slide_wrap .slide_ui .slide_article .tit");
		var dot = $(".m_pro .slide_wrap .slide_ui .slide_dots .dot");
		$(tit).removeClass("on");
		$(tit).eq(idx).addClass("on");
		$(this).addClass("on");
		
		//$(".num_box .current").text("0" + (idx + 1))
		$(".m_pro .slide_ctn").slick("setPosition");
		$(".m_pro .slide_ctn").slick("slickGoTo", idx)
		$(".m_pro .slide_ctn").slick("slickPause");
	});
	// },function(){
	// 	$(".m_pro .slide_ctn").slick("slickPlay")
	// })


	$(".m-pro3 .slide_ctn").on("init", function(e, slick){
		var count = slick.slideCount;
		$(".num_box .all").text("0"+count)
	}).slick({
		arrows:false,
		speed: 200,
		pauseOnHover:false,
		pauseOnFocus:false,
		autoplay:true,
		autoplaySpeed:3000,
		fade:true,
		dotsClass:"dot",
	}).on("beforeChange", function (e, slick, currentSlide, nextSlide) {
		var count = slick.slideCount;
		$(".m-pro3 .slide_dots .dot").removeClass("on")
		$(".m-pro3 .slide_dots .dot").eq(nextSlide).addClass("on")
		$(".m-pro3 .sub_txt .txt").removeClass("on")
		$(".m-pro3 .sub_txt .txt").eq(nextSlide).addClass("on")
		$(".num_box .current").text("0" + (nextSlide + 1))
	}).on("afterChange", function (e, slick, currentSlide, nextSlide) {
		// $(".m-pro3 .slide_ctn").slick("slickPlay")	
	})

	$(".m-pro3 .slide_wrap .slide_ui .slide_dots .dot").on('click', function(){
		var idx = $(this).index();
		$(".m-pro3 .slide_wrap .slide_ui .slide_dots .dot").removeClass("on")
		$(this).addClass("on")
		$(".num_box .current").text("0" + (idx + 1))
		$(".m-pro3 .slide_ctn").slick("setPosition");
		$(".m-pro3 .slide_ctn").slick("slickGoTo", idx)
		$(".m-pro3 .slide_ctn").slick("slickPause");
	})

	


	/* ----------------------------- */
	$('.calendar .slider_wrap').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		cssEase: 'ease-out',
		arrows: false,
	});

	$('.community .vertical_slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		cssEase: 'ease-out',
		arrows: false,
		vertical : true,
		verticalSwiping:true,
	}).on('wheel', function(e) {
		e.stopPropagation();
		e.preventDefault();
	  
		if (e.originalEvent.deltaY < 0) {
		  $(this).slick('slickPrev');
		} else {
		  $(this).slick('slickNext');
		}
	  });


	var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        centeredSlides: true,
        slidesPerGroupSkip: 1,
		loop:true,
        spaceBetween: 200,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

	  $('.product .swiper .swiper-slide .icons .icons_like').on('click', function() {
		$(this).children().toggleClass('on');
	  });

	var swiper2 = new Swiper(".mySwiper2", {
        slidesPerView: 'auto',
        centeredSlides: true,
        slidesPerGroupSkip: 1,
		loop:false,
        spaceBetween: 50,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });



	/* ---------------- sub --------------- */
	setTimeout(function () {
		$('#sub .sub_visual').addClass('a_on');
	}, 1);


	var speed = 1400;
	var autoplaySpeed = 3000; 
	var slideWidth  = $(window).width();
	var w = slideWidth / 1.2 * -1;
	var mvSlide = $(".mv .slide_ctn");
	var mtSlide = $(".mv .slide_txt .w1565");

	//풀페이지 부수기 (커스텀 앵커시)
	var fullPageCreated = false;
	var resizeControl = false;
	createFullpageSub();
	fullResize();
	
	function createFullpageSub() {
		 if (fullPageCreated === false) {
			 fullPageCreated = true;
			 $("#sub #fullpage").fullpage({
				// fitToSection: false,
				onLeave: function(index, nextIndex, direction){
					var idx = nextIndex - 1;
					$("#sub .section:eq("+idx+")").addClass("a_on");

					if(nextIndex == 1){

					}
					if(nextIndex == 4){
						// $.fn.fullpage.destroy();
						
					}
					if(nextIndex == 5){
						
					}
				},
				
			})
		}
	}

	

	var control02 = true;
		function fullResize(){
			if($(window).width() <= 1200){
				fullPageCreated = false;
				control02 = true;
				 if(!resizeControl){
					$.fn.fullpage.destroy('all');
					resizeControl = true;
					console.log(resizeControl)
					$(".section").removeClass("a_on");
					$(window).scroll(function(){
						var windowH = $(this).height();
						var percentage = windowH * 80 / 100;
						var windowS = $(this).scrollTop() + percentage 
						$(".ani").each(function(){
							var thisTop = $(this).offset().top;						
							if (thisTop < windowS) {
								$(this).addClass("m_ani");
							}
						});
					})
				 }
			}else {
				createFullpageSub();
				resizeControl = false;
				if ($(window).width() >= 1200 && control02){
					control02 = false;
					$.fn.fullpage.moveTo('page01', 0);
					$(".ani").removeClass("m_ani")
				}
			}
		}

	$('#sub .section5 .slider_wrap').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		cssEase: 'ease-out',
		arrows: false,
	}).on('wheel', function(e) {
		e.stopPropagation();
		e.preventDefault();
		
		if (e.originalEvent.deltaY < 0) {
			$(this).slick('slickPrev');
		} else {
			$(this).slick('slickNext');
		}
	});


	$('#sub .section6 .tab li').click(function(){
		var idx = $('#sub .section6 .tab li').index(this)+1;
		console.log(idx);
		$('#sub .section6 .tab li').removeClass('on');
		$(this).addClass('on');
		$('#sub .section6 .right > div').removeClass('on');
		$('#sub .section6 .right > .item0' + idx).addClass('on');

	});
})