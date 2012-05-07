jes.setClip=function(s,m){
	try{
		var swf=(navigator.appName.indexOf("Microsoft")!=-1)?window['UIclipSwf']:document['UIclipSwf'];
		swf.setClip(s);alert(m);
	}catch(e){
		alert("해당 브라우저에서는 지원하지 않습니다.");
	}
}
jes.setClip.url='/media/jes/clip8.swf'; //해당 서비스서버에 업로드하여 사용해 주세요~~

jes.setClip.print=function()
{
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="1" height="1" id="UIclipSwf"><param name="allowScriptAccess" value="always" /><param name="movie" value="'+jes.setClip.url+'" /><embed src="'+jes.setClip.url+'" width="1" height="1" name="UIclipSwf" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
}