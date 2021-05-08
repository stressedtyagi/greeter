(function (global, $) {
    var greet = function(firstname, lastname, language) {
        return new greet.init(firstname,lastname,language);
    }

    greet.prototype = {
        welcome : "Hello to all"
    };

    greet.init = function(firstname = '',lastname = '',language = 'en') {
        var self = this;
        self.firstname = firstname;
        self.lastname = lastname;
        self.language = language;
    }

    greet.init.prototype = greet.prototype;

    global.greet = global.$G = greet;

}(window,jQuery));