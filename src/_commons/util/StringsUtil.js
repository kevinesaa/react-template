

function isEmptyOrNull(value) {
    return value == null || value.length === 0;
}

function isString(value) {
    return typeof value === typeof "";
}

const StringsUtil = {isEmptyOrNull,isString};
export default StringsUtil;