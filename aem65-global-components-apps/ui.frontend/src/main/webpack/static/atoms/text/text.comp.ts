(function () {

    class TextShort {

        private elem: any;

        constructor(elem: any) {
            this.elem = elem;
            this.init();
        }

        public init() {
            var textLineNo = this.elem.getAttribute('data-short-numberoflines');
            var textMore = this.elem.getAttribute('data-short-morelink');
            var btn = document.createElement("button");
            btn.innerHTML = textMore;
            btn.className = "a-read--more-less";
            btn.type = "button";
            var lineSpace = 0;
            var lineCountInc = 0;
            this.elem.parentNode.appendChild(btn);
            var lineHeight = parseInt(window.getComputedStyle(this.elem.querySelectorAll('p')[0]).getPropertyValue('line-height'));
            var marginBottom = parseInt(window.getComputedStyle(this.elem.querySelectorAll('p')[0]).getPropertyValue('margin-bottom'));
            this.elem.querySelectorAll('p').forEach(function (pTag) {
                var lineCount = parseInt(pTag.offsetHeight) / lineHeight;
                if (textLineNo > lineCountInc) {
                    lineSpace += marginBottom;
                    lineCountInc += lineCount;
                }
            });
            this.elem.style.height = textLineNo * lineHeight + lineSpace - marginBottom + "px";
        }
    }

    class ToggleTextShort {

        private elem: any;

        constructor(elem: any) {
            this.elem = elem;
            this.init();
        }

        public init() {
            var textParent = this.elem.closest('.text');
            if (textParent.querySelectorAll('.a-short').length > 0) {
                console.log(textParent.querySelectorAll('.a-short').length);
                var toggleCheck = textParent.querySelector('.a-short').getAttribute('aria-expanded');
                var textLineNo = textParent.querySelector('.a-short').getAttribute('data-short-numberoflines');
                var textLess = textParent.querySelector('.a-short').getAttribute('data-short-lesslink');
                var textMore = textParent.querySelector('.a-short').getAttribute('data-short-morelink');
                var btn = textParent.querySelector('button');
                var textShortDesc = textParent.querySelector('.a-short');
                if (toggleCheck == "false") {
                    textShortDesc.ariaExpanded = true;
                    textShortDesc.style.height = "auto";
                    btn.innerHTML = textLess;
                }
                else {
                    var lineSpace = 0;
                    var lineCountInc = 0;
                    this.elem.parentNode.appendChild(btn);
                    var lineHeight = parseInt(window.getComputedStyle(textParent.querySelectorAll('p')[0]).getPropertyValue('line-height'));
                    var marginBottom = parseInt(window.getComputedStyle(textParent.querySelectorAll('p')[0]).getPropertyValue('margin-bottom'));
                    textParent.querySelectorAll('p').forEach(function (pTag) {
                        var lineCount = parseInt(pTag.offsetHeight) / lineHeight;
                        if (textLineNo > lineCountInc) {
                            console.log("lineCount 1", textLineNo, lineCount, lineCountInc, textLineNo > lineCountInc, lineSpace);
                            lineSpace += marginBottom;
                            lineCountInc += lineCount;
                        }
                    });
                    textShortDesc.style.height = textLineNo * lineHeight + lineSpace - marginBottom + "px";
                    textShortDesc.ariaExpanded = false;
                    btn.innerHTML = textMore;
                }
            }
        }

    }

    (function () {
        document.querySelectorAll('[data-js-component="text"]').forEach(function (elem) {
            let text = elem.classList.contains("a-short");
            if (text) {
                new TextShort(elem as any);
            }
        });

        setTimeout(() => {
            const toggleReadMore = document.querySelectorAll(".a-read--more-less");
            toggleReadMore.forEach((testShort) => {
                testShort.addEventListener("click", function () {
                    new ToggleTextShort(this);
                });
            });
        }, 1000);
    })();
})();
