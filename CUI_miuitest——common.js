document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	//hideToolbar
	WeixinJSBridge.call('hideToolbar');
});
;(function($){
	/**
	 * ÏÔÊ¾loading
	 * @param
	 */
	$.showLoading = function(isShow,hasOverlay){
		
		var loading = $("#js-loading"),
			$body = $("body");
		
		if(isShow === true){
			if(loading.length < 1){
				$body.append("<div class='loading js-loading' id='js-loading' style='display:block'></div>");
			}
			if(hasOverlay === true){
				$body.append("<div class='overlay' id='loadingOverlay'></div>");
			}
		}else if(isShow === false){
			loading.remove();
			$("#loadingOverlay").remove();
		}
		
	};
})(jQuery);

;(function($){
	/**
	 * mask ÕÚÕÖ²ã
	 * @return $layer
	 */
	$.overlay = function(options,callback){
		var defaults = {
			"effect": null,
			"speed": "normal",
			"opacity": 0,
			"background": "rgb(0,0,0)"
		};
		
		var settings = $.extend(defaults,options);
		
		var $overlay = $(".overlay");
		if($overlay.length > 0){
			$overlay.remove();
		}
		
		var $layer = $("<div />")
					.addClass("overlay")
					.css({
						"opacity": settings.opacity,
						"background": settings.background
					});
					
		switch(settings.effect){
			case "fadeIn":
				$layer.fadeIn(settings.speed);
				break;
			case "fadeOut":
				$layer.fadeOut(settings.speed);
				break;
			case "slideDown":
				$layer.slideDown(settings.speed);
				break;
			case "slideUp":
				$layer.slideUp(settings.speed);
				break;
			default:
				$layer.show(settings.speed);
		}
		
		$("body").append($layer);
		
		//callback
		if(typeof callback === "function"){
			callback();
		}
		
		return $layer;
	}
})(jQuery);

;(function($){
	/**
	 * mask ·ÖÏí²ã
	 * @return $layer
	 */
	$.share = function(options,callback){
		var defaults = {
			"effect": null,
			"speed": "normal",
			"opacity": 0,
			"background": "rgb(0,0,0)"
		};
		
		var settings = $.extend(defaults,options);
		
		var $share = $(".share");
		if($share.length > 0){
			$share.remove();
		}
		
		var $sharelayer = $("<div onclick='$(this).hide()'><div style='width: 100%;height: 32.4%;' ><img src='images/jiantuo.png' height='100%' width='100%' /></div> </div>")
					.addClass("share")
					.css({
						"opacity": settings.opacity,
						"background": settings.background
					});
					
		switch(settings.effect){
			case "fadeIn":
				$sharelayer.fadeIn(settings.speed);
				break;
			case "fadeOut":
				$sharelayer.fadeOut(settings.speed);
				break;
			case "slideDown":
				$sharelayer.slideDown(settings.speed);
				break;
			case "slideUp":
				$sharelayer.slideUp(settings.speed);
				break;
			default:
				$sharelayer.show(settings.speed);
		}
		
		$("body").append($sharelayer);
		
		//callback
		if(typeof callback === "function"){
			callback();
		}
		
		return $sharelayer;
	}
})(jQuery);

;(function($){
	/**
	 * µ¯´° vPopWin
	 */
	$.vPopWin = function(options,callback){
		var setting = {
			"content": null,
			"tit": null,
			"btn": "ok",
			"winClass": "",
			"winID": "",
			"isRemove": true,
			"fullScreen": false
		};
		
		var settings = $.extend(setting,options);
		
		if($("#"+settings.winID).length > 0 && !settings.isRemove){
			$("#"+settings.winID).show();
		}else{
			var $vPopWinWrap = $("<div class='vPopWin "+settings.winClass+"' id="+settings.winID+">" +
					"<div class='vPopWin-inner'>" +
					"<div class='vPopWin-title'>" +
					"<span class='vPopWin-title-name'>"+settings.tit+"</span>" +
					"<span class='vPopWin-title-btn'><i class='flat-icon-"+settings.btn+"'></i></span>" +
					"</div>" +
					"<div class='vPopWin-content'>"+settings.content+"</div>" +
					"</div>" +
			"</div>");
			
			if(options && typeof settings.content === "object"){
				$vPopWinWrap.find(".vPopWin-content").html(settings.content);
			}
			
			if(settings.fullScreen){
				$vPopWinWrap.addClass("fullScreen");
			}
			
			$vPopWinWrap.find(".vPopWin-title-btn").click(function(){
				//callback
				if(typeof callback === "function"){
					callback();
				}
				if(settings.isRemove){
					//remove
					$vPopWinWrap.remove();
				}
				if(!settings.isRemove){
					//hide
					$vPopWinWrap.hide();
				}
				
			});
			
			$("body").append($vPopWinWrap);
		}

	};
})(jQuery);


var changeImgFlag = false ;
var srcTmp ;
//Á©¸öÍ¼Æ¬ÇÐ»»Í¼Æ¬µÄSRC
function changeImg(changeObj,src){
	if(!changeImgFlag){
	  srcTmp = changeObj.src;
	  changeObj.src=src;
	  changeImgFlag = true;
	}
	else{
		changeObj.src = srcTmp;
		changeImgFlag = false;
	}
}
