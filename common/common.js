function codePopUp(xmp_id,w,h)
{
	if(!w) w="800";
	if(!h) h="500";
	jes.popUp("","code",w,h,1);
	var f=document.code_form;
	f.code.value = jes.$(xmp_id).innerHTML;
	f.action="./pop_code.php";
	f.target = "code";
	f.submit();
}

function funcPopup(func)
{
	//UI.popUp("pop_func.php?f="+func,"func","width=600,height=600,scrollbars=1,resizable=1");
		jes.popUp("./pop_func.php?f="+func,"func",600,600,1,1);

}

function code(btn)
{
	var xmp1=jes.$('div_source');

	if(jes.getStyle(xmp1,'display')=="none")
	{
		xmp1.style.display="block";
		btn.innerHTML="소스 숨기기";
	}
	else
	{
		xmp1.style.display="none";
		btn.innerHTML="소스 보기";
	}
}
