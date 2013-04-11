KISSY.ready(function(S) {
    var $ = S.Node.all;
    S.use("cookie,anim,switchable,sizzle", 
    function(S, Cookie, Anim, Switchable) {
		function hoverNavItem(top, duration) {
            Anim.stop("#J_CurrentBG", false, false, "switchAnim");
            $("#J_CurrentBG").css("width", "7px");
            new Anim("#J_CurrentBG", {
                top: top
            },
            {
                duration: duration,
                easing: "easeNone",
                queue: "switchAnim",
                complete: function() {
                    new Anim("#J_CurrentBG", {
                        width: "256px"
                    },
                    .3, "easeNone").run()
                }
            }).run()
        }
        
        function scrollCallback() {
            var scroll = $("window").scrollTop();
            if (scroll >= 500) {
                $(".back-to-top").fadeIn(.5)
            } else {
                $(".back-to-top").fadeOut(.3)
            }
            var bodyTop = $("body").offset().top;
            var navHeight = $("#nav").outerHeight();
            var contentHeight = $("#content").outerHeight();
            var diff = contentHeight - scroll - navHeight;
            if (diff <= 117) {
                if (!$("#nav").hasClass("nav-1")) {
                    $("#nav").addClass("nav-1")
                }
                $("#nav").css("top", contentHeight + bodyTop - navHeight - 117)
            } else {
                if ($("#nav").hasClass("nav-1")) {
                    $("#nav").removeClass("nav-1");
                    $("#nav").css("top", bodyTop)
                }
            }
            if ($("#content").hasClass("content-single")) {
                var $postContainer = $(".article-container");
                var postHeight = $postContainer.outerHeight() + $postContainer.offset().top;
                var barHeight = $(".entry-meta").outerHeight();
                var screenHeight = $(".back-to-top").height();
                if (postHeight + barHeight - scroll < screenHeight) {
                    var $entryMeta = $(".entry-meta");
                    if ($entryMeta.hasClass("entry-meta-fixed")) {
                        $entryMeta.removeClass("entry-meta-fixed")
                    }
                } else {
                    var $entryMeta = $(".entry-meta");
                    if (!$entryMeta.hasClass("entry-meta-fixed")) {
                        $entryMeta.addClass("entry-meta-fixed")
                    }
                }
            }
        }
		
        $(".menu li").on("mouseover", 
        function(e) {
            e.stopPropagation();
            var top = $(this).offset().top - $("#nav").offset().top - 117;
            hoverNavItem(top, .1)
        });
        $(".menu-nav_menu-container").on("mouseleave", 
        function() {
            resetNavItem(false)
        });
		
		
    })
});