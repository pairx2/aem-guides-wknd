$(function () {
    // Apply rounded corners to the card component
    // In the authoring dialog - config tab this class "m-card__border--rounded" can be added to make the corners rounded
    const cards = document.querySelectorAll('.m-card__border--rounded');
    if (cards.length > 0) {
        cards.forEach(function (card) {
            card.parentElement.classList.add('m-card--rounded');
        });
    }
});