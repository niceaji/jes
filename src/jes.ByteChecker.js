jes.ByteChecker=function(id,len){
	this.input = jes.$(id);
	this.isAlert=false;
	this.cid=id;
	this.len=len;
	var self=this;
	jes.addEvent(this.input,'keyup', function(){self.check()})
}
jes.ByteChecker.prototype={
	check:function(){		
		var el=this.input;
		var len = jes.length(el.value);
		if(len > this.len && !this.isAlert)
		{
			this.isAlert=true;
			alert("�ִ� "+this.len+"Byte���� �����մϴ�. �ʰ��� ������ �ڵ����� �����˴ϴ�.");
			this.isAlert=false;
			//this.input.focus();
			el.value=jes.length(el.value, this.len);
			len=this.len;
		}
		jes.$(this.cid+"_byteinfo").innerHTML = len;		
	}
}
