// // Dropdown
class FormDropdown {
  dropdownField: JQuery < HTMLElement > ;
  elements: JQuery < any > ;
  dropdownMenu: JQuery < HTMLElement > ;
  multiDropdownField: JQuery <HTMLElement>;
  dropdownUl: JQuery<HTMLElement>;
  val: string;
  placeholder: any;
  index: number;
  isPressed: boolean = false;
  toggleDropdownSelector: any;
  dropdownMenuSelector: any;
  constructor(elements) {
        this.elements = $(elements);
        this.dropdownField = this.elements.find('.a-dropdown__field');
        this.dropdownUl = this.elements.find('.a-dropdown__menu');
        this.dropdownMenu = this.dropdownField?.find('.a-dropdown__menu > li');
        this.toggleDropdownSelector = '.' + this.dropdownField.attr('class');
        this.dropdownMenuSelector = this.dropdownMenu.prop('tagName');
        this.defaultSelectedOption();
        $(document).on('click', this.toggleDropdownSelector, this.toggleFormDropdown);
        if (this.dropdownMenuSelector) {
            $(document).on('click', '.a-dropdown__field .a-dropdown__menu > li', this.selectFormDropdown);
        }

      //multi dropdown changes
      this.multiDropdownField = this.elements.find('.cmp-form-options__field--multi-drop-down > option');
      $(this.multiDropdownField).on('click', function(event) {this.selectMultiDropdown(event)}.bind(this) );
      //for multi dropdown on ctrl + mouse click event
      $(document).on('keydown', function(event) { this.ctrlPressed(event, "down") }.bind(this));
      $(document).on('keyup', function(event)  { this.ctrlPressed(event, "up") }.bind(this));
      $(this.dropdownField).on('keydown', function(event)  { this.keyPressed(event) }.bind(this));
      $(this.dropdownField).on('keyup', function(event)  { this.enterPressed(event) }.bind(this));
      $(this.dropdownField).find("li").on('mouseenter',function(event){ this.addSelectedColor(event)}.bind(this));
      $(this.dropdownField).find("li").on('mouseleave',function(event){ this.removeSelectedColor(event)}.bind(this));
  }
  keyPressed(e) {
    if(e.which ==40 || e.which ==38){
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    if(e.which == 9 && ($(this.dropdownField).hasClass('active')) ){
      $(this.dropdownUl).attr("aria-expanded","false");
      $(this.dropdownField).removeClass('active');
      $(this.dropdownField).focus();
      e.preventDefault();
    }
    var searchValue = String.fromCharCode(e.which);
    //downarrow event
    if(e.which == 40){
      //DropDown Opens using downarrow
      if(!$(this.dropdownField).hasClass('active')){
        $(this.dropdownField).addClass('active');
        $(this.dropdownUl).attr("aria-expanded","true");
      }else if( $(this.dropdownUl).find('li.selected').length > 0 || $(this.dropdownUl).find('li.selectedColor').length > 0 ){
         if($(this.dropdownUl).find('li.selectedColor').length >0  && $(this.dropdownUl).find('li.selected').length == 0){
          var selectedList = $(this.dropdownUl).find('li.selectedColor');
         }else{
          var selectedList = $(this.dropdownUl).find('li.selected');
         }
        var storeTarget = selectedList.next();
        if(storeTarget.length > 0){
          if(selectedList.hasClass('selected') && !(selectedList.hasClass('selectedColor'))){
            selectedList.removeClass('selected');
          }else if(selectedList.hasClass('selectedColor') && !(selectedList.hasClass('selected'))){
            selectedList.removeClass('selectedColor');
          } else {
            selectedList.removeClass('selected selectedColor');
          }       
        storeTarget.attr('tabIndex',-1);
        storeTarget.focus().addClass('selected selectedColor');
        var placeholder = $(this.dropdownField).children('span');
        var value = storeTarget.children().html();
        placeholder.html(value);
        }else{
          $(this.dropdownUl).find('li:last').attr('tabIndex',-1);
          $(this.dropdownUl).find('li:last').focus().addClass('selected selectedColor');
          $(this.dropdownField).children('span').html($(this.dropdownUl).find('li:last .a-dropdown__option-text').html());
        }
        
      } else{
        $(this.dropdownUl).find('li:first').attr('tabIndex',-1);
        $(this.dropdownUl).find('li:first').focus().addClass('selected selectedColor');
        $(this.dropdownField).children('span').html($(this.dropdownUl).find('li:first .a-dropdown__option-text').html());
      }
    } 
    //uparrow event
    else if(e.which == 38){
      if( $(this.dropdownUl).find('li.selected').length > 0 || $(this.dropdownUl).find('li.selectedColor').length > 0 ){
        if($(this.dropdownUl).find('li.selectedColor').length >0 && $(this.dropdownUl).find('li.selected').length == 0){
         var selectedList = $(this.dropdownUl).find('li.selectedColor');
        }else{
         var selectedList = $(this.dropdownUl).find('li.selected');
        }
        var storeTarget = selectedList.prev();
        if(storeTarget.length > 0){
          if(selectedList.hasClass('selected') && !(selectedList.hasClass('selectedColor'))){
            selectedList.removeClass('selected');
          }else if(selectedList.hasClass('selectedColor') && !(selectedList.hasClass('selected'))){
            selectedList.removeClass('selectedColor');
          } else {
            selectedList.removeClass('selected selectedColor');
          }
        storeTarget.attr('tabIndex',-1);
        storeTarget.focus().addClass('selected selectedColor');
        var placeholder = $(this.dropdownField).children('span');
        var value = storeTarget.children().html();
        placeholder.html(value);
        }else{
          $(this.dropdownUl).find('li:first').attr('tabIndex',-1);
          $(this.dropdownUl).find('li:first').focus().addClass('selected selectedColor');
          $(this.dropdownField).children('span').html($(this.dropdownUl).find('li:first .a-dropdown__option-text').html());
        }
        
      } else{
        $(this.dropdownUl).find('li:last').attr('tabIndex',-1);
        $(this.dropdownUl).find('li:last').focus().addClass('selected selectedColor');
        $(this.dropdownField).children('span').html($(this.dropdownUl).find('li:last .a-dropdown__option-text').html());
      }
    } 
    //search functionality
    else {
    $(this.dropdownField).find('li .a-dropdown__option-text').each(function(){
      var options = $(this);
      var optionValue = $(this).html();
      var lioptionValue = $.trim($(this).html());
      if((lioptionValue[0].toLowerCase()).indexOf(searchValue.toLowerCase()) == 0){
      if(options.parent().siblings().hasClass('selected') && !(options.parent().siblings().hasClass('selectedColor'))){
        options.parent().siblings().removeClass('selected');
      }else if(options.parent().siblings().hasClass('selectedColor')&& !(options.parent().siblings().hasClass('selected'))){
        options.parent().siblings().removeClass('selectedColor');
      } else {
        options.parent().siblings().removeClass('selected selectedColor');
      }
      options.filter(':contains("' + optionValue + '")').parent().attr('tabIndex',-1);
      options.filter(':contains("' + optionValue + '")').parent().focus().addClass('selected selectedColor');
      var placeholder = options.closest('.a-dropdown__field').children('span');
      placeholder.html(optionValue).removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      e.target.closest('.a-dropdown').dispatchEvent(evt);
		  return false;
     }​​
    });
  }
  }

  enterPressed(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    //event for enter keypress
    if(e.which == 13){       
      var selectedLi = $(this.dropdownUl).find('li.selected');
      if(selectedLi.length > 0 || $(this.dropdownUl).find('li.selectedColor').length > 0){
      selectedLi.siblings().removeClass('selected selectedColor');
      selectedLi.attr('tabIndex',-1);
      selectedLi.addClass('selected selectedColor');
      var placeholder = $(this.dropdownField).children('span');
      placeholder.html(selectedLi.children().html());
      if(placeholder.hasClass('a-dropdown__placeholder')){
        placeholder.removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
      }
        $(this.dropdownField).toggleClass('active');
        if($(this.dropdownField).hasClass('active')){
          $(this.dropdownUl).attr("aria-expanded", "true");
        }else{
          $(this.dropdownUl).attr("aria-expanded", "false");
          e.currentTarget.focus();
        }  
      //Triggering the change event when user clicks on enter 
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      e.target.closest('.a-dropdown').dispatchEvent(evt);
      }else{
        $(this.dropdownField).toggleClass('active');
        if($(this.dropdownField).hasClass('active')){
          $(this.dropdownUl).attr("aria-expanded", "true");
        }else{
          $(this.dropdownUl).attr("aria-expanded", "false");
        }
     }
      
    } 
  }

  addSelectedColor(e){
    $(this.dropdownMenu).siblings().removeClass('selectedColor');
    $(e.currentTarget).addClass('selectedColor');
  }
  removeSelectedColor(e){
    $(this.dropdownMenu).siblings().removeClass('selectedColor');
  }
  
  ctrlPressed(e, keyVal) {
    this.isPressed = (e.which=="17" && keyVal==='down')? true : (keyVal==='up')? false : false;      
  }

  defaultSelectedOption() {
    const ulItem = this.dropdownUl.find(".selected");
    if(ulItem.length===1) {    
        const val = ulItem.text();   
        var placeholder = this.elements.find('.a-dropdown__field').children('span');
        placeholder.html(val).removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
    }
  }

  toggleFormDropdown(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if ($(e).length) {
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
          $(this).find('.a-dropdown__menu').attr("aria-expanded", "true");
        }else{
          $(this).find('.a-dropdown__menu').attr("aria-expanded", "false");
        }
    }
    var selectedLi = $(this).find('.a-dropdown__menu').find('li.selected');
      if(selectedLi.length > 0 || $(this).find('.a-dropdown__menu').find('li.selectedColor').length > 0){
      selectedLi.siblings().removeClass('selected selectedColor');
      selectedLi.addClass('selected selectedColor');
      }
  }

  selectFormDropdown(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var options = $(this);
      this.val = options.text();
      this.index = options.index();
      var placeholder = options.closest('.a-dropdown__field').children('span');
      placeholder.html(this.val).removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
      if(options.siblings().hasClass('selected') && !(options.siblings().hasClass('selectedColor'))){
        options.siblings().removeClass('selected');
      }else if(options.siblings().hasClass('selectedColor')&& !(options.siblings().hasClass('selected'))){
        options.siblings().removeClass('selectedColor');
      } else {
        options.siblings().removeClass('selected selectedColor');
      }
      options.filter(':contains("' + this.val + '")').addClass('selected selectedColor');
        // Trigger the change event when a dropdown value is selected
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        const dropdown = e.target.closest('.a-dropdown');       
        var optionId = options.attr("id");     
        options.closest('.a-dropdown__menu').find('li').removeAttr("aria-selected");
        const dropdownMenu = options.closest('.a-dropdown__menu');
        options.closest('.a-dropdown__field').focus();
        const liSelected = dropdownMenu.find('li.selected');
        if(liSelected && liSelected.length > 0) {
          liSelected.attr("aria-selected", "true");
          dropdownMenu.attr("aria-activedescendant", optionId);
        }
        
		if (dropdown) {​​
			e.target.closest('.a-dropdown').dispatchEvent(evt);
			options.closest('.a-dropdown__field').toggleClass('active');
		}​​
  }

  selectMultiDropdown(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if(this.isPressed) {
      e.currentTarget.classList.contains('selected')?  e.currentTarget.classList.remove('selected') :  e.currentTarget.classList.add('selected');
    } else {
      this.multiDropdownField.each(function(index, value) {
        value.classList.remove('selected');
      });
     e.currentTarget.classList.add('selected');
    }
   
    // Trigger the change event when multi-dropdown value is selected
    var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        e.target.closest('.a-dropdown').dispatchEvent(evt);
  }
}


$(document).ready(function() {
  document.querySelectorAll('[data-js-component="form-dropdown"]').forEach(function(ele) {
      new FormDropdown(ele);
  });
  $(document).on('click', function() {
      $('.a-dropdown__field').each(function() {  
          $(this).removeClass('active');  
      });
  });
});