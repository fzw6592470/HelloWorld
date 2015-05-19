/**************************************
选择目的国家JS

涉及的数据分两部分,一部分是打印内容,即选择的多个目的国家按一定格式拼接后供打印保单使用
一部分是格式化的数据,为了方便解析使用,二者只是数据格式不同
***************************************/
var cm = CountryManager = {};
//用户选择的国家
cm.queue = [];
cm.queue[0] = [];//申根
cm.queue[1] =[];//非申根
cm.queue[2] =[];//录入
cm.queue[3] =[];
/**********************接口参数************************************/
cm.rowSize = 4;//每行显示几个国家

//预定义非申根国家,可用Server端的数据将其覆盖
var baseUnschengenData = '美国,United States,荷兰,Netherlands,英国,United Kingdom,泰国,Thailand,香港 （中国）,Hong Kong,马来西亚,Malaysia,日本,Japan,澳大利亚,Australia,新加坡,Singapore,韩国,Korea (South),奥兰群岛,Aland Islands,阿尔巴尼亚,Albania,美属萨摩亚,American Samoa,安圭拉,Anguilla,安提瓜和巴布达,Antigua and Barbuda,阿根廷,Argentina,亚美尼亚,Armenia,阿鲁巴,Aruba,巴林,Bahrain,巴哈马,Bahamas,巴巴多斯,Barbados,白俄罗斯,Belarus,伯利兹,Belize,贝宁,Benin,百慕大,Bermuda,不丹,Bhutan,玻利维亚,Bolivia,博茨瓦纳,Botswana,布维岛,Bouvet Island,巴西,Brazil,文莱,Brunei,保加利亚,Bulgaria,柬埔寨,Cambodia,加拿大,Canada,佛得角,Cape Verde,智利,Chile,圣诞岛,Christmas Islands,科科斯（基林）群岛,Cocos (keeling) Islands,科摩罗,Comoros,库克群岛,Cook Islands,哥斯达黎加,Costa Rica,中国,China,克罗地亚,Croatia,古巴,Czech,塞浦路斯,Cyprus,吉布提,Djibouti,多米尼加,Dominica,法罗群岛,Faroe Islands,斐济,Fiji,法国大都会,Franch Metropolitan,法属圭亚那,Franch Guiana,法属波利尼西亚,French Polynesia,加蓬,Gabon,冈比亚,Gambia,加纳,Ghana,直布罗陀,Gibraltar,格林纳达,Grenada,瓜德罗普岛,Guadeloupe,关岛,Guam,危地马拉,Guatemala,根西岛,Guernsey,圭亚那,Guyana,洪都拉斯,Honduras,印度尼西亚,Indonesia,伊朗,Iran,爱尔兰,Ireland,马恩岛,Isle of Man,牙买加,Jamaica,泽西岛,Jersey,哈萨克斯坦,Kazakstan,基里巴斯,Kiribati,朝鲜,Korea (North),科威特,Kuwait,老挝,Laos,莱索托,Lesotho,利比里亚,Liberia,澳门（中国）,Macau,马其顿,Macedonia,马拉维,Malawi,马达加斯加,Madagascar,马尔代夫,Maldives,马绍尔群岛,Marshall Islands,马提尼克岛,Martinique,毛里塔尼亚,Mauritania,毛里求斯,Mauritius,马约特,Mayotte,密克罗尼西亚,Micronesia,摩尔多瓦,Moldova,蒙古,Mongolia,黑山,Montenegro,蒙特塞拉特,Montserrat,摩洛哥,Morocco,莫桑比克,Mozambique,纳米比亚,Namibia,瑙鲁,Nauru,尼泊尔,Nepal,新喀里多尼亚,New Caledonia,新西兰,New Zealand,尼加拉瓜,Nicaragua,纽埃,Niue,诺福克岛,Norfolk Island,阿曼,Oman,帕劳,Palau,巴勒斯坦,Palestine,巴布亚新几内亚,Papua New Guinea,巴拉圭,Paraguay,皮特凯恩群岛,Pitcairn Islands,波多黎各,Puerto Rico,卡塔尔,Qatar,留尼汪岛,Reunion,罗马尼亚,Romania,圣赫勒拿,Saint Helena,圣基茨和尼维斯,Saint Kitts-Nevis,圣卢西亚,Saint Lucia,圣文森特和格林纳丁斯,Saint Vincent and the Grenadines,萨尔瓦多,El Salvador,萨摩亚,Samoa,圣多美和普林西比,Sao Tome and Principe,塞内加尔,Senegal,塞舌尔,Seychelles,南非,South Africa,斯里兰卡,Sri Lanka,苏里南,Suriname,斯威士兰,Swaziland,塔吉克斯坦,Tajikistan,坦桑尼亚,Tanzania,台湾 （中国）,Taiwan,特立尼达和多巴哥,Trinidad and Tobago,土耳其,Turkey,土库曼斯坦,Turkmenistan,阿拉伯联合酋长国,United Arab Emirates,乌拉圭,Uruguay,瓦努阿图,Vanuatu,越南,Vietnam,瓦利斯群岛和富图纳群岛,Wallis and Futuna';
		
		

