jes.Rolling=function(cid,count,interval,n) {
	this.cid = cid;
	this.count = count;	
	this.n = (n)?n:"1";
	this.onchange = null;

	for(var k=1; k<=this.count; k++) jes.$(this.cid+"_"+k).style.display="none";
	jes.$(this.cid+"_"+this.n).style.display="block";

	this.div = jes.$(this.cid);//ÀüÃ¼div
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