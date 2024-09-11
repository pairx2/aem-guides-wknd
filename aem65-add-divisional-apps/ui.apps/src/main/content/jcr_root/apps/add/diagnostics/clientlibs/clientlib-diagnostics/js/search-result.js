function globalCssFunction (){
    var urlLink = window.location.pathname;
    var stuff = urlLink.split('/');
    var substring = 'contact-us.html';

    var substringSearch = 'search-results.html';

    var searchbar  = document.getElementsByClassName("searchbar");

    var pageContent = document.getElementById("pageContent");
 	const responsivegrid = pageContent.querySelector('.responsivegrid');
 	const container = responsivegrid.querySelector('.container');

    for(var i=0; i<stuff.length; i++){
        if(stuff[i].includes(substring)){
            container.style.padding = '0px';
          	container.style.background = '#009cde';

        }
        else if(stuff[i].includes(substringSearch)){
			const serachContainer = container.querySelector('#section-search-result-container');

            searchbar[0].style.display="none";
			serachContainer.style.padding = '0px';
            container.style.padding = '0px';
			serachContainer.style.background = '#009cde';
        }
    }
}

window.onload = function() {
  globalCssFunction();
};

var btn = $('#back-to-top p');


btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '100');
});