//预定义申根国家,可用Server端的数据将其覆盖
var baseSchengenData = '德国,Germany,法国,France,意大利,Italy,瑞士,Switzerland,瑞典,Sweden,西班牙,Spain,奥地利,Austria,比利时,Belgium,希腊,Greece,安道尔,Andorra,捷克,Czech,丹麦,Denmark,爱沙尼亚,Estonia,'
		+ '芬兰,Finland,匈牙利,Hungary,冰岛,Iceland,拉脱维亚,Latvia,列支敦士登,Liechtenstein,立陶宛,Lithuania,卢森堡,Luxembourg,马耳他,Malta,摩纳哥,Monaco,挪威,Norway,波兰,Poland,葡萄牙,Portugal,圣马力诺,San Marino,斯洛伐克,Slovakia,斯洛文尼亚,Slovenia,梵蒂冈,Vatican';
var baseCountryData = baseSchengenData + '|' + baseUnschengenData;

//投保目的国家,从Server获取,默认为空
//格式: 申根国家|非申根国家|手工录入的国家  每个国家都是 中文名,英文名,例如
//cm.policyCountryData = '法国,FRANCE,意大利,YITALI,西班牙,SPANISH,荷兰,HOLAND,德国,GERMANY|美国,USA|哥本哈根,';
cm.policyCountryData = '';

//目的国家安装打印要求格式组织的字符串,从Server获取,默认为空
cm.printCountryData = '';



//当点击保存之后发生的动作
cm.onSaved = function(obj){
		obj.val(cm.printCountryData);
}
//window.onload里面调用
cm.init = function(){
//writeDiv()
cm.parseBaseDataToView(baseCountryData);
cm.parsePoliyDataToView(cm.policyCountryData);	
	$(".country_item").each(function(index){
		if((index>=0&&index<9)||(index>=28&&index<38)){
			$(this).show();
		}
		else{
			$(this).hide();
		}
	});
}

/******************************************************************/

cm.unSelectAll = function(){
	var objs = document.getElementById('countryPanel').getElementsByTagName('input');
	for(var i=0;i<objs.length;i++){
		if(objs[i].type =='checkbox')
			objs[i].checked = false;	
	}
	cm.clearQueue();
	cm.updatePrintArea();
}
cm.clearQueue = function(){
	cm.queue[0]=[];
	cm.queue[1]=[];
	cm.queue[2]=[];
	cm.queue[3]=[];
	$("#全球").attr("disabled", false);
	$("#申根协议国家").attr("disabled",false);
	$("#schengenPanel :checkbox").attr("disabled", false);
	$("#非申根协议国家").attr("disabled", false);
	$("#unschengenPanel :checkbox").attr("disabled", false);
}
cm.clearCustomCountry = function(){
	document.getElementById("customPanel").innerHTML = '';
}
cm.clearPrintPanel = function(){
	document.getElementById("printPanel").innerHTML = '';
}

cm.reset = function(){
	//cm.policyCountryData = '';
	//cm.printCountryData = '';
	
	//cm.clearQueue();
	//cm.clearPrintPanel();
	cm.unSelectAll();
	cm.clearCustomCountry();
	//document.getElementById("countryName").value = '';
	
}

/**  
cm.addCountry = function(country, countryEn, itype){
	if(country == null) return false;
	if(countryEn == null) countryEn = '';
	if(itype == 0){//申根
		cm.schengen[country] = country + ',' + countryEn;
	} else if(itype == 1) {//非申根
		cm.unschengen[country] =  country + ',' + countryEn;
	} else if(itype == 2) {//手工录入
		cm.custom[country] = country + ',' + countryEn;
	}
}*/

