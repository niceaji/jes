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
	if(expires)//day로 설정
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
	s+='';
	var re = new RegExp('(-?[0-9]+)([0-9]{3})'); 
	while(re.test(s)) s = s.replace(re, '$1,$2'); 
	return s;
}; 
jes.ByteChecker=function(id,len){
	this.input = jes.$(id);
	this.isAlert=false;
	this.cid=id;
	this.len=len;
	var self=this;
	jes.addEvent(this.input,'keyup', function(){self.check()})
}
jes.ByteChecker.prototype={
	check:function(){		
		var el=this.input;
		var len = jes.length(el.value);
		if(len > this.len && !this.isAlert)
		{
			this.isAlert=true;
			alert("최대 "+this.len+"Byte까지 가능합니다. 초과된 내용은 자동으로 삭제됩니다.");
			this.isAlert=false;
			//this.input.focus();
			el.value=jes.length(el.value, this.len);
			len=this.len;
		}
		jes.$(this.cid+"_byteinfo").innerHTML = len;		
	}
}

jes.Calender = function(year,month){
	var d=new Date();
	if(year) d.setFullYear(year);
	if(month) d.setMonth(month-1);

	this.day=d;
	this.day_sweek=-1;
	this.ymd=this.getYMD(d);
	this.today=new Date();
	this.today_ymd=this.getYMD(this.today);
	this.selday=null;
	this.selday_ymd="";
	this.selbox=null;

	this.is_draw=0;
	this.is_show=0;
	this.show_el=null;

	this.pid = "UI_Calender"+String(Math.random()).substring(2,6);

};
jes.Calender.prototype={

	setBox:function(num,ymd,type){ //type 1:prev,2:next,0:now
		var box=jes.$(this.pid+"_"+num);
		box.ymd=ymd;
					
		if(type==1) box.className="UICalender_box_prev";
		else if(type==2) box.className="UICalender_box_next";
		else 
		{
			box.className="UICalender_box";			
			if(ymd==this.today_ymd) box.className="UICalender_box_today";
		}
		box.innerHTML=ymd.substring(6,8);
		var self=this;
		if(this.onClick) box.onclick=function(){ self.onClick(box) };
	},
	getYMD :function(date){
		var y=date.getFullYear();
		var m=date.getMonth()+1;
		if(m<10) m="0"+m;
		var d=date.getDate();
		if(d<10) d="0"+d;
		return y+""+m+""+d;
	},
	getLastDay :function(date){
		return new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
	},
	getSweek:function(date){
		return new Date(date.getFullYear(),date.getMonth(),1).getDay();
	},
	goPrev:function(){
		this.draw(this.day.getFullYear(), this.day.getMonth()-1);
	},
	goNext:function(){
		this.draw(this.day.getFullYear(), this.day.getMonth()+1);
	},
	goToday:function(){
		this.draw(this.today.getFullYear(), this.today.getMonth());
	},
	show:function(el){
		this.show_el=el;
		var pos=jes.getPosition(el);
		var ifa=parent.document.getElementById('UICalenderIfa');

		if(!this.is_show)
		{
			jes.addEvent(parent.document,"mousedown",function(){ ifa.style.display='none' })
			this.is_show=1;
		}
		if(this.selbox)	this.selbox.className="UICalender_box";	

		var str=el.value.replace(/[^0-9]/g,"");		
		if(str.length==8)//
		{
			var selday=new Date(str.substring(0,4), str.substring(4,6)-1, str.substring(6,8));
			this.draw(selday.getFullYear(), selday.getMonth());
			
			var d=selday.getDate();
			var n1=Math.ceil((d+this.day_sweek)/7) - 1;
			var n2= d-(1+(7*n1)-this.day_sweek);
			this.selbox=jes.$(this.pid+"_"+n1+""+n2);
			this.selbox.className="UICalender_box_selday";
		}
		ifa.style.top=pos.y+el.offsetHeight+"px";
		ifa.style.left=pos.x+"px";
		ifa.style.display="block";
	},
	print:function(){
		var s=this.skin();
		document.write('<div id="'+this.pid+'">'+s+'</div>');
		
		var day=this.day;
		var selyear=jes.$(this.pid+"_selyear");
		var selmonth=jes.$(this.pid+"_selmonth");
		var btnprev=jes.$(this.pid+"_btnprev");
		var btnnext=jes.$(this.pid+"_btnnext");

		try{
			var self=this;
			jes.addEvent(selyear, "change", function(){
				self.draw(selyear.value, selmonth.value - 1);
			});
			jes.addEvent(selmonth, "change", function(){
				self.draw(selyear.value, selmonth.value - 1);
			});
			jes.addEvent(btnprev, "click", function(){self.goPrev()});
			jes.addEvent(btnnext, "click", function(){self.goNext()});
		}catch(e){}

		this.draw(day.getFullYear(), day.getMonth());
	},
	draw:function(year,month){
		var day=this.day;
		if(this.is_draw) if(year==day.getFullYear() && month==day.getMonth()) return;
		this.is_draw=1;
		day.setFullYear(year);
		day.setMonth(month);		
		this.day_sweek=this.getSweek(day);

		try{
			jes.$(this.pid+"_selyear").value=day.getFullYear();
			jes.$(this.pid+"_selmonth").value=day.getMonth()+1;
		}catch(e){}

		var d0=new Date(year,month,1);
		d0_lastday=this.getLastDay(d0);

		var d1=new Date(year,month-1,1);	//이전달
		var d2=new Date(year,month+1,1);	//다음달
		var d1_lastday=this.getLastDay(d1);
		
		var num=null;
		var d0_day=1,d2_day=1;
		for(var i=0; i<6; i++) 
		{			
			for(var j=0; j<7; j++) 
			{
				num=i+""+j;
				if(i==0 && j<this.day_sweek) //이전달
				{
					
					d1.setDate( d1_lastday - (this.day_sweek-j) + 1 );
					this.setBox(num, this.getYMD(d1),1)					
				}
				else if(d0_day>d0_lastday)
				{
					d2.setDate(d2_day++);
					this.setBox(num, this.getYMD(d2),2)
				}
				else 
				{
					d0.setDate(d0_day++);
					this.setBox(num, this.getYMD(d0),0)
				}
			}
		}
	},
	skin:function(){
		var s='';
		//-------------------------------------------------------------------------
		//html변경가능
		s='<table border="1">'
		+'<tr>'
		+'	<td>일</td>'
		+'	<td>월</td>'
		+'	<td>화</td>'
		+'	<td>수</td>'
		+'	<td>목</td>'
		+'	<td>금</td>'
		+'	<td>토</td>'
		+'</tr>'
		+'<tr>'
		+'	<td colspan="7">'
		+'	<span id="'+this.pid+'_btnprev">◀</span>'
		+'	<select id="'+this.pid+'_selyear">'
		+'	<option value="2006">2006</option>'
		+'	<option value="2007">2007</option>'
		+'	<option value="2008">2008</option>'
		+'	<option value="2009">2009</option>'
		+'	</select>년'
		+'	<select id="'+this.pid+'_selmonth">'
		+'	<option value="1">1</option>'
		+'	<option value="2">2</option>'
		+'	<option value="3">3</option>'
		+'	<option value="4">4</option>'
		+'	<option value="5">5</option>'
		+'	<option value="6">6</option>'
		+'	<option value="7">7</option>'
		+'	<option value="8">8</option>'
		+'	<option value="9">9</option>'
		+'	<option value="10">10</option>'
		+'	<option value="11">11</option>'
		+'	<option value="12">12</option>'
		+'	</select>월'
		+'	<span id="'+this.pid+'_btnnext">▶</span>'
		+'	</td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_00"></td>'
		+'	<td id="'+this.pid+'_01"></td>'
		+'	<td id="'+this.pid+'_02"></td>'
		+'	<td id="'+this.pid+'_03"></td>'
		+'	<td id="'+this.pid+'_04"></td>'
		+'	<td id="'+this.pid+'_05"></td>'
		+'	<td id="'+this.pid+'_06"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_10"></td>'
		+'	<td id="'+this.pid+'_11"></td>'
		+'	<td id="'+this.pid+'_12"></td>'
		+'	<td id="'+this.pid+'_13"></td>'
		+'	<td id="'+this.pid+'_14"></td>'
		+'	<td id="'+this.pid+'_15"></td>'
		+'	<td id="'+this.pid+'_16"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_20"></td>'
		+'	<td id="'+this.pid+'_21"></td>'
		+'	<td id="'+this.pid+'_22"></td>'
		+'	<td id="'+this.pid+'_23"></td>'
		+'	<td id="'+this.pid+'_24"></td>'
		+'	<td id="'+this.pid+'_25"></td>'
		+'	<td id="'+this.pid+'_26"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_30"></td>'
		+'	<td id="'+this.pid+'_31"></td>'
		+'	<td id="'+this.pid+'_32"></td>'
		+'	<td id="'+this.pid+'_33"></td>'
		+'	<td id="'+this.pid+'_34"></td>'
		+'	<td id="'+this.pid+'_35"></td>'
		+'	<td id="'+this.pid+'_36"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_40"></td>'
		+'	<td id="'+this.pid+'_41"></td>'
		+'	<td id="'+this.pid+'_42"></td>'
		+'	<td id="'+this.pid+'_43"></td>'
		+'	<td id="'+this.pid+'_44"></td>'
		+'	<td id="'+this.pid+'_45"></td>'
		+'	<td id="'+this.pid+'_46"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_50"></td>'
		+'	<td id="'+this.pid+'_51"></td>'
		+'	<td id="'+this.pid+'_52"></td>'
		+'	<td id="'+this.pid+'_53"></td>'
		+'	<td id="'+this.pid+'_54"></td>'
		+'	<td id="'+this.pid+'_55"></td>'
		+'	<td id="'+this.pid+'_56"></td>'
		+'</tr>'
		+'</table>';
		//-------------------------------------------------------------------------
		return s;	
	}
};

