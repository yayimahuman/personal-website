var projects = [
    {
        "id":"terabyteTundra",
        "title":"Terabyte Tundra",
        "description":"Lorem ipsum dolor",
        "img":"img/tt-logo.png",
        "bgColor":"#334668",
        "titleColor":"#fff"
    },
    {
        "id":"howLongToRead",
        "title":"How Long to Read",
        "description":"Lorem ipsum dolor",
        "img":"img/hltr-logo.png",
        "bgColor":"#6AADCC",
        "titleColor":"#000"
    },
    {
        "id":"dataEarth",
        "title":"",
        "description":"Lorem ipsum dolor",
        "img":"img/dataearth-logo.png",
        "bgColor":"#23A8E9",
        "titleColor":"#fff"
    }

];
var cards = [];

function round(a){
    return Math.round(a);
}
function max(a, b){
    return Math.max(a,b);
}
function min(a, b){
    return Math.min(a,b);
}
$( document ).ready(function() {
    console.log("ready!");

    var vh, vw, dw, cardLength;
    //objects go here

    var calcWindowProperties = function(){
        vh = $(window).height();
        vw = $(window).width();
        dw = $("#deck").width();
        console.log("Window properties {viewport height: " + vh + ", viewport width: " + vw + ", deck width: " + dw + "}")
    }

    var initCard = function(c){
        var deck = $("#deck");
        var markup = '<div id="' + c.id + '-wrapper" class="card-wrapper col-md-4" style="transform:translateY(0px)"></div>';
        console.log("creating wrapper within deck");
        deck.append(markup);
        c.wrapperSelector = $("#" + c.id + "-wrapper");


        c.wrapperSelector.height(c.wrapperSelector.width());
        cardLength = round(c.wrapperSelector.width());//accounts for padding
        markup = "<div id='" + c.id + "' class='card card-expand'><div class='card-cover'><div class='container'><div class='vertical-centre'><div id='" + c.id + "-img-container' class='img-container'><img id='" + c.id + "-img' /></div><h2 id='" + c.id + "-title' class='card-txt-title'></h2></div></div></div><div id='" + c.id + "-txt' class='card-txt hide'><p id='" + c.id + "-desc' class='card-txt-desc'></p></div></div>";

        console.log("creating card with length " + cardLength);
        c.wrapperSelector.html(markup);

        //initialize card css


        //set card properties and selectors for later use
        c.selector = $("#" + c.id);
        c.coverSelector = $("#" + c.id+ " > div.card-cover");
        c.imgContainerSelector = $("#" + c.id + "-img-container");
        c.imgSelector = $("#" + c.id + "-img");
        c.titleSelector = $("#" + c.id + "-title");
        c.textSelector = $("#" + c.id + "-txt");
        c.descSelector = $("#" + c.id + "-desc");

        console.log("setting card properties");
        c.selector.width(cardLength);
        c.selector.height(cardLength);
        c.coverSelector.css("background-color",c.bgColor);
        c.imgSelector.attr("src", c.img);
        c.titleSelector.html(c.title).css("color",c.titleColor);
        c.descSelector.html(c.description);

        collapseCard(c);

    }
    var initializeProjects = function(){

        projects.forEach(function(project){
            //place card on page
            console.log("initializing card: " + project.id);
            initCard(project);

            //push into array with id as key
            console.log("pushing card: " + project.id + " into array");
            cards[project.id] = project;
            //be able to edit the element's properties as necessary

        });

        console.log("initialization complete.");
        // console.log(JSON.stringify(cards));

    };





    var calcCardPosition = function(c){//c is an obj and thus is automatically passed by reference

        //distance from top, left
        var scrollTop = $(window).scrollTop();
        var offset = c.selector.offset();
        c.top = offset.top - scrollTop;
        c.left = offset.left;
        c.textSelector.width(c.width);
        c.minHeight = 350;

        /*
        if mobile
        width: 100%
        frame height: 100%;
        picture height: fixed at 350px (potentially lock ratio using css?)
        */
        if (vw < 768){
            c.marginTop = -c.top;
            c.marginLeft = -c.left;
            c.height = vh;
            c.width = vw;
            //c.corners = true;//change to sharp corners!
        }
        /*
        if desktop
        max width: 800px
        min height: 350px
        max height: vh - 100
        picture height: fixed at 350px

        calc necessary width based on screen-> first set text to that width to calculate it
        first set text width
        */
        else{
            c.width = min(800, vw - 100);

            console.log(c.descSelector.height());

            c.height = vh - 100;




            var lrMargin, tbMargin;
            lrMargin = vw - c.width;
            tbMargin = vh - c.height;
            c.marginLeft = lrMargin/2 - c.left;
            c.marginTop = tbMargin/2 - c.top;
            if (vh < c.minHeight){
                c.height = vh;
                c.marginTop = -c.top;
                //set sharp corners
            }

            console.log(c.top);

            // if (vh - 100 < c.minHeight){
            //     c.height = vh - 50;//bottom flush with window edge
            //     //set sharp corners
            // }

        }

    };
    var expandCard = function(c){
        //freeze scroll and actions while card opens

        //scale on hover

        //zoom back to full size while expanding

        c.wrapperSelector.css("z-index",500 );
        cards.dataEarth.wrapperSelector.css("z-index",-1 );
        c.selector.css("z-index",500 );
        c.textSelector.css("z-index",500 );
        // c.selector.addClass("card-expand");

        calcCardPosition(c);

        //set card position properties (margin-top, margin-left, width, height)

        c.selector.css({"margin-top" : c.marginTop, "margin-left" : c.marginLeft, "height" : c.height, "width" : c.width}).delay(1000);
        c.coverSelector.css("height", c.minHeight);
        c.textSelector.removeClass("hide");

    };
    var collapseCard = function(c){
        c.textSelector.addClass("hide");
        c.selector.css({"margin-top" : 0, "margin-left" : 0, "height" : c.selector.height(), "width" : c.selector.width()});
        c.selector.width(cardLength);
        c.selector.height(cardLength);
        c.coverSelector.css("height", cardLength);
        // c.selector.removeClass("card-expand");
        setTimeout(function(){
            c.wrapperSelector.css("z-index",0 );
        },800);

    };

    translateCards = function(){
        var scrollTop = $(window).scrollTop();

            console.log("setting CSS");
            //cards.terabyteTundra.wrapperSelector.css("transform", "translateY("+(-scrollTop)+")");

        //window.requestAnimationFrame(translateCards);
    };


    //run when page loads
    calcWindowProperties();
    console.log("initializing projects...");
    initializeProjects();


    // $(window).scroll(function(){
    //         console.log('scrolling');
    //         window.requestAnimationFrame(translateCards);
    // });

    //add a click listener
    $(".card").on("click", function(){
        //disable scrolling
        //blur or fade background
        console.log(this.id + " card clicked.");
        var card = cards[this.id];
        expandCard(card);

        setTimeout(function(){
            collapseCard(card);
        },4000);

    });






    //on resize
    $(window).on("resize", function(){
        console.log("ugh why would you resize this just makes me need to code so much more shit");


    });


});