//元素结构:<span class="country_item"><input type="checkbox" value="法国,FRANCE" />法国</span>
//点击复选框响应函数
cm.clickItem = function(o,type) {
	var v = o.value;
	if(o.checked) {//添加到队列
		cm.pushToQueue(v,type);
	} else {//从队列去除
		cm.removeFromQueue(v,type);
	}
	cm.updatePrintArea();
}

/** 
 * 	cm.maxLength指定打印最大长度,使总长度超出这个值的
 *  国家将不被打印出来
 *  打印顺序为申根国--非申根国--录入国家
 *
 *  */
//最多能打印多少字符
cm.maxLength = 74;
//最多能保存多少字符
cm.maxSaveLength = 400;
cm.buildPrintString = function(){
	var maxLength = cm.maxLength || 100;
	var iLen = 0;
	var len1 = cm.queue[0].length;
	var len2 = cm.queue[1].length;
	var len3 = cm.queue[2].length;
	var len4 = cm.queue[3].length;
	var printStr = '';
	do{
		printStr = formatShengenPrintStr(len1) + ' '
		+ formatUnshengenPrintStr(len2) + ' '
		+ formatCustomPrintStr(len3) + ' '
		+formatWholePrintStr(len4);
		iLen = strLen(trim(printStr));
		if (len4 > 0){
			--len4;
		}else if(len3 > 0){
			--len3;
		}else if(len2 >0){
			--len2;
		}else if(len1 > 0){
			--len1;
		}
		//modified by wenchang 2010-03-18
	}while(iLen > maxLength && (len4 > 0 ||len3 > 0 || len2 >0 || len1 > 0));
	return trim(printStr);	
}

//更新打印预览区域
cm.updatePrintArea = function(){
	var prt = document.getElementById('printPanel');
	prt.innerHTML = '';
	var printStr = cm.buildPrintString();
	var iLen = strLen(printStr);
	prt.innerHTML = printStr + '('+iLen+'字符,最多打印' + cm.maxLength + '字符)';
}

var indexx = -1;
cm.pushToQueue = function(v,type){
	if (type==0){
		indexx = type;
		if(v!='申根协议国家,SCHENGEN STATES'){
			$("#全球").attr("disabled", true);
			$("#申根协议国家").attr("disabled", true);
		}else{
			$("#全球").attr("disabled", true);
			$("#schengenPanel :checkbox").attr("disabled", true);
		}
		
	}
	if (type == 1) {
		indexx = type;
		if(v!='非申根协议国家,UNSCHENGEN STATES'){
			$("#全球").attr("disabled", true);
			$("#非申根协议国家").attr("disabled", true);
		}else{
			$("#unschengenPanel :checkbox").attr("disabled", true);
		}
	}
	if (type == 3){
		if(v!='全球,Global'){
			$("#申根协议国家").attr("disabled", true);
			$("#非申根协议国家").attr("disabled", true);
		}else{
			$("#申根协议国家").attr("disabled", true);
			$("#schengenPanel :checkbox").attr("disabled", true);
			$("#unschengenPanel :checkbox").attr("disabled", true);
		}
	}
	cm.queue[type].push(v);
}
cm.pushToQueueUn = function(v,type){
	if (type==1){
		if(v!='非申根协议国家,UNSCHENGEN STATES'){
			$("#全球").attr("disabled", true);
			$("#非申根协议国家").attr("disabled", true);
		}else{
			$("#unschengenPanel :checkbox").attr("disabled", true);
		}
	}
	cm.queue[type].push(v);
}


