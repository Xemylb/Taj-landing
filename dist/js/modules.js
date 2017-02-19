"use strict"
;
(function () {
    function animate (animateElem, distanceX, distanceY, rowElements, rows, animationTime, lastRowElementsLength) {
        var countRowElem = 1, //счетчик элементов ряда
            countRow = 1, //счетчик рядов
            bgPositionX = 0, // позиция background по оси X
            bgPositionY = 0; // позиция background по оси Y
        if (!lastRowElementsLength) {//если не указано количество элементов в последнем ряду
            lastRowElementsLength = rowElements;
        }
        if (!animationTime) {//если не указана скорость анимации
            animationTime = 70;
        }
        var interval = setInterval(function () { //интервал для смены позиции background
            if (countRow != rows) { //если номер ряда не равен количеству рядов
                if (countRowElem < rowElements - 1) { //проверка на то, что бы счетчик был меньше количиства элементов в ряду
                    bgPositionX += distanceX;
                    animateElem.style.backgroundPositionX = bgPositionX + 'px';
                    countRowElem++
                } else { //переходим на новый ряд
                    countRow++;
                    countRowElem = 0;
                    bgPositionX = 0;
                    bgPositionY += distanceY;
                    animateElem.style.backgroundPositionY = bgPositionY + 'px';
                    animateElem.style.backgroundPositionX = bgPositionX + 'px';
                }
            } else { //на последнем ряду делаем меньшее количетсво итераций
                if (countRowElem < lastRowElementsLength - 1) {
                    bgPositionX += distanceX;
                    animateElem.style.backgroundPositionX = bgPositionX + 'px';
                    countRowElem++
                } else { //очищаем интервал, ставим финальную позицию background
                    clearInterval(interval);
                    animateElem.style.backgroundPositionY = bgPositionY + 'px';
                    animateElem.style.backgroundPositionX = bgPositionX + 'px';
                }
            }
        }, animationTime);
    }

   function btnGrad (btn, gradColor, gradWidth) { //градиент за мышкой на кнопках
        var btnColor = window.getComputedStyle(btn).backgroundColor; //забираем изначальный цвет background

        btn.addEventListener('mousemove', function (e) { //вычисляем положения мышки для позиционриование градиента
            var x = e.offsetX == undefined ? e.layerX : e.offsetX;
            var y = e.offsetY == undefined ? e.layerY : e.offsetY;
            var xy = x + ' ' + y;
            btn.style.background = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", " + gradWidth + ", from(" + gradColor + "), to(rgba(255,255,255,0.0)))," + btnColor + "";
        }, false);


        btn.addEventListener('mouseout', function () { //возвращаем изначальный цвет по убиранию мыши
            btn.style.background = btnColor;
        }, false);
    }

    function transform3d(perspective, target) { // 3д анимация элемента
        perspective.on('mousemove', function (e) {// по движению мыши по перспективе
            var x = e.offsetX == undefined ? e.layerX : e.offsetX;
            var y = e.offsetY == undefined ? e.layerY : e.offsetY;
            target.css('transform', 'rotate3d(' + x + ',' + y + ', 0, -2deg)');
        });
        perspective.on('mouseout', function () {//при убирание мыши возвращаем все на место
            target.css('transform', 'initial');
        });
    }

    function animateHover(elem, px) { // функци анимации ховера  ссылок
        $(elem).on('mouseover', function (e) {
            e.preventDefault();
            $(this).children().first().css({
                'opacity': '0',
                'bottom': px + 'px'
            });
            $(this).children().last().css({
                'opacity': 1,
                'bottom': '0'
            })
        });

        $(elem).on('mouseout', function () {
            $(this).children().first().css({
                'opacity': '1',
                'bottom': '0'
            });
            $(this).children().last().css({
                'opacity': 0,
                'bottom': -px + 'px'
            })
        });
    }
    function slowScroll(links) {
        $(links).on('click', function (event) {//вещаем клик
        var target = $(this.getAttribute('href')); //определяем цель
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({//скроллим
                scrollTop: target.offset().top
            }, 1000);
        }
        });
    }
    function preloader(preloader) { //прелоадер на сайт
         var spinner   = preloader.find('.spinner');
        spinner.fadeOut();
        preloader.delay(350).fadeOut('slow');
    }
    window._mod = {
        'animate': animate,
        'btnGrad': btnGrad,
        'transform3d': transform3d,
        'animateHover': animateHover,
        'slowScroll': slowScroll,
        'preloader':  preloader
    }
})();
