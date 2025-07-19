jQuery(function ($) {
    $('.show-more-tags').click(function () {
        let isShow          = $(this).attr("data-single");
        let dataShowMore    = $(this).attr("data-showmore");
        let dataShowLess    = $(this).attr("data-showless");
        let dataShow        = (isShow == "true")?dataShowLess:dataShowMore;
        $(this).html(dataShow);
        if(isShow == "true") {
            $(this).attr("data-single", "false");
            $("#the_tag_list").addClass("toggled");
        } else {
            $(this).attr("data-single", "true");
            $("#the_tag_list").removeClass("toggled");
        }
    });

    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval              = 1000;  //time in ms, 1 second
    var $input_filter_episode_handle    = $('#keyword-ep');

    //on keyup, start the countdown
    $input_filter_episode_handle.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $input_filter_episode_handle.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    function doneTyping () {
        var keyword = $("#keyword-ep").val();
        if (keyword.trim().length > 0) {
            $('#loading-ep').show();
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    action      : "filter_episode",
                    keyword     : keyword,
                    post_id     : halim_cfg.post_id
                },
            success: function(data) {
                $('#suggestions-ep').show();
                $('#loading-ep').hide();
                if (data.data !== '') {
                    $('#suggestions-ep').html(data.data);
                } else {
                    $('#suggestions-ep').html("Không có kết quả!");
                    // $('#suggestions-ep').hide();
                }
            }
            })
        } else {
            $('#loading-ep').hide();
            $('#suggestions-ep').hide();
        }
    }

    // Custom css list episode
    if($(".halim-episode").length > 0) {
        $(".halim-episode").addClass("col-xs-3 col-sm-2 col-lg-1");
    }

})