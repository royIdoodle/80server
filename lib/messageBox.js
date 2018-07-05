function success(data) {
    return {
        timestamp: Date.now(),
        success: true,
        data
    }
}

function error(message, code = 1001) {
    let msg = (typeof message === 'object')?JSON.stringify(message):message;
    return {
        timestamp: Date.now(),
        success: false,
        message: msg,
        code
    }
}

module.exports = {
    success,
    error
};