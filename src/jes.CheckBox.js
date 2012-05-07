
jes.CheckBox = function()
{
	this.img_on = "img/checkbox_on.gif";
	this.img_off = "img/checkbox_off.gif";
	this.checkbox = {};
	var self=this;

	var chk=null,img=null;
	var cid="";
	for(var i=0; i<arguments.length; i++)
	{
		chk=jes.$(arguments[i]);
		cid=chk.id;
		if(!chk) continue;
		img=chk.parentNode.insertBefore(document.createElement('img'), chk);
		img.src = (chk.checked) ? this.img_on:this.img_off;
		
		img.cid = cid;
		img.onclick = function() {
			self.select(this.cid);
			if(self.checkbox[this.cid].chk.onclick) self.checkbox[this.cid].chk.onclick();
		};
		chk.style.display="none";
		//chk.style.position = "absolute";
		//chk.style.left = "-1000";
		this.checkbox[cid] = {chk:chk, img:img};
	}
};
jes.CheckBox.prototype={
	select : function(cid) {
		this.checkbox[cid].img.src = (this.checkbox[cid].chk.checked) ? this.img_off:this.img_on;
		this.checkbox[cid].chk.checked = !this.checkbox[cid].chk.checked;
	},
	showValue : function() {
		var value = new Array();
		var chk = null;
		for(cid in this.checkbox)
		{
			chk=this.checkbox[cid].chk;
			if(chk.checked) value[value.length]=chk.value; 
		}
		return value;
	},
	checked : function() {
		var cid="";
		if(arguments[0]=="all")
		{	
			for(cid in this.checkbox)this.checked(cid)	
			return;
		}		
		for(var i=0; i<arguments.length; i++)
		{
			cid = arguments[i];
			if(!this.checkbox[cid]) continue;
			this.checkbox[cid].img.src = this.img_on;
			this.checkbox[cid].chk.checked=true;
		}
	},
	unchecked : function() {
		var cid="";
		if(arguments[0]=="all")
		{	
			for(cid in this.checkbox) this.unchecked(cid)	
			return;
		}	
		for(var i=0; i<arguments.length; i++)
		{
			cid = arguments[i];
			if(!this.checkbox[cid]) continue;
			this.checkbox[cid].img.src = this.img_off;
			this.checkbox[cid].chk.checked=false;			
		}
	}
};