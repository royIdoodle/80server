function success(data) {
    return {
        timestamp: Date.now(),
        success: true,
        data
    }
}

function error(message) {
    let msg = (typeof message === 'object')?JSON.stringify(message):message;
    return {
        timestamp: Date.now(),
        success: false,
        message: msg
    }
}

module.exports = {
    success,
    error
};