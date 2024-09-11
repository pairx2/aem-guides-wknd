//inside rtl theme
$(function() {
  const html = $('html');
  $(html).attr('dir','rtl');
});
//detail page 
$("#OrderPhysicalCopy").on("click", function() {  
  let iframe =  $('#OrderPhysicalCopy-modal').find('iframe');
   $(iframe).attr('id','iframecustomId');
     let iFramehead = $("#iframecustomId").contents().find("head");
     let Iframecss05 = '<style> p{ text-align: right; }</style>';
     let Iframecss07 = '<style>/* width */::-webkit-scrollbar { width: 5px;}/* Track *::-webkit-scrollbar-track {box-shadow: inset 0 0 2px gray; border-radius: 10px;}/* Handle */::-webkit-scrollbar-thumb {background: #888;border-radius: 20px;}/* Handle on hover */::-webkit-scrollbar-thumb:hover {background: #555; }</style>';
     $(iFramehead).append(Iframecss05);
     $(iFramehead).append(Iframecss07);
     let iFramebody = $("#iframecustomId").contents().find("body");
     let Iframebody01 = '<style> body{ border: 0px; }</style>';
     let Iframebody02 = '<style> body{ overflow: visible; }</style>';
     let Iframebody03 = '<style> body{ margin-right: 70px; }</style>';
     let Iframebody04 = '<style> body{ direction: rtl; }</style>';
     $(iFramebody).append(Iframebody01);
     $(iFramebody).append(Iframebody02);
     $(iFramebody).append(Iframebody03);
     $(iFramebody).append(Iframebody04);
     if($(window).width()< 767){
      let Iframebody05 = '<style> p{ text-align: center; }</style>';
      let Iframebody06 = '<style> body{ margin-right: 0px !important; }</style>';
      $(iFramebody).append(Iframebody05);
      $(iFramebody).append(Iframebody06);
     }
     

});
$("#contactIconDesktop").on("click", function() {  
  let contactIconIframe =  $('#contactIconDesktop-modal').find('iframe');
   $(contactIconIframe).attr('id','contactIconCustomId');
     let contactIconHead = $("#contactIconCustomId").contents().find("head");
     let contactIframe01 = '<style> p{ color: #62666a; }</style>';
     let contactIframe02 = '<style> p{ font-size: 16px; }</style>';
     let contactIframe03 = '<style> p{ font-family: Calibri; }</style>';
     let contactIframe04 = '<style> p{ line-height: 20px; }</style>';
     let contactIframe05 = '<style> p{ text-align: right; }</style>';
     let contactIframe06 = '<style> body{ margin-right: 120px; }</style>';
     let contactIframe07 = '<style> body{ direction: rtl; }</style>';
     let contactIframe08 = '<style>/* width */::-webkit-scrollbar { width: 5px;}/* Track *::-webkit-scrollbar-track {box-shadow: inset 0 0 2px gray; border-radius: 10px;}/* Handle */::-webkit-scrollbar-thumb {background: #888;border-radius: 20px;}/* Handle on hover */::-webkit-scrollbar-thumb:hover {background: #555; }</style>';
     $(contactIconHead).append(contactIframe01);
     $(contactIconHead).append(contactIframe02);
     $(contactIconHead).append(contactIframe03);
     $(contactIconHead).append(contactIframe04);
     $(contactIconHead).append(contactIframe05);
     $(contactIconHead).append(contactIframe06);
     $(contactIconHead).append(contactIframe07);
     $(contactIconHead).append(contactIframe08);
});

$("#contactTextMobile").on("click", function() {  
let iframeContactTextMobile =  $('#contactTextMobile-modal').find('iframe');
 $(iframeContactTextMobile).attr('id','contactTextMobileIframe');
   let contactIconText = $("#contactTextMobileIframe").contents().find("head");
   let contactIconText05 = '<style> p{ text-align: right; }</style>';
   let contactIconText06 = '<style> body{ direction: rtl; }</style>';
   $(contactIconText).append(contactIconText05);
   $(contactIconText).append(contactIconText06);
   if($(window).width()< 767){
    let contactIconText07 = '<style> p{ text-align: center; }</style>';
    $(contactIconText).append(contactIconText07);
   }
});
//contact us iframe css step3
$(document).ready(function() {
  
  let iframe =  $('#contactUsDetails').find('iframe');
  let createID = $(iframe).attr('id','contactStep3');
  $(createID).on("load", function() {
     let head = $("#contactStep3").contents().find("head");
     let css0 = '<style> body{ direction:rtl}</style>';
     let css1 = '<style> p{ color: #62666a; }</style>';
     let css2 = '<style> p{ font-size: 16px;}</style>';
     let css3 = '<style> p{ line-height: 20px;}</style>';
     let css4 = '<style> p{ font-family: Calibri ;}</style>';
     let css5 = '<style>  body{ margin-right: 180px;}</style>';
     let css6 = '<style> body{ direction: rtl; }</style>';
     let css9 = '<style>  body{ text-align: right !important;} </style>';
     $(head).append(css0);
     $(head).append(css1);
     $(head).append(css2);
     $(head).append(css3);
     $(head).append(css4);
     $(head).append(css5);
     $(head).append(css6);
     $(head).append(css9);
     if($(window).width()<712){
      let css7 = '<style>  p{ text-align: right !important;} </style>';
      let css8 = '<style>  body{ margin-right: 20px !important;} </style>';
      $(head).append(css7);
      $(head).append(css8);
     }
     if($(window).width()>=712){
      let mob0 = '<style> p{ text-align: right; !important}</style>';
      let mob2 = '<style>  body{ direction: rtl;}</style>';
      let mob3 = '<style>  body{ margin-right: 60px !important;}</style>';
      let mob4 = '<style>  body{ margin-top: 30px;}</style>';
      let mob5 = '<style>  body{ text-align: right !important;} </style>';
      $(head).append(mob0);
      $(head).append(mob2);
      $(head).append(mob3);
      $(head).append(mob4);
      $(head).append(mob5);
     }
   });
  
 });