cm.removeFromQueue = function(v,type){
	var p1 = document.getElementById('schengenPanel');
	var p2 = document.getElementById('unschengenPanel');
	var p3 = document.getElementById('customPanel');
	var list = [p1,p2,p3];
	var arrList = [[],[],[],[],[]];
	var formatStr = '', printStr = '';
	for(var i=0;i<list.length;i++){
		var p = list[i];
		var arr = arrList[i];
		var sp = p.getElementsByTagName('input');
		for(var j=0;j<sp.length;j++) {
				if(sp[j].checked)
					arr.push(sp[j].value);
		}
		formatStr += arr.join();
	}
	
	var q = cm.queue[type];
	for(var i=0;i<q.length;i++){
		if(q[i] == v){
			var index = i;
			for(var j=index;j<q.length;j++){
				q[j] = q[j+1];
			}
			q.length = q.length - 1;
			break;
		}
	}
	if (type==0&&cm.queue[0].length==0){
		
		if (formatStr == "") {
			$("#全球").attr("disabled", false);
		}
		$("#申根协议国家").attr("disabled", false);
		$("#schengenPanel :checkbox").attr("disabled", false);
	}
	if (type == 1 && cm.queue[3].length==0) {
		if (formatStr == "") {
			$("#全球").attr("disabled", false);
		}
	}
	if (type == 3 && cm.queue[3].length==0) {
		$("#全球").attr("disabled", false);
		$("#申根协议国家").attr("disabled", false);
		$("#schengenPanel :checkbox").attr("disabled", false);
		$("#非申根协议国家").attr("disabled", false);
		$("#unschengenPanel :checkbox").attr("disabled", false);
	}
}

cm.removeFromQueueUn = function(v,type){
	var q = cm.queue[type];
	for(var i=0;i<q.length;i++){
		if(q[i] == v){
			var index = i;
			for(var j=index;j<q.length;j++){
				q[j] = q[j+1];
			}
			q.length = q.length - 1;
			break;
		}
	}
	if (type==1&&cm.queue[1].length==0){
		$("#非申根协议国家").attr("disabled", false);
		$("#unschengenPanel :checkbox").attr("disabled", false);
	}
}
//


cm.checkExist = function(country){
	return document.getElementById(country) != null;
}

cm.parseBaseDataToView = function(dataStr){
	var data = dataStr.split('|');
	try{
			var p1 = document.getElementById('schengenPanel');
			var p2 = document.getElementById('unschengenPanel');
			var p3 = document.getElementById('customPanel');
	
			var ps = [p1,p2,p3];
			for(var i = 0;i<data.length;i++){
				var p = ps[i];
				if(data[i].length == 0)
					continue;
				var countrys = data[i].split(',');
				for(var j =0;j<countrys.length; j++)
					cm.addCountryItem(countrys[j],countrys[++j],i,false);
			}
	}catch(e){
		alert('解析错误!' + e.message);	
	}
}
//根据数据勾选国家
cm.parsePoliyDataToView = function(dataStr, bClean){
	if(bClean) {
		cm.unSelectAll();
	}
	var data = dataStr.split('|');
	try{
			for(var i = 0;i<data.length;i++){
				if(data[i].length == 0)
					continue;
				var countrys = data[i].split(',');
				for(var j =0;j<countrys.length; j++){
					cm.selectCountryItem(countrys[j],countrys[++j],i,false);
				}
				
			}
			//更新打印预览视图
			cm.updatePrintArea();
	}catch(e){
		alert('解析错误!' + e.message);	
	}
}

cm.selectCountryItem = function(country,countryEn,itype,isSelect){
			var o = document.getElementById(country);
			if(o && o.type == 'checkbox') {
				o.checked = true;
			} else {
				cm.addCountryItem(country,countryEn,2,true);
			}
			//将选中的放入队列
			cm.pushToQueue(country+','+countryEn,itype);
}


cm.addCountryItem = function(country,countryEn,itype,isSelect) {	
	var p1 = document.getElementById('schengenPanel');
	var p2 = document.getElementById('unschengenPanel');
	var p3 = document.getElementById('customPanel');
	var p4 = document.getElementById('wholeWorld');
	var p = p1;
	if(itype == 0)
		p = p1;
	else if(itype == 1)
		p= p2;
	else if(itype == 2)
		p = p3;
	else if (itype == 3)
		p = p4; 
	//每行rowSize个
	var spans = p.getElementsByTagName('span');
	var size = spans == null ? 0 : spans.length;
	var rowSize = cm.rowSize;
	
	//if(size > 0 && size % rowSize == 0){
	//	var br = document.createElement("div");
	//	br.style.height = '0px';
	//	br.style.lineHeight = '2px';
	//	p.appendChild(br);
	//}
	
	//创建国家元素到view
	var o = document.createElement("span");
	
	var o2 = document.createElement("input");
	o2.type = 'checkbox';
	o2.id = country;
	//单击响应
	if(itype == 0){
		o2.onclick = function(){
			cm.clickItem(this,0);
		};
		
	}else if(itype == 1){
		o2.onclick = function(){
			cm.clickItem(this,1);
		};
		
		
	} else if(itype == 2){
		o2.onclick = function(){
			cm.clickItem(this,2);
		};	
		
			
	} else {
		o2.onclick = function(){
			cm.clickItem(this,3);
		};
		
		
	}
	var o3 = document.createTextNode(country);
	p.appendChild(o);
	o.appendChild(o2);
	o.appendChild(o3);
	o2.checked = isSelect;
	o2.value = country + ',' + countryEn;
	o.className = 'country_item';
	o3 = null;
	o2 = null;
	o = null;
	//添加数据到model
	//cm.addCountry(country, countryEn, itype);
}