jes.CheckBox = function()
{
	this.img_on = "img/checkbox_on.gif";
	this.img_off = "img/checkbox_off.gif";
	this.checkbox = {};
	var self=this;

	var chk=null,img=null;
	var cid="";
	for(var i=0; i<arguments.length; i++)
	{
		chk=jes.$(arguments[i]);
		cid=chk.id;
		if(!chk) continue;
		img=chk.parentNode.insertBefore(document.createElement('img'), chk);
		img.src = (chk.checked) ? this.img_on:this.img_off;
		
		img.cid = cid;
		img.onclick = function() {
			self.select(this.cid);
			if(self.checkbox[this.cid].chk.onclick) self.checkbox[this.cid].chk.onclick();
		};
		chk.style.display="none";
		//chk.style.position = "absolute";
		//chk.style.left = "-1000";
		this.checkbox[cid] = {chk:chk, img:img};
	}
};
jes.CheckBox.prototype={
	select : function(cid) {
		this.checkbox[cid].img.src = (this.checkbox[cid].chk.checked) ? this.img_off:this.img_on;
		this.checkbox[cid].chk.checked = !this.checkbox[cid].chk.checked;
	},
	showValue : function() {
		var value = new Array();
		var chk = null;
		for(cid in this.checkbox)
		{
			chk=this.checkbox[cid].chk;
			if(chk.checked) value[value.length]=chk.value; 
		}
		return value;
	},
	checked : function() {
		var cid="";
		if(arguments[0]=="all")
		{	
			for(cid in this.checkbox)this.checked(cid)	
			return;
		}		
		for(var i=0; i<arguments.length; i++)
		{
			cid = arguments[i];
			if(!this.checkbox[cid]) continue;
			this.checkbox[cid].img.src = this.img_on;
			this.checkbox[cid].chk.checked=true;
		}
	},
	unchecked : function() {
		var cid="";
		if(arguments[0]=="all")
		{	
			for(cid in this.checkbox) this.unchecked(cid)	
			return;
		}	
		for(var i=0; i<arguments.length; i++)
		{
			cid = arguments[i];
			if(!this.checkbox[cid]) continue;
			this.checkbox[cid].img.src = this.img_off;
			this.checkbox[cid].chk.checked=false;			
		}
	}
};
jes.AnimateImage=function(id,options){
	this.options={
		frame:0,		//전체 frame수
		dir:'x',		//이동방향  (x|y)
		rate:100,		//frame rate (1000=1초)
		loop:false,		//반복 여부
		move:0			//한번에 움직일 px
	};
	Object.extend(this.options, options);

	this.box=jes.$(id);
	this.currentFrame=0;	//현재 frame
	this.tid=0;				//setTimeout id
	this.isPlay=false;
	this.totalFrame=this.options.frame;	
	this.options.dir = (this.options.dir=='x') ? 'scrollLeft':'scrollTop';

	this.frame_position=[];
	for(var i=0; i<this.options.frame; i++)	this.frame_position[i]= this.options.move * i;
};
jes.AnimateImage.prototype={
	
	play:function(type){
		if(this.isPlay) return;
		this.isPlay=true;
		this.move(type);
	},
	stop:function(){		
		clearTimeout(this.tid);
		this.isPlay=false;
	},
	move:function(type){
		var self=this;

		if(!type)
		{
			if(this.options.loop && this.currentFrame==this.totalFrame-1) this.currentFrame=0;
			else if(this.currentFrame==this.totalFrame-1) {this.stop(); return;}
			else this.currentFrame++;
		}
		else
		{
			if(this.options.loop && this.currentFrame==0) this.currentFrame=this.totalFrame;
			else if(this.currentFrame==0) {this.stop(); return;}
			else this.currentFrame--;
		}
		
		this.box[this.options.dir] = this.frame_position[this.currentFrame];
		this.tid=setTimeout(function(){self.move(type)}, self.options.rate);
	}
};

