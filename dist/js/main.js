/**
 * Created by Hvostov on 30.01.2017.
 */
$(document).ready(function () {
    var bodyClassAdd = 'scroll-down',
        nowPos = window.pageYOffset || document.documentElement.scrollTop,
        goNext = $('.go-next'),
        goNextLink = $('.go-next-link'),
        aboutPhoto = $('#about-photo'),
        latestScroll = $(".latest-scroll"),
        latestScrollInner = $(".latest-scroll-inner"),
        headerHeight = 80;

    if (nowPos > 50) {$("body").addClass(bodyClassAdd);}//проверка позиции клиента при загрузке

    /*функции модуля*/
       $(window).on('load', function () {
           _mod.animate(document.getElementById('animation-hello'), -764, -510, 5, 7, 70, 2);// функция анимации надписи
           _mod.preloader($('#page-preloader'));
       });
        _mod.btnGrad(document.getElementById('btn-blue'), '#1786bf', 220);// функция градиента на кнопку
        _mod.btnGrad(document.getElementById('project-section-btn'), '#d8d8dd', 220);// функция градиента на кнопку
        _mod.btnGrad(document.getElementById('last-section-btn'), '#d8d8dd', 220);// функция градиента на кнопку
        _mod.transform3d(aboutPhoto, $('.perspective'));//3d трансформация фото
            /*анимация ховера*/
                _mod.animateHover('.social a', 8);
                _mod.animateHover('.menu a', 10);

        _mod.slowScroll($('a[href^="#"]')); //плавный скролл по секциям


    /*Действия при изменении размера окна страницы*/
        function resizeScrollBlocks() {
            if ($(window).width() >= '1290') {
                latestScrollInner.css('width', parseFloat($(".latest-scroll-wrap").css('width')) / 2);//распологаем 2 элемента четко по центру экрана
                latestScroll.mCustomScrollbar({//вызываем плагин вертикальной прокрутки блока
                    axis: "x",
                    scrollbarPosition: "outside",
                    advanced: {autoExpandHorizontalScroll: true}
                });
                latestScroll.mCustomScrollbar("update");//обновляем плагин скролла для правильной работы
            } else {
                latestScroll.mCustomScrollbar("disable");//выключаем плагин
            }
        }

        resizeScrollBlocks(); //вызов при загрузке

        $(window).resize(function () {// для правильного расположения и видимости элементов при изменении размера окна
            resizeScrollBlocks();
            if(($(window).width() < '1000')){
                moveObject(aboutPhoto, 'up');
            }
            if ($(window).width() < '770'){
                $('nav,.header-social').css('display', 'none');
            }
            if ($(window).width() > '770'){
                $('nav').css('display', 'block');
            }

        });

    /*Движения блоков в первой секции*/
        $('#first-section').on('mousemove', function (event) { //анимация движения элементов в перовой секции
            var x = (event.screenX - $(window).width() / 2) / 50;
            var y = (event.screenY - $(window).height() / 2) / 50;
            $('.back-layer').css('transform', 'translate(' + x + 'px,' + y + 'px)');
            $('.first-section-title h1').css('transform', 'translate(' + x * 2 + 'px,' + y * 2 + 'px)');
            $('.first-section-btn').css('transform', 'translate(' + x * 1.5 + 'px,' + y * 1.5 + 'px)');
        });

    /*Эффекты меню и header*/
        $('.menu').find('li').on('click', function () {//анимация подчеркивания ссылок в меню
            $('.menu').find('li').removeClass('active');
            $(this).addClass('active')
        });


        $('.btn-menu-drop').on('click', function () { //появления мобильного меню
            if ($(this).hasClass('drop-active')) {
                $(this).removeClass('drop-active');
                $('nav,.header-social').css('display', 'none');
            } else {
                $('nav,.header-social').css('display', 'block');
                $(this).addClass('drop-active')
            }
        });

    /*функция движения фото*/
        function moveObject(object, styleType) {
            if (styleType == 'down') {
                object.css({
                    'top': 'inherit',
                    'bottom': 100 + 'px',
                    'right': 80 + 'px',
                    'position': 'absolute'
                });
            } else if (styleType == 'up') {
                object.css({
                    'top': 0,
                    'right': 80 + 'px',
                    'position': 'absolute'
                });
            } else if (styleType == 'fixed') {
                object.css({
                    'top': 90 + 'px',
                    'right': 80 + 132 + 'px',
                    'position': 'fixed'
                });
            } else {
                console.log('error');
            }
        }

    /*Изменения элементов навигации*/
        function navChange(position) {
            var activeElem = '#' + position,
                craps = $('.nav-craps').children();

            $('.menu').children().removeClass('active');
            $(activeElem).parent().addClass('active');

            craps.removeClass('active');

            if (position == 'home') {
                goNextLink.text('About me');
                goNextLink.attr('href', '#about-section');
                $(craps[0]).addClass('active');
            }
            else if (position == 'about') {
                goNextLink.text('Projects');
                goNextLink.attr('href', '#projects-section');
                $(craps[1]).addClass('active');
            }
            else if (position == 'projects') {
                goNextLink.text('Contacts');
                goNextLink.attr('href', '#last-section');
                goNext.removeClass('go-next-up');
                $(craps[2]).addClass('active');
            } else {
                goNextLink.attr('href', '#first-section');
                goNextLink.text('go-up');
                goNext.addClass('go-next-up');
                $(craps[3]).addClass('active');
            }
        }

    /*Эффект паралкса правой колонки в Projects*/
        function paralaxEffect(elem, scrolled) {
            if ($(window).width() >= '1170' && scrolled > $('#projects-section h2').offset().top + headerHeight) {
                elem.css({//эффект паралакса
                    'transform': 'translate(0%,' + scrolled / 1900 + '%)'
                });
            }else {
                elem.css({//возвращаем элемент на место
                    'transform': 'translate(0%,0%)'
                });
            }
        }

    /*Все что происходит во время скролла страницы*/
        var lastScrollTop = 0;//переменная для опредиления движения скролла
        window.onscroll = function () {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop,
                st = scrolled;

            if (scrolled > $('#projects-section').offset().top - headerHeight) {
                //эффект паралакса правой колонки
                paralaxEffect($('.right-col'),scrolled);

            }
            //действия для скроллов вниз или вверх
            if (st > lastScrollTop) {
                //скролл вниз
                if ($(window).width() >= '1000') {//для движения фото
                    if (scrolled > aboutPhoto.offset().top - headerHeight) {
                        moveObject(aboutPhoto, 'fixed');
                    }
                    if (scrolled > $('#btn-blue').offset().top - 660) {
                        moveObject(aboutPhoto, 'down');
                    }
                }

            } else {

                //скролл вверх

                if ($(window).width() >= '1000') {//ограничение работы движения фото для разных экранов
                    if (scrolled < aboutPhoto.offset().top) {
                        moveObject(aboutPhoto, 'fixed');
                    }
                    if (scrolled < $('.about-content').offset().top - headerHeight) {
                        moveObject(aboutPhoto, 'up');
                    }
                }
            }

            /*вычисление позиции клинта на сайте для изменения пунктов меню и ссылки*/
            if (scrolled < 50) {
                $('body').removeClass(bodyClassAdd);
                navChange('home')
            }
            else if (scrolled > 50 && scrolled < $('#about-section').offset().top - headerHeight * 2) {
                $("body").addClass(bodyClassAdd);
                navChange('home')
            }
            else if (scrolled > $('#about-section').offset().top - headerHeight * 2 && scrolled < $('#projects-section').offset().top - headerHeight * 2) {
                navChange('about')
            }
            else if (scrolled > $('#projects-section').offset().top - headerHeight * 2 && scrolled < $('#last-section').offset().top - headerHeight * 2) {
                navChange('projects')
            }
            else if (scrolled > $('#last-section').offset().top - headerHeight * 2) {
                navChange('contacts')
            }

            lastScrollTop = st; //записываем в переменную значение для сравнения и опредиления движения скролла
        };

    /*кнопки форм*/
        $('#last-section-btn, #btn-blue').on('click', function () {//открытие формы письма
            $('.forms').toggle();
            $('.contact-form').toggle()
        });
        $('#project-section-btn, .latest-scroll-inner-link, .download-icon').on('click', function () {//открытие формы пароля
            $('.forms').toggle();
            $('.valid-form').toggle()
        });

        $('.exit').on('click', function () { //закрытие формы
            $(this).parent('.modal-form').toggle();
            $('.forms').toggle();
        });
        $('.form-send').on('click', function () { //валидация форм на пустое значение
            var notValid = '',
                check = true;
            var inputs = $(this).parent('.form-block').children('input'),
                formMessage =  $(this).parent().children('.form-message');
            for(var i = 0; i< inputs.length; i++){
                if($(inputs[i]).val().trim() == notValid){
                    check = false
                }
            }
            formMessage.css('display', 'block');
            if(check){
                formMessage.text(formMessage.attr(('data-txt')))
            } else {
                formMessage.text('empty field')
            }
        });

    /*видео*/
        $('.first-section-btn').on('click', function () {//показываем видео
            $('.youtube-pop-up').fadeToggle()
        });

        $('.youtube-pop-up').on('click', function () { //закрываем видео при клике за его пределами
            $(this).fadeToggle()
        });
});