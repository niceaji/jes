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