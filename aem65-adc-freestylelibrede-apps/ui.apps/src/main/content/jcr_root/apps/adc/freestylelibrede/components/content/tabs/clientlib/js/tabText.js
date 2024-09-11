jQuery(function(){ 
                jQuery('.panel-title').click(function(){
                                let screenSize= jQuery(window).width(); 
                                if (screenSize <= 1199){
                                jQuery(this).find("i").toggleClass('show');
                                jQuery(this).find("a").toggleClass('on');
                                }

    });
});