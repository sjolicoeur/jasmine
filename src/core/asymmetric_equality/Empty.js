getJasmineRequireObj().Empty = function (j$) {

    function Empty() {
    }

    // - empty
    //     - {}
    //     - []
    Empty.prototype.asymmetricMatch = function (other) {
        if (typeof other === 'string') {
            return other.length === 0;
        }

        if (other instanceof Array) {
            return other.length === 0;
        }
        if (other instanceof Object) {
            return Object.keys(other).length === 0;
        }
        if (other instanceof Map) {
            return Object.keys(other).length === 0;
        }
        return false;
    };

    Empty.prototype.jasmineToString = function () {
        return '<jasmine.truthy>';
    };

    return Empty;
};
