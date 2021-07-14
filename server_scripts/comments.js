module.exports = function() {
    this.get = async function(dbo, limit, skip) {
        skip = (typeof(skip) === 'undefined') ? 0 : skip;
        let promiseObj = await dbo.collection("comments").find()
                                                         .sort({date: -1})
                                                         .skip(skip)
                                                         .limit(limit)
                                                         .toArray();
        return promiseObj;
    }
}
