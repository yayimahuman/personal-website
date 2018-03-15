function round(a){
    return Math.round(a);
}
function max(a, b){
    return Math.max(a,b);
}
function min(a, b){
    return Math.min(a,b);
}

//define projects here
var projects = [
    [
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
    ],
    [
        {
            "id":"presserLaw",
            "title":"",
            "description":"Lorem ipsum dolor",
            "img":"img/presser-logo.png",
            "bgColor":"#8E1232",
            "titleColor":"#fff"
        }
    ]
];
var cards = [];
var animationTime = 600;
var vh, vw, dw, cardLength, collapsed;
State = function(){
    this.state = "";
    this.val = function(){
        return this.state;
    };
    this.setState = function(s){
        switch(s){
            case "collapsed":
                this.state = "collapsed";
                break;
            case "expanding":
                this.state = "expanding";
                break;
            case "expanded":
                this.state = "expanded";
                break;
            case "collapsing":
                this.state = "collapsing";
                break;
            default:
                alert("Invalid state");
                return false;
        }
        console.log(this.val());
        return true;
    };
};

$( document ).ready(function() {
    console.log("ready!");

    //calculates dimensions of viewport and card container (id: "deck")
    calcWindowProperties = function(){
        vh = $(window).height();
        vw = $(window).width();
        dw = $("#deck-projects").width();
        console.log("Window properties: {viewport height: " + vh + ", viewport width: " + vw + ", deck width: " + dw + "}")
    }
    //recalculates stuff on window resize
    recalculate = function(){
        //recalculate window dimensions
        calcWindowProperties();
        cardLength = round(cards.terabyteTundra.wrapperSelector.width());
        for (var key in cards){
            var c = cards[key];

            //reset positioning and set card length
            collapseCard(c, true);
            c.wrapperSelector.height(c.wrapperSelector.width());
            c.selector.width(cardLength);
            c.selector.height(cardLength);
        }
    };
    //creates a single card component on page
    initCard = function(c, deck){
        //create wrapper
        console.log("creating wrapper: " + c.id);
        var markup = '<div id="' + c.id + '-wrapper" class="card-wrapper col-sm-6 col-md-4"></div>';
        deck.append(markup);

        //create card
        console.log("creating card: " + c.id);
        c.wrapperSelector = $("#" + c.id + "-wrapper");
        c.wrapperSelector.height(c.wrapperSelector.width());
        cardLength = round(c.wrapperSelector.width());//accounts for padding
        markup = "<div id='" + c.id + "' class='card card-expand'><div class='card-cover'><i id='" + c.id + "-times' class='fas fa-times'></i><div class='container'><div class='vertical-centre'><div id='" + c.id + "-img-container' class='img-container'><img id='" + c.id + "-img' /></div><h2 id='" + c.id + "-title' class='card-txt-title'></h2></div></div></div><div id='" + c.id + "-txt' class='card-txt hide'><p id='" + c.id + "-desc' class='card-txt-desc'></p></div></div>";
        c.wrapperSelector.html(markup);

        //set card selectors and properties as variables for later use
        console.log("setting card properties: " + c.id);
        c.selector = $("#" + c.id);
        c.coverSelector = $("#" + c.id + " > div.card-cover");
        c.timesSelector = $("#" + c.id + "-times");
        c.imgContainerSelector = $("#" + c.id + "-img-container");
        c.imgSelector = $("#" + c.id + "-img");
        c.titleSelector = $("#" + c.id + "-title");
        c.textSelector = $("#" + c.id + "-txt");
        c.descSelector = $("#" + c.id + "-desc");

        c.selector.width(cardLength);
        c.selector.height(cardLength);
        c.coverSelector.css({"background-color":c.bgColor, "color":c.titleColor});
        c.imgSelector.attr("src", c.img);
        c.titleSelector.html(c.title).css("color",c.titleColor);
        c.descSelector.html(c.description);

        //reset positioning to enable css transitions
        c.state = new State();
        c.state.setState("collapsed");
        collapseCard(c);
    };
    //initialize projects in array
    initProjects = function(){
        //initialize all project and work cards
        projects[0].forEach(function(project){
            console.log("initializing card: " + project.id);
            initCard(project, $("#deck-projects"));

            console.log("pushing card: " + project.id + " into array");
            cards[project.id] = project;
        });
        projects[1].forEach(function(project){
            console.log("initializing card: " + project.id);
            initCard(project, $("#deck-work"));

            console.log("pushing card: " + project.id + " into array");
            cards[project.id] = project;
        });
        console.log("initialization complete.");
    };
    //calculate style attributes required for exanding card
    calcCardPosition = function(c){//c is automatically passed as reference

        //distance from top, left
        var scrollTop = $(window).scrollTop();
        var offset = c.selector.offset();
        c.top = offset.top - scrollTop;
        c.left = offset.left;
        c.minHeight = 350;
        c.borderRadius = "10px";

        //prep text selector for height calculation
        c.textSelector.removeClass("hide");

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
            c.borderRadius = "0px";
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
            c.height = vh - 100;
            c.textSelector.css({"width":c.width});
            c.height = min(c.height, c.minHeight + c.textSelector.height());

            var lrMargin, tbMargin;
            lrMargin = vw - c.width;
            tbMargin = vh - c.height;
            c.marginLeft = lrMargin/2 - c.left;
            c.marginTop = tbMargin/2 - c.top;
            if (vh < c.minHeight){
                c.height = vh;
                c.marginTop = -c.top;
                c.borderRadius = "0px";
            }


            // if (vh - 100 < c.minHeight){
            //     c.height = vh - 50;//bottom flush with window edge
            //     //set sharp corners
            // }
        }
    };
    expandCard = function(c){
        //only expand if all cards are collapsed
        var allCollapsed = true;
        if (c.state.val() != "collapsed"){
            allCollapsed = false;
        }
        else if (allCollapsed){
            for (var key in cards){
                if (cards[key].state.val() != "collapsed"){
                    allCollapsed = false;
                }
            }
        }

        if (allCollapsed){
            disableScroll();
            //listen for click outside card (on darkened div or on card wrapper)
            $(document).on("click", function(event){
                if ($(event.target).is(c.timesSelector) || $(event.target).is("div#darken") || $(event.target).is(c.wrapperSelector)){
                    console.log("clicked outside of card");
                    collapseCard(c);
                }
            });

            c.state.setState("expanding");

            //scale on hover, zoom back to full size before/while expanding
            c.timesSelector.fadeIn();
            c.wrapperSelector.css("z-index", 2);
            $("#darken").fadeIn().css("z-index", 1);

            //this actually does one edit: it removes the "hide" class from text
            calcCardPosition(c);

            //set card position properties (margin-top, margin-left, width, height)
            c.selector.css({"margin-top" : c.marginTop, "margin-left" : c.marginLeft, "height" : c.height, "width" : c.width, "border-radius": c.borderRadius});
            c.coverSelector.css({"height": c.minHeight, "border-radius": c.borderRadius + " " + c.borderRadius + " 0px 0px"});

            //set state as expanded when animation expires
            setTimeout(function(){
                c.state.setState("expanded");
            }, animationTime);
        }
        else{
            console.log("Error expanding card");
        }

    };
    collapseCard = function(c, resize = false){
        console.log("resetting card position: " + c.id);

        //expanded and collapsed can both transition to collapsed
        //also, resizing + expanding can transition to collapsed
        if (c.state.val() == "collapsed" || c.state.val() == "expanded" || (resize)){
            c.state.setState("collapsing");
            //remove dark background and hide times
            $("#darken").fadeOut();
            c.timesSelector.fadeOut();

            //reset element properties
            c.textSelector.addClass("hide");
            c.selector.css({"margin-top" : 0, "margin-left" : 0, "height" : c.selector.height(), "width" : c.selector.width(),"border-radius": "10px"});
            c.selector.width(cardLength);
            c.selector.height(cardLength);
            c.coverSelector.css({"height":cardLength, "border-radius": "10px"});

            setTimeout(function(){
                $("#darken").css("z-index", -1);
                c.wrapperSelector.css("z-index", 0);
                enableScroll();
                c.state.setState("collapsed");
            }, animationTime);
        }

    };
    disableScroll = function(){
        var top = $(window).scrollTop();
        var left = $(window).scrollLeft()
        $('body').css('overflow', 'hidden');
        $(window).scroll(function(){
            $(this).scrollTop(top).scrollLeft(left);
        });
    }
    enableScroll = function(){
        $('body').css('overflow', 'auto');
        $(window).unbind('scroll');
    }



    //run when page loads
    calcWindowProperties();
    console.log("initializing projects...");
    initProjects();


    //add a click listener
    $(".card").on("click", function(){
        console.log(this.id + " card clicked.");
        var card = cards[this.id];
        expandCard(card);
    });







    //on resize
    $(window).on("resize", function(){
        console.log("ugh why would you resize this just made me need to code so much more shit");

        //disable animations?
        recalculate();

    });

    // $(window).scroll(function(){
    //     console.log('scroll top: ' + $(window).scrollTop());
    //         //window.requestAnimationFrame(function);
    // });

});
