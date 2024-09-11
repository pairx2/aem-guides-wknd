(function () {    
  function shareiconload(){       
    let x = $(".abt-icon-share-alt").offset();
      let iconpositiontop = x.top + 30
      let iconpositionleft = x.left - 17;       
      $( ".atss" ).css('top', iconpositiontop);
      $( ".atss" ).css('left', iconpositionleft);   
  }
    function winLoad() {         
        let addThis = document.querySelector(".atss");               
        if(addThis != null) {
            shareiconload();
        } else {
            setTimeout(function(){ winLoad() },50)
        }                  
    } 
  const divs = document.querySelectorAll('.abt-icon-share-alt');
    divs.forEach(el => el.addEventListener('click', event => {
      	  $(".atss").slideToggle();
          $(".atss" ).removeClass( "slideInUp");
			$('.at4-share').removeAttr('id');
          $(".atss" ).removeClass( "slideInRight");
      		$(".atss" ).removeClass( "slideInDown");
          $(".atss" ).removeClass( "at4-visible");
          $(".atss" ).removeClass( "at-share-dock");  
    }));
  winLoad(); 
})();