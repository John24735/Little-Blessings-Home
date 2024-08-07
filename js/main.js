(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);


function payWithPaystack() {
    var amount = document.getElementById('amount').value * 100;
    var email = document.getElementById('email').value;
    var name = document.getElementById("name").value; 
    var currency = document.getElementById('currency').value;
    var handler = PaystackPop.setup({
      key: "pk_test_0cfb345bdaa919543ee61eb593e4f0efe8ce2ef0",
      email: email,
      amount: amount, 
      currency: currency,
      ref: "" + Math.floor(Math.random() * 103000700 + 1),
      callback: function (response) {
          showPaymentStatus(
            name +". Thank you for donating " + amount + ". May God Bless you with your dreams. " +
          "Payment successful. Transaction reference: TM" + response.reference
        );
      },
      onClose: function () {
        showPaymentStatus("Transaction was not completed, window closed.");
      },
    });
    handler.openIframe();
}

  function calculateAmount() {
    var amount = 0;
    if (document.getElementById("btnradio1").checked) {
      amount = 2000; // 2000 cents = 20 USD
    } else if (document.getElementById("btnradio2").checked) {
      amount = 4000; // 4000 cents = 40 USD
    } else if (document.getElementById("btnradio3").checked) {
      amount = 3000; // 3000 cents = 30 USD
    } else {
      amount = parseFloat(prompt("Enter your donation amount in USD:")) * 100; // Convert dollars to cents
    }
    return amount;
  }

  function showPaymentStatus(message) {
    // Set the message in the modal
    document.getElementById("paymentStatusMessage").innerText = message;
    // Show the modal
    var paymentStatusModal = new bootstrap.Modal(
      document.getElementById("paymentStatusModal")
    );
    paymentStatusModal.show();
  }