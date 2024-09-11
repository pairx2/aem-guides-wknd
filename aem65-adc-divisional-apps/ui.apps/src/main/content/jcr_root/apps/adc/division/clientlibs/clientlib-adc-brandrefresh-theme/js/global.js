document.addEventListener('DOMContentLoaded', function () {

    function changeFavIcon() {
        const iconFolderPath = getComputedStyle(document.documentElement).getPropertyValue('--favicon-name').slice(1, -1);
        if (iconFolderPath) {
            const linkTags = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
            const metaTags = document.querySelectorAll('meta[name^="msapplication"]');

            linkTags.forEach(function (link) {
                link.href = iconFolderPath + '/' + link.rel + '-' + link.sizes + '.png';
            });

            metaTags.forEach(function (meta) {
                const size = meta.getAttribute('name').match(/\d+x\d+/)[0].trim();
                meta.content = iconFolderPath + '/icon-' + size + '.png';
            });
        }
    }

    changeFavIcon();
});