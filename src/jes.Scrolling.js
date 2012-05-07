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