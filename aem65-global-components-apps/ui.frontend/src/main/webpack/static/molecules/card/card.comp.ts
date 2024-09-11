
    (function () {
        class Card{ 
            private container: HTMLElement;
            private contButton: NodeListOf <HTMLElement>;
            private contLink: NodeListOf <HTMLElement>;

            constructor(ele: HTMLElement) {
                this.container = ele;
                this.cacheElements();
                
            }

            private cacheElements() {
                const container = this.container;
                this.contButton = container.querySelectorAll('[data-disable-child-links] button');
                this.contLink = container.querySelectorAll('[data-disable-child-links] a');
                this.contButton?.forEach(function(ele: HTMLInputElement) {
                    ele.addEventListener('click', this.onCardClick.bind(this));
                }.bind(this));

                this.contLink?.forEach(function(ele: HTMLInputElement) {
                    ele.addEventListener('click', this.onCardClick.bind(this));
                }.bind(this));
            }

            private onCardClick(evt: MouseEvent) {
                evt.preventDefault();
            }
        }

        $(function () {
             document.querySelectorAll('[data-js-component="card"]').forEach((ele) => {
                new Card(ele as HTMLElement);
            });
        });
    }());
