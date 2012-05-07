jes.Radio = function(name)
{
	this.img_on = "img/radio_on.gif";
	this.img_off = "img/radio_off.gif";
	this.radio = {};
	this.checked_id = "";
	var self=this;

	var ra = null,img=null;
	var cid = "";
	for(var i=0; i<document.getElementsByName(name).length; i++)
	{
		ra = document.getElementsByName(name)[i];
		cid =ra.id;
		img=ra.parentNode.insertBefore(document.createElement('img'), ra);

		img.src = this.img_off;
		if(ra.checked)
		{
			img.src = this.img_on;
			this.checked_id = cid;
		}
		
		img.cid = cid;
		img.onclick = function() {
			self.select(this.cid);
			if(self.radio[this.cid].ra.onclick) self.radio[this.cid].ra.onclick();
		};
		ra.style.display="none";
		this.radio[cid] = {ra:ra, img:img};
	}
};
jes.Radio.prototype={
	select : function(cid) {
		this.radio[cid].img.src = this.img_on;
		this.radio[cid].ra.checked=true;
		if(this.checked_id && this.checked_id!=cid) this.radio[this.checked_id].img.src = this.img_off;
		this.checked_id=cid;
	},
	showValue : function() {
		return this.radio[this.checked_id].ra.value;
	}
};