!(function (e) {
  "use strict";
  e(window).on("load", function () {
    e(".preloader").fadeOut();
  }),
    e(".preloader").length > 0 &&
      e(".preloaderCls").each(function () {
        e(this).on("click", function (t) {
          t.preventDefault(), e(".preloader").css("display", "none");
        });
      }),
    (e.fn.vsmobilemenu = function (t) {
      var o = e.extend(
        {
          menuToggleBtn: ".vs-menu-toggle",
          bodyToggleClass: "vs-body-visible",
          subMenuClass: "vs-submenu",
          subMenuParent: "vs-item-has-children",
          subMenuParentToggle: "vs-active",
          meanExpandClass: "vs-mean-expand",
          appendElement: '<span class="vs-mean-expand"></span>',
          subMenuToggleClass: "vs-open",
          toggleSpeed: 400,
        },
        t
      );
      return this.each(function () {
        var t = e(this);
        function n() {
          t.toggleClass(o.bodyToggleClass);
          var n = "." + o.subMenuClass;
          e(n).each(function () {
            e(this).hasClass(o.subMenuToggleClass) &&
              (e(this).removeClass(o.subMenuToggleClass),
              e(this).css("display", "none"),
              e(this).parent().removeClass(o.subMenuParentToggle));
          });
        }
        t.find("li").each(function () {
          var t = e(this).find("ul");
          t.addClass(o.subMenuClass),
            t.css("display", "none"),
            t.parent().addClass(o.subMenuParent),
            t.prev("a").append(o.appendElement),
            t.next("a").append(o.appendElement);
        });
        var s = "." + o.meanExpandClass;
        e(s).each(function () {
          e(this).on("click", function (t) {
            var n;
            t.preventDefault(),
              (n = e(this).parent()),
              e(n).next("ul").length > 0
                ? (e(n).parent().toggleClass(o.subMenuParentToggle),
                  e(n).next("ul").slideToggle(o.toggleSpeed),
                  e(n).next("ul").toggleClass(o.subMenuToggleClass))
                : e(n).prev("ul").length > 0 &&
                  (e(n).parent().toggleClass(o.subMenuParentToggle),
                  e(n).prev("ul").slideToggle(o.toggleSpeed),
                  e(n).prev("ul").toggleClass(o.subMenuToggleClass));
          });
        }),
          e(o.menuToggleBtn).each(function () {
            e(this).on("click", function () {
              n();
            });
          }),
          t.on("click", function (e) {
            e.stopPropagation(), n();
          }),
          t.find("div").on("click", function (e) {
            e.stopPropagation();
          });
      });
    }),
    e(".vs-menu-wrapper").vsmobilemenu();
  var t,
    o,
    n,
    s = "";
  function i(t, o, n, s) {
    e(o).on("click", function (o) {
      o.preventDefault(), e(t).addClass(s);
    }),
      e(t).on("click", function (o) {
        o.stopPropagation(), e(t).removeClass(s);
      }),
      e(t + " > div").on("click", function (o) {
        o.stopPropagation(), e(t).addClass(s);
      }),
      e(n).on("click", function (o) {
        o.preventDefault(), o.stopPropagation(), e(t).removeClass(s);
      });
  }
  function a(e) {
    return parseInt(e, 10);
  }
  e(window).on("scroll", function () {
    var t, o, n, i, a;
    (t = e(".sticky-active")),
      (o = "active"),
      (n = "will-sticky"),
      (i = e(window).scrollTop()),
      (a = t.css("height")),
      t.parent().css("min-height", a),
      e(window).scrollTop() > 800
        ? (t.parent().addClass(n), i > s ? t.removeClass(o) : t.addClass(o))
        : (t.parent().css("min-height", "").removeClass(n), t.removeClass(o)),
      (s = i),
      e(this).scrollTop() > 500
        ? e(".scrollToTop").addClass("show")
        : e(".scrollToTop").removeClass("show");
  }),
    e(".scrollToTop").each(function () {
      e(this).on("click", function (t) {
        return (
          t.preventDefault(),
          e("html, body").animate({ scrollTop: 0 }, s / 3),
          !1
        );
      });
    }),
    e("[data-bg-src]").length > 0 &&
      e("[data-bg-src]").each(function () {
        var t = e(this).attr("data-bg-src");
        t.length &&
          (e(this).css("background-image", "url(" + t + ")"),
          e(this).removeAttr("data-bg-src").addClass("background-image"));
      }),
    e(".vs-hero-carousel").each(function () {
      var t = e(this);
      function o(e) {
        return t.data(e);
      }
      t.find("[data-ls-go]").each(function () {
        e(this).on("click", function (o) {
          o.preventDefault();
          var n = e(this).data("ls-go");
          t.layerSlider(n);
        });
      }),
        t.layerSlider({
          startInViewport: !1,
          allowRestartOnResize: !0,
          globalBGColor: !!o("global-bg") && o("global-bg"),
          globalBGImage: !!o("global-img") && o("global-img"),
          maxRatio: o("maxratio") ? o("maxratio") : 1,
          type: o("slidertype") ? o("slidertype") : "responsive",
          pauseOnHover: !!o("pauseonhover"),
          navPrevNext: !!o("navprevnext"),
          hoverPrevNext: !!o("hoverprevnext"),
          hoverBottomNav: !!o("hoverbottomnav"),
          navStartStop: !!o("navstartstop"),
          navButtons: !!o("navbuttons"),
          loop: !1 !== o("loop"),
          autostart: !!o("autostart"),
          height: o("height") ? o("height") : 1080,
          responsiveUnder: o("responsiveunder") ? o("responsiveunder") : 1220,
          layersContainer: o("container") ? o("container") : 1220,
          showCircleTimer: !!o("showcircletimer"),
          skinsPath: "layerslider/skins/",
          thumbnailNavigation: !1 !== o("thumbnailnavigation"),
        });
    }),
    e(".hero-carousel-style2").layerSlider({
      createdWith: "6.11.8",
      sliderVersion: "6.11.8",
      startInViewport: !1,
      skin: "v6",
      globalBGColor: "#256bdb",
      navPrevNext: !1,
      hoverPrevNext: !1,
      navStartStop: !1,
      navButtons: !1,
      showCircleTimer: !1,
      useSrcset: !1,
      skinsPath: "layerslider/skins/",
    }),
    i(".sidemenu-wrapper", ".sideMenuToggler", ".sideMenuCls", "show"),
    i(
      ".popup-newsletter-active",
      ".popupNewsletterToggler",
      ".popup-newsletter-closer",
      "show"
    ),
    (t = ".popup-search-box"),
    (o = ".searchClose"),
    (n = "show"),
    e(".searchBoxTggler").on("click", function (o) {
      o.preventDefault(), e(t).addClass(n);
    }),
    e(t).on("click", function (o) {
      o.stopPropagation(), e(t).removeClass(n);
    }),
    e(t)
      .find("form")
      .on("click", function (o) {
        o.stopPropagation(), e(t).addClass(n);
      }),
    e(o).on("click", function (o) {
      o.preventDefault(), o.stopPropagation(), e(t).removeClass(n);
    }),
    e(".popup-image").magnificPopup({
      type: "image",
      gallery: { enabled: !0 },
    }),
    e(".popup-video").magnificPopup({ type: "iframe" }),
    (e.fn.sectionPosition = function (t, o) {
      e(this).each(function () {
        var n,
          s,
          i,
          l,
          r,
          c = e(this);
        (n = Math.floor(c.height() / 2)),
          (s = c.attr(t)),
          (i = c.attr(o)),
          (l = a(e(i).css("padding-top"))),
          (r = a(e(i).css("padding-bottom"))),
          "top-half" === s
            ? (e(i).css("padding-bottom", r + n + "px"),
              c.css("margin-top", "-" + n + "px"))
            : "bottom-half" === s &&
              (e(i).css("padding-top", l + n + "px"),
              c.css("margin-bottom", "-" + n + "px"));
      });
    });
  e("[data-sec-pos]").length &&
    e("[data-sec-pos]").imagesLoaded(function () {
      e("[data-sec-pos]").sectionPosition("data-sec-pos", "data-pos-for");
    }),
    e(".filter-active").imagesLoaded(function () {
      if (e(".filter-active").length > 0)
        var t = e(".filter-active").isotope({
          itemSelector: ".filter-item",
          filter: "*",
          masonry: { columnWidth: ".filter-item" },
        });
      if (e(".filter-active-style2").length > 0)
        t = e(".filter-active-style2").isotope({
          itemSelector: ".filter-item",
          filter: "*",
          masonry: { columnWidth: 1 },
        });
      e(".filter-menu-active").on("click", "button", function () {
        var o = e(this).attr("data-filter");
        t.isotope({ filter: o });
      }),
        e(".filter-menu-active").on("click", "button", function (t) {
          t.preventDefault(),
            e(this).addClass("active"),
            e(this).siblings(".active").removeClass("active");
        });
    }),
    e("#ship-to-different-address-checkbox").on("change", function () {
      e(this).is(":checked")
        ? e("#ship-to-different-address").next(".shipping_address").slideDown()
        : e("#ship-to-different-address").next(".shipping_address").slideUp();
    }),
    e(".woocommerce-form-login-toggle a").on("click", function (t) {
      t.preventDefault(), e(".woocommerce-form-login").slideToggle();
    }),
    e(".woocommerce-form-coupon-toggle a").on("click", function (t) {
      t.preventDefault(), e(".woocommerce-form-coupon").slideToggle();
    }),
    e(".shipping-calculator-button").on("click", function (t) {
      t.preventDefault(),
        e(this).next(".shipping-calculator-form").slideToggle();
    }),
    e('.wc_payment_methods input[type="radio"]:checked')
      .siblings(".payment_box")
      .show(),
    e('.wc_payment_methods input[type="radio"]').each(function () {
      e(this).on("change", function () {
        e(".payment_box").slideUp(),
          e(this).siblings(".payment_box").slideDown();
      });
    }),
    e(".rating-select .stars a").each(function () {
      e(this).on("click", function (t) {
        t.preventDefault(),
          e(this).siblings().removeClass("active"),
          e(this).parent().parent().addClass("selected"),
          e(this).addClass("active");
      });
    }),
    (e.fn.countdown = function () {
      e(this).each(function () {
        var t = e(this),
          o = new Date(t.data("offer-date")).getTime();
        function n(e) {
          return t.find(e);
        }
        var s = setInterval(function () {
          var e = new Date().getTime(),
            i = o - e,
            a = Math.floor(i / 864e5),
            l = Math.floor((i % 864e5) / 36e5),
            r = Math.floor((i % 36e5) / 6e4),
            c = Math.floor((i % 6e4) / 1e3);
          a < 10 && (a = "0" + a),
            l < 10 && (l = "0" + l),
            r < 10 && (r = "0" + r),
            c < 10 && (c = "0" + c),
            i < 0
              ? (clearInterval(s),
                t.addClass("expired"),
                t.find(".message").css("display", "block"))
              : (n(".day").html(a),
                n(".hour").html(l),
                n(".minute").html(r),
                n(".seconds").html(c));
        }, 1e3);
      });
    }),
    e(".offer-counter").length && e(".offer-counter").countdown(),
    e(".notice-counter").length && e(".notice-counter").countdown(),
    e(".product_ripple_icon").each(function () {
      e(this).on("click", function (t) {
        t.preventDefault(),
          e(this).next(".product_ripple_body").toggleClass("show");
      });
    }),
    e(".img-switcher").each(function () {
      e(this).on("click", function () {
        var t = e(this),
          o = t.data("switch"),
          n = t.data("switch-on");
        t.addClass("active"),
          t.siblings().removeClass("active"),
          e(n).attr("src", o);
      });
    });
  var l = e('[data-ticker="list"]'),
    r = '[data-ticker="item"]',
    c = l.data("ticker-duration"),
    d = e(r).length,
    u = 0;
  function p() {
    l.find(r).clone().prependTo('[data-ticker="list"]');
    for (var t = 0; t < d; t++) {
      var o = e(r).eq(t).outerWidth();
      u += o;
    }
    l.css("width", u);
  }
  function h() {
    l.animate({ marginLeft: -u }, c, "linear", function () {
      l.css("margin-left", "0"), h();
    });
  }
  function g() {
    e(window).width() <= 576 &&
      e(".vs-box-nav .menu-item-has-children > a").each(function () {
        e(this).on("click", function (t) {
          t.preventDefault();
          var o = e(this);
          o.next(".sub-menu").slideToggle("slow"), o.toggleClass("active");
        });
      });
  }
  p(),
    h(),
    l
      .on("mouseenter", function () {
        e(this).stop(!0);
      })
      .on("mouseout", function () {
        h();
      }),
    e(window).on("resize", function () {
      p(), h();
    }),
    e(".product-switcher .switch").each(function () {
      e(this).on("click", function () {
        var t = e(this).closest(".product-switcher").find(".product-img img"),
          o = e(this).data("srcset");
        t.attr("src", o);
      });
    }),
    e(".product-big-slide").slick({
      dots: !1,
      infinite: !0,
      arrows: !1,
      autoplay: !1,
      fade: !0,
      focusOnSelect: !0,
      speed: 1e3,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".product-thumb-slide",
    }),
    e(".product-thumb-slide").slick({
      dots: !1,
      infinite: !0,
      vertical: !0,
      verticalSwiping: !0,
      arrows: !1,
      autoplay: !1,
      fade: !1,
      focusOnSelect: !0,
      centerMode: !0,
      centerPadding: "0",
      speed: 1e3,
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: ".product-big-slide",
      responsive: [
        { breakpoint: 1500, settings: { slidesToShow: 4, slidesToScroll: 1 } },
        {
          breakpoint: 1350,
          settings: { speed: 300, slidesToShow: 4, slidesToScroll: 1 },
        },
        {
          breakpoint: 992,
          settings: { speed: 300, slidesToShow: 4, slidesToScroll: 1 },
        },
        {
          breakpoint: 767,
          settings: {
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            vertical: !1,
            verticalSwiping: !1,
          },
        },
      ],
    }),
    e(".reviews-summary__buttons a").each(function () {
      e(this).on("click", function (t) {
        t.preventDefault();
        var o = e(this).attr("href");
        e(o).siblings().removeClass("active").removeClass("show"),
          e(o).addClass("active show");
        var n = e('[href="' + o + '"');
        n.parent().siblings().find("a").removeClass("active"),
          n.addClass("active");
      });
    }),
    e(".review-toggler").each(function () {
      e(this).on("click", function () {
        e("#review_form").slideToggle();
      });
    }),
    g(),
    e(window).on("resize", function () {
      g();
    });
})(jQuery);
