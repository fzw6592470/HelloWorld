var isErrorDateStart = false;
var isErrorDateEnd = false;
var days = 2;
var nowDate,nowDateY,nowDateM,nowDateD,nowDateYMD;
nowDate = new Date();
nowDateY = nowDate.getFullYear();
nowDateM = nowDate.getMonth() + 1;
nowDateD = nowDate.getDate();
nowDateYMD = nowDateY + '-' + nowDateM + '-' + nowDateD;
function doLoad(){
	var dateInput = $("#dateInput");
	var opt = {};
	opt.date = {preset : 'date'};
    dateInput.val(nowDateYMD).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: nowDateY , endYear: nowDateY + 10}));
    //if(days == reinsuranceDay){
    year = nowDate.getFullYear(), month = nowDate.getMonth() + 1 , day = nowDate.getDate() , weekArr = ['周日','周一','周二','周三','周四','周五','周六'] , week = weekArr[nowDate.getDay()];
	$('#startDay').html(((day < 10) ? ('0' + day) : day));
	$('#startYear').html(year+ '-');
	$('#startMonth').html(((month < 10) ? ('0' + month) : month) + '-');	
	showSelectDate('end',nowDate,1);
	//}else{
	//	  showSelectDate('end',stratDate,1);
	//}
}
function purchase(){
	if(isErrorDateStart){
		$('#error').text('保险起期不正确!');
		return false;
	}
	if(isErrorDateEnd){
		$('#error').text('保险止期不正确!');
		return false;	
	}
	$('input[name=taocan]').val($('#taocan').val());

	var formObj = document.getElementById('GetThisForm');
	formObj.action = 'scend.html';
	formObj.target = '_self';
	formObj.method = 'post';
	formObj.submit();
}
function changeTaoCan(productCode){
	var plansId = $('input[name=plansId]').val();
	var account = $('input[name=account]').val();
	window.location.href = "./queryProductDetails.do?account="+account+"&plansId="+plansId+"&productCode="+productCode;
}
function showSelectDate(type,date,num){
	var selectDate = month = day = weekArr = week = null;
	date = date || '';
	if(typeof date == 'string'){
		date = date.replace(/-/g,'/');
	}
    if(type == 'end'){
		selectDate = new Date(new Date(date).getTime() + num*24*60*60*1000);
		endDate = selectDate.getFullYear() + '-' + handleStr(selectDate.getMonth() + 1) + '-' + handleStr(selectDate.getDate());
	}
	
	var dateOverInput = $("#dateOverInput");
	dateOverInput.removeAttr("disabled");
	var opt = {};
	opt.date = {preset : 'date'};
	dateOverInput.val(endDate).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: selectDate.getFullYear() , endYear: selectDate.getFullYear() + 10}));
	year = selectDate.getFullYear(), month = selectDate.getMonth() + 1 , day = selectDate.getDate() , weekArr = ['周日','周一','周二','周三','周四','周五','周六'] , week = weekArr[selectDate.getDay()];
	$('#endDay').html(((day < 10) ? ('0' + day) : day));
	$('#endYear').html(year+ '-');
	$('#endMonth').html(((month < 10) ? ('0' + month) : month) + '-');
}
// 日期格式化
	function handleStr(str){
		var handledStr = str < 10 ? ('0') + str : str;
		return handledStr;
	}
	var reinsuranceMonth = $('input[name=reinsuranceMonth]').val();
	var tishiinsuranceDay = $('input[name=insuranceDay]').val();
	function chooseSatartDate(value){
		$('#error').text('');
		value = value.replace(/-/g,'/');
		var selectDate = new Date(value);
		if(selectDate.getTime() < setDateTime(0).getTime()){
			$('#error').text('保险起期不能早于当天');
			isErrorDateStart = true;
			return false;
		}else if(selectDate.getTime() > setDateTime(90).getTime()){
			if($('input[name=underwriteMonth]').val() != ''){
				$('#error').text('保险起期必须在'+reinsuranceMonth+'月内');
			}else{
				$('#error').text('保险起期必须在'+reunderwriteDay+'天内');
			}
			isErrorDateStart = true;
			return false;
		}else{
			isErrorDateStart = false;
		}
		if(days== 90){
		  showSelectDate('end',value,89);
		}else{
		  showSelectDate('end',value,1);
		}

		chooseEndDate();
		year = selectDate.getFullYear(), month = selectDate.getMonth() + 1 , day = selectDate.getDate() , weekArr = ['周日','周一','周二','周三','周四','周五','周六'] , week = weekArr[selectDate.getDay()];
		$('#startDay').html(((day < 10) ? ('0' + day) : day));
		$('#startYear').html(year+ '-');
		$('#startMonth').html(((month < 10) ? ('0' + month) : month) + '-');
	}
	function chooseEndDate(){
		
		if(days!= 365){
			$('#error').text('');
			var endVal = $('#dateOverInput').val();
			var strVal = $('#dateInput').val();
			endVal = endVal.replace(/-/g,'/');
			strVal = strVal.replace(/-/g,'/');
			var endDate = new Date(endVal);
			var stratDate = new Date(strVal);
			var dcount = (endDate.getTime()-stratDate.getTime())/(1000*3600*24);
			if(dcount<0){
				$('#error').text('保险止期不能早于保险起期!');
				isErrorDateEnd = true;
				return false;
			}else if(dcount>364){
				if($('input[name=insuranceMonth]').val() != ''){
					$('#error').text('保险止期必须在'+reinsuranceMonth+'月内');
				}else{
					$('#error').text('保险止期必须在'+tishiinsuranceDay+'天内');
				}
				isErrorDateEnd = true;
				return false;
			}else{
				isErrorDateEnd = false;
			}
		}
	}
	function showSelectDate(type,date,num){
		var selectDate = month = day = weekArr = week = null;
		date = date || '';
		if(typeof date == 'string'){
			date = date.replace(/-/g,'/');
		}
	    if(type == 'end'){
			selectDate = new Date(new Date(date).getTime() + num*24*60*60*1000);
			endDate = selectDate.getFullYear() + '-' + handleStr(selectDate.getMonth() + 1) + '-' + handleStr(selectDate.getDate());
		}
		
		var dateOverInput = $("#dateOverInput");
		dateOverInput.removeAttr("disabled");
		var opt = {};
		opt.date = {preset : 'date'};
		dateOverInput.val(endDate).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: selectDate.getFullYear() , endYear: selectDate.getFullYear() + 10}));
		
		if(days== 365){
		   dateOverInput.attr("disabled","disabled");
		}
		year = selectDate.getFullYear(), month = selectDate.getMonth() + 1 , day = selectDate.getDate() , weekArr = ['周日','周一','周二','周三','周四','周五','周六'] , week = weekArr[selectDate.getDay()];
		$('#endDay').html(((day < 10) ? ('0' + day) : day));
		$('#endYear').html(year+ '-');
		$('#endMonth').html(((month < 10) ? ('0' + month) : month) + '-');
	}

	//设置日期
	function setDateTime(num){
		var newDate = new Date(new Date().getTime() +num*24*60*60*1000);
		return newDate;
	}