cm.clear = function(){
	cm.whole = {};
	cm.schengen = {};
	cm.unschengen = {};
	cm.custom = {};
}

cm.clickCancel = function(){
	var ok = confirm('选择取消不会保存对目的地国家的修改,确定取消吗?');
	if(!ok) return false;
	cm.showPanel(false);
}
cm.queryData=function(queryValue){
	if(queryValue==""){
		return;
	}
	$(".country_item").each(function(){
		if($(this).find("input").val().indexOf(queryValue.toUpperCase())>-1){
			$(this).show();
		}
		else{
			$(this).hide();
		}
	});
	
}

cm.showPanel = function(bShow,bRefreshData){
	 
	 var p = document.getElementById('countryPanel');
	 if(bShow) {
		 p.style.display = 'block';
		 try{
		 	//更新窗口大小
		 	resizeWindow(null,350);
		 }catch(e){}
		 var dw = document.body.clientWidth, dl = document.body.scrollLeft, dt = document.body.scrollTop;
	 	 var dh = document.body.clientHeight;
		 var w = p.clientWidth, h = p.clientHeight;
		 var l = (dw - w)/2 + dl;
		 var t = (dh - h)/2 + dt;
		 p.style.left = l + 'px';
		 p.style.top = t + 'px';
		 if(bRefreshData) {
		 	cm.parsePoliyDataToView(cm.policyCountryData);
		 }
		 var ua= window.navigator.userAgent;
		 var ie6 =   /msie 6\.0/i.test(ua);
		 if(ie6){
			 var layer = document.getElementById('layer');
			 layer.style.display = 'block';
			 layer.style.width = p.offsetWidth + 'px';
			 layer.style.height = p.offsetHeight + 'px';
			 layer.style.left = '0px';
			 layer.style.top = '0px';
			 layer.filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
		 }
		 $(".country_item").each(function(index){
				if((index>=0&&index<9)||(index>=28&&index<38)){
					$(this).show();
				}
				else{
					$(this).hide();
				}
			});
	 } else {
	 	 p.style.display = 'none';
	 	 try{
		 	resizeWindow();
		 }catch(e){}
	 }
}
function addCountry(){
	var o = document.getElementById('countryName');	
	var v = o.value + '';
	if(v != null && trim(v) != '')
		v = trim(v);
	else{
		alert('请先录入国家名称');
		o.focus();
		return false;
	}
	
	var sp = v.split(',');
	for(var i=0;i<sp.length;i++){
		var cn = sp[i];
		if(cm.checkExist(cn)) {
			alert('该国家[' + cn + ']已存在!');
			o.focus();
			return false;	
		}
		cm.selectCountryItem(cn,'',2,true);
	}
	cm.updatePrintArea();
	o.focus();
}


