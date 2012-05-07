jes.Tab=function(cid,count,options){
	this.options={
		snum:1,					//시작번호
		event_type:'mouseover', //mouseover,click
		menu_type:'img',		//img,css
		class_over:'on',		//over 시 css
		onChange:null			//변경될때 이벤트
	}
	Object.extend(this.options, options);
	this.cid=cid;
	this.count=count;
	var menu;
	for(var i=1; i<=count; i++)
	{
		menu=jes.$("menu_"+cid+"_"+i);
		menu.n=i;
		menu.css=menu.className;
		var self=this;
		menu['on'+this.options.event_type]=function(){ self.on(this.n) }
	}
	this.on(this.options.snum);
}
jes.Tab.prototype = {
	on : function(n){
		this.n=n;
		var type=this.options.menu_type;
		for(var k=1; k<=this.count; k++)
		{
			jes.$("div_"+this.cid+"_"+k).style.display="none";
			if(type=='img')	jes.$("menu_"+this.cid+"_"+k).src=jes.$("menu_"+this.cid+"_"+k).src.replace("_on.","_off.");
			else jes.$("menu_"+this.cid+"_"+k).className=jes.$("menu_"+this.cid+"_"+k).css;
			
		}
		jes.$("div_"+this.cid+"_"+n).style.display="block";
		if(type=='img')	jes.$("menu_"+this.cid+"_"+n).src=jes.$("menu_"+this.cid+"_"+n).src.replace("_off.","_on.");
		else jes.$("menu_"+this.cid+"_"+n).className= jes.$("menu_"+this.cid+"_"+n).css +' '+this.options.class_over;
		if(this.options.onChange) this.options.onChange.call(this);
	}
};