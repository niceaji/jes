
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