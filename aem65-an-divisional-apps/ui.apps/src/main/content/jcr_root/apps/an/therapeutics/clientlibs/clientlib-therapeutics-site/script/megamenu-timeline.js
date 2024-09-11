$(document).ready(function(){
	$(".navbar-collapse .m-mega-menu__mobile-item-wrapper").hover(function (e) {
	let targetEl = e.target, respectiveLi = targetEl.closest('li');
	$(respectiveLi).find('[data-js-component="mega-menu"]').show();
	$(respectiveLi).find('a.nav-item').attr('aria-expanded', 'true');
}, function (e) {
	let targetE2 = e.target, respectiveLi = targetE2.closest('li');
	$(respectiveLi).find('[data-js-component="mega-menu"]').hide();
	$(respectiveLi).find('a.nav-item').attr('aria-expanded', 'false');
	});
});

/* mobile navigation  */
  //MEGA-MENU
    $(".m-mega-menu__item .nav-link").after('<div class="arrow"></div>')
    $(".m-mega-menu__item .a-link__text").after('<div class="submenu-arrow"></div>')
    $(".m-mega-menu__item.m-mega-menu__mobile-item .m-mega-menu__mobile-header").after('<div class="dropdown"></div>');
    $(".m-mega-menu__mobile-sub-head").after('<div class="dropdown2"></div>');

//hidden dropdown
 $(".m-mega-menu__mobile-products.d-none").each(function(){  
   let count=$(this).children().length;     
  if(count==0) {
    $(this).siblings(".dropdown").css('display','none');
 }
 });

 $(".m-mega-menu__nested-menu").each(function(){  
    $(this).siblings(".m-mega-menu__item ").children(".arrow").css('display','block');

 });
 $(".m-mega-menu__side-nav-transparent").each(function(){  
    $(this).siblings(".m-mega-menu__item ").children(".submenu-arrow").css('visibility','visible');

 });
//primary
   let i = 0;
   $('.dropdown').on("click",function(){
      $(".dropdown-active").each(function(){           
			if ($(".dropdown").parents(".m-mega-menu__mobile-item").hasClass('dropdown-active')) {
			   $(".dropdown").parents(".m-mega-menu__mobile-item").removeClass("dropdown-active");
			}
    	});

      i++;

      if(i==3){
         i = 1;
      }
      if(i ==1){
            $(this).parents(".m-mega-menu__mobile-item").addClass("dropdown-active");
      }else{
            $(this).parents(".m-mega-menu__mobile-item").removeClass("dropdown-active")
      }
   });

//Tertiary mega-menu
   let j= 0;
   $('.dropdown2').on("click",function(){
      $(".m-mega-menu__mobile-item.m-mega-menu__tertiary").each(function(){
			if ($(".dropdown2").parents(".m-mega-menu__tertiary").hasClass('dropdown-active2')) {
				$(".dropdown2").parents(".m-mega-menu__tertiary").removeClass("dropdown-active2");
			}
    	});

      j++;

      if(j==3){
         j = 1;
      }
      if(j ==1){
            $(this).parents(".m-mega-menu__tertiary").addClass("dropdown-active2");
      }else{
            $(this).parents(".m-mega-menu__tertiary").removeClass("dropdown-active2")
      }
   });




//link 
$(".m-mega-menu__mobile-header").click(function(){
    let link=$(this).parent().siblings(".m-mega-menu__item ").children("a").attr("href");
     $(this).attr("href", link);

});  

$(".m-mega-menu__mobile-sub-head").click(function(){
    let link1=$(this).parents(".m-mega-menu__mobile-item ").siblings(".m-mega-menu__nested-menu").children("a").attr("href");
    console.log(link1);
     $(this).attr("href", link1);

}); 

$(".m-mega-menu-dynamic--base .m-mega-menu__mobile-header").click(function(){
let link=$(this).parent().siblings(".m-mega-menu__item ").children("a").attr("href");
$(this).attr("href", link);



});



$(".m-mega-menu__mobile-sub-head").click(function(){
let link1=$(this).parents(".m-mega-menu__mobile-item ").siblings(".m-mega-menu__nested-menu").children("a").attr("href");
console.log(link1);
$(this).attr("href", link1);



});
