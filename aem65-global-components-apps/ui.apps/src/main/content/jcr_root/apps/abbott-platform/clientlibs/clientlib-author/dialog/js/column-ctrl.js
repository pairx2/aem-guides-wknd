/******** Calls when dialog is opened**********/
$(document).on("dialog-ready", function() {
	const colCtrlParent = $(".col-ctrl-validation .coral-Form-fieldwrapper");
	const columnRequired = colCtrlParent.find("coral-numberinput[name='./colCount']").attr("value");	

    setTimeout(function(){
		modifications(columnRequired);
	},50);

	colCtrlParent.find("coral-numberinput[name='./colCount'] ._coral-ActionButton._coral-Stepper-stepUp").on('click', function() {
		const currentSelection = colCtrlParent.find("coral-numberinput[name='./colCount'] input[name='./colCount']").attr("aria-valuenow");
		if("6" != currentSelection) {
			const newVal = parseInt(currentSelection,10)+1;
			setTimeout(function(){
				modifications(newVal);
			},50);
		}
	});

     colCtrlParent.find("coral-numberinput[name='./colCount'] ._coral-ActionButton._coral-Stepper-stepDown").on('click', function() {
         const currentSelection = colCtrlParent.find("coral-numberinput[name='./colCount'] input[name='./colCount']").attr("aria-valuenow");
         if("1" != currentSelection) {
			const newVal = parseInt(currentSelection,10)-1;
			setTimeout(function(){
				modifications(newVal);
			 },50);
		 }
     });
	
	colCtrlParent.find("coral-numberinput[name='./colCount']").keyup(function(){
	  const currentSelection = this.value;
	  setTimeout(function(){
		modifications(currentSelection);
	  },50);
	});
	
	function modifications(columnRequiredCount) {
		if ("" == columnRequiredCount || " " == columnRequiredCount || "1" == columnRequiredCount) {
		 colCtrlParent.find("coral-select[name='./twoColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./threeColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fourColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fiveColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./sixColumns']").parent().hide();
		}
		if ("2" == columnRequiredCount) {
		 colCtrlParent.find("coral-select[name='./twoColumns']").parent().show();
		 colCtrlParent.find("coral-select[name='./threeColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fourColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fiveColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./sixColumns']").parent().hide();
		}
		if ("3" == columnRequiredCount) {
		 colCtrlParent.find("coral-select[name='./twoColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./threeColumns']").parent().show();
		 colCtrlParent.find("coral-select[name='./fourColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fiveColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./sixColumns']").parent().hide();
		}

		if ("4" == columnRequiredCount) {
		 colCtrlParent.find("coral-select[name='./twoColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./threeColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fourColumns']").parent().show();
		 colCtrlParent.find("coral-select[name='./fiveColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./sixColumns']").parent().hide();
		}
		if ("5" == columnRequiredCount) {
		 colCtrlParent.find("coral-select[name='./twoColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./threeColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fourColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fiveColumns']").parent().show();
		 colCtrlParent.find("coral-select[name='./sixColumns']").parent().hide();
		}
		if ("6" == columnRequiredCount) {
		 colCtrlParent.find("coral-select[name='./twoColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./threeColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fourColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./fiveColumns']").parent().hide();
		 colCtrlParent.find("coral-select[name='./sixColumns']").parent().show();
		}
	}
});



