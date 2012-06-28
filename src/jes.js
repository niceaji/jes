var jes={};
Object.extend=function(a, b){
  for (var property in b) a[property] = b[property];
  return a;
};

jes.$=function(s) { return document.getElementById(s) };
jes.trim=function(s) {return s.replace(/(^\s*)|(\s*$)/g, "") };
jes.toggle=function(id) { jes.$(id).style.display=(jes.getStyle(jes.$(id),'display')=='none') ? 'block':'none' };
jes.getEl=function(e){var E=jes.getE(e);return E.target || E.srcElement}
jes.getE=function(e){return e || window.event}
jes.random=function(min, max){ return Math.floor(Math.random() * (max - min + 1) + min) };
jes.addEvent=function(object, type, listener) {	
	if(object.addEventListener) {if(type=='mousewheel')type='DOMMouseScroll'; object.addEventListener(type, listener, false)}
	else { object.attachEvent("on"+type, listener); }
};
jes.delEvent=function(object, type, listener){
	if (object.removeEventListener) {if(type=='mousewheel')type='DOMMouseScroll'; object.removeEventListener(type, listener, false)}
	else object.detachEvent('on'+type, listener);
};
jes.stopEvent=function(event) {
	var e=event || window.event;
	if(e.preventDefault) {e.preventDefault(); e.stopPropagation(); }
	else {e.returnValue = false; e.cancelBubble = true;}
};
jes.getEventWheel=function(e){
	var delta=0;
	if(e.wheelDelta) delta=e.wheelDelta/120;
	else if(e.detail) delta=-e.detail/3;
	return delta;
};
jes.getBrowser=function(){
	var ua=navigator.userAgent.toLowerCase();
	var opera=/opera/.test(ua)
	jes._browser={
		ie:!opera && /msie/.test(ua),
		ie_ver: parseFloat(((ua.split('; '))[1].split(' '))[1]),
		opera:opera,
		ff:/firefox/.test(ua),
		gecko:/gecko/.test(ua)		
	};
	return jes._browser;
};
jes.resizeIframe=function(iframe_id) {
	var h = (self.innerHeight) ? document.documentElement.offsetHeight : document.body.scrollHeight;
	try{parent.jes.$(iframe_id).style.height = h+"px";}catch(e){}
};
jes.rollOver=function(s) {
	var img=(typeof(s)=="string") ? img=jes.$(s):s;
	img.onmouseover=function() { jes.rollOver.over(img) }
	img.onmouseout=function() { jes.rollOver.out(img) }
}
jes.rollOver.over=function(img){ var src=img.src; img.src=src.replace("_off.","_on."); }
jes.rollOver.out=function(img){ var src=img.src; img.src=src.replace("_on.","_off."); };

