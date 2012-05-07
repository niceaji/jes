jes.AnimateImage=function(id,options){
	this.options={
		frame:0,		//��ü frame��
		dir:'x',		//�̵�����  (x|y)
		rate:100,		//frame rate (1000=1��)
		loop:false,		//�ݺ� ����
		move:0			//�ѹ��� ������ px
	};
	Object.extend(this.options, options);

	this.box=jes.$(id);
	this.currentFrame=0;	//���� frame
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