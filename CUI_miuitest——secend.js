/*
*	JS DOCUMENT
*	By Martin Cui At 2015-02-02 09:14:00
*/
var selectFlag;
function timeControl(){
	var birthdayControl = $('#birthday') , currentDate = new Date(new Date().getTime() + 24*60*60*1000) , curr = currentDate.getFullYear();
		var opt = {};
		opt.date = {preset : 'date'}; 
		if(birthdayControl.val()==""){
			birthdayControl.val(curr-25 + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate())).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr-100 , endYear: curr}));
		}
		else{
			birthdayControl.val(birthdayControl.val()).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr-100 , endYear: curr}));
		}
}

function changeType(val,ids,obj){
	var parent = obj.parent().parent().parent();
	if(val == '01'){
		parent.find('#for-paperNo'+ ids).show();
		parent.find('#for-paperNo'+ ids).removeAttr('disabled','disabled');
		parent.find('#for-paperNo'+ ids).css('top','0').css('position','inherit');
		parent.find('#for-paperNo_other'+ ids).hide();
		parent.find('#for-paperNo_other'+ ids).attr('disabled','disabled');
		selectFlag = 1;
		$('#birthdaybox').hide();
		$('#sexbox').hide();
		$('.vPopWin-inner').css('top','30%');
	}else{
		parent.find('#for-paperNo'+ ids).hide();
		parent.find('#for-paperNo_other' + ids).show();
		parent.find('#for-paperNo_other' + ids).removeAttr('disabled','disabled');
		parent.find('#for-paperNo_other' + ids).css('top','0').css('position','inherit');
		parent.find('#for-paperNo'+ ids).attr('disabled','disabled');
		selectFlag = 0;
		$('#birthdaybox').show();
		$('#sexbox').show();
		var birthdayControl = $('#birthday') , currentDate = new Date(new Date().getTime() + 24*60*60*1000) , curr = currentDate.getFullYear();
		var opt = {};
		opt.date = {preset : 'date'}; 
		if(birthdayControl.val()==""){
			birthdayControl.val(curr-25 + '-' + handleStr((currentDate.getMonth() + 1)) + '-' + handleStr(currentDate.getDate())).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr-100 , endYear: curr}));
		}
		else{
			birthdayControl.val(birthdayControl.val()).scroller('destroy').scroller($.extend(opt.date, {theme: 'default', mode: 'scroller', display: 'modal', lang: 'zh' , startYear: curr-100 , endYear: curr}));
		}
		$('.vPopWin-inner').css('top','23%');
	}
}

function copyVal(val,name){
	name.val(val);
}

function needEmail(checked){
	if(checked){
		$('#needEmail').css('display','table-row');
		$('#email').removeAttr('disabled');
	}else{
		$('#needEmail').css('display','none');
		$('#email').attr('disabled','disabled');
	}
}

function nextStep(){
	$('#error').text('');
	if($('#applicantName').val() == ''){
		$('#error').text('投保人姓名不能为空！');
		return false;
	}
	if ($("#applicantCertType").val() == "01" && $("#for-paperNo1").val() == "") {
		$('#error').text('投保人证件号码不能为空！');
		return false;
	}
	if ($("#applicantCertType").val() != "01" && $("#for-paperNo_other1").val() == "") {
		$('#error').text('投保人证件号码不能为空！');
		return false;
	}
	if ($("#applicantCertType").val() == "01" && $("#for-paperNo1").val() != "") {
		if (!valiateShenfenz($("#for-paperNo1").val(), '1', 'error')) {
			//$('#error').text('投保人身份证格式不合规范！');
			return false;
		}
	}
	if ($("#applicantCertType").val() != "01" && $("#for-paperNo_other1").val() != "") {
		if (!valiateBirthday($("#birthday").val(), '1', 'error')) {
			//$('#error').text('投保人出生日期！');
			return false;
		}
	}
	var telephone = $('#telephone').val();
	var exp = /1[3-8]+\d{9}/;
	if(telephone == ''){
		$('#error').text('投保人电话不能为空！');
		return false;
	}
	if(!exp.test(telephone)){
		$("#error").text("您输入的手机号格式不合规范！");
		return false;
	}
	if($('#needEmail').css('display') == 'table-row'){
		var mail = $('#email').val();
		var exm = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
		if(!exm.test(mail)){
			$('#error').text('投保人邮箱格式不正确！');
			return false;
		}
	}

	// 获取信息
	//姓名
	$('input[name=applicantName]').val($('#applicantName').val());
	//证件类型
	$('input[name=applicantCertType]').val($('#applicantCertType').val());
	//证件号码
	if($("#applicantCertType").val() == "01"){
		$('input[name=applicantCertNo]').val($('#for-paperNo1').val());
	}else{
		$('input[name=applicantCertNo]').val($('#for-paperNo_other1').val());
	}
	//手机号
	$('input[name=telephone]').val($('#telephone').val());
	//邮箱
	$('input[name=applicantEmail]').val($('#email').val());
	//生日
	if($("#applicantCertType").val() == "01"){
		var certCo = $("#for-paperNo1").val();
		var birthday = getBirthdy(certCo,birthday);
		$('input[name=applicantBirthday]').val(birthday);
	}else{
		var birthday = $('#birthday').val();
		$('input[name=applicantBirthday]').val(birthday);
	}
	//性别
	$('input[name=applicantSex]').val($('#sexvalue').val());

	//提交
	var formObj = document.getElementById('GetThisForm');
	formObj.action = 'third.html';
	formObj.method = 'post';
	formObj.target = '_self';
	formObj.submit();
}
//日期格式化
function handleStr(str){
	var handledStr = str < 10 ? ('0') + str : str;
	return handledStr;
}