jes.Drag=function(drag, options){

	var el=jes.$(drag);
	el.options={
		handle:'',
		container:'',
		move_mode:'',	//1:horizontal 2,vertical
		limit_top:-1,
		limit_bottom:-1,
		limit_left:-1,
		limit_right:-1,
		onStart:null,
		onStop:null,
		onDrag:null
	}
	Object.extend(el, el.options);
	Object.extend(el, options);

	el.isdrag=true;
	el.width=0;el.height=0;
	el.area_width=0;el.area_height=0;
	
	jes.Drag.setXY(el);
	
	if(el.handle)
	{
		el.handle=jes.$(el.handle);
		el.isdrag=false;
		el.handle.isdrag=true;
		el.handle.target=el;
	}
	if(el.container)
	{
		jes.$(el.container).style.position="relative";
		el.width=parseInt(jes.getStyle(el,"width")) || el.offsetWidth;
		el.height=parseInt(jes.getStyle(el,"height")) || el.offsetHeight;
		el.area_width=parseInt(jes.getStyle(jes.$(el.container),"width")) || jes.$(el.container).offsetWidth;
		el.area_height=parseInt(jes.getStyle(jes.$(el.container),"height")) || jes.$(el.container).offsetHeight;	
	}
	this.obj=el;
};
jes.Drag.setXY=function(el){
	var pos=jes.getPosition(el);
	el.x=parseInt(jes.getStyle(el,"left"));
	el.y=parseInt(jes.getStyle(el,"top"));
	if(isNaN(el.x)) el.x=pos.x;
	if(isNaN(el.y)) el.y=pos.y;
};
jes.Drag.start=function(event){
	var e=event || window.event; var el=e.target || e.srcElement;
		
	if(el.sliderKnob) el=jes.$(el.sliderKnob);//jes.Slider
	if(!el.isdrag) return;
	if(el.target) el=el.target;
	
	_uiDrag.obj=el;
	jes.Drag.setXY(el);

	_uiDrag.gx = e.clientX;
	_uiDrag.gy = e.clientY;

	if(el.onStart) el.onStart.call(el);
	if(el.onStop) _uiDrag.onStop=el.onStop;
	if(el.onDrag) _uiDrag.onDrag=el.onDrag;
};
jes.Drag.move=function(event){
	
	var drag=_uiDrag.obj;
	if(!drag) return;

	var e=event || window.event; var el=e.target || e.srcElement;
	var top =drag.y + e.clientY - _uiDrag.gy;
	var left=drag.x + e.clientX - _uiDrag.gx;

	if(drag.area_width && drag.area_height)
	{
		if(top<=0) top=0;
		else if(top >= drag.area_height-drag.height) top=drag.area_height-drag.height; 
		if(left<=0) left=0;
		else if(left >= drag.area_width-drag.width) left=drag.area_width-drag.width; 
	}
	if(drag.limit_top>-1 && top<drag.limit_top) top=drag.limit_top;
	if(drag.limit_bottom>-1 && top>drag.limit_bottom) top=drag.limit_bottom;
	if(drag.limit_left>-1 && left<drag.limit_left) left=drag.limit_left;
	if(drag.limit_right>-1 && left>drag.limit_right) left=drag.limit_right;
	
	if(!drag.move_mode || drag.move_mode==2) drag.style.top = top+"px";
	if(!drag.move_mode || drag.move_mode==1) drag.style.left = left+"px";	

	if(_uiDrag.onDrag) _uiDrag.onDrag.call(drag);
};
jes.Drag.end=function(event){
	if(_uiDrag.onStop) _uiDrag.onStop.call(_uiDrag.obj);
	_uiDrag.obj=null;	
	_uiDrag.onStop=null;
	_uiDrag.onDrag=null;
};

//전역변수
var _uiDrag={};
jes.addEvent(document, "mousedown", jes.Drag.start );
jes.addEvent(document, "mousemove", jes.Drag.move );
jes.addEvent(document, "mouseup", jes.Drag.end );

jes.DynamicScript=function(url,enc){
	this.url=url||'';
	this.enc=enc||'';
	this.head=document.getElementsByTagName("head").item(0);
	if(this.url) this.call(this.url);
};
jes.DynamicScript.prototype={
	noCacheParam:function(){
		var b=(this.url.indexOf('?')==-1) ? '?':'&';
		return b+'nOcAchE='+(new Date()).getTime();
	},
	call:function(url){
		try{this.head.removeChild(this.script)}catch(e){};
		this.url=url;
		this.script = document.createElement("script");
		this.script.setAttribute("type", "text/javascript");   
		this.script.setAttribute("src", this.url+this.noCacheParam());
		if(this.enc) this.script.setAttribute("charset", this.enc);
		this.head.appendChild(this.script);
	}
};
jes.HomePage=function(){	
	if(!this.isIE()) return true;		
	document.domain='daum.net';

};
jes.HomePage.prototype={
	get:function(){			
		if(!this.isIE()) return true;
		
		if( JESHomePage && JESHomePage.isHomeVerify()) return true;
		else return false;
	},
	set:function(code){
		if(!this.isIE()) return true;
		if(this.get()) return true;

		if(JESHomePage)	
			return JESHomePage.setDaumHome(code);
	},
	isIE:function(){
		if(navigator.userAgent.indexOf("MSIE")>-1) return true;
		else return false;
	}
};

jes.InputComma=function(id){
	this.input=jes.$(id);
	this.value='';

	var self=this;
	jes.addEvent(self.input,'keyup',function(event){ self.check(event) });
	jes.addEvent(self.input,'keydown',function(event){ self.check(event) });
};
jes.InputComma.prototype={
	isAllowKey:function(e){
		if      (!e.shiftKey && e.keyCode >= 48 && e.keyCode <= 57)  { return true; } //keyboard's num
		else if (!e.shiftKey && e.keyCode >= 96 && e.keyCode <= 105) { return true; } //pad's num
		else 
		{
			switch(e.keyCode) {
				case 8 : //back  
				case 35: //end   
				case 36: //home  
				case 37: //left
				case 38: //top
				case 39: //right
				case 40: //bottom
				case 45: //insert
				case 46: //delete
				case 9 : //tab
				case 13 : //enter
				return true;
			}
		}
		return false;
	},
	check:function(e){
		e = jes.getE(e);

		if(!this.isAllowKey(e))
		{
			jes.stopEvent(e);
			return;
		}
		var value=this.input.value;
		value = value.replace(/,/g,'');
		
		if(value!=this.value)
		{
			this.value=value;
			this.input.value = jes.addComma(value);
		}		
	}
};

