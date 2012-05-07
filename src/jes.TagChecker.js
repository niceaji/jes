jes.TagChecker=function(id){
	this.input = jes.$(id);
	this.filter = ' /';
	this.maxNum = 20;

	var self=this;
	this.input.onkeyup=function(){self.check();}
	this.input.onblur=function(){self.blur()}
}
jes.TagChecker.prototype={
	check:function(){
		
		var val = this.input.value;
		for(var i=0; i<this.filter.length; i++)
			val = val.replace(new RegExp(this.filter.charAt(i),'ig'),'' );
		var last = val.lastIndexOf(',');
		var val2 = val.substring(0,last);
		var tail = val.substring(last,val.length);
		var a=val2.split(',')

		var len=a.length;				
		if(len>1)
		{
			var a1=[];
			var loop=(len>this.maxNum) ?this.maxNum:len;
			for(var i=0; i<loop; i++)
			{
				if(!a[i]) continue;
				if(jes.indexOf(a1,a[i])==-1) a1.push(a[i])
			}
			val = a1.toString()
			if(len < this.maxNum) val += tail;
		}
	
		if(val != this.input.value)	this.input.value=val;
	},
	blur:function(){
		this.input.value+=','
		this.check();
		var val = this.input.value;
		if(val.lastIndexOf(',')==val.length-1)
		{
			this.input.value=val.substring(0,val.length-1);
		}		
	}
};