function saveCountry(obj){
	/** 
	var p1 = document.getElementById('schengenPanel');
	var p2 = document.getElementById('unschengenPanel');
	var p3 = document.getElementById('customPanel');
	var p4 = document.getElementById('wholeWorld');
	var list = [p1,p2,p3,p4];
	var arrList = [[],[],[],[]];
	var formatStr = '', printStr = '';
	for(var i=0;i<list.length;i++){
		var p = list[i];
		var arr = arrList[i];
		var sp = p.getElementsByTagName('input');
		for(var j=0;j<sp.length;j++) {
				if(sp[j].checked)
					arr.push(sp[j].value);
		}
		formatStr += (arr.join() + ((i == list.length - 1) ? '' : '|'));
	}
	*/
	var list = cm.queue;
	var arrList = [[],[],[],[]];
	var formatStr = '', printStr='';
	for(var i=0;i<list.length;i++){
		var arr = arrList[i];
		var sp = list[i];
		for(var j=0;j<sp.length;j++) {
			arr.push(sp[j]);
		}
		formatStr += (arr.join() + ((i == list.length - 1) ? '' : '|'));
	}
	var tempLen = strLen(formatStr);
	if( tempLen > cm.maxSaveLength) {
		alert('您选择的国家太多(' + tempLen + '字符),超出了最大允许字符数:' + cm.maxSaveLength);
		return;
	}
	printStr = cm.buildPrintString();
	//目的国家格式化的字符串,用于保存和解析
	cm.policyCountryData = trim(formatStr);
	//目的国家的打印字符串,用于打印
	cm.printCountryData = trim(printStr);
	cm.showPanel(false);
	
	try{
		cm.onSaved(obj);	
	} catch(e){}
}

//申根国家打印字符串格式
//endIndex: 打印到此序号指定的国家为止
function formatShengenPrintStr(endIndex){
	/* 
	var p1 = document.getElementById('schengenPanel');
	var resultStr = '';
	var cnList = [],enList =[];
	var sp = p1.getElementsByTagName('input');
	for(var j=0;j<sp.length;j++) {
			if(sp[j].checked){
					var val = sp[j].value.split(',');
					var cn = val[0], en=val[1];
					cnList.push(cn);
					enList.push(en);
			}
	}*/
	var resultStr = '';
	var cnList = [],enList =[];
	var sp = cm.queue[0];
	var containsShengen = false;
	var end = endIndex != null ? endIndex : sp.length;
	for(var j=0;j<end;j++) {
			var val = sp[j].split(',');
			
			var cn = val[0], en=val[1];
			//alert(cn)
			if(val[0] =='申根协议国家'){//是否选择了申根协议国家选项
				containsShengen = true;
				continue;
				//alert(sp);
				
			}
			
			cnList.push(cn);
			enList.push(en);

	}
	if(cnList.length >0){
		resultStr = cnList.join() + ',申根协议国家 ' + enList.join() + ',SCHENGEN STATES';
		
	} else if(containsShengen){
		resultStr = '申根协议国家 SCHENGEN STATES';
		
	}
	if(sp != ''){
		$('#MDD').attr('data-shengen','has');
	}else{
		$('#MDD').attr('data-shengen','noHas');
	}
	return resultStr;
}
//非申根国家打印字符串格式
function formatUnshengenPrintStr(endIndex){
	/* 
	var p1 = document.getElementById('unschengenPanel');
	var resultStr = '';
	var list = [];
	var sp = p1.getElementsByTagName('input');
	for(var j=0;j<sp.length;j++) {
			if(sp[j].checked){
					var val = sp[j].value.split(',');
					var cn = val[0], en=val[1];
					list.push(cn + ' ' + en);
			}
	}*/
	var resultStr = '';
	var list = [];
	var sp = cm.queue[1];
	var end = endIndex != null ? endIndex : sp.length;
	for(var j=0;j<end;j++) {
		var val = sp[j].split(',');
		var cn = val[0], en=val[1];
		list.push(cn + ' ' + en);
	}
	if(list.length >0)
	resultStr = list.join();
	return resultStr;
}
//录入国家打印字符串格式
function formatCustomPrintStr(endIndex){
	/*
	var p1 = document.getElementById('customPanel');
	var resultStr = '';
	var list = [];
	var sp = p1.getElementsByTagName('input');
	for(var j=0;j<sp.length;j++) {
			if(sp[j].checked){
					var val = sp[j].value.split(',');
					var cn = val[0], en=val[1];
					list.push(cn);
			}
	}*/
	var resultStr = '';
	var list = [];
	var sp = cm.queue[2];
	var end = endIndex != null ? endIndex : sp.length;
	for(var j=0;j<end;j++) {
		var val = sp[j].split(',');
		var cn = val[0], en=val[1];
		list.push(cn);
	}
	if(list.length >0)
	resultStr = list.join(' ');
	return resultStr;
}
//打录全球
function formatWholePrintStr(endIndex){
	/*  
	var p1 = document.getElementById('wholeWorld');
	var resultStr = '';
	var list = [];
	var sp = p1.getElementsByTagName('input');
	for(var j=0;j<sp.length;j++) {
			if(sp[j].checked){
					var val = sp[j].value.split(',');
					var cn = val[0], en=val[1];
					list.push(cn);
			}
	}*/
	var resultStr = '';
	var list = [];
	var sp = cm.queue[3];
	var end = endIndex != null ? endIndex : sp.length;
	for(var j=0;j<end;j++) {
		var val = sp[j].split(',');
		var cn = val[0], en=val[1];
		list.push(cn + ' ' + en);
	}
	if(list.length >0)
	resultStr = list.join();
	return resultStr;
}

