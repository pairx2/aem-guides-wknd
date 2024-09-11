(function () {

    class VideoPlayListHtml {
        private elem: any;
        constructor(elem: any) {
            this.elem = elem;
            this.init();
        }

        public init() {
            let listVideo = this.elem;
           
            listVideo.querySelectorAll('.wistia-playlist__video-item').forEach(function (wistia) {
                wistia.addEventListener('click', function (event) {
                    event.preventDefault();
                    listVideo.querySelectorAll('.wistia-playlist__video-item').forEach(function (wistiaList) {
                        wistiaList.classList.remove('active');
                    });
                    this.classList.add('active');
                    this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-title').innerHTML =  this.querySelector('.wistia-playlist__video-title').innerHTML;
                    this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-description').querySelector('p').innerHTML =  this.querySelector('p').innerHTML;
                    if(this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-button')){
                        this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-button').querySelector('a').setAttribute('href', this.querySelector('.wistia-playlist__button-data').getAttribute('data-button-link'));
                        this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-button').querySelector('a').innerHTML = this.querySelector('.wistia-playlist__button-data').getAttribute('data-button-text');
                    }
                    this.closest('.wistia-playlist').querySelector('iframe').setAttribute('src',this.getAttribute('data-video-url'));
                });
            });
        }
    }

    class VideoPlayListWistia {
        private elem: any;
        constructor(elem: any) {
            this.elem = elem;
            this.init();
        }

        public init() {
            let listVideo = this.elem;
            let mainVideoHeight = listVideo?.querySelector('.wistia-playlist__main-video-image img')?.clientHeight;
            if(mainVideoHeight){
                listVideo.querySelector('.wistia-playlist__list-items')?.setAttribute('style',`height:${mainVideoHeight}px`);
            } 
            listVideo.querySelectorAll('.wistia-playlist__video-item').forEach(function (wistia) {
                wistia.addEventListener('click', function (event) {
                    event.preventDefault();
                    listVideo.querySelectorAll('.wistia-playlist__video-item').forEach(function (wistiaList) {
                        wistiaList.classList.remove('active');
                    });
                    this.classList.add('active');
                    this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-title').innerHTML =  this.querySelector('.wistia-playlist__video-title').innerHTML;
                    this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-description').querySelector('p').innerHTML =  this.querySelector('p').innerHTML;
                    if(this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-button')){
                        this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-button').querySelector('a').setAttribute('href', this.querySelector('.wistia-playlist__button-data').getAttribute('data-button-link'));
                        this.closest('.wistia-playlist').querySelector('.wistia-playlist__main-button').querySelector('a').querySelector('span').innerHTML = this.querySelector('.wistia-playlist__button-data').getAttribute('data-button-text');
                    }
                    this.closest('.wistia-playlist')?.querySelector('.wistia-playlist__main-video-image').classList.add("hide");
                });
            });

            listVideo.querySelectorAll('.wistia-playlist__main-video-image').forEach(function (wistia) {
                wistia.addEventListener('click', function (event) {
                    this?.classList.add("hide");
                });
            });

        }
    }

    (function () {

        document.querySelectorAll('[data-js-component="html5Videos"]').forEach(function (elem) {
            new VideoPlayListHtml(elem as any);
        });

        document.querySelectorAll('[data-js-component="wistiaVideos"]').forEach(function (elem) {
            new VideoPlayListWistia(elem as any);
        });
        
    })();
})();


