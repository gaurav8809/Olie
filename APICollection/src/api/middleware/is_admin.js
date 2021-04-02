module.exports = async function(req, res, next){
    if(! req.user.isAdmin){
        return res.status(403).send('forbidden!');
    }
    return next();
}
