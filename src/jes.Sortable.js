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