jes.popUp=function(url,name,w,h,scroll,resize,status,center){
	if(!scroll) scroll=0;
	if(!resize) resize=0;
	if(!status) status=1;
	if(center)	
	{
		var x = (screen.width - w) / 2;
		var y = (screen.height - h) / 2;
		center = ",top="+y+",left="+x;
	}
	return window.open(url,name,"width="+w+",height="+h+",status="+status+",resizable="+resize+",scrollbars="+scroll+center);
};
jes.setCookie=function(name, value, expires, path, domain, secure){
	if(expires)//day�� ����
	{
		var d=new Date(); d.setDate(d.getDate()+expires);
		expires = d.toGMTString();
	}
	document.cookie = name + "=" + escape(value) +
	  ((expires) ? "; expires=" + expires : "") +
	  ((path) ? "; path=" + path : "") +
	  ((domain) ? "; domain=" + domain : "") +
	  ((secure) ? "; secure" : "");
};
jes.getCookie=function(name){
	name += "=";
	cookie = document.cookie + ";";
	start = cookie.indexOf(name);
	if (start != -1)
	{
		end = cookie.indexOf(";",start);
		return unescape(cookie.substring(start + name.length, end));
	}
	return "";
};
jes.embedSWF=function(f,w,h,options){
	var param={	id:"JESswf_"+(new Date()).getTime(), quality:'high',bgcolor:'#ffffff',allowScriptAccess:'always'}
	Object.extend(param, options);

	var id='id="'+param.id+'"';
	var name = 'name="'+param.id+'"';
	var p='',e='';	

	for(i in param) 
	{
		if(i=='id')continue;
		p+='<param name="'+i+'" value="'+param[i]+'">\n';
		e+=i+'="'+param[i]+'" ';
	}

	var s='<object '+id+' width="'+w+'" height="'+h+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0">';
	s+='<param name="movie" value="'+f+'">'+ p;	
	s+='<embed '+name+' src="'+f+'" width="'+w+'" height="'+h+'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" '+e+'/>';
	s+='</object>';
	document.write(s);
	return s;
};
jes.embedWMP=function(f,w,h,options){
	var param={id:"JESwmp_"+(new Date()).getTime(),	autostart:'1',showstatusbar:'-1',transparentatstart:'1',displaybackcolor:'0',uimode:'full'}
	Object.extend(param, options);

	var id='id="'+param.id+'" name="'+param.id+'"';
	var p='',e='';
	for(i in param) 
	{
		if(i=='id')continue;
		p+='<param name="'+i+'" value="'+param[i]+'">\n';
		e+=i+'="'+param[i]+'" ';
	}
	var s='<object '+id+' width="'+w+'" height="'+h+'" classid="CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" standby="Loading Microsoft Windows Media Player components..." type="application/x-oleobject" style="filter:gray();">';
	s+='<param name="filename" value="'+f+'">'+ p;
	s+='<embed '+id+' src="'+f+'" width="'+w+'" height="'+h+'" type="application/x-mplayer2" pluginspage="http://www.microsoft.com/windows/mediaplayer/" '+e+' />';
	s+='</object>';
	document.write(s);
};
jes.getStyle=function(el, style) {
	var value = el.style[style];
	if(!value)
	{
		if(document.defaultView && document.defaultView.getComputedStyle) 
		{
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		} 
		else if (el.currentStyle) value = el.currentStyle[style];
	}
	return value == 'auto' ? null : value;
};
jes.getPosition=function(el)
{
	var left=0,top=0;
	while(el)
	{
		left+=el.offsetLeft || 0;
		top+=el.offsetTop || 0;
		el=el.offsetParent;
	}
	return {'x': left, 'y': top}
};
jes.getScroll=function () {
	if(document.all && typeof document.body.scrollTop != "undefined")
	{
		var cont=document.compatMode!="CSS1Compat"?document.body:document.documentElement;
		return {left:cont.scrollLeft, top:cont.scrollTop, width:cont.clientWidth, height:cont.clientHeight}
	}
	else 
		return {left:window.pageXOffset, top:window.pageYOffset, width:window.innerWidth, height:window.innerHeight}
};
jes.submit=function(f) { 
	var form=jes.$(f)||document.forms[f];	
	if(form.onsubmit && !form.onsubmit()) return;
	form.submit();
};
jes.focus=function(n) { 
	var s=null;
	s = jes.$(n)||document.getElementsByName(n)[0];
	s.focus();
};
jes.$F=function(n) {
	var s=null;
	s = jes.$(n)||document.getElementsByName(n)[0];
	if(s.type=="checkbox")
	{
		var c=[];
		var r=document.getElementsByName(n);
		for(var i=0;i<r.length; i++) if(r[i].checked) c.push(r[i].value);
		return (c.length>0)?c:"";
	}
	else if(s.type=="radio")
	{
		var r=document.getElementsByName(n);
		for(var i=0;i<r.length; i++) if(r[i].checked) return r[i].value;
		return "";
	}
	return s.value;
};
jes.length=function(str,len,tail){
	if(!tail) tail="";
	var l=0, c=0, l2=0, u="", s="";
	if(len>0) l2=len;	
	for(var i=0;u=str.charCodeAt(i);i++)
	{
		if (u>127) l+=2;
		else l++;
		if(l2) {
			s+=str.charAt(i); 
			if(l>=l2)
			{
				if(l>l2) s=s.slice(0,-1);
				return s+tail;
			}
		}		
	}
	return l2 ? s:l;
};
jes.html2str=function(s,m){
	var s1=["&amp;","&#39;","&quot;","&lt;","&gt;"];
	var s2=["&","'","\"","<",">"];
	var s3=[];
	if(m) {s3=s1;s1=s2;s2=s3;}
	for(var i in s1) s=s.replace(new RegExp(s1[i],"g"), s2[i]);
	return s;
};
jes.setOpacity=function(el,value){
	el.style.filter="alpha(opacity="+value+")";
	el.style.opacity=(value/100);
	el.style.MozOpacity=(value/100);
	el.style.KhtmlOpacity=(value/100);
};
jes.indexOf=function(arr,s){
	for(var i=0;i<arr.length; i++) if(arr[i]==s) return i;
	return -1;
};
jes.resizeImage=function(img,w,h){
	var t = new Image();
	t.src=img.src;	
	if(t.width==0 || t.height==0) return;
	if(t.width>w || t.height >h)
	{
		img.width=w;img.height=h;
		if((t.width/w) > (t.height/h) )	img.height=Math.round(t.height * (w / t.width));
		else img.width = Math.round(t.width *  (h / t.height));
	}
	else
	{
		img.width=t.width;
		img.height=t.height;
	}
	if(img.width==0 || img.height==0) setTimeout(function(){jes.resizeImage(img,w,h)},500);
};
jes.StringBuffer=function(){this.buffer=new Array()}
jes.StringBuffer.prototype={append:function(s){this.buffer.push(s)},toString:function(){return this.buffer.join("")}};
jes.parseQuery=function(s){
	var str=s||location.search.substr(1);
	var r={},t=[];
	var a=str.split('&');
	for(var i=0;i<a.length;i++){t=a[i].split("=");r[t[0]] = t[1];}
	return r;
};
jes.addComma=function(s){
	var s+='';
	var re = new RegExp('(-?[0-9]+)([0-9]{3})'); 
	while(re.test(s)) s = s.replace(re, '$1,$2'); 
	return s;
}; 