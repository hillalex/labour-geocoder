exports.normalizePostcode = function(postcode){

    // replace any whitespace
    postcode = "\"" + postcode.replace(/\s+/g, '').toUpperCase() + "\"";

    // if 7 chars, it's already formatted
    if (postcode.length == 9)
    return postcode;

    // only 6 chars, e.g. sw85pz - add a space
    if(postcode.length == 8)
    return postcode.substring(0,4) + " " + postcode.substring(4,8);

    // only 5 chars, add 2 spaces
    if (postcode.length == 7)
        return postcode.substring(0,3) + "  " + postcode.substring(3,7);

    // fewer than 5 chars, invalid postcode
    return false;

};