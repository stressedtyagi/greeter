var myGreet = $G('Divyanshu','Tyagi','hi');
$('#login').click(function() {
    // Creating new object using our greeter framework
    var loginGrt = $G('Divyanshu','Tyagi');
    // hide login div
    $('#logindiv').hide();
    // Using Chainable funtionality we added to greeter framework
    loginGrt.setLang($('#lang').val()).HTMLGreeting('#greeting',true).log();
})