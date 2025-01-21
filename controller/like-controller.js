const Like = require('../model/LikeSchema.js');


//Like Post
const likePost = async (req, resp) => {
    try{
        let response;
    let likeBody = req.body;
    if (likeBody.blog_id) {
        let oldCount = await Like.findOne({ "blog_id": likeBody.blog_id });
        if (oldCount) {
            let newValue = {
                last_updated_date: new Date(),
                like_count: oldCount.like_count + 1
            }
            let result = await Like.updateOne({ "blog_id": likeBody.blog_id }, newValue);
            result =  await Like.findOne({ "blog_id": likeBody.blog_id });
            response = {
                "message": "Like Saved Successfully",
                data: result
            }
        }
        else {
            likeBody["created_date"] = new Date();
            likeBody["last_updated_date"] = new Date();
            likeBody["like_count"]=1;
            let like = new Like(likeBody);
            let result = await like.save();
            result.toObject();
            response = {
                "message": "Like Saved Successfully",
                data: result
            }
        }
    }
    else {
        response = {
            "message": "Required  Field Misssing: Blog Id",
            data: req.body
        }
    }
    resp.send(response);
    }catch(err){ 
        resp.status(500).json({ error: 'Internal Server Error' });
    }
    
}



module.exports = {
    likePost,
}


