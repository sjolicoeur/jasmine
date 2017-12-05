getJasmineRequireObj().Truthy = function(j$) {

    function Truthy() {}
    // - thruthy
    //     - if (true)
    //     - if ({})
    //     - if ([])
    //     - if (42)
    //     - if ("foo")
    //     - if (new Date())
    //     - if (-42)
    //     - if (3.14)
    //     - if (-3.14)
    //     - if (Infinity)
    //     - if (-Infinity)
    Truthy.prototype.asymmetricMatch = function(other) {
        if (other) {
            return true;
        }

        return false;
    };

    Truthy.prototype.jasmineToString = function() {
        return '<jasmine.truthy>';
    };

    return Truthy;
};
