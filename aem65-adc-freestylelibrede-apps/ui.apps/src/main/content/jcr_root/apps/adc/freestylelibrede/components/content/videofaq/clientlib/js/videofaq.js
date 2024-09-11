    const explanatory = {
        languages: {
            de: 'Deutsch'
        },
        de: {
            intro: {
                img: '/content/dam/adc/videofaq/intro.png',
                video: '429694292',
                intro: '/content/dam/adc/videofaq/intro.png'
            },
            categories: [
                {
                   title: 'Erste Schritte',
                    videos: [
                        { title: 'Was ist in der Lieferung FreeStyle Libre 2 enthalten?', url: '429668975' },
                        { title: 'Wie bereite ich die Stelle zum Anbringen vor?', url: '429669252' },
                        { title: 'Wie bringe ich meinen Sensor an?', url: '429671003' },
                        { title: 'Wie starte ich einen angebrachten Sensor?', url: '429680329' },
                        { title: 'Wie scanne ich?', url: '429679786' },
                        {
                            title: 'Alarme',
                            videos: [
                                { title: 'Welche Alarme gibt es?', url: '429681435' },
                                { title: 'Was muss ich bei der Alarmfunktion beachten?', url: '429681577' },
                                { title: 'Wie stelle ich die Alarme ein?', url: '429681677' },
                                { title: 'Wie hören sich die Alarme an?', url: '429689536' }
                            ]
                        }
                    ]
                },
                {
                    title: 'Alltag',
                    videos: [
                        { title: 'Was sollte ich beim Tragen beachten?', url: '429674490' },
                        { title: 'Wie oft muss ich scannen?', url: '429680817' },
                        { title: 'Kann ich durch meine Kleidung hindurch scannen?', url: '429681100' },
                        { title: 'Kann ich mit Sensor duschen, schwimmen oder Sport treiben?', url: '429672905' },
                        { title: 'Was gibt es auf Flugreisen zu beachten?', url: '429675160' },
                        { title: 'Wie nehme ich den Sensor wieder ab? ', url: '429690298' },
                        { title: 'Wie entsorge ich den Sensor?', url: '429690600' }
                    ]
                },
                {
                    title: 'App & Lesegerät',
                    videos: [
                        { title: 'Scannen mit Smartphone oder Lesegerät?', url: '429679960' },
                        { title: 'Wie scanne ich?', url: '429679786' },
                        {
                            title: 'Alarme',
                            videos: [
                                { title: 'Welche Alarme gibt es?', url: '429681435' },
                                { title: 'Was muss ich bei der Alarmfunktion beachten?', url: '429681577' },
                                { title: 'Wie stelle ich die Alarme ein?', url: '429681677' },
                                { title: 'Wie hören sich die Alarme an?', url: '429689536' },
                                { title: 'Kann ich gleichzeitig vom FreeStyle Libre Lesegerät und von der FreeStyle LibreLink App Alarme empfangen?', url: '429693919' }
                            ]
                        },
                        { title: 'Wie starte ich einen neuen Sensor, wenn ich die FreeStyle LibreLink App nutze?', url: '429692770' },
                        { title: 'Was ist LibreView und wie funktioniert es mit der FreeStyle LibreLink App?', url: '429693996' },
                        { title: 'Was ist die LibreLinkUp App und wie funktioniert sie mit der FreeStyle LibreLink App?', url: '429694099' }
                    ]
                },
                {
                    navTitle: 'Weitere Unterstützung',
                    title: 'Fehler und Probleme',
                    videos: [
                        { title: 'Was tun, wenn Sie nicht sicher sind, ob die Werte richtig sind?', url: '429691113' },
                        { title: 'Kann ich einen abgefallenen oder abgenommenen Sensor nochmal verwenden?', url: '429691536' },
                        { title: 'Wohin wende ich mich bei Problemen?', url: '429692199' }
                    ]
                }
            ]
        }
    };

    function stickyContainer(container, containerMobile, sticky) {
        if (window.pageYOffset > sticky) {
            container.addClass('sticky');
            containerMobile.css('padding-top', container.height());
        } else {
            container.removeClass('sticky');
            containerMobile.css('padding-top', 0)
        }
    }

    function buildMainNav($, backBtn, iframe, image, introImage) {
        let nav = $('.explanatory__nav');
        let language = nav.data('language');
        let categories = explanatory[language]['categories'];
        let introImg = introImage;
        if (!introImage) {
            introImg = explanatory[language]['intro']['catImg'];
            $('.explanatory__header').addClass('dontShow');
        } else {
            $('.explanatory__header').removeClass('dontShow');

        }
        let introVideo = explanatory[language]['intro']['video'];

        iframe.attr('src', 'https://player.vimeo.com/video/' + introVideo + '?autoplay=1&loop=1&color=E26126&title=0&byline=0&portrait=0');
        image.show().attr('src', introImg);

        nav.empty();
        backBtn.empty();
        if (window.outerWidth <= 992) {
            backBtn.append('<span class="explanatory__blue">Einleitung</span>');
            backBtn.removeClass('dontShow');
            $('.explanatory__langChooser').removeClass('dontShow');
            backBtn.addClass('noArrow');
        } else {
            backBtn.addClass('dontShow');
            $('.explanatory__langChooser').addClass('dontShow');
            backBtn.removeClass('noArrow');

        }

        for (let i = 0; i < categories.length; i++) {
            const categorie = categories[i];

            if (categorie.navTitle) {
                nav.append('<div class="explanatory__kategoryBtn" data-categorie = "'+i+'" >' + categorie.navTitle + '</div>');
            } else {
                nav.append('<div class="explanatory__kategoryBtn" data-categorie="'+i+'">' + categorie.title + '</div>');
            }
        }
        mainNavClickEvent($, backBtn, iframe);
    }
    function subNavClickEvent(iframe) {
        $('.explanatory__subKategoryBtn').click(function () {
            let url = $(this).data('url');

            $('.explanatory__subKategoryBtn').removeClass('active');
            $(this).addClass('active');
            if (url) {

                iframe.attr('src', 'https://player.vimeo.com/video/' + url + '?autoplay=1&color=E26126&title=0&byline=0&portrait=0');
            } else {
                buildSubNav($(this), backBtn, iframe);
            }
        });
    }
    function mainNavClickEvent($, backBtn, iframe) {
        $('.explanatory__kategoryBtn').click(function () {
            buildSubNav($(this), backBtn, iframe);
            backBtn.removeClass('noArrow');
        });
    }
    function buildSubNav(element, backBtn, iframe) {
        let nav = $('.explanatory__nav');
        let language = nav.data('language')
        let categorieId = element.attr('data-categorie');
        let subCategorieId = element.attr('data-subCategorie');
        let categorie;
        if (typeof subCategorieId != 'undefined') {
            categorie = explanatory[language]['categories'][categorieId]['videos'][subCategorieId];
            backBtn.attr('data-categorie', categorieId);
        } else {
            categorie = explanatory[language]['categories'][categorieId]
        }
        let videos = categorie.videos;

        $('.explanatory__header').addClass('dontShow');
        $('.explanatory__langChooser').removeClass('dontShow');
        nav.empty();
        backBtn.removeClass('dontShow');
        backBtn.empty();
        backBtn.append('<span>' + categorie.title + '</span>');
        for (let i = 0; i < videos.length; i++) {
            const video = videos[i];
            if (i == 0) {
                nav.append('<div class="explanatory__subKategoryBtn active" data-url="'+video.url+'">' + video.title + '</div>');
                iframe.attr('src', 'https://player.vimeo.com/video/' + video.url + '?autoplay=1&color=E26126&title=0&byline=0&portrait=0');
            } else {
                if (video.url) {
                    nav.append('<div class="explanatory__subKategoryBtn" data-url="'+video.url+'">' + video.title + '</div>');
                } else {
                    nav.append('<div class="explanatory__subKategoryBtn explanatory__subKategoryBtn--subSub" data-categorie="'+categorieId+'" data-subCategorie="'+i+'">' + video.title +'</div>');
                }
            }
        }
        subNavClickEvent(iframe);
        iframe.show();
        setTimeout(function(){
            image.hide();

        }, 300);
    }

    jQuery(document).ready(function ($) {
        const iframe = $('#explanatory__iframe');
        const image = $('#explanatory__img');
        let backBtn = $('.explanatory__BackBtn');
        let container = $('.explanatory__container');
        let containerMobile = $('.explanatory__containerMobile');
        const sticky = container?.length ? container.offset().top : 0;
        iframe.show();
        mainNavClickEvent($, backBtn, iframe);

        backBtn.click(function () {
            if ($(this).attr('data-categorie')) {
                buildSubNav($(this), backBtn, iframe);
            } else {
                buildMainNav($, backBtn, iframe, image);
            }
            $(this).removeAttr('data-categorie');
        });
        $('.explanatory__langBtn').click(function () {
            let nav = $('.explanatory__nav');
            let newLanguage = $(this).data('language');
            let introImg = explanatory[newLanguage]['intro']['img'];
            nav.attr('data-language', newLanguage)
            nav.data('language', newLanguage);
            buildMainNav($, backBtn, iframe, image, introImg);
            $('.explanatory__langChooserContent').toggle();
        })
        image.click(function () {
            let url = iframe.attr('src')
            $(this).hide();
            iframe.show();
            iframe.attr('src', url + '?autoplay=1');
            if (window.outerWidth <= 992) {
                backBtn.empty();
                $('.explanatory__header').addClass('dontShow');
                $('.explanatory__langChooser').removeClass('dontShow');
                backBtn.append('<span class="explanatory__blue">Einleitung</span>');
                backBtn.removeClass('dontShow');
                backBtn.addClass('noArrow');
            }

        });
        $('.explanatory__langChooserBtn').click(function () {
            $('.explanatory__langChooserContent').toggle();
        })

        window.onscroll = function () { stickyContainer(container, containerMobile, sticky) };
    });