var anchor        = ""
    ,title        = ""
    ,description  = ""
    ,image        = ""
    ,alt          = ""
    ,countdown    = null
    ,seconds      = 60

function positionNav(){
  $("nav ul li a").removeClass("active")
  if($("[data-section='index']").offset().top >= $(document).scrollTop()){
    $("nav ul li a[href='index']").addClass("active")
    $("[data-section='nav']").css("top", $("[data-section='index']").offset().top)
  }else if($("[data-section='obstacles']").offset().top >= $(document).scrollTop()){
    $("nav ul li a[href='obstacles']").addClass("active")
    $("[data-section='nav']").css("top", $("[data-section='obstacles']").offset().top)
  }else if($("[data-section='prizes']").offset().top >= $(document).scrollTop()){
    $("nav ul li a[href='prizes']").addClass("active")
    $("[data-section='nav']").css("top", $("[data-section='prizes']").offset().top)
  }else if($("[data-section='enter']").offset().top >= $(document).scrollTop()){
    $("nav ul li a[href='enter']").addClass("active")
    $("[data-section='nav']").css("top", $("[data-section='enter']").offset().top)
  }
}

function countDown(){
  $("#countdown").html(seconds)
  
  seconds --
  if(seconds < 0){
    clearInterval(countdown)
    $("#countdown").animate({color: "#DA2F34"}, 0150, function(){
      setTimeout("resetCountDown()", 3000)
    })
  }else if(seconds < 10){
    seconds = "0" + seconds
    
    $("#countdown").animate({color: "#DA2F34"}, 0150, function(){
      $("#countdown").delay(0150).animate({color: "#F5EB00"}, 0150)
    })
  }
}

function resetCountDown(){
  $("#countdown").fadeOut(function(){
    seconds = 60
    countdown = setInterval("countDown()", 1000)
    $("#countdown").css("color", "#F5EB00").html(seconds).fadeIn()
  })
}

$(document).ready(function(){

  positionNav()
  $(window).scroll(function(){
    positionNav()
  })

  /* NAVIGATION */
  $("nav ul li a").click(function(event){

    anchor = $("[data-section='" + $(this).attr("href") + "']").offset().top

    $("[data-section='nav']").fadeOut(0500, function(){
      $(event.target).addClass("active")
      $("html, body").delay(250).animate(
        {scrollTop: anchor}
        ,1000
        ,'easeInOutExpo'
        ,function(){
          $("[data-section='nav']").css("top", anchor).fadeIn()
        }
      )
    })

    return false;
  })

  // obstacles
  $("#index section#obstacles .obstacle").click(function(event){
    title         = $(this).find("figcaption").text()
    description   = $(this).find("figcaption").data("description")
    image         = "assets/images/obstacles/" + $(this).data("obstacle") + ".png"
    alt           = ""

    $("#index section#obstacles figure").removeClass("active")
    $("#index section#obstacles figure figcaption").removeClass("active")
    $(this).addClass("active")
    $(this).find("figcaption").addClass("active")

    // load obstacle
    $("#obstacles #obstacle").fadeOut(0250, function(){
      $("#obstacles #obstacle img").replaceWith("<img src=" + image + " alt= " + alt + " width=" + $(event.currentTarget).data("width") + " height=" + $(event.currentTarget).data("height") + " />")
      $("#obstacles #obstacle figcaption .heading").html(title)
      $("#obstacles #obstacle figcaption p").html(description)
      $(this).fadeIn()
    })
  })

  // countdown
  countdown = setInterval("countDown()", 1000)

  // submit confirmation
  $("form#enter-form").submit(function(){
    $.colorbox({
      html:"<div><header><h2 class='heading'>Congratulations!</h2></header><p>Your entry has successfully been submitted, we'll contact you after we have made our selection!</p></div>"
      ,close: "x"
      ,transition: "fade"
      ,speed: 0250
      ,opacity: 0.50
      ,width: "640px"
      ,height: "250px"
      ,onOpen: function(){$("#colorbox").css("visibility", "hidden")}
      ,onComplete: function(){$("#colorbox").css("visibility", "visible")}
    })

    return false; 
  })

})