function countrySelectionPanel(ffEvent)
{
	var evnt = ffEvent || window.event;
    var e = evnt.srcElement || evnt.target;
    
    var cw = WebCalendar.calendar.clientWidth, ch = WebCalendar.calendar.clientHeight;
    var dw = document.body.clientWidth, dl = document.body.scrollLeft, dt = document.body.scrollTop;
}

function schengenChk(){
	if ($("#申根协议国家").attr("checked")){
		cm.pushToQueue("申根协议国家,SCHENGEN STATES",0);
	}else{
		cm.removeFromQueue("申根协议国家,SCHENGEN STATES",0);
	}
	cm.updatePrintArea();

}
function wholeWorldChk () {
	if ($("#全球").attr("checked")){
		cm.pushToQueue("全球,Global",3);
		
		//$("#countryName").attr("disabled", true);
	}else{
		cm.removeFromQueue("全球,Global",3);
		//cm.removeFromQueueUn("非申根协议国家,UNSCHENGEN STATES",1);
		$("#申根协议国家").attr("disabled", false);
		$("#countryName").attr("disabled", false);
	}
	cm.updatePrintArea();
}
/*
function writeDiv(){
var div = document.getElementById("__countryDiv");
if(div==null){
div=document.createElement("div");
document.body.appendChild(div);
var str = '<div id="countryPanel" style="display:none;">' +
'<div id="inputPanel">' +
'<table width="100%" border="0">' +
'<tr>' +
'<td width="100px;">录入国家名称：</td>	' +
'<td><input type="text" class="inputbox" maxlength="50" name="countryName" onfocus="this.select();" id="countryName" size="30" /></td>' +
'<td colspan="2" align="right" style="text-align:right;padding-right:10px;"><input type="button" onclick="addCountry()" class="button4" value="新增国家"/></td>' +
'</tr><!--' +
'<tr>' +
'<td>国家英文名称：</td>' +
'<td><input type="text" class="inputbox" maxlength="100" name="countryEnName" id="countryEnName" size="30" /></td>' +
'</tr>-->' +
'<tr>' +
'</tr>' +
'</table>' +
'</div>' +
'<h3 class="title">申根国家<span class="tip">(选择的第一个默认为签证国家)</span></h3>' +
'<div id="schengenPanel"></div>' +
'<h3 class="title">非申根国家</h3>' +
'<div id="unschengenPanel"></div>' +
'<h3 class="title">录入的国家</h3>' +
'<div id="customPanel"></div>' +
'<h3 class="title">打印预览<span class="tip">(超过打印长度范围的会保存但不会被打印)</span></h3>' +
'<div id="printPanel"></div>' +
'<div style="text-align:center;padding-right:10px;padding-bottom:5px;">' +
	'<input type="button" onclick="cm.reset();" class="button4" value="清空"/>' +
	'<input type="button" onclick="cm.clickCancel();" class="button4" value="取消"/>' +
	'<input type="button" onclick="saveCountry()" class="button4" value="保存"/>' +
'</div>' +
'<iframe id="layer" frameborder="0" style="display:none;" class="T_iframe"></iframe> ' +
'</div>';
div.innerHTML = str;
}
}
*/

function strLen(str){
	  var count =0;
	  for (var i=0; i< str.length; i++) {
	    if (str.charCodeAt(i)>=256) {
	      count+=2;
	    } else {
	      count+=1;
	    }
	  }
	  return count;
	}

function trim(s){
	  if( s == null ) return "";
	  s=s.replace(/^ +/, "");
	  s=s.replace(/ +$/, "");
	  return s;
	}
