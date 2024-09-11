class Title {
    private spacingClasses: string[] = [
        'a-title--mt-small',
        'a-title--mt-medium',
        'a-title--mb-small',
        'a-title--mb-medium'
    ];

    private container: HTMLElement;

    constructor(initElement: HTMLElement) {
        this.container = initElement.closest('.title') as HTMLElement;

        this.compareSpacingClassName();
    }

    private compareSpacingClassName() {
        if (this.container) {
            const elementClasses = this.container.classList;

            for (let i = 0; i < elementClasses.length; i++) {

                for (let j = 0; j < this.spacingClasses.length; j++) {

                    if (elementClasses[i] === this.spacingClasses[j]) {
                        this.applyCSSToElements(elementClasses[i]);
                    }

                }
            }
        }
        return false;
    }

    private applyCSSToElements(cssClass: string) {
        if (cssClass.indexOf('a-title--mt') !== -1) {
            this.container.previousElementSibling?.classList.add('mb-0');
        }

        if (cssClass.indexOf('a-title--mb') !== -1) {
            this.container.nextElementSibling?.classList.add('mt-0');
        }
    }

}

document.querySelectorAll('[data-js-component="title"]').forEach(function (titleComponent) {
    new Title(titleComponent as HTMLElement);
});

