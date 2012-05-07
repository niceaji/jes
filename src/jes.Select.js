jes.Select = function(id,skin){
	this.skin={
		topbox:'border:1px solid #808080;width:200px;',
		subbox:'border:1px solid #808080;width:200px;background-color:#fff',
		default_txt:'color:#000;background-color:#fff;',
		selected_txt:'color:#fff;background-color:#446688;',
		arrow:'<img src="http://img-section.hanmail.net/sports2/arrow_select02.gif" width="15" height="14" border="0">',
		padding:2
	};
	Object.extend(this.skin, skin);

	this.input=jes.$(id);
	this.length=this.input.length;
	this.id=id;
	this.list=[];
	this.isopen=0;
	this.selectedIndex=0;
	this.prevSelectedIndex=0;
	this.moveSelectedIndex=0;//keydown
	this.value='';
	this.topBox= null;
	this.subBox= null;
	this.selBox= null;

	this.print();
};
jes.Select.prototype={
	close:function(){
		if(!this.isopen) return;
		this.subBox.style.display='none';
		this.isopen=0;
		this.focus();
	},
	blur:function(){
		this.selBox.className='default_txt';
	},	
	focus:function(){
		if(this.isopen) return;
		this.selBox.className='selected_txt';
	},
	open:function(){
		if(this.isopen) return;	
		if(jes.Select._openObj) 
		{
			jes.Select._openObjes.close();
			jes.Select._openObjes.blur();
		}
		this.subBox.style.display='block';
		this.blur();
		this.subBox.getElementsByTagName('DIV')[this.selectedIndex].className='selected_txt';
		this.moveSelectedIndex=this.selectedIndex;
		jes.Select._openObj=this;
		this.isopen=1;		
	},
	toogle:function(e){
		if(this.isopen)	this.close();
		else this.open();
		jes.stopEvent(e);
	},
	subOver:function(e){
		this.el=jes.getEl(e)
		this.subBox.getElementsByTagName('DIV')[this.selectedIndex].className='default_txt';
		this.el.className='selected_txt';
	},
	subOut:function(e){
		this.el=jes.getEl(e)
		this.el.className='default_txt';
	},
	onchange:function(){
		if(this.prevSelectedIndex != this.selectedIndex && this.input.onchange) 
		{
			this.input.onchange.call(this);	
		}
	},
	selected:function(isChange){
		this.value=this.list[this.selectedIndex].value;
		this.selBox.value=this.list[this.selectedIndex].text;
		jes.$(this.id).value=this.list[this.selectedIndex].value; //select input
		if(isChange) this.onchange();
		this.prevSelectedIndex=this.selectedIndex;
	},
	subClick:function(e){
		this.el=jes.getEl(e);
		this.selectedIndex=this.el.index;
		this.selected(true);
		this.close();		
		jes.stopEvent(e);
	},
	keyMove:function(e){
		var e=jes.getE(e);
		var prev_index=-1;
		if(e.keyCode==38 && this.selectedIndex>0)
		{
			prev_index=this.selectedIndex--;
			jes.stopEvent(e);
		}
		else if(e.keyCode==40 && this.selectedIndex < this.length-1)
		{
			prev_index=this.selectedIndex++;
			jes.stopEvent(e);
		}
		else if(e.keyCode==13)
		{
			this.close();
			if(this.moveSelectedIndex != this.selectedIndex && this.input.onchange) this.input.onchange.call(this);
			this.moveSelectedIndex=this.selectedIndex;
		}		
		if(prev_index>-1)
		{
			this.subBox.getElementsByTagName('DIV')[prev_index].className='default_txt';
			this.subBox.getElementsByTagName('DIV')[this.selectedIndex].className='selected_txt';
			this.selected((this.isopen) ? false:true);
		}
	},
	print:function(){
		var id=this.id;
		var opt=this.input.options;
		var sb = new jes.StringBuffer();
		for(var i=0; i<opt.length; i++)
		{
			this.list[i]={text:opt[i].text,value:opt[i].value};
			sb.append('<div style="width:100%;padding:'+this.skin.padding+'px">'+opt[i].text+'</div>');
		}
		this.value=this.list[0].value;

		var s='<style type="text/css">input.default_txt,div.default_txt{'+this.skin.default_txt+'} input.selected_txt,div.selected_txt{'+this.skin.selected_txt+'}</style>'
		+'<div id="UISelectTop_'+id+'" style="position:relative;'+this.skin.topbox+'">'
			+'<input class="default_txt" id="UISelectSel_'+id+'" type="text" value="'+this.list[0].text+'" style="width:100%;border:none;margin:0;padding:'+this.skin.padding+'px" readonly="readonly">'
			+'<div style="position:absolute;right:0;top:0">'+this.skin.arrow+'</div>'
		+'</div>'
		+'<div id="UISelectSub_'+id+'" style="display:none;position:absolute;'+this.skin.subbox+'">'+sb.toString()+'</div>';
		
		this.input.style.display='none';
		document.write(s);

		this.topBox= jes.$('UISelectTop_'+id);
		this.subBox= jes.$('UISelectSub_'+id);
		this.selBox= jes.$('UISelectSel_'+id);

		var self=this;
		jes.addEvent(this.topBox, "mousedown", function(e) { self.toogle(e) } );
		jes.addEvent(this.topBox, "keydown", function(e) {self.keyMove(e)});
		
		jes.addEvent(this.selBox, "blur", function() { self.close(); self.blur(); });
		jes.addEvent(this.selBox, "focus", function() { self.focus(); });
		jes.addEvent(document, "mousedown", function() { self.close();self.blur(); } );

		jes.addEvent(this.subBox, "mousedown", function(e) { jes.stopEvent(e) } );
		var sub=this.subBox.getElementsByTagName('div');
		for(var i=0; i<sub.length; i++)
		{	
			sub[i].index=i;
			jes.addEvent(sub[i], "mouseover", function(e) { self.subOver(e) } );
			jes.addEvent(sub[i], "mouseout",  function(e) { self.subOut(e) } );
			jes.addEvent(sub[i], "mousedown", function(e) { self.subClick(e) } );
		}
	}
};