jes.Modal=function(url,options){
	this.options={
		type:'image',
		alt:'',
		loading:false,
		opacity:30,
		width:0,height:0
	};
	Object.extend(this.options, options);
	var options=this.options;

	if(!jes.$('UIModalB')) jes.Modal.print();
	jes.setOpacity(jes.$('UIModalB'), options.opacity);
	
	jes.Modal.setB();
	if(options.loading) jes.Modal.center(jes.$('UIModalL'));

	if(options.type=='image')
	{
		jes.$('UIModalF').innerHTML = '<img id="UIModalImage" src="'+url+'" alt="'+options.alt+'" />';
		if(options.loading) jes.$('UIModalImage').style.display='none';
		jes.addEvent(jes.$('UIModalImage'), 'load', jes.Modal.onload);
	}
	else if(options.type=='iframe')
	{		
		jes.$('UIModalF').innerHTML = '<iframe name="UIModalIframe" id="UIModalIframe" src="'+url+'" '+options.status+'></iframe>';
		if(options.loading) 
		{
			jes.$('UIModalIframe').style.display='none';
			jes.addEvent(jes.$('UIModalIframe'), 'load', jes.Modal.onload);
		}
		jes.Modal.center(jes.$('UIModalF'));
	}
	jes.Modal.self=this;
	jes.addEvent(jes.$('UIModalB'), 'click', jes.Modal.reset);
	jes.addEvent(window,'resize', jes.Modal.onresize);
	jes.addEvent(window,'scroll', jes.Modal.onscroll);
};
jes.Modal.self={};
jes.Modal.onload=function(){
	jes.$('UIModalL').style.display='none';
	var pos=jes.getScroll();
	jes.Modal.center(jes.$('UIModalF'));	
	if(jes.Modal.self.options.type=='image')
	{
		jes.$('UIModalImage').style.display='block';
		jes.resizeImage(jes.$('UIModalImage'),pos.width,pos.height);	
	}
	else 
	{
		jes.$('UIModalIframe').style.display='block';
	}
	jes.Modal.center(jes.$('UIModalF'));
};
jes.Modal.print=function(){
	var d=document.createElement('div');
	var s='';
	s+='<div id="UIModalB" style="z-index:99998;width:100%;height:100%;position:absolute;display:none;background-color:#000;"></div>';
	s+='<div id="UIModalF" style="z-index:99999;position:absolute;display:none;"></div>';
	s+='<div id="UIModalL" style="z-index:99999;display:none;position:absolute;border:2px solid gray;">로딩중..</div>';
	d.innerHTML=s;
	document.getElementsByTagName('body')[0].appendChild(d);		
};
jes.Modal.setB=function(){
	var w=jes.$('UIModalB');
	var pos=jes.getScroll();
	w.style.top=pos.top+'px';
	w.style.left=pos.left+'px';
	if(document.all)
	{
		w.style.width=pos.width+'px';
		w.style.height=pos.height+'px';
	}
	w.style.display='block'	
};
jes.Modal.center=function(el){
	el.style.display='block';
	var pos=jes.getScroll();
	el.style.left=pos.width/2-el.offsetWidth/2+pos.left+'px';
	el.style.top=pos.height/2-el.offsetHeight/2+pos.top+'px';
};
jes.Modal.reset=function(){
	jes.Modal.self=null;
	jes.$('UIModalF').innerHTML='';
	jes.$('UIModalB').style.display='none';
	jes.$('UIModalF').style.display='none';
	jes.$('UIModalL').style.display='none';
	jes.delEvent(window,'resize',jes.Modal.onresize);
	jes.delEvent(window,'scroll',jes.Modal.onscroll);
};
jes.Modal.onresize=function(){
	var pos=jes.getScroll();
	if(jes.Modal.self.options.type=='image') jes.resizeImage(jes.$('UIModalImage'),pos.width,pos.height);
	jes.Modal.center(jes.$('UIModalF'));
	jes.Modal.setB();
};
jes.Modal.onscroll=function(){
	jes.Modal.onresize();
};
jes.Move=function(id) {
	this.id=id;
	this.div=jes.$(id);
	this.x= parseInt(jes.getStyle(this.div,'left'))||0;
	this.y= parseInt(jes.getStyle(this.div,'top'))||0;
};
jes.Move.prototype={
	slide : function(pos) {
		this.pos = pos;
		this.pos_n = 0;
		this.speed=0.3;
		this.inteval = 20;
		this.setPos();
		this.playing =true;
		var self=this;
		this.tid=setInterval(function(){self.play()}, this.inteval);
	},
	play : function() {
		this.x += (this.x2-this.x)*this.speed;		
		this.y += (this.y2-this.y)*this.speed;
		this.set(this.x,this.y);
		if(Math.round(this.x)==this.x2 && Math.round(this.y)==this.y2)
		{
			this.x=Math.round(this.x);
			this.y=Math.round(this.y);
			this.set(this.x,this.y);

			if(this.pos_n>=this.pos.length)	{this.playing=false; clearInterval(this.tid)}
			else this.setPos();
		}
	},
	setPos:function(){
		var arr=this.pos[this.pos_n].split(",");
		this.x2 = arr[0];
		this.y2 = arr[1];
		this.pos_n++;
	},
	set:function(x,y){
		this.div.style.left = x+"px";
		this.div.style.top = y+"px";
	}
};
jes.Radio = function(name)
{
	this.img_on = "img/radio_on.gif";
	this.img_off = "img/radio_off.gif";
	this.radio = {};
	this.checked_id = "";
	var self=this;

	var ra = null,img=null;
	var cid = "";
	for(var i=0; i<document.getElementsByName(name).length; i++)
	{
		ra = document.getElementsByName(name)[i];
		cid =ra.id;
		img=ra.parentNode.insertBefore(document.createElement('img'), ra);

		img.src = this.img_off;
		if(ra.checked)
		{
			img.src = this.img_on;
			this.checked_id = cid;
		}
		
		img.cid = cid;
		img.onclick = function() {
			self.select(this.cid);
			if(self.radio[this.cid].ra.onclick) self.radio[this.cid].ra.onclick();
		};
		ra.style.display="none";
		this.radio[cid] = {ra:ra, img:img};
	}
};
jes.Radio.prototype={
	select : function(cid) {
		this.radio[cid].img.src = this.img_on;
		this.radio[cid].ra.checked=true;
		if(this.checked_id && this.checked_id!=cid) this.radio[this.checked_id].img.src = this.img_off;
		this.checked_id=cid;
	},
	showValue : function() {
		return this.radio[this.checked_id].ra.value;
	}
};
jes.Rolling=function(cid,count,interval,n) {
	this.cid = cid;
	this.count = count;	
	this.n = (n)?n:"1";
	this.onchange = null;

	for(var k=1; k<=this.count; k++) jes.$(this.cid+"_"+k).style.display="none";
	jes.$(this.cid+"_"+this.n).style.display="block";

	this.div = jes.$(this.cid);//전체div
	this.div.onmouseover=function(){this.isover=true; }
	this.div.onmouseout=function() {this.isover=false;}
	this.btn_next = jes.$("btn_"+this.cid+"_next");
	this.btn_prev = jes.$("btn_"+this.cid+"_prev");

	var self=this;
	if(this.btn_next) this.btn_next.onclick=function(){self.next() }
	if(this.btn_prev) this.btn_prev.onclick=function(){self.prev() }
	if(interval>0) setInterval(function(){self.play()}, interval);
}
jes.Rolling.prototype = {
	play : function() {
		if(this.div.isover) return;
		this.next();
	},
	change :function(){
		if(this.onchange) this.onchange();
	},
	prev :function(){
		jes.$(this.cid+"_"+this.n).style.display="none";
		this.n=(this.n==1)?this.count:--this.n;
		jes.$(this.cid+"_"+this.n).style.display="block";
		this.change();
	},
	next :function(){
		jes.$(this.cid+"_"+this.n).style.display="none";
		this.n=(this.n==this.count)? 1:++this.n;
		jes.$(this.cid+"_"+this.n).style.display="block";
		this.change();
	},
	random : function() {
		var rn=Math.round((this.count-1)*Math.random());
		for(var i=0;i<rn;i++) this.next();
	}
};
jes.yScrolling=function(cid, millisec1,millisec2, speed, height)
{
	this.cid= cid;
	this.millisec1 = millisec1;	//처음시작 텀
	this.millisec2 = millisec2; //실행 텀
	this.speed = speed;			//한번에 이동할 px
	this.height = height;
	
	this.h =0;
	this.div = jes.$(this.cid);
	this.htmltxt = this.div.innerHTML;
	this.div.innerHTML = this.htmltxt+this.htmltxt;
	this.div.isover=false;
	this.div.onmouseover=function(){ this.isover=true; }
	this.div.onmouseout=function(){	this.isover=false; }
	var self =this;
	window.setTimeout(function(){self.play()}, this.millisec1);
}
jes.yScrolling.prototype={
	play : function(){
		var self =this;
		if(!this.div.isover)
		{	
			this.div.scrollTop += this.speed;
			if(this.div.scrollTop >= this.div.scrollHeight/2) 
			{
				this.div.scrollTop=0;
				//this.h=0;
			}
			else(this.height)
			{
				this.h += this.speed;
				if(this.h>=this.height)
				{
					if(this.h>this.height)
					{
						this.div.scrollTop -= this.h % this.height;
						//window.status = this.div.scrollTop +" : "+this.h % this.height;
					}
					this.h=0;
					window.setTimeout(function(){self.play()}, this.millisec1);					
					return;
				}
			}
		}		
		window.setTimeout(function(){self.play()}, this.millisec2);
	}
};
jes.xScrolling=function(cid, millisec1,millisec2, speed)
{
	this.cid= cid;
	this.millisec1 = millisec1;	//처음시작 텀
	this.millisec2 = millisec2; //실행 텀
	this.speed = speed;			//한번에 이동할 px

	this.div = jes.$(this.cid);
	this.htmltxt = this.div.innerHTML;
	this.div.innerHTML = '<div style="white-space:nowrap">'+this.htmltxt+this.htmltxt+'<\/div>';
	this.div.isover=false;
	this.div.onmouseover=function(){ this.isover=true; }
	this.div.onmouseout=function(){	this.isover=false; }
	var self =this;
	window.setTimeout(function(){self.play()}, this.millisec1);
}
jes.xScrolling.prototype={
	play : function(){
		if(!this.div.isover)
		{	
			this.div.scrollLeft += this.speed;		
			if(this.div.scrollLeft > this.div.scrollWidth/2) this.div.scrollLeft =0;//원위치			
		}
		var self =this;
		window.setTimeout(function(){self.play()}, this.millisec2);
	}
};
jes.Select = function(id,skin){
	this.skin={
		topbox:'border:1px solid #808080;width:200px;',
		subbox:'border:1px solid #808080;width:200px;background-color:#fff',
		default_txt:'color:#000;background-color:#fff;',
		selected_txt:'color:#fff;background-color:#446688;',
		arrow:'<img src="http://img-section.hanmail.net/sports2/arrow_select02.gif" width="15" height="14" border="0">',
		padding:2
	};
	Object.extend(this.skin, skin);

	this.input=jes.$(id);
	this.length=this.input.length;
	this.id=id;
	this.list=[];
	this.isopen=0;
	this.selectedIndex=0;
	this.prevSelectedIndex=0;
	this.moveSelectedIndex=0;//keydown
	this.value='';
	this.topBox= null;
	this.subBox= null;
	this.selBox= null;

	this.print();
};
jes.Select.prototype={
	close:function(){
		if(!this.isopen) return;
		this.subBox.style.display='none';
		this.isopen=0;
		this.focus();
	},
	blur:function(){
		this.selBox.className='default_txt';
	},	
	focus:function(){
		if(this.isopen) return;
		this.selBox.className='selected_txt';
	},
	open:function(){
		if(this.isopen) return;	
		if(jes.Select._openObj) 
		{
			jes.Select._openObjes.close();
			jes.Select._openObjes.blur();
		}
		this.subBox.style.display='block';
		this.blur();
		this.subBox.getElementsByTagName('DIV')[this.selectedIndex].className='selected_txt';
		this.moveSelectedIndex=this.selectedIndex;
		jes.Select._openObj=this;
		this.isopen=1;		
	},
	toogle:function(e){
		if(this.isopen)	this.close();
		else this.open();
		jes.stopEvent(e);
	},
	subOver:function(e){
		this.el=jes.getEl(e)
		this.subBox.getElementsByTagName('DIV')[this.selectedIndex].className='default_txt';
		this.el.className='selected_txt';
	},
	subOut:function(e){
		this.el=jes.getEl(e)
		this.el.className='default_txt';
	},
	onchange:function(){
		if(this.prevSelectedIndex != this.selectedIndex && this.input.onchange) 
		{
			this.input.onchange.call(this);	
		}
	},
	selected:function(isChange){
		this.value=this.list[this.selectedIndex].value;
		this.selBox.value=this.list[this.selectedIndex].text;
		jes.$(this.id).value=this.list[this.selectedIndex].value; //select input
		if(isChange) this.onchange();
		this.prevSelectedIndex=this.selectedIndex;
	},
	subClick:function(e){
		this.el=jes.getEl(e);
		this.selectedIndex=this.el.index;
		this.selected(true);
		this.close();		
		jes.stopEvent(e);
	},
	keyMove:function(e){
		var e=jes.getE(e);
		var prev_index=-1;
		if(e.keyCode==38 && this.selectedIndex>0)
		{
			prev_index=this.selectedIndex--;
			jes.stopEvent(e);
		}
		else if(e.keyCode==40 && this.selectedIndex < this.length-1)
		{
			prev_index=this.selectedIndex++;
			jes.stopEvent(e);
		}
		else if(e.keyCode==13)
		{
			this.close();
			if(this.moveSelectedIndex != this.selectedIndex && this.input.onchange) this.input.onchange.call(this);
			this.moveSelectedIndex=this.selectedIndex;
		}		
		if(prev_index>-1)
		{
			this.subBox.getElementsByTagName('DIV')[prev_index].className='default_txt';
			this.subBox.getElementsByTagName('DIV')[this.selectedIndex].className='selected_txt';
			this.selected((this.isopen) ? false:true);
		}
	},
	print:function(){
		var id=this.id;
		var opt=this.input.options;
		var sb = new jes.StringBuffer();
		for(var i=0; i<opt.length; i++)
		{
			this.list[i]={text:opt[i].text,value:opt[i].value};
			sb.append('<div style="width:100%;padding:'+this.skin.padding+'px">'+opt[i].text+'</div>');
		}
		this.value=this.list[0].value;

		var s='<style type="text/css">input.default_txt,div.default_txt{'+this.skin.default_txt+'} input.selected_txt,div.selected_txt{'+this.skin.selected_txt+'}</style>'
		+'<div id="UISelectTop_'+id+'" style="position:relative;'+this.skin.topbox+'">'
			+'<input class="default_txt" id="UISelectSel_'+id+'" type="text" value="'+this.list[0].text+'" style="width:100%;border:none;margin:0;padding:'+this.skin.padding+'px" readonly="readonly">'
			+'<div style="position:absolute;right:0;top:0">'+this.skin.arrow+'</div>'
		+'</div>'
		+'<div id="UISelectSub_'+id+'" style="display:none;position:absolute;'+this.skin.subbox+'">'+sb.toString()+'</div>';
		
		this.input.style.display='none';
		document.write(s);

		this.topBox= jes.$('UISelectTop_'+id);
		this.subBox= jes.$('UISelectSub_'+id);
		this.selBox= jes.$('UISelectSel_'+id);

		var self=this;
		jes.addEvent(this.topBox, "mousedown", function(e) { self.toogle(e) } );
		jes.addEvent(this.topBox, "keydown", function(e) {self.keyMove(e)});
		
		jes.addEvent(this.selBox, "blur", function() { self.close(); self.blur(); });
		jes.addEvent(this.selBox, "focus", function() { self.focus(); });
		jes.addEvent(document, "mousedown", function() { self.close();self.blur(); } );

		jes.addEvent(this.subBox, "mousedown", function(e) { jes.stopEvent(e) } );
		var sub=this.subBox.getElementsByTagName('div');
		for(var i=0; i<sub.length; i++)
		{	
			sub[i].index=i;
			jes.addEvent(sub[i], "mouseover", function(e) { self.subOver(e) } );
			jes.addEvent(sub[i], "mouseout",  function(e) { self.subOut(e) } );
			jes.addEvent(sub[i], "mousedown", function(e) { self.subClick(e) } );
		}
	}
};
jes.Slider=function(area,knob,options) {
	this.options={
		onSlide:null,
		onChange:null,
		max_value:100,
		move_value:5,
		value:0,
		wheel_area:'',	//마우스휠동작 감지영역
		mode:1			//1:horizontal 2,vertical
	}
	Object.extend(this.options, options);

	this.value=this.options.value;
	this.max_value=this.options.max_value;

	this.area=jes.$(area);
	this.knob=jes.$(knob);
	this.area.width=parseInt(jes.getStyle(this.area,"width"));
	this.area.height=parseInt(jes.getStyle(this.area,"height"));
	this.knob.width=parseInt(jes.getStyle(this.knob,"width"));
	this.knob.height=parseInt(jes.getStyle(this.knob,"height"));

	this.track_length = (this.options.mode==1) ? this.area.width-this.knob.width:this.area.height-this.knob.height;

	var self=this;
	this.drag=new jes.Drag(knob, {
		container:area,
		move_mode:this.mode,
		onDrag:function(){self.slide()},
		onStop:function(){self.change()}
	});
	
	this.area.sliderKnob=knob;
	jes.addEvent(this.area, "mousedown", function(event){ self.moveKnobClientXY.call(self,event) });
	jes.addEvent(this.area, 'mousewheel',function(event){ self.wheelScroll.call(self,event) });
	if(this.options.wheel_area)	jes.addEvent(jes.$(this.options.wheel_area), 'mousewheel',function(event){ self.wheelScroll.call(self,event) });

	if(this.value>0)
	{
		if(this.options.mode==1) this.knob.style.left=this.val2pos()+"px";
		else this.knob.style.top=this.val2pos()+"px";
	}
};

