const { ObjectId } = require('mongodb');
const Blog = require('../model/BlogSchema.js');
const Comment = require('../model/CommentSchema.js');
const Like = require('../model/LikeSchema.js');
const UserSchema = require('../model/UserSchema.js');
const utility = require('../model/UtilityDetails.js')

//env properties
const dotenv = require('dotenv');
dotenv.config();
const default_image = process.env.DEFAUL_IMAGE_C_KEY || "no_image_found"
const default_jre_server_utility = process.env.SERVER_PATH_UTILITY || "jre_base_server_path"

//Save Blog API
const saveBlog = async (req, resp) => {
    try {
        console.log("post blog called")
        let response;
        let blogBody = req.body;

        // Update Case
        if (blogBody?._id) {
            blogBody["last_updated_date"] = new Date();
            let result = await Blog.findOne({ _id: blogBody._id });
            if(!result)
                return resp.status(400).json({ message: "BLog not found for Update" })
            if (blogBody?.published)
            {
                blogBody["published_date"] = new Date();
                if (!blogBody?.blog_details) {
                    if (!result.blog_details)
                        return resp.status(400).json({ message: "Blog Details cannot be empty, Please add in Edit Mode" })
                    else if (result.blog_details.length <= 200)
                        return resp.status(400).json({ message: "Blog Details should be at least 200 characters, Please add in Edit Mode" })
                }
            }
               
            result = await Blog.updateOne({ _id: blogBody._id }, blogBody);
            response = {
                message: "Blog Updated Successfullly",
                data: result
            }
            return resp.status(200).json(response)
        }
        // Insert Case
        else if (!blogBody?._id && blogBody.owner_id) {
            blogBody["created_date"] = new Date();
            blogBody["last_updated_date"] = new Date();
            const user = UserSchema.findOne({ _id: blogBody.owner_id }, "name")
            if (user)
                blogBody["createby"] = user?.name
            let blog = new Blog(blogBody);
            let result = await blog.save();
            result.toObject();
            response = {
                "message": "Blog Successfully Saved",
                data: result
            }
            resp.status(200).json(response)
        }
        else {
            response = {
                "message": "Failed, Owner Id Required",
                date: null
            }
            resp.status(400).json(response)
        }
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }

}




//get Blogs Counts
const getBlogsCountsByCategory = async (req, resp) => {
    try {
        const query = [
            {
              "$match": {
                "category": { "$exists": true, "$ne": null },
                "$expr": { "$gt": [{ "$size": "$category" }, 0] }
              }
            },
            {
              "$group": {
                "_id": "$category",
                "count": { "$sum": 1 }
              }
            }
          ];
        const result = await Blog.aggregate(query)
        const hashTagquery = [
            {
              $match: {
                tag_list: { $exists: true, $ne: null },
              },
            },
            {
              $sort: {
                _id: -1,
              },
            },
            {
              $addFields: {
                tags: { $split: ["$tag_list", "#"]},
              },
            },
            {
              $unwind: "$tags",
            },
            {
              $match: {
                tags: { $ne: "" },
              },
            },
            {
              $group: {
                _id: null,
                unique_tags: { $addToSet: "$tags" },
              },
            },
            {
              $project: {
                _id: 0,
                tag_list: {
                  $map: {
                    input: "$unique_tags",
                    as: "tag",
                    in: { $concat: ["#", "$$tag"] },
                  },
                },
              },
            },
            {
              $facet: {
                tag_list: [
                  { $limit: 15 },
                ]
              },
            },
          ]
        const tagResult = await Blog.aggregate(hashTagquery)
        return resp.status(200).json({
            message: "Data Fetch Successfully", data: {
                blogCategoryCount: result,
                LatesthastTags: tagResult[0]?.tag_list[0]?.tag_list || []
            }
        })
    }
    catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }

}

