jes.toolTip=function(event, options) {

	var e=event || window.event;
	var el= e.target || e.srcElement;

	el.options={
		className:'UItoolTip',
		mousemove:jes.toolTip.mousemove
	};
	Object.extend(el.options, options);

	if(!el.UItoolTip) 
	{
		el.stitle = el.alt || el.title || el.stitle;
		el.title = el.alt = "";
		if(!el.stitle) return;
		
		var d = document.createElement("DIV");		
		d.className = el.options.className;
		d.style.position="absolute";	
		jes.$('JESToolTip').appendChild(d);
		
		el.UItoolTip=d;
		el.UItoolTip.innerHTML=el.stitle;
	}
	var scroll = jes.getScroll();
	var x = (e.clientX+scroll.left+10) + "px";
	var y = (e.clientY+scroll.top+10) + "px";
	el.UItoolTip.style.left = x;
	el.UItoolTip.style.top =  y;
	el.UItoolTip.style.visibility="visible";

	jes.addEvent(el,'mouseout',jes.toolTip.mouseout);
	if(el.options.mousemove) jes.addEvent(document, "mousemove", el.options.mousemove);
}

document.write('<div id="JESToolTip"></div>');
jes.toolTip.seq = 1;
jes.toolTip.mousemove=function(event){
	var e=event || window.event; var el= e.target || e.srcElement;
	var scroll = jes.getScroll();
	el.UItoolTip.style.left=(e.clientX+scroll.left)+"px";
	el.UItoolTip.style.top=(e.clientY+scroll.top+20)+"px";
};
jes.toolTip.mouseout=function(event){
	var e=event || window.event; var el= e.target || e.srcElement;
	if(!el.UItoolTip) return;
	el.UItoolTip.style.visibility="hidden";
	if(el.options.mousemove) jes.delEvent(document, "mousemove",  el.options.mousemove);	
};