jes.Slider.prototype={
	pos2val:function() {
		var val=Math.floor( parseInt(this.getKnobPos()) * this.max_value / this.track_length);
		if(val<0) val=0;
		else if(val>this.max_value) val=this.max_value;
		this.value=val;
		return val;
	},
	val2pos:function(value) {
		if(!value) value=this.value;
		var pos=Math.floor( value * this.track_length / this.max_value);
		return pos;
	},
	getKnobPos:function(){
		return (this.options.mode==1) ? this.knob.style.left:this.knob.style.top;
	},
	setKnobPos:function(pos){
		if(this.options.mode==1) this.knob.style.left=pos+'px';
		else this.knob.style.top=pos+'px';
	},
	moveKnobClientXY:function(event){
		var e=event || window.event; var el=e.target || e.srcElement;
		var pos=0;
		var scroll = jes.getScroll();

		if(this.options.mode==1) 
		{
			pos=e.clientX-jes.getPosition(this.area).x+scroll.left-(this.knob.width/2);
			if(pos<0) pos=0;
			else if(pos>this.area.width-this.knob.width) pos=this.area.width-this.knob.width;
			this.setKnobPos(pos);
		}
		else
		{
			pos=e.clientY-jes.getPosition(this.area).y+scroll.top-(this.knob.height/2);
			if(pos<0) pos=0;
			else if(pos>this.area.height-this.knob.height) pos=this.area.height-this.knob.height;
			this.setKnobPos(pos);
		}
		this.change();
	},
	moveKnob:function(type,event){
		if(type=='up' && this.value<this.max_value)//value up
		{
			this.value+=this.options.move_value;
			if(this.value>this.max_value) this.value=this.max_value; 
			this.setKnobPos(this.val2pos());
			this.change();
			if(event)jes.stopEvent(event);
		}
		else if(type=='down' && this.value>0) //value down
		{
			this.value-=this.options.move_value;
			if(this.value<0) this.value=0; 
			this.setKnobPos(this.val2pos());
			this.change();
			if(event)jes.stopEvent(event);
		}	
	},
	wheelScroll:function(event){
		var delta=jes.getEventWheel(event);
		var type = (delta<0)? 'up':'down';
		this.moveKnob(type,event);
	},
	down:function(el){
		var self=this;
		self.moveKnob('down');
		jes.s_interval=setInterval( function(){self.moveKnob('down')}, 100);
		if(!el.isMouseup)
		{
			jes.addEvent(el, "mouseup",  function(){clearInterval(jes.s_interval)});
			jes.addEvent(el, "mouseout", function(){clearInterval(jes.s_interval)});
			el.isMouseup=true;
		}
	},
	up:function(el){
		var self=this;
		self.moveKnob('up');
		jes.s_interval=setInterval( function(){self.moveKnob('up')}, 100);
		if(!el.isMouseup)
		{
			jes.addEvent(el, "mouseup",  function(){clearInterval(jes.s_interval)});
			jes.addEvent(el, "mouseout", function(){clearInterval(jes.s_interval)});
			el.isMouseup=true;
		}
	},
	slide:function(){
		this.pos2val();
		if(this.options.onSlide) this.options.onSlide.call(this);
	},
	change:function(){
		this.pos2val();
		if(this.options.onChange) this.options.onChange.call(this);
	}
};
jes.Sortable=function(ul, param){

	this.ul=jes.$(ul);
	this.drag_li=null;
	this.init_drag=false;
	this.ghost=jes.$(ul+"_ghost");
	this.arr_li=new Array();
	this.arr_li_ch=new Array();
	this.prev_top=0;
	this.prev_id=0;
	this.ghost_css="";
	this.move_mode=0;
	
	var limit_top=-1, limit_bottom=-1, limit_left=-1, limit_right=-1;

	if(typeof param=="object")
	{
		if(param.ghost_css) this.ghost_css=param.ghost_css;
		if(param.move_mode) this.move_mode=param.move_mode;
		if(param.limit_top) limit_top=param.limit_top;
		if(param.limit_bottom) limit_bottom=param.limit_bottom;
		if(param.limit_left) limit_left=param.limit_left;
		if(param.limit_right) limit_right=param.limit_right;

		if(typeof param.onStart=="function") this.onStart=param.onStart;
		if(typeof param.onStop=="function") this.onStop=param.onStop;
		if(typeof param.onChange=="function") this.onChange=param.onChange;
	}

	//Drag생성
	var li=this.ul.getElementsByTagName("li");
	var self=this;
	for(var i=0; i<li.length; i++)
	{
		li[i].index=i;
		new jes.Drag(li[i].id, {
			limit_top:limit_top,
			limit_bottom:limit_bottom,
			limit_left:limit_left,
			limit_right:limit_right,
			move_mode:this.move_mode,
			onStart:function(){ self.startDrag() },
			onDrag:function(){ self.moveDrag() },
			onStop:function(){ self.stopDrag() }			
		});
	}
	
	li=document.createElement("li");
	li.id=ul+"_last";
	li.style.display="none";
	this.ul.appendChild(li);
	
	//기본값 세팅
	this.setLi();
};
jes.Sortable.prototype={

	startDrag:function() {
		var li=_uiDrag.obj;//전역변수
		this.drag_li=li;
		jes.setOpacity(li,70);
	},
	initDrag:function() {		
		var li=_uiDrag.obj;
		this.drag_li=li;

		this.setGhost(li,1);
		li.style.width=li.offsetWidth;
		li.style.position="absolute";
		li.style.zIndex=1001;
		//document.body.insertBefore(li, document.body.lastChild);
		
		if(this.onStart) this.onStart.call(this);
		this.init_drag=1;		
	},
	moveDrag:function() {
		if(!this.init_drag) this.initDrag();
		var li=_uiDrag.obj;
		this.drag_li=li;

		//기준
		var y=this.getBaseTop(li);
		if(!y.top) return;

		//drop 영역체크
		var drop_num=this.arr_li_ch.length-1;
		for(var i=0; i<this.arr_li_ch.length; i++)
		{
			if(y.top < this.arr_li_ch[i])
			{
				drop_num=i;
				break;
			}
		}
		
		var id = this.arr_li[drop_num];
		if(this.prev_id != id && id!=li.id)
		{
			this.setGhost(jes.$(id));
			this.setLi(li.id);		
			this.prev_id=id;
		}
		if(this.onDrag) this.onDrag.call(this);
		this.prev_top=parseInt(li.style.top);
	},
	stopDrag:function() {
		var li=_uiDrag.obj;
		this.drag_li=li;
		li.removeAttribute("style");

		if(!this.init_drag) return;

		this.ul.replaceChild(li, this.ghost);
				
		this.setLi();
		if(this.ghost.init_index != li.index)
		{				
			if(this.onChange) this.onChange.call(this);
		}

		this.ghost=null;
		this.init_drag=0;
		if(this.onStop) this.onStop.call(this);
	},
	setGhost:function(el,init) {
		if(!this.ghost)
		{
			this.ghost=document.createElement("div");
			this.ghost.id="ghost";
			this.ghost.init_index = el.index;
		}
		if(init)
		{
			this.ghost.style.height=el.offsetHeight+"px";
			this.ghost.style.width="100%";
			var mb = jes.getStyle(el,'marginBottom')
			if(mb) this.ghost.style.marginBottom=mb;
			this.ghost.className = this.ghost_css;
		}
		el.parentNode.insertBefore(this.ghost, el);
	},
	getBaseTop:function(el){
		var top = parseInt(el.style.top);
		var t = top - this.prev_top;
		var dir="";
		if(t>0) { t=top + el.offsetHeight; dir="down"}
		else if(t<0) { t=top; dir="up"}
		else return "";

		return {top:t, dir:dir};
	},
	setLi:function(id) {
		var li=this.ul.getElementsByTagName("li");

		for(var j=0,i=0; j<li.length; j++)
		{
			if(id && li[i].id==id) continue;

			li[i].index=i;
			this.arr_li[i]=li[i].id;
			this.arr_li_ch[i]=this._ch(li[i]);
			i++;
		}
	},
	_ch:function(el){
		return jes.getPosition(el).y + (el.offsetHeight/2);
	},
	value:function(){
		/*
		var ul=this.ul.id;
		var s="";var li=null;
		for(i in this.arr_li)
		{
			li=this.arr_li[i];
			if(li==ul+"_last") break;
			s+=ul+"[]="+ li.substring(li.indexOf("_")+1,li.length)+"&";
		}
		s=s.substring(0,s.length-1);		
		return s;
		*/
		var ul=this.ul.id;
		var arr=new Array();
		for(i in this.arr_li)
		{
			li=this.arr_li[i];
			if(li==ul+"_last") break;
			arr[i]=li.substring(li.indexOf("_")+1,li.length);
		}
		return arr;
	}
};
jes.Tab=function(cid,count,options){
	this.options={
		snum:1,					//시작번호
		event_type:'mouseover', //mouseover,click
		menu_type:'img',		//img,css
		class_over:'on',		//over 시 css
		onChange:null			//변경될때 이벤트
	}
	Object.extend(this.options, options);
	this.cid=cid;
	this.count=count;
	var menu;
	for(var i=1; i<=count; i++)
	{
		menu=jes.$("menu_"+cid+"_"+i);
		menu.n=i;
		menu.css=menu.className;
		var self=this;
		menu['on'+this.options.event_type]=function(){ self.on(this.n) }
	}
	this.on(this.options.snum);
}
jes.Tab.prototype = {
	on : function(n){
		this.n=n;
		var type=this.options.menu_type;
		for(var k=1; k<=this.count; k++)
		{
			jes.$("div_"+this.cid+"_"+k).style.display="none";
			if(type=='img')	jes.$("menu_"+this.cid+"_"+k).src=jes.$("menu_"+this.cid+"_"+k).src.replace("_on.","_off.");
			else jes.$("menu_"+this.cid+"_"+k).className=jes.$("menu_"+this.cid+"_"+k).css;
			
		}
		jes.$("div_"+this.cid+"_"+n).style.display="block";
		if(type=='img')	jes.$("menu_"+this.cid+"_"+n).src=jes.$("menu_"+this.cid+"_"+n).src.replace("_off.","_on.");
		else jes.$("menu_"+this.cid+"_"+n).className= jes.$("menu_"+this.cid+"_"+n).css +' '+this.options.class_over;
		if(this.options.onChange) this.options.onChange.call(this);
	}
};
jes.TagChecker=function(id){
	this.input = jes.$(id);
	this.filter = ' /';
	this.maxNum = 20;

	var self=this;
	this.input.onkeyup=function(){self.check();}
	this.input.onblur=function(){self.blur()}
}
jes.TagChecker.prototype={
	check:function(){
		
		var val = this.input.value;
		for(var i=0; i<this.filter.length; i++)
			val = val.replace(new RegExp(this.filter.charAt(i),'ig'),'' );
		var last = val.lastIndexOf(',');
		var val2 = val.substring(0,last);
		var tail = val.substring(last,val.length);
		var a=val2.split(',')

		var len=a.length;				
		if(len>1)
		{
			var a1=[];
			var loop=(len>this.maxNum) ?this.maxNum:len;
			for(var i=0; i<loop; i++)
			{
				if(!a[i]) continue;
				if(jes.indexOf(a1,a[i])==-1) a1.push(a[i])
			}
			val = a1.toString()
			if(len < this.maxNum) val += tail;
		}
	
		if(val != this.input.value)	this.input.value=val;
	},
	blur:function(){
		this.input.value+=','
		this.check();
		var val = this.input.value;
		if(val.lastIndexOf(',')==val.length-1)
		{
			this.input.value=val.substring(0,val.length-1);
		}		
	}
};
jes.toolTip=function(event, options) {

	var e=event || window.event;
	var el= e.target || e.srcElement;

	el.options={
		className:'UItoolTip',
		mousemove:jes.toolTip.mousemove
	};
	Object.extend(el.options, options);

	if(!el.UItoolTip) 
	{
		el.stitle = el.alt || el.title || el.stitle;
		el.title = el.alt = "";
		if(!el.stitle) return;
		
		var d = document.createElement("DIV");		
		d.className = el.options.className;
		d.style.position="absolute";	
		jes.$('JESToolTip').appendChild(d);
		
		el.UItoolTip=d;
		el.UItoolTip.innerHTML=el.stitle;
	}
	var scroll = jes.getScroll();
	var x = (e.clientX+scroll.left+10) + "px";
	var y = (e.clientY+scroll.top+10) + "px";
	el.UItoolTip.style.left = x;
	el.UItoolTip.style.top =  y;
	el.UItoolTip.style.visibility="visible";

	jes.addEvent(el,'mouseout',jes.toolTip.mouseout);
	if(el.options.mousemove) jes.addEvent(document, "mousemove", el.options.mousemove);
}

