

$(function () {


    var firstScroll, lastScroll,
        positionVisual, positionText,
        positionNew, positionCollection, positionBest;
    var startX, endX = 0;
    var num = 0;
    var bln = true;
    var lastscroll = 0;
    var b = true, c = 0;

    $(window).scroll(parallax); //parallax effect

    $('.category button').click(select); //category change


    // search menu
    $('.header__search').click(search); // search menu open
    $('.search__close').click(close); // search menu close
    $('.search__gender button').click(open); // search-gender tab open
    $('.search__category button').click(open); // search-category tab open
    $('.search__gender p').click(cat_change); // search-gender change
    $('.search__category p').click(cat_change);  // search-category change
    function search() { //search page open
        $('html').addClass("search"); //page fixed
        $('.wrap').addClass("search"); //page fixed

        $('.search__close').css({
            display: "block"
        }, 500);
        $('.search__close').delay(500).animate({
            opacity: 1
        });
        $(this).find('input').css({
            display: "block"
        }, 500);
        $(this).find('input').delay(500).animate({
            opacity: 1
        });
        $('.header__shopping').animate({
            opacity: 0
        }, 500);
        $('.header__shopping').delay(500).css({
            display: "none"
        });
        $('header').animate({
            height: "100vh"
        })
        $('.search__keyword').css({
            display: "flex"
        }, 500);
        $('.search__keyword').delay(500).animate({
            opacity: 1
        });
    }
    function close() { //go back to origin page
        $('html').removeClass("search");
        $('.wrap').removeClass("search");
        $('.search__category').find('button').html('CATEGORY<img src="img/download.png" alt="">');

        $('.search__close').css({
            display: "none"
        }, 500);
        $('.search__close').delay(500).animate({
            opacity: 0
        });
        $('.header__search').find('input').css({
            display: "none"
        }, 500);
        $('.header__search').find('input').delay(500).animate({
            opacity: 0
        });
        $('.header__shopping').animate({
            opacity: 1
        }, 500);
        $('.header__shopping').delay(500).css({
            display: "block"
        });
        $('header').animate({
            height: "45px"
        })
        $('.search__keyword').css({
            display: "none"
        }, 500);
        $('.search__keyword').delay(500).animate({
            opacity: 0
        });
        $('.search__category p').css({
            display: "none",
            transform: "translate(-5%, -50px)"
        }, 500);
        $('.search__category p').animate({
            opacity: 0
        });
    }
    function open() { //for open gender/category tab in search menu
        if (bln) {
            bln = false; // to open it when it is not open
            $(this).parent().find('p').css({ //list open
                display: "flex",
                transform: "translate(-5%, 0)"
            }, 500);
            $(this).parent().find('p').animate({ //list open2
                opacity: 1
            });
            $(this).find('img').css({ //list open3 (missing image problem) **fix need
                transform: "rotate(180deg)"
            })
        }
        else {
            bln = true;  // to open it when it is not open
            $('.search__gender').find('p').css({
                display: "none",
                transform: "translate(-5%, -50px)"
            }, 500);
            $('.search__gender').find('p').animate({
                opacity: 0
            });
            $('.search__gender').find('button').find('img').css({
                transform: "rotate(0deg)"
            })
            $('.search__category').find('p').css({
                display: "none",
                transform: "translate(-5%, -50px)"
            }, 500);
            $('.search__category').find('p').animate({
                opacity: 0
            });
            $('.search__category').find('button').find('img').css({
                transform: "rotate(0deg)"
            })
        }
    }
    function cat_change() { //for gender/category change in search menus
        bln = true;
        var target = $(this).text();
        $(this).parent().find('button').html(target + '<img src="img/download.png" alt="">');
        $(this).parent().find('p').fadeOut(500); //list close
    }
    //search menu end


    $('.new__wrapper').click(function (e) { // new - click event
        e.stopPropagation();
        e.stopImmediatePropagation();
        if ($(e.target).hasClass("new__itemBox")) { // go to detail.html
            detail();
        }
        if ($(e.target).hasClass("heart")) { //heart button click event (color change)
            like();
        }
    });
    $('.col__wrapper').click(function (e) { // collection - click event
        e.stopPropagation();
        if ($(e.target).hasClass("col__itemBox")) {
            detail();
        }
        if ($(e.target).hasClass("heart")) {
            like();
        }
    });
    $('.best__wrapper').click(function (e) { // bestseller - click event
        e.stopPropagation();
        if ($(e.target).hasClass("best__itemBox")) {
            detail();
        }
        if ($(e.target).hasClass("heart")) {
            like();
        }
    });

    function detail() { // go to detail.html
        location.href = 'sub/detail.html'
    }
    $('.heart').click(like);
    function like() { //heart button click event (color change)
        $(this).find('img').toggleClass('pink');
    }
    function sale() { //for css change in .sale span
        $('.sale').find('span').css({
            display: "inline-block",
            marginLeft: "5px",
            color: "red",
            fontSize: "0.8rem",
            fontWeight: "300",
            textDecoration: "none"
        });
    }
    sale();



    $('.new__wrapper').on('scroll', function (e) {
        e.preventDefault();
    });
    $('.new__wrapper').on('touchstart', newS);
    function newS() {
        startX = $('.new__wrapper').scrollLeft();
    }
    // function newRight() {
    //     $('.new__wrapper').scrollLeft(c);
    // }
    function newLeft() {
        $('.new__wrapper').scrollLeft(
            startX - 165
        );
    }
    $('.new__wrapper').on('scrollstart', function (e) {
        console.log('start')
    });
    $('.new__wrapper').on('scrollstop', function (e) {
        // $.event.special.scrollstop.latency = 250;
        //e.preventDefault();
        var currentscroll = $('.new__wrapper').scrollLeft();
        if (b) {
            b = false;
            if (lastscroll <= currentscroll) {
                c += 165;
                //$('.new__wrapper').on('touchend', newRight);
            }
            else {
                c -= 165;

                //$('.new__wrapper').on('touchend', newLeft);
            }
            setTimeout(function () { b = true; }, 500);
        }
        // newRight();
        // scrollLeft()
        $(this).animate({
            scrollLeft: c
        });
        //console.log(c)
        lastscroll = currentscroll;
    })

    // function touchEnd2() {
    //     var max = $(this).find('.item').length - 2; //let item move within maximum length
    //     if (startX > endX) { //if you move to left
    //         if (num < max) {
    //             num++;
    //             $(this).parent().scrollLeft(
    //                 startLeft + 165  // move item line as much as item size
    //             );
    //             $(this).parent().next().find('span').css({
    //                 width: 25 * (num + 1) + "%" // move indicator as much as 25%
    //             });
    //         }
    //         else { //if num > max => if you try to move more than maximum length, let item not move.
    //             $(this).parent().scrollLeft(
    //                 startLeft
    //             );
    //             $(this).parent().next().find('span').css({
    //                 width: 25 * (num + 1) + "%"
    //             });
    //         }
    //     }
    //     else if (startX < endX) { // if you move right
    //         if (num > 0) {
    //             $(this).parent().scrollLeft(
    //                 startLeft - 165
    //             );
    //             $(this).parent().next().find('span').css({
    //                 width: 25 * (num + 1) + "%"
    //             });
    //             num--;
    //         }
    //         else { //if num <0 => if you try to move back, let item not move.
    //             $(this).parent().scrollLeft({
    //                 startLeft
    //             })
    //             $(this).parent().next().find('span').css({
    //                 width: 25 * (num + 1) + "%"
    //             });
    //         }
    //     }
    // }
    function parallax() { // to move image as likely parallax
        firstScroll = window.scrollY;
        positionVisual = firstScroll * 0.5;
        positionText = firstScroll * 0.7;
        positionNew = firstScroll * (-0.1);
        positionCollection = firstScroll * -0.2 + 350;
        positionBest = firstScroll * -0.2 + 250;

        if (firstScroll > lastScroll) {
            $('.visual__white').css({
                opacity: firstScroll * 0.002,
            });
            $('.visual').css({
                'background-position-y': positionVisual
            });
            $('.new__image').css({
                'background-position-y': positionNew,
            });
            $('.collection__image').css({
                'background-position-y': positionCollection
            });
            $('.bestseller__image').css({
                'background-position-y': positionBest
            });
            $('.visual h1').css({
                marginTop: positionText
            });
            if (firstScroll > 538) {
                $('header').css({
                    display: "none"
                });
                $('.new__image').css({
                    marginTop: "120px"
                });
                $('.category').css({
                    position: "fixed",
                    top: "0",
                    zIndex: "100"
                });
            }
            if (firstScroll > 2400) {
                $('.stories h3').addClass('effect')
            }

        }
        else {
            $('.visual').css({
                'background-position-y': positionVisual
            });
            $('.new__image').css({
                'background-position-y': positionNew,
            });
            $('.collection__image').css({
                'background-position-y': positionCollection
            });
            $('.bestseller__image').css({
                'background-position-y': positionBest
            });
            if (firstScroll < 538) {
                $('header').css({
                    display: "block"
                });
                $('.new__image').css({
                    marginTop: "70px"
                });
                $('.visual h1').css({
                    marginTop: positionText
                });
                $('.visual__white').css({
                    opacity: firstScroll * 0.002,
                });
                $('.category').css({
                    position: "relative",
                    top: "0",
                    zIndex: "100"
                });
            }
            else {
                $('header').css({
                    display: "block"
                });
                $('.category').css({
                    position: "fixed",
                    top: "45px",
                    zIndex: "100"
                });
            }
            if (firstScroll < 2400) {
                $('.stories h3').removeClass('effect')
            }
        }
        lastScroll = firstScroll;
    }
    function select() { // move red line under the categroy tab
        $('.category button strong').removeClass('selected');
        $(this).find('strong').addClass('selected');
        var categoryWidth = $(this).find('strong').innerWidth();
        var categoryOffset = $(this).find('strong').offset();

        $('.category span').animate({
            width: categoryWidth,
            left: categoryOffset.left
        });
    }

});

