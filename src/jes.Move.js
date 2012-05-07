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