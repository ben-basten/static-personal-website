var home = false;

function photoView() {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", function (e) {
        //document.onkeydown = function(e) {
        // "I" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            disabledEvent(e);
        }
        // "J" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            disabledEvent(e);
        }
        // "S" key + macOS
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            disabledEvent(e);
        }
        // "U" key
        if (e.ctrlKey && e.keyCode == 85) {
            disabledEvent(e);
        }
        // "F12" key
        if (event.keyCode == 123) {
            disabledEvent(e);
        }
    }, false);
    function disabledEvent(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
        e.preventDefault();
        return false;
    }
};

function highlightIcon(id) {
    var image;
    if (id == 1) {
        image = document.getElementById("insta");
        image.setAttribute("src", "img/icons/instagram-small-color.png");
    } else if (id == 2) {
        image = document.getElementById("youtube");
        image.setAttribute("src", "img/icons/youtube-small-color.png");
    } else if (id == 3) {
        image = document.getElementById("personalLogo");
        image.setAttribute("src", "img/icons/logo-small-color.png");
    } else if (id == 4) {
        image = document.getElementById("linkedin");
        image.setAttribute("src", "img/icons/linkedin-small-color.png");
    } else if (id == 5) {
        image = document.getElementById("github");
        image.setAttribute("src", "img/icons/github-small-color.png");
    }
}
function flattenIcon() {
    var insta = document.getElementById("insta");
    var youtube = document.getElementById("youtube");
    var logo = document.getElementById("personalLogo");
    var linkedin = document.getElementById("linkedin");
    var github = document.getElementById("github");
    if (home == true) {
        logo.setAttribute("src", "img/icons/logo-small-white.png");
        insta.setAttribute("src", "img/icons/instagram-small-white.png");
        youtube.setAttribute("src", "img/icons/youtube-small-white.png");
    } else {
        logo.setAttribute("src", "img/icons/logo-small.png");
        if (insta) {
            insta.setAttribute("src", "img/icons/instagram-small.png");
        }
        if (youtube) {
            youtube.setAttribute("src", "img/icons/youtube-small.png");
        }
        github.setAttribute("src", "img/icons/github-small.png");
        if(linkedin){
            linkedin.setAttribute("src", "img/icons/linkedin-small.png");
        }
    }
}

function changeColor() {
    home = true;
    var image = document.getElementById("personalLogo");
    image.setAttribute("src", "img/icons/logo-small-white.png");
    image = document.getElementById("youtube");
    image.setAttribute("src", "img/icons/youtube-small-white.png");
    image = document.getElementById("insta");
    image.setAttribute("src", "img/icons/instagram-small-white.png");
}

/* SLIDESHOW */

var index = 0;
var oldIndex = null;
var isVideo = false;
var hasCaption = false;
function setIndex(n) {
    oldIndex = index;
    index = n;
    changeSlide();
}
function incrementSlide() {
    oldIndex = index;
    index += 1;
    changeSlide();
}
function decrementSlide() {
    oldIndex = index;
    index -= 1;
    changeSlide();
}

function changeSlide() {
    var images = document.getElementsByClassName("slide");
    var imageContainers = document.getElementsByClassName("thumbnail");
    var $main = $("#bigPicture")
    var slideCountDisplay = document.getElementById("slideCount");
    if (index > images.length - 1) {
        index = 0;
    }
    if (index < 0) {
        index = images.length - 1;
    }
    if (isVideo) {
        // main.setAttribute("src", images[index].getAttribute("alt"));
        $main.attr("src", images[index].getAttribute("alt"));
        images[index].setAttribute("style", "border: 6px solid white");
        images[oldIndex].setAttribute("style", "border: 6px solid #d1bfa7");
    } else {
        slideCountDisplay.innerHTML = (index + 1) + " of " + images.length;
        // main.setAttribute("src", images[index].getAttribute("src"));
        var $pic = $(".slide")
        var width = $pic.eq(index).width();
        var height = $pic.eq(index).height();
        if(height > width) {
            $main
            .css({
                'width': 'auto',
                'height': '100%'
            }).attr("src", images[index].getAttribute("src"));
        } else {
            $main
            .css({
                'width': '100%',
                'height': 'auto'
            }).attr("src", images[index].getAttribute("src"));
        }
        imageContainers[index].setAttribute("style", "border: 6px solid white");
        imageContainers[oldIndex].setAttribute("style", "border: 6px solid #d1bfa7");
        if (hasCaption) {
            var captions = document.getElementsByClassName("caption");
            captions[index].style.display = "block";
            captions[oldIndex].style.display = "none";
        }
        // var size = images[index].getAttribute("alt");
        // main.setAttribute("class", size);
    }
}
function highlightThumbnail() {
    if (isVideo) {
        var images = document.getElementsByClassName("slide");
        images[index].setAttribute("style", "border: 6px solid white");
    } else {
        var imageContainers = document.getElementsByClassName("thumbnail");
        imageContainers[index].setAttribute("style", "border: 6px solid white");
    }
}
// function checkEntry() {
//     inputs = document.getElementsByClassName("input");
//     var error = false;
//     for (var i = 0; i < inputs.length; i++) {
//         if (inputs[i].value.trim() == "") {
//             inputs[i].style.border = "1px solid red";
//             error = true;
//         } else {
//             inputs[i].style.border = "1px solid black";
//         }
//     }
//     if (error == false) {
//         submit();
//     }
// }

function setVideo() {
    isVideo = true;
}

function setCaption(){
    hasCaption = true;
}

function setSlideCount() {
    var thumbnails = document.getElementsByClassName("thumbnail");
    var countDisplay = document.getElementById("slideCount");
    countDisplay.innerHTML = "1 of " + thumbnails.length;
}

/* END SLIDESHOW */

function openMenu() {
    var x = document.getElementById("navBar");
    var hamburger = document.getElementById("burgerIcon");
    if (x.className === "navigation") {
        x.className += " responsive";
        hamburger.setAttribute("src", "img/icons/exitburger.png")
    } else {
        x.className = "navigation";
        hamburger.setAttribute("src", "img/icons/hamburger.png")
    }
}

function moveElements() {
    var size = document.body.clientWidth;
    // var status = document.getElementById("poop");
    // status.innerHTML = size;
    var empty = document.getElementById("empty");
    if (size <= 719) {
        if (empty.innerHTML == '') {
            var toSwap = document.getElementById("swap");
            var content = toSwap.innerHTML;
            toSwap.innerHTML = '';
            empty.innerHTML = content;
        }
    } else {
        if (empty.innerHTML != '') {
            var toSwap = empty.innerHTML;
            empty.innerHTML = '';
            var newLocation = document.getElementById("swap");
            newLocation.innerHTML = toSwap;
        }
    }
}