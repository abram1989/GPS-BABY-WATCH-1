$(document).ready(function () {

    const MAIL_SERVICE_URL = 'http://smartbabywatches.ru/send-feedback.php';
	const URL_MESSAGE_SENT = "http://smartbabywatches.ru/?messagesent=true";

    $('#cd').countdown({
        startTime: '00:07:17:55'
    });

    $('#cnt_0, #cnt_1').hide();
    $('#cnt_3').prev(".cntSeparator").hide();


    $('.bxslider').bxSlider({
        pager: false
    });

	$('#call-me-link-callback').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Заказ обратного звонка");
            $("#call-me-form-main-color").val("------");
        }
    });
	
    $('#call-me-link-q50').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch Q50");
            $("#call-me-form-main-color").val($("#color-q50").val());
        }
    });


    $('#call-me-link-q80').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch Q80");
            $("#call-me-form-main-color").val($("#color-q80").val());
        }
    });

    $('#call-me-link-w9').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch W9");
        }
    });

    $('#call-me-link-w8').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch W8");
        }
    });

    $('#call-me-link-q90').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch Q90");
        }
    });

    $('#call-me-link-g10').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch G10");
        }
    });

    $('#call-me-link-g100').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch G100");
        }
    });
    $('#call-me-link-i8').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch i8 / Q360");
        }
    });

    $('#call-me-link-t58').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch t58");
        }
    });

    $('#call-me-link-x10').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch X10");
        }
    });

    $('#call-me-link-d99').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch D99");
        }
    });

    $('#call-me-link-d100').fancybox({
        beforeShow: function () {
            $("#call-me-form-main-model").val("Smart Baby Watch D100");
        }
    });


    var param = {
        messages: {
            name: '*',
            email: '*'
        },
        errorElement: "div",
        wrapper: "div",
        errorPlacement: function (error, element) {
            error.insertBefore(element);
            error.addClass('error-message');
        }
    };

    

    $("#contact4").validate({
        messages: {
            name: '*',
            email: '*'
        },
        errorElement: "div",
        wrapper: "div",
        errorPlacement: function (error, element) {
            error.insertBefore(element);
            error.addClass('error-message');

        }
    });

    function composePostData(formName, formPhone, formMail, formModel, formColor) {

        var subjectText = "smartbabywatch: новый заказ {model} пользователем {who}!".format({
            model: formModel,
            who: formName
        });

        var messageText = "Новый заказ!\r\nПользователь: {who} \r\nТелефон:{phone}\r\nПочта:{mail}\r\nМодель:{model}\r\nЦвет:{color}".format({
            model: formModel,
            color: formColor,
            who: formName,
            phone: formPhone,
            mail: formMail
        });


        return {
            name: formName,
            phone: formPhone,
            email: formMail,
            address: '',
            subject: subjectText,
            message: messageText
        };
    }


    var formIds = ['#call-me-link-main-up', '#call-me-link-main-2', '#call-me-link-main-3'];
    formIds.forEach(function (formId) {
		$(formId).validate(param);
        $(formId).unbind('click');
        $(formId).click(function () {
			//if (!$(formId).valid()) return;
            var postData = composePostData($(formId + '-name').val(), "---", $(formId + '-email').val(), $(formId + '-model').val(), $(formId + '-color').val());

            $.post(MAIL_SERVICE_URL, postData)
                .done(function () {
                    setTimeout(function () {
                        $('#message-sent-confirmation').bPopup({
                            autoClose: 1500
                        });
                        $(formId + '-name').val('');
                        $(formId + '-email').val('');
						
						setTimeout(function () { window.location.assign(URL_MESSAGE_SENT); }, 1500);
                    }, 1000);
                })
                .fail(function (error) {
                    alert("Сообщение не отправлено!");
                });
        });
    });


    $('#call-me-form-main').unbind('click');
    $('#call-me-form-main').click(function () {
        if (!$("#contact4").valid()) return;

        var postData = composePostData($('#call-me-form-main-name').val(), "---", $('#call-me-form-main-email').val(), $('#call-me-form-main-model').val(), $('#call-me-form-main-color').val());

        $.post(MAIL_SERVICE_URL, postData)
            .done(function () {
                $.fancybox.close();
                setTimeout(function () {
                    $('#message-sent-confirmation').bPopup({
                        autoClose: 1500
                    });
					setTimeout(function () { window.location.assign(URL_MESSAGE_SENT); }, 1500);
                }, 1000);
            })
            .fail(function (error) {
                alert("Сообщение не отправлено!");
            });

    });


    //    $('#call-me-link-main-up').unbind('click');
    //    $('#call-me-link-main-up').click(function () {
    //        
    //            $.post('https://postmail.invotes.com/send',
    //                {
    //                    "access_token": "5ewaj8q70il0fqyos2czivkj",
    //                    "subject": 'Форма заказа',
    //                    "text": "Имя:" + $('#call-me-form-main-up-name').val() + "| Почта:" + $('#call-me-form-main-up-email').val()
    //                })
    //                .done(function () {
    //                    setTimeout(function () {
    //                        $('#message-sent-confirmation').bPopup({
    //                            autoClose: 1500
    //                        });
    //                        $('#call-me-form-main-up-name').val("");
    //                        $('#call-me-form-main-up-email').val("");
    //                    }, 1000);})
    //                .fail(function (error) {alert(error);});
    //
    //    });

});


String.prototype.format = function (placeholders) {
    var s = this;
    for (var propertyName in placeholders) {
        var re = new RegExp('{' + propertyName + '}', 'gm');
        s = s.replace(re, placeholders[propertyName]);
    }
    return s;
};