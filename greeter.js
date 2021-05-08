(function (global, $) {

    // 'new' and object
    // did this to initialize and declare an object outide our framework
    // without using 'new' keyword
    var greet = function(firstname, lastname, language) {
        return new greet.init(firstname,lastname,language);
    }

    // Hidden in the scope of IIFE
    // all these language features are hidden from outside world
    // since i decalred them within this lexical environment that 
    // are not being retured with the init object
    var supportedLanguages = ['en','es','hi'];
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        hi: 'नमस्ते'
    };
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        hi: 'अभिनंदन'
    };
    // used to log messages on console
    var logMessages = {
        en: 'Logged in',
        es: 'conectada',
        hi: 'लॉग इन'
    };
    

    greet.prototype = {
        fullname: function() {
            return this.firstname + ' ' + this.lastname;
        },

        validate: function () {
            // each object will have its own language
            // if the language the object has is not supported by our database
            // we prompt an error to user/developer
            if (supportedLanguages.indexOf(this.language) == -1) {
                throw "Invalid Language";
            }
        },

        greetings: function () {
            return greetings[this.language] + ', ' + this.firstname + "!";
        },

        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullname();
        },

        greet: function(formal) {
            var msg;
            // if undeified or null it will be coerced to 'false'
            // hense will prompt informal greetings
            if(formal) {
                msg = this.formalGreeting();
            }else {
                msg = this.greetings();
            }
            // will appropriatle log this message to console
            if(console) {
                console.log(msg);
            }
            // 'this' refers to the calling object at execution time 
            // makes the method chainable
            return this;
        },

        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ': ' + this.fullname());
            }
            return this;
        },

        // Changing language of the current object
        setLang: function (lang) {
            this.language = lang;
            this.validate();
            // makes the method chainable
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            // check if jQuery is included or not
            if(!$) {
                throw 'jQurey is not loaded';
            }
            if(!selector) {
                throw 'Missing jQuery selector';
            }

            var msg;
            if(formal) {
                msg = this.formalGreeting();
            }else {
                msg = this.greetings();
            }

            // Updates the innerHtml of the selector that we pass in 
            // jQuery
            $(selector).html(msg);

            // makes the method chainable
            return this;
        }
    };

    // actual object is created here, allow us not to use 'new' while creating an object
    greet.init = function(firstname = '',lastname = '',language = 'en') {
        var self = this;
        self.firstname = firstname;
        self.lastname = lastname;
        self.language = language;

        self.validate();
    }
    // trick used from jQuey now we do not need to use new Keyword
    greet.init.prototype = greet.prototype;

    // attaching our greeter to the globad object, and provided it a shorthand as '$G' for ease
    global.greet = global.$G = greet;

}(window,jQuery));