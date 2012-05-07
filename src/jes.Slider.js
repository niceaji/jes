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