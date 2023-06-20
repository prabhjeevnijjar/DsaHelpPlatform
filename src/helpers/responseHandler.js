module.exports= {
     responseHandler (err, req, res, next) {
    const {statusCode, errCode, errMsg, errStatus, data} = err;

    res.status(statusCode).json({
        code: errCode,
        success: errStatus,
        message: errMsg,
        status: errStatus,
        data
    })
}
}