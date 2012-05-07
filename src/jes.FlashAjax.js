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
jes.FlashAjax.swf_url = "http://ui.daum.net/media/jes/FlashAjax.swf"; //�÷��� url����

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
	//ie�� httpstatus�� �������⶧����
	if((document.all && httpStatus!="200") || (!document.all && responseText==undefined))
	{
		alert("HTTP �����Դϴ�!\n\n����Ŀ� �ٽ� �õ��ϼ���!");
		return false;
	}
	return true;
};
jes.FlashAjax.checkJSON=function(data){
	var responseText=data.responseText;
	var checkVariable=data.checkVariable;
	//����Ÿ����
	try{
		var result = eval('(' + responseText + ')');
		if(checkVariable && !result[checkVariable]) throw 'checkVariable';  
	}catch(e){
		alert("����Ÿ �����Դϴ�!\n\n����Ŀ� �ٽ� �õ��ϼ���!\n\n"+e);
		return false;
	}

	return result; 
};
jes.FlashAjax.print=function(){
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="0" height="0" id="JESFlashAjax"><param name="allowScriptAccess" value="always" /><param name="movie" value="'+jes.FlashAjax.swf_url+'" /><embed src="'+jes.FlashAjax.swf_url+'" width="0" height="0" name="JESFlashAjax" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');	
};
