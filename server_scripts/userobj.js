module.exports = function(obj) {
    this.username = obj.username;
    this.password = obj.password;
    this.title = obj.title;
    this.comments = obj.comments;

    this.post = async function(comment, dbo) {
        const prm_users = dbo.collection("users").updateOne(
            {username: this.username},
            { $push: { comments: comment } }
            );
        const prm_comments = dbo.collection("comments").insertOne(comment);
        return await Promise.all([prm_users, prm_comments]);
    }
}