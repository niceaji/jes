
jes.Modal=function(url,options){
	this.options={
		type:'image',
		alt:'',
		loading:false,
		opacity:30,
		width:0,height:0
	};
	Object.extend(this.options, options);
	var options=this.options;

	if(!jes.$('UIModalB')) jes.Modal.print();
	jes.setOpacity(jes.$('UIModalB'), options.opacity);
	
	jes.Modal.setB();
	if(options.loading) jes.Modal.center(jes.$('UIModalL'));

	if(options.type=='image')
	{
		jes.$('UIModalF').innerHTML = '<img id="UIModalImage" src="'+url+'" alt="'+options.alt+'" />';
		if(options.loading) jes.$('UIModalImage').style.display='none';
		jes.addEvent(jes.$('UIModalImage'), 'load', jes.Modal.onload);
	}
	else if(options.type=='iframe')
	{		
		jes.$('UIModalF').innerHTML = '<iframe name="UIModalIframe" id="UIModalIframe" src="'+url+'" '+options.status+'></iframe>';
		if(options.loading) 
		{
			jes.$('UIModalIframe').style.display='none';
			jes.addEvent(jes.$('UIModalIframe'), 'load', jes.Modal.onload);
		}
		jes.Modal.center(jes.$('UIModalF'));
	}
	jes.Modal.self=this;
	jes.addEvent(jes.$('UIModalB'), 'click', jes.Modal.reset);
	jes.addEvent(window,'resize', jes.Modal.onresize);
	jes.addEvent(window,'scroll', jes.Modal.onscroll);
};
jes.Modal.self={};
jes.Modal.onload=function(){
	jes.$('UIModalL').style.display='none';
	var pos=jes.getScroll();
	jes.Modal.center(jes.$('UIModalF'));	
	if(jes.Modal.self.options.type=='image')
	{
		jes.$('UIModalImage').style.display='block';
		jes.resizeImage(jes.$('UIModalImage'),pos.width,pos.height);	
	}
	else 
	{
		jes.$('UIModalIframe').style.display='block';
	}
	jes.Modal.center(jes.$('UIModalF'));
};
jes.Modal.print=function(){
	var d=document.createElement('div');
	var s='';
	s+='<div id="UIModalB" style="z-index:99998;width:100%;height:100%;position:absolute;display:none;background-color:#000;"></div>';
	s+='<div id="UIModalF" style="z-index:99999;position:absolute;display:none;"></div>';
	s+='<div id="UIModalL" style="z-index:99999;display:none;position:absolute;border:2px solid gray;">·ÎµùÁß..</div>';
	d.innerHTML=s;
	document.getElementsByTagName('body')[0].appendChild(d);		
};
jes.Modal.setB=function(){
	var w=jes.$('UIModalB');
	var pos=jes.getScroll();
	w.style.top=pos.top+'px';
	w.style.left=pos.left+'px';
	if(document.all)
	{
		w.style.width=pos.width+'px';
		w.style.height=pos.height+'px';
	}
	w.style.display='block'	
};
jes.Modal.center=function(el){
	el.style.display='block';
	var pos=jes.getScroll();
	el.style.left=pos.width/2-el.offsetWidth/2+pos.left+'px';
	el.style.top=pos.height/2-el.offsetHeight/2+pos.top+'px';
};
jes.Modal.reset=function(){
	jes.Modal.self=null;
	jes.$('UIModalF').innerHTML='';
	jes.$('UIModalB').style.display='none';
	jes.$('UIModalF').style.display='none';
	jes.$('UIModalL').style.display='none';
	jes.delEvent(window,'resize',jes.Modal.onresize);
	jes.delEvent(window,'scroll',jes.Modal.onscroll);
};
jes.Modal.onresize=function(){
	var pos=jes.getScroll();
	if(jes.Modal.self.options.type=='image') jes.resizeImage(jes.$('UIModalImage'),pos.width,pos.height);
	jes.Modal.center(jes.$('UIModalF'));
	jes.Modal.setB();
};
jes.Modal.onscroll=function(){
	jes.Modal.onresize();
};