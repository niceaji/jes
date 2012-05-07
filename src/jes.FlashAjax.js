jes.FlashAjax = function(options) {
	this.options={
		url:'',
		method:'GET',
		param:'',
		onLoad:'',
		contentType: 'application/x-www-form-urlencoded',
		encoding:'UTF-8',
		timeout:1000
	}
	Object.extend(this.options, options);
	this.data=[];
	if(this.options.url) this.send();
}
jes.FlashAjax.swf_url = "http://ui.daum.net/media/jes/FlashAjax.swf"; //플래시 url변경

jes.FlashAjax.prototype={
	send:function(){
		this.setParam();
		var swf=(navigator.appName.indexOf("Microsoft")!=-1)?window['JESFlashAjax']:document['JESFlashAjax'];
		swf.httpRequest(this);
	},
	setParam:function(){
		if(this.options.param=="") return;
		this.data=jes.parseQuery(this.options.param);
	}
};
jes.FlashAjax.checkHTTP=function(data){
	var responseText=data.responseText;
	var httpStatus=data.httpStatus;
	//ie만 httpstatus값 가져오기때문에
	if((document.all && httpStatus!="200") || (!document.all && responseText==undefined))
	{
		alert("HTTP 오류입니다!\n\n잠시후에 다시 시도하세요!");
		return false;
	}
	return true;
};
jes.FlashAjax.checkJSON=function(data){
	var responseText=data.responseText;
	var checkVariable=data.checkVariable;
	//데이타검증
	try{
		var result = eval('(' + responseText + ')');
		if(checkVariable && !result[checkVariable]) throw 'checkVariable';  
	}catch(e){
		alert("데이타 오류입니다!\n\n잠시후에 다시 시도하세요!\n\n"+e);
		return false;
	}

	return result; 
};
jes.FlashAjax.print=function(){
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="0" height="0" id="JESFlashAjax"><param name="allowScriptAccess" value="always" /><param name="movie" value="'+jes.FlashAjax.swf_url+'" /><embed src="'+jes.FlashAjax.swf_url+'" width="0" height="0" name="JESFlashAjax" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');	
};