document.write('<div id="JESToolTip"></div>');
jes.toolTip.seq = 1;
jes.toolTip.mousemove=function(event){
	var e=event || window.event; var el= e.target || e.srcElement;
	var scroll = jes.getScroll();
	el.UItoolTip.style.left=(e.clientX+scroll.left)+"px";
	el.UItoolTip.style.top=(e.clientY+scroll.top+20)+"px";
};
jes.toolTip.mouseout=function(event){
	var e=event || window.event; var el= e.target || e.srcElement;
	if(!el.UItoolTip) return;
	el.UItoolTip.style.visibility="hidden";
	if(el.options.mousemove) jes.delEvent(document, "mousemove",  el.options.mousemove);	
};
jes.Ajax = function(options) {
	this.options={
		method:'GET',
		param:'',
		onComplete:null,
		onError:null,
		asynchronous: true,
		contentType: 'application/x-www-form-urlencoded',
		encoding:'UTF-8'
	}
	Object.extend(this.options, options);
	if(this.options.url) this.send();
};
jes.Ajax.prototype={
	getReq:function(){
		var req=null;
		try { req = new XMLHttpRequest(); }
		catch(e)
		{
			try { req = new ActiveXObject("Msxml2.XMLHTTP"); }
			catch(e)
			{
				try { req = new ActiveXObject("Microsoft.XMLHTTP"); }
				catch(e) { }
			}
		}
		return req;
	},
	send:function(){
		this.req = this.getReq();	
		var op=this.options;
		var url=op.url;
		var param=op.param;
		var method=op.method.toUpperCase();
		if(method=='GET' && param) url=url+"?"+param;
		this.req.open(method, url, op.asynchronous);
		this.req.setRequestHeader('Content-Type', op.contentType+';charset='+op.encoding);
		
		var self = this;
		this.req.onreadystatechange = function() { self.onStateChange.call(self) }
		this.req.send(method=='POST'?param:null);
	},
	onStateChange: function() {
		if(this.req.readyState==4)
		{
			if(this.req.status=="200") this.options.onComplete(this.req);
			else
			{
				if(this.options.onError) this.options.onError(this.req);
				else alert("서버에러입니다! 잠시후에 다시 시도하세요! "+this.req.status);
			}				
		}
	}
};