
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