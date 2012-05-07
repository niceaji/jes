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