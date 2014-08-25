
// Wait for Apache Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    
	
}

var tottyApp = function(){}

tottyApp.prototype = function() {
    var _flightForCheckin = null,
    _flightForDetails=null,
    _ffNum = null, 
    _customerData = null,
    _login = false,
    
    run = function(){
        var that = this;

        $('#home').on('pagebeforecreate',$.proxy(_initHome,that));

    },
    

    
    _initHome = function(){
        if (!_login) {
	    	$.mobile.changePage("#logon", { transition: "flip" });


            recalc_total();

            $(".action").on("click", function() {
                // button clicked on
                var obj = $(this);

                // container that holds current values
                var parent = $("#score_"+obj.data("counter"));

                // where current sum is displayed
                var counter = $("#count_"+obj.data("counter")).find(".ui-btn-text");

                // increment or decrement sum
                var sum = Math.max(0, parseFloat(parent.data("count")) + parseFloat(obj.data("action")));

                // update container
                parent.data("count", sum);

                // update display
                counter.html(String(sum));

                recalc_total();
            });

            $("[name=potential]").on("slidestop", function(event) {
                console.log("temp value stop at " + $(this).val() );
            });




            $( "#potential" ).bind( "change", function(event, ui) {
                // note that contrary to documentation type="slider" data-type="range" in order for event to be triggered
                var potential = parseInt($(this).val()) ;
                var num_scores = potential / 10;
                $("#num_scores").html(num_scores);

                recalc_total();
            });

            $("#clear").on("click", function(e){

                // zero sums and values
                $(".score_widget").each(function(){
                    $(this).data("count", "0");
                });

               $(".countervalue").each(function() {
                    $(this).find(".ui-btn-text").html(0);
                });



                recalc_total();
            });

            $('[name="penalties"]').on('change', function(){
                var penalties = this.value;
                $("#num_penalties").data("value", penalties);
                recalc_total();
            });

            function recalc_total() {


                // updating potential here as can't get slider event to work
                var potential = parseInt($("#potential").val()) ;
                var num_scores = potential / 10;
                $("#num_scores").html(num_scores);

                var total=0;
                var count=0;
                var num_scores = parseInt($("#num_scores").html());
                var penalties = parseInt($("#num_penalties").data("value"));

                $(".score_widget").each(function(i,v){
                    total = total + parseFloat($(this).data("count")) * parseFloat($(this).data("multiplier"));

                    // ignore half marks in counting how many scores
                    if ($(this).attr("id") != "score_half") {
                    count = count +  parseInt($(this).data("count"));
                    }
                });
                $("#totalscore").html(total);
                $("#score_count").html(count);

                if (count == num_scores) {
                    $("#scores").addClass("good_score");
                    $("#scores").removeClass("bad_score");
                } else {
                    $("#scores").removeClass("good_score");
                    $("#scores").addClass("bad_score");
                }

                var score = total - penalties;
                $("#total").html(score);
                $("#percentage").html( (score / potential * 100.0).toFixed(2) );
            }
	    }
    };
    


    
    return {
        run:run
    };
}();