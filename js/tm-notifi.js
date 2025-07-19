jQuery(document).ready(function($) {
    var notifications = $('.notification-tm');
    var currentIndex = 0;

    function showNotification(index) {
        notifications.hide();
        notifications.eq(index).show();
        updateArrows();
    }

    function updateArrows() {
        if (notifications.length > 1) {
            $('.prev-notification').toggle(currentIndex > 0);
            $('.next-notification').toggle(currentIndex < notifications.length - 1);
        }
    }

    function updateNotificationCount() {
        notifications = $('.notification-tm');
        if (notifications.length === 0) {
            $('#notification-overlay').fadeOut();
        } else {
            if (currentIndex >= notifications.length) {
                currentIndex = notifications.length - 1;
            }
            showNotification(currentIndex);
        }
    }

    if (notifications.length > 0) {
        showNotification(currentIndex);
        $('#notification-overlay').fadeIn();
    }

    $('body').on('click', '.prev-notification', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showNotification(currentIndex);
        }
    });

    $('body').on('click', '.next-notification', function() {
        if (currentIndex < notifications.length - 1) {
            currentIndex++;
            showNotification(currentIndex);
        }
    });

    $('body').on('click', '.mark-as-read', function() {
        var notificationId = $(this).data('id');

        $.ajax({
            url: Ajax_NotifiTM.ajaxurl,
            type: 'POST',
            data: {
                action: 'mark_notification_as_read',
                notification_id: notificationId
            },
            success: function(response) {
                if (response.success) {
                    createToast({
                        text: "Đánh dấu đã xem thành công.",
                        type: "success"
                    });
                    $('#notification-' + notificationId).remove();
                    updateNotificationCount();
                } else {
                    createToast({
                        text: response.data.message,
                        type: "error"
                    });
                }
            },
            error: function() {
                createToast({
                    text: "Đã xảy ra lỗi, vui lòng thử lại.",
                    type: "error"
                });
            }
        });
    });

    $('body').on('click', '.close-modal', function() {
        $('#notification-overlay').fadeOut();
    });

    if (notifications.length > 0) {
        showNotification(currentIndex);
    }
});