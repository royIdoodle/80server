function success(data) {
    return {
        timestamp: Date.now(),
        success: true,
        data
    }
}

function error(message, code = 1001) {
    return {
        timestamp: Date.now(),
        success: false,
        message: message,
        code
    }
}

module.exports = {
    success,
    error
};