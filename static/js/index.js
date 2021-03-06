/**
 * 页面ready方法
 */
$(document).ready(function() {

    populateCategory();
	populateArchive();
    generateContent();
    backToTop();
});

/**
 * load方法，页面的加载完成后触发
 * {fixFooterInit();} 固定Footer栏
 */
/*$(window).load(function() {
    fixFooterInit();
});*/


/**
 * 固定底栏的初始化方法
 * 在一开始载入页面时，使用fixFooter()方法固定底栏。
 * 在浏览器窗口改变大小是，依然固定底栏
 * @return {[type]} [description]
 */
function fixFooterInit() {
    var footerHeight = $('footer').outerHeight();
    var footerMarginTop = getFooterMarginTop() - 0; //类型转换
    // var footerMarginTop = 80;

    fixFooter(footerHeight, footerMarginTop); //fix footer at the beginning

    $(window).resize(function() { //when resize window, footer can auto get the postion
        fixFooter(footerHeight, footerMarginTop);
    });

    /*    $('body').click(function() {
        fixFooter(footerHeight, footerMarginTop);
    });*/


}

/**
 * 固定底栏
 * @param  {number} footerHeight    底栏高度
 * @param  {number} footerMarginTop 底栏MarginTop
 * @return {[type]}                 [description]
 */
function fixFooter(footerHeight, footerMarginTop) {
    var windowHeight = $(window).height();
    var contentHeight = $('body>.container').outerHeight() + $('body>.container').offset().top + footerHeight + footerMarginTop;
    if (contentHeight < windowHeight) {
        $('footer').addClass('navbar-fixed-bottom');
    } else {
        $('footer').removeClass('navbar-fixed-bottom');
    }

    $('footer').show(400);
}

/**
 * 使用正则表达式得到底栏的MarginTop
 * @return {string} 底栏的MarginTop
 */
function getFooterMarginTop() {
    var margintop = $('footer').css('marginTop');
    var patt = new RegExp("[0-9]*");
    var re = patt.exec(margintop);
    return re[0];
}

//function is from here: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function populateCategory() {
    var cat = getParameterByName('cat');
	 if (cat == "")
		 cat = 'All';
 //    $('.post-list-body>div[post-cate!=All]').hide();
	 $('.post-list-body>div[post-cate!=' + cat + ']').hide(250);
     $('.post-list-body>div[post-cate=' + cat + ']').show(400);	 
}

function populateArchive() {
     var date = getParameterByName('date');
	 if (date == "")
		 return;
	 $('.post-area>div[post-date!=' + date + ']').hide(250);
     $('.post-area>div[post-date=' + date + ']').show(400);	 
}

/**
 * 回到顶部
 */
function backToTop() {
    //滚页面才显示返回顶部
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $("#top").fadeIn(500);
        } else {
            $("#top").fadeOut(500);
        }
    });
    //点击回到顶部
    $("#top").click(function() {
        $("body").animate({
            scrollTop: "0"
        }, 500);
    });

    //初始化tip
//    $(function() {
        //$('[data-toggle="tooltip"]').tooltip();
//    });
}


/**
 * 侧边目录
 */
function generateContent() {

    if (typeof $('#markdown-toc').html() === 'undefined') {
        $('#content').hide();
        $('#myArticle').removeClass('col-sm-9').addClass('col-sm-12');
    } else {
        $('#content .content-text').html('<ul>' + $('#markdown-toc').html() + '</ul>');
    }
}