//Blog Searching API
const searchingBlogs = async (req, resp) => {
    const searchString = req.query.searchString;
    console.log(searchString, "search")
    if (!searchString || searchString.length < 3)
        return resp.status(400).json({ message: "Missing String or Invalid Search String" })
    const query = [
        {
            $match: {
                $or: [
                    {
                        blog_header: {
                            $regex: searchString,
                            $options: "i",
                        },
                    },
                    {
                        category: {
                            $regex: searchString,
                            $options: "i",
                        },
                    },
                    {
                        description: {
                            $regex: searchString,
                            $options: "i",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                blog_header: 1,
                category: 1,
                description: 1,
                created_date: 1,
            },
        },
        {
            $sort: { created_date: -1 },
        },
        {
            $limit: 10,
        }
    ]
    try {
        const result = await Blog.aggregate(query);
        return resp.status(200).json({ message: "Data Fetch Successfully", data: result })
    }
    catch (error) {
        console.error(err)
        return resp.status(500).json({ error: "Internal Server Error" })
    }
}

//Find All Blogs API
const getAllBlog = async (req, resp) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const pagename = req.query.pagename || "ALL";
    const owner_id = req.query.owner_id
    const tagSearch = req.query.owner_id || undefined
    const category = req.query.category || undefined
    const tag_list = req.query.tag_list || undefined

    const skip = (currentPage - 1) * pageSize;
    try {
        //filter
        let filter = { is_final: true, is_deleted: false }
        if(category)
            filter["category"] = category;
        if(tag_list)
            filter["tag_list"] = { $regex: tag_list, $options: "i" }

        if (tagSearch && (tagSearch.startsWith("#") || tagSearch.startsWith("@")))
            filter["tag_list"] = tagSearch;

        if (pagename === "MyBlog") {
            filter["owner_id"] = new ObjectId(owner_id)
        }
        else{
            filter.published = true
        }

        if (pagename === "MySave") {
            filter = { is_final: false, owner_id: new ObjectId(owner_id), published: false, is_deleted: false }
        }
        if (pagename === "REVIEW") {
            filter = { is_final: true, published: false, is_deleted: false, reviewed_submitted :true }
        }

        //query
        let query = [
            {
                $match: filter
            },
            {
                $sort: { _id: -1 }
            },
            {
                $lookup: {
                    from: "files",
                    localField: "_id",
                    foreignField: "blog_id",
                    as: "files",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner_id",
                    foreignField: "_id",
                    as: "users",
                },
            },
            {
                $project: {
                    _id: 1,
                    owner_id: 1,
                    published_date: 1,
                    is_final: 1,
                    createby: 1,
                    is_deleted:1,
                    created_date: 1,
                    published: 1,
                    tag_list: 1,
                    description: 1,
                    blog_header: 1,
                    category: 1,
                    reviewed_by:1,
                    reviewed:1,
                    reviewed_submitted:1,
                    files: {
                        $map: {
                            input: "$files",
                            as: "file",
                            in: {
                                _id: "$$file._id",
                                c_key: "$$file.c_key",
                                blog_id: "$$file.blog_id",
                            },
                        },
                    },
                    owner: {
                        $first: {
                            $map: {
                                input: "$users",
                                as: "user",
                                in: {
                                    _id: "$$user._id",
                                    name: "$$user.name",
                                },
                            }
                        },
                    },
                },
            },
            {
                $facet: {
                    paginatedData: [
                        { $skip: skip },
                        { $limit: pageSize },
                    ],
                    totalCount: [
                        { $match: filter },
                        { $count: "total" },
                    ],
                },
            },
        ];

        let result = await Blog.aggregate(query);
        let base_path;
        if (result.length > 0) {
            const utilityData = await utility.findOne({ c_key: default_jre_server_utility });
            if (utilityData) {
                base_path = utilityData?.data_source?.server_path + utilityData?.data_source?.image_path
            }
            result = result.map((element) => {
                return {
                    ...element,
                    'base_path': base_path
                }
            });
        }
        let response = {
            "message": "Blog Fetch Successfully",
            data: result[0]
        }
        resp.status(200).json(response);
    } catch (err) {
        console.log(err)
        resp.status(500).json({ error: 'Internal Server Error' });
    }

}


//Find All Blogs API
const getBlogById = async (req, resp) => {
    try {
        let response;
        const blog_id = req.params.blog_id;
        let objectIdFromString;

        try {
            objectIdFromString = new ObjectId(blog_id);
        }
        catch (err) {
            console.error(err)
            return resp.status(400).json({ message: "Missing Required Parameters or Invalid Parameter" })
        }

        const query = [
            {
                "$match": {
                    "_id": objectIdFromString
                }
            },
            {
                $lookup: {
                  from: "likes",
                  localField: "_id",
                  foreignField: "blog_id",
                  as: "likes",
                },
              },
              {
                $lookup: {
                  from: "users",
                  localField: "owner_id",
                  foreignField: "_id",
                  as: "users",
                },
              },
              {
                $addFields: {
                  likes: { $arrayElemAt: ["$likes", 0] },
                  users: {
                    $arrayElemAt: ["$users.name", 0],
                  },
                },
              }
        ];
        let result = await Blog.aggregate(query)
        if (result) {
            const commetQuery = [
                {
                    "$match": {
                        "blog_id": new ObjectId(blog_id)
                    }
                },
                {
                    "$sort": {
                        "created_date": -1
                    }
                },
                {
                    "$limit": 5
                }
            ];
            let comments = await Comment.aggregate(commetQuery);
            response = {
                "message": "Data Fetch Successfully",
                data: {
                    blog: result[0],
                    comments: comments
                }
            }
        }
        else {
            response = {
                "message": "Required URI Params Missing: Blog Id",
                data: null
            }
        }
        resp.send(response);
    } catch (err) {
        console.log(err)
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//Find All Blogs API
const fetchLikeComment = async (req, resp) => {
    try {
        let response;
        if (req.query && req.query.blog_id) {
            let likes = await Like.find(req.query);
            let comments = await Comment.find(req.query);
            response = {
                "message": "Data Fetch Successfully",
                data: {
                    likes: likes,
                    comments: comments
                }
            }
        }
        else {
            response = {
                "message": "Require Params Missing: Blog Id",
                data: null
            }
        }
        resp.send(response);
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}


//findPostCountwithTotalLikesAndComment
const findPostCountWithLikeAndComment = async (req, resp) => {
    try {
        let response;
        if (!req.query.owner_id)
            return resp.status(400).json({ message: "Required Missing Params" })
        let query = [
            {
                $match: {
                    is_final: true,
                    published: true,
                    owner_id: new ObjectId(req.query.owner_id),
                }
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "blog_id",
                    as: "likes"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blog_id",
                    as: "comments"
                }
            },
            {
                $project: {
                    _id: 1,
                    owner_id: 1,
                    totalLikes: { $sum: "$likes.like_count" },
                    totalComments: { $size: "$comments" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalPosts: { $sum: 1 },
                    totalLikes: { $sum: "$totalLikes" },
                    totalComments: { $sum: "$totalComments" },
                    owner_id: { $first: "$owner_id" }
                }
            }
        ]
        let result = await Blog.aggregate(query);
        if (result.length === 0)
            result = [{
                "_id": null,
                "totalPosts": 0,
                "totalLikes": 0,
                "totalComments": 0,
                "owner_id": req.query.owner_id
            }]
        response = {
            "message": "Data Fetch Successfully",
            data: result[0]
        }
        return resp.status(200).send(response);

    } catch (err) {
        return resp.status(500).json({ error: 'Internal Server Error' });
    }
}




module.exports = {
    saveBlog,
    getAllBlog,
    getBlogById,
    fetchLikeComment,
    getBlogsCountsByCategory,
    searchingBlogs,
    findPostCountWithLikeAndComment

}