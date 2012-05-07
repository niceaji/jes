jes.Calender = function(year,month){
	var d=new Date();
	if(year) d.setFullYear(year);
	if(month) d.setMonth(month-1);

	this.day=d;
	this.day_sweek=-1;
	this.ymd=this.getYMD(d);
	this.today=new Date();
	this.today_ymd=this.getYMD(this.today);
	this.selday=null;
	this.selday_ymd="";
	this.selbox=null;

	this.is_draw=0;
	this.is_show=0;
	this.show_el=null;

	this.pid = "UI_Calender"+String(Math.random()).substring(2,6);

};
jes.Calender.prototype={

	setBox:function(num,ymd,type){ //type 1:prev,2:next,0:now
		var box=jes.$(this.pid+"_"+num);
		box.ymd=ymd;
					
		if(type==1) box.className="UICalender_box_prev";
		else if(type==2) box.className="UICalender_box_next";
		else 
		{
			box.className="UICalender_box";			
			if(ymd==this.today_ymd) box.className="UICalender_box_today";
		}
		box.innerHTML=ymd.substring(6,8);
		var self=this;
		if(this.onClick) box.onclick=function(){ self.onClick(box) };
	},
	getYMD :function(date){
		var y=date.getFullYear();
		var m=date.getMonth()+1;
		if(m<10) m="0"+m;
		var d=date.getDate();
		if(d<10) d="0"+d;
		return y+""+m+""+d;
	},
	getLastDay :function(date){
		return new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
	},
	getSweek:function(date){
		return new Date(date.getFullYear(),date.getMonth(),1).getDay();
	},
	goPrev:function(){
		this.draw(this.day.getFullYear(), this.day.getMonth()-1);
	},
	goNext:function(){
		this.draw(this.day.getFullYear(), this.day.getMonth()+1);
	},
	goToday:function(){
		this.draw(this.today.getFullYear(), this.today.getMonth());
	},
	show:function(el){
		this.show_el=el;
		var pos=jes.getPosition(el);
		var ifa=parent.document.getElementById('UICalenderIfa');

		if(!this.is_show)
		{
			jes.addEvent(parent.document,"mousedown",function(){ ifa.style.display='none' })
			this.is_show=1;
		}
		if(this.selbox)	this.selbox.className="UICalender_box";	

		var str=el.value.replace(/[^0-9]/g,"");		
		if(str.length==8)//
		{
			var selday=new Date(str.substring(0,4), str.substring(4,6)-1, str.substring(6,8));
			this.draw(selday.getFullYear(), selday.getMonth());
			
			var d=selday.getDate();
			var n1=Math.ceil((d+this.day_sweek)/7) - 1;
			var n2= d-(1+(7*n1)-this.day_sweek);
			this.selbox=jes.$(this.pid+"_"+n1+""+n2);
			this.selbox.className="UICalender_box_selday";
		}
		ifa.style.top=pos.y+el.offsetHeight+"px";
		ifa.style.left=pos.x+"px";
		ifa.style.display="block";
	},
	print:function(){
		var s=this.skin();
		document.write('<div id="'+this.pid+'">'+s+'</div>');
		
		var day=this.day;
		var selyear=jes.$(this.pid+"_selyear");
		var selmonth=jes.$(this.pid+"_selmonth");
		var btnprev=jes.$(this.pid+"_btnprev");
		var btnnext=jes.$(this.pid+"_btnnext");

		try{
			var self=this;
			jes.addEvent(selyear, "change", function(){
				self.draw(selyear.value, selmonth.value - 1);
			});
			jes.addEvent(selmonth, "change", function(){
				self.draw(selyear.value, selmonth.value - 1);
			});
			jes.addEvent(btnprev, "click", function(){self.goPrev()});
			jes.addEvent(btnnext, "click", function(){self.goNext()});
		}catch(e){}

		this.draw(day.getFullYear(), day.getMonth());
	},
	draw:function(year,month){
		var day=this.day;
		if(this.is_draw) if(year==day.getFullYear() && month==day.getMonth()) return;
		this.is_draw=1;
		day.setFullYear(year);
		day.setMonth(month);		
		this.day_sweek=this.getSweek(day);

		try{
			jes.$(this.pid+"_selyear").value=day.getFullYear();
			jes.$(this.pid+"_selmonth").value=day.getMonth()+1;
		}catch(e){}

		var d0=new Date(year,month,1);
		d0_lastday=this.getLastDay(d0);

		var d1=new Date(year,month-1,1);	//이전달
		var d2=new Date(year,month+1,1);	//다음달
		var d1_lastday=this.getLastDay(d1);
		
		var num=null;
		var d0_day=1,d2_day=1;
		for(var i=0; i<6; i++) 
		{			
			for(var j=0; j<7; j++) 
			{
				num=i+""+j;
				if(i==0 && j<this.day_sweek) //이전달
				{
					
					d1.setDate( d1_lastday - (this.day_sweek-j) + 1 );
					this.setBox(num, this.getYMD(d1),1)					
				}
				else if(d0_day>d0_lastday)
				{
					d2.setDate(d2_day++);
					this.setBox(num, this.getYMD(d2),2)
				}
				else 
				{
					d0.setDate(d0_day++);
					this.setBox(num, this.getYMD(d0),0)
				}
			}
		}
	},
	skin:function(){
		var s='';
		//-------------------------------------------------------------------------
		//html변경가능
		s='<table border="1">'
		+'<tr>'
		+'	<td>일</td>'
		+'	<td>월</td>'
		+'	<td>화</td>'
		+'	<td>수</td>'
		+'	<td>목</td>'
		+'	<td>금</td>'
		+'	<td>토</td>'
		+'</tr>'
		+'<tr>'
		+'	<td colspan="7">'
		+'	<span id="'+this.pid+'_btnprev">◀</span>'
		+'	<select id="'+this.pid+'_selyear">'
		+'	<option value="2006">2006</option>'
		+'	<option value="2007">2007</option>'
		+'	<option value="2008">2008</option>'
		+'	<option value="2009">2009</option>'
		+'	</select>년'
		+'	<select id="'+this.pid+'_selmonth">'
		+'	<option value="1">1</option>'
		+'	<option value="2">2</option>'
		+'	<option value="3">3</option>'
		+'	<option value="4">4</option>'
		+'	<option value="5">5</option>'
		+'	<option value="6">6</option>'
		+'	<option value="7">7</option>'
		+'	<option value="8">8</option>'
		+'	<option value="9">9</option>'
		+'	<option value="10">10</option>'
		+'	<option value="11">11</option>'
		+'	<option value="12">12</option>'
		+'	</select>월'
		+'	<span id="'+this.pid+'_btnnext">▶</span>'
		+'	</td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_00"></td>'
		+'	<td id="'+this.pid+'_01"></td>'
		+'	<td id="'+this.pid+'_02"></td>'
		+'	<td id="'+this.pid+'_03"></td>'
		+'	<td id="'+this.pid+'_04"></td>'
		+'	<td id="'+this.pid+'_05"></td>'
		+'	<td id="'+this.pid+'_06"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_10"></td>'
		+'	<td id="'+this.pid+'_11"></td>'
		+'	<td id="'+this.pid+'_12"></td>'
		+'	<td id="'+this.pid+'_13"></td>'
		+'	<td id="'+this.pid+'_14"></td>'
		+'	<td id="'+this.pid+'_15"></td>'
		+'	<td id="'+this.pid+'_16"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_20"></td>'
		+'	<td id="'+this.pid+'_21"></td>'
		+'	<td id="'+this.pid+'_22"></td>'
		+'	<td id="'+this.pid+'_23"></td>'
		+'	<td id="'+this.pid+'_24"></td>'
		+'	<td id="'+this.pid+'_25"></td>'
		+'	<td id="'+this.pid+'_26"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_30"></td>'
		+'	<td id="'+this.pid+'_31"></td>'
		+'	<td id="'+this.pid+'_32"></td>'
		+'	<td id="'+this.pid+'_33"></td>'
		+'	<td id="'+this.pid+'_34"></td>'
		+'	<td id="'+this.pid+'_35"></td>'
		+'	<td id="'+this.pid+'_36"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_40"></td>'
		+'	<td id="'+this.pid+'_41"></td>'
		+'	<td id="'+this.pid+'_42"></td>'
		+'	<td id="'+this.pid+'_43"></td>'
		+'	<td id="'+this.pid+'_44"></td>'
		+'	<td id="'+this.pid+'_45"></td>'
		+'	<td id="'+this.pid+'_46"></td>'
		+'</tr>'
		+'<tr>'
		+'	<td id="'+this.pid+'_50"></td>'
		+'	<td id="'+this.pid+'_51"></td>'
		+'	<td id="'+this.pid+'_52"></td>'
		+'	<td id="'+this.pid+'_53"></td>'
		+'	<td id="'+this.pid+'_54"></td>'
		+'	<td id="'+this.pid+'_55"></td>'
		+'	<td id="'+this.pid+'_56"></td>'
		+'</tr>'
		+'</table>';
		//-------------------------------------------------------------------------
		return s;	
	}
};