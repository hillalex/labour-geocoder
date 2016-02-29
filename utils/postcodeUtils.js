exports.normalizePostcode = function(postcode){

    // replace any whitespace
    postcode = postcode.replace(/\s+/g, '');

    // if 7 chars, it's already formatted
    if (postcode.length == 7)
    return postcode;

    // only 6 chars, e.g. sw85pz - add a space
    if(postcode.length == 6)
    return postcode.substring(0,3) + " " + postcode.substring(3,6);

    // only 5 chars, add 2 spaces
    if (postcode.length == 5)
        return postcode.substring(0,2) + "  " + postcode.substring(2,5);

    // fewer than 5 chars, invalid postcode
    return false;

};