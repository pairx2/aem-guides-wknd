  if (location.pathname.toLowerCase().indexOf(".ppc.html") > -1)
 {
    $(".ppc-config").each(function( index ) {
      if($(this).find("#ppc-config-id").val()!='')
     {
       let hideId = $(this).find("#ppc-config-id").val().split(/[, ]+/);
        for(let i in hideId) {
            let ppcId = `#${hideId[i]}`;
            $(ppcId).hide();
        }
     }
      if($(this).find("#ppc-config-class").val()!='')
      {
      let hideppcClass = $(this).find("#ppc-config-class").val().split(/[, ]+/);
      for(let i in hideppcClass) {
           let ppcClass = `.${hideppcClass[i]}`;
            $(ppcClass).hide();
        }
      }
    });
  }