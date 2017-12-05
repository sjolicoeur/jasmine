getJasmineRequireObj().Falsy = function(j$) {

    function Falsy() {}
    // - falsy
    //     - if (false)
    //     - if (null)
    //     - if (undefined)
    //     - if (0)
    //     - if (NaN)
    //     - if ('')
    //     - if ("")
    //     - if (document.all) [1]
    Falsy.prototype.asymmetricMatch = function(other) {
        if (!other) {
            return true;
        }

        return false;
    };

    Falsy.prototype.jasmineToString = function() {
        return '<jasmine.falsy>';
    };

    return Falsy;
};
