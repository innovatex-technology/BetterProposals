const Comment = require('../model/CommentSchema.js');


//Add Comment to Post
const addComment = async (req, res) => {
    try {
        let response;
        let cmmBody = req.body;
        if (cmmBody.blog_id) {
            cmmBody["created_date"] = new Date();
            cmmBody["last_updated_date"] = new Date();
            let comment = new Comment(cmmBody);
            let result = await comment.save();
            result.toObject();
            response = {
                "message": "Comment Saved Successfully",
                data: result
            }
        }
        else {
            response = {
                "message": "Required  Field Misssing: Blog Id",
                data: req.body
            }
        }
        res.send(response);

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    addComment,
}