function valiateShenfenz(val,type,e){
	val=val.replace(/\*/g,'X');
	var description = '';
	if ('1' == type) {
		description = "投保人";
	} else if ('2' == type) {
		description = "被保人";
	}
	if(val.length!=15 && val.length!=18){
		$("#" + e).text(description + "身份证不正确。（只能是15或18位）");
		return false;
	}
	var lessYearOld = parseInt($('input[name=leastAcceptInsurAge]').val());
	var topYearOld = parseInt($('input[name=topAcceptInsurAge]').val());
	if(val.length == 15){
		var year = "19"+val.substring(6,8);
		var month = val.substring(8,10);
		var day =  val.substring(10,12);
		var bothday=year+"-"+month+"-"+day;
		var date1 = (parseInt(year)+lessYearOld)+"-"+month+"-"+day;
		
		var date3 = (parseInt(year)+topYearOld)+"-"+month+"-"+day;
		var d = new Date();
		
		var date2 = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+d.getDate();
		if(dateCompare(date1,date2)||dateCompare(date2,date3)){
		  $("#" + e).text(description + "必须在"+lessYearOld+"到"+topYearOld+"周岁之间");
		  return false;
		} else{
		  return true;
	  	}
	} else if(val.length == 18){
	   
	    var year = val.substring(6,10);
		var month = val.substring(10,12);
		var day =  val.substring(12,14);
		var bothday=year+"-"+month+"-"+day;
		var date1 = (parseInt(year)+lessYearOld)+"-"+month+"-"+day;
		
		var date3 = (parseInt(year)+topYearOld)+"-"+month+"-"+day;
		var d = new Date();
		
		var date2 = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+d.getDate();
		if(dateCompare(date1,date2)||dateCompare(date2,date3)){
		  $("#" + e).text(description + "必须在"+lessYearOld+"到"+topYearOld+"周岁之间");
		  return false;
		} else{
		  return true;
	  	}
	}
}

function valiateBirthday(val,type,e){
	var description = '';
	if('1' == type){
		description = '投保人';
	}else if('2' == type){
		description = '被保人'
	}
	var lessYearOld = parseInt($('input[name=leastAcceptInsurAge]').val());
	var topYearOld = parseInt($('input[name=topAcceptInsurAge]').val());
	var cui_getDataY = val.substr(0,4);
	var cui_getDataM = parseInt(val.substr(5,2));
	var cui_getDataD = parseInt(val.substr(8,2));
	var bothday=cui_getDataY+"-"+cui_getDataM+"-"+cui_getDataD;
	var date1 = (parseInt(cui_getDataY)+lessYearOld)+"-"+cui_getDataM+"-"+cui_getDataD;
	
	var date3 = (parseInt(cui_getDataY)+topYearOld)+"-"+cui_getDataM+"-"+cui_getDataD;
	var d = new Date();
	
	var date2 = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+d.getDate();
	if(dateCompare(date1,date2)||dateCompare(date2,date3)){
	  $("#" + e).text(description + "必须在"+lessYearOld+"到"+topYearOld+"周岁之间");
	  return false;
	} else{
	  return true;
  	}
}

function ConversionSymbols(obj){
	obj.value = obj.value.replace(/\*/g, 'X');
}

function getBirthdy(centCo,birthday){
	if(centCo.length == '15'){
		var valY = 19+centCo.substring(6,8);
		var valM = centCo.substring(8,10);
		var valD = centCo.substring(10,12);
		birthday=valY+"-"+valM+"-"+valD;
	}else if(centCo.length == '18'){
		var valY = centCo.substring(6,10);
		var valM = centCo.substring(10,12);
		var valD = centCo.substring(12,14);
		birthday=valY+"-"+valM+"-"+valD;
	}
	
	return birthday;
}

function dateCompare(date1,date2){
	date1 = date1.replace(/\-/gi,"/");	
	date2 = date2.replace(/\-/gi,"/");	
	var time1 = new Date(date1).getTime();	
	var time2 = new Date(date2).getTime();	
	if(time1 >= time2){		
		return true;	
	}
	else{	
	    return false;	
	}
}
