function createQuoteSlide(quote) {
    const { pic_url, name, title, text } = quote;

    const slide = $('<div>').addClass('carousel-item');
    const row = $('<div>').addClass('row mx-auto align-items-center').appendTo(slide);
    const imgCol = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center').appendTo(row);
    const img = $('<img>').attr({
        'src': pic_url,
        'alt': 'Carousel Pic'
    }).addClass('d-block align-self-center').appendTo(imgCol);
    const textCol = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0').appendTo(row);
    const quoteText = $('<div>').addClass('quote-text').appendTo(textCol);
    const p = $('<p>').addClass('text-white').text(text).appendTo(quoteText);
    const h4 = $('<h4>').addClass('text-white font-weight-bold').text(name).appendTo(quoteText);
    const span = $('<span>').addClass('text-white').text(title).appendTo(quoteText);

    return slide;
}

function populateVideoCards(data, popularCarouselInner) {
    popularCarouselInner.empty();

    const cardsPerSlide = 4;
    let activeSlide = null;

    data.forEach(function (video, index) {
        if (index % cardsPerSlide === 0) {
            activeSlide = $('<div>').addClass('carousel-item');
            if (index === 0) {
                activeSlide.addClass('active');
            }
            popularCarouselInner.append(activeSlide);
        }
    
        const { pic_url, name, title, text } = quote;

        const slide = $('<div>').addClass('carousel-item');
        const row = $('<div>').addClass('row mx-auto align-items-center').appendTo(slide);
        const imgCol = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center').appendTo(row);
        const img = $('<img>').attr({
            'src': pic_url,
            'alt': 'Carousel Pic'
        }).addClass('d-block align-self-center').appendTo(imgCol);
        const textCol = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0').appendTo(row);
        const quoteText = $('<div>').addClass('quote-text').appendTo(textCol);
        const p = $('<p>').addClass('text-white').text(text).appendTo(quoteText);
        const h4 = $('<h4>').addClass('text-white font-weight-bold').text(name).appendTo(quoteText);
        const span = $('<span>').addClass('text-white').text(title).appendTo(quoteText);

        return slide;
        activeSlide.append(cardHTML);
    });
    
}

fetchPopularTutorials();



$(document).ready(function () {
    const quoteCarouselInner = $('#carouselExampleControlsQuotes .carousel-inner');
    const popularCarouselInner = $('#carouselPopular .carousel-inner');
    const quoteLoader = $('.loader');
    const popularLoader = $('.popular-loader');

    quoteLoader.show();
    popularLoader.show();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        success: function (quotes) {
            quoteLoader.hide();
            quoteCarouselInner.empty();

            $.each(quotes, function (index, quote) {
                const slide = createQuoteSlide(quote);
                if (index === 0) {
                    slide.addClass('active');
                }
                quoteCarouselInner.append(slide);
            });
        },
        error: function (error) {
            quoteLoader.hide();
            console.error('Error:', error);
        }
    });

    function fetchPopularTutorials() {
        $.ajax({
            url: "https://smileschool-api.hbtn.info/popular-tutorials",
            method: "GET",
            beforeSend: function () {
                popularLoader.show();
            },
            success: function (data) {
                popularLoader.hide();
                populateVideoCards(data, popularCarouselInner);
            },
            error: function () {
                popularLoader.hide();
                alert("Failed to fetch data. Please try again later.");
            },
        });
    }
});
