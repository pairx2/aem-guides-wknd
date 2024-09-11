(function(){
    'use-strict';
    class TableComponent{
        public elem: HTMLElement;
        constructor(elem: HTMLElement) {
            let _this = this;
            this.elem = elem;
            this.init(_this,elem);
        }
       public init(_this, elem) {
            setTimeout(function(){
                var tableComponent = elem;
                if(tableComponent){
                    document.querySelectorAll('.editmode').forEach(function(ele){
                        ele.remove();
                    })
                }
                tableComponent?.querySelector(".js-copy-table-html")?.parentNode?.addEventListener("click", function () {
                    var parentTable = this.closest(".m-table-component");
                    _this.detach(this);
                    var element = document.createElement('textarea');
                    element.value = '<div class="m-table-component">' + parentTable.outerHTML + "</div>";
                    parentTable.appendChild(this);
                    document.body.appendChild(element);
                    element.select();
                    document.execCommand('copy');
                    document.body.removeChild(element);
                });
            },500);
        }
        public detach(node) {
            return node.parentElement.removeChild(node);
        }
    }
    
    (function(){
        document.querySelectorAll('[data-js-component="m-table-component"]').forEach(function (elem) {
              new TableComponent(elem as HTMLElement);
          });
    })();
})();