class imageWithAnimation {
    private elem: Element;
    private btn: Element;
    private animatedLayer: Element;
    private stillLayer: Element;
    private state: String;

    constructor(elem: Element) {
        this.elem = elem;
        this.elem.classList.add('js-iwa-initialized');

        this.init();
    }

    private toggleClassHelper() {
        const buttonIcon = this.btn.querySelector('.js-iwa-button-icon');

        if ( this.state === 'pause' ) {
            this.state = 'play';
            this.animatedLayer.style.display = 'block';
            this.stillLayer.style.display = 'none';
        } else {
            this.state = 'pause';
            this.animatedLayer.style.display = 'none';
            this.stillLayer.style.display = 'block';
        }

        buttonIcon.classList.toggle('abt-icon-play2');
        buttonIcon.classList.toggle('abt-icon-pause');
    }

    private bindClickEvents() {
        this.btn.addEventListener('click', evt => {
            evt.preventDefault();
            this.toggleClassHelper();
        });
    }

    public init() {
        this.btn = this.elem.querySelector('.js-iwa-button');
        this.state = this.btn.dataset.state;
        this.animatedLayer = this.elem.querySelector('.js-iwa-animated-layer');
        this.stillLayer  = this.elem.querySelector('.js-iwa-still-layer');

        if ( this.btn ) {
            this.bindClickEvents();
        }
    }
}

$(function () {
    document.querySelectorAll('.js-iwa-component').forEach((e) => {
        if (!$(e).hasClass('js-iwa-initialized')) {
            new imageWithAnimation(e as HTMLElement);
        }
    });
});
