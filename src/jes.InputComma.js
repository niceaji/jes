
jes.InputComma=function(id){
	this.input=jes.$(id);
	this.value='';

	var self=this;
	jes.addEvent(self.input,'keyup',function(event){ self.check(event) });
	jes.addEvent(self.input,'keydown',function(event){ self.check(event) });
};
jes.InputComma.prototype={
	isAllowKey:function(e){
		if      (!e.shiftKey && e.keyCode >= 48 && e.keyCode <= 57)  { return true; } //keyboard's num
		else if (!e.shiftKey && e.keyCode >= 96 && e.keyCode <= 105) { return true; } //pad's num
		else 
		{
			switch(e.keyCode) {
				case 8 : //back  
				case 35: //end   
				case 36: //home  
				case 37: //left
				case 38: //top
				case 39: //right
				case 40: //bottom
				case 45: //insert
				case 46: //delete
				case 9 : //tab
				case 13 : //enter
				return true;
			}
		}
		return false;
	},
	check:function(e){
		e = jes.getE(e);

		if(!this.isAllowKey(e))
		{
			jes.stopEvent(e);
			return;
		}
		var value=this.input.value;
		value = value.replace(/,/g,'');
		
		if(value!=this.value)
		{
			this.value=value;
			this.input.value = jes.addComma(value);
		}		
	}
};