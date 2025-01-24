const express = require('express');
const { createUser , loginUser ,updateUserDetails, sendEmailOPTServie, verifyOtpService,resetPassword} = require('../controller/user-controller.js');
// const { addComment } = require('../controller/comment-controller.js');
// const { likePost } = require('../controller/like-controller.js');
// const { saveBlog, getAllBlog, getBlogById,fetchLikeComment,getBlogsCountsByCategory,searchingBlogs ,findPostCountWithLikeAndComment} = require('../controller/post-controller.js');
const { refreshAccessToken, authenticateToken } = require('../controller/jwt-controller.js');
// const { uploadImage, getImage, getImageUForPages,saveCareerData , uploadBlogImage, uploadNewsletter} = require('../controller/image-controller.js');
const { fetchPageData, postPageData } = require('../controller/page-controller.js')
// const { postContactUs, postUtility,addNewCategory, getUtilityByCkey, getallContactUs , updatetUtility, saveSubcribers,getAllSubcribers,getAllNewsLetterList,saveConsent} = require('../controller/utility-controller.js')
const { saveQuotation, getAllQuotations, updateQuotation, getQuotationById } = require('../controller/quotation-controller.js');

const router = express.Router();


//open apis
//user apis
router.post("/api/v1/login", loginUser);
router.post('/api/v1/refresh-token',refreshAccessToken);
router.post('/api/v1/reset-pass-otp', sendEmailOPTServie);
router.post('/api/v1/verify-otp', verifyOtpService);
router.put('/api/v1/update-pass', resetPassword);

//comments
// router.post("/api/v1/comment", addComment);

//like
// router.post("/api/v1/like", likePost);

// router.post("/api/v1/career", saveCareerData)

// router.get("/innovatex/image/:c_key", getImageUForPages)

//Pages
// router.get("/api/v1/page/:page_name", fetchPageData);


// router.post("/api/v1/contactus", postContactUs)
// router.get("/api/v1/utility/:c_key", getUtilityByCkey)
// router.post("/api/v1/utility/subcriber", saveSubcribers)


// router.get("/api/v1/blog", getAllBlog);
// router.get("/api/v1/blog/:blog_id", getBlogById);
// router.get("/api/v1/like-comments", fetchLikeComment);
// router.get("/api/v1/counts", getBlogsCountsByCategory);
// router.get("/api/v1/search", searchingBlogs);
// router.get("/api/v1/blogs/counts", findPostCountWithLikeAndComment);


//secure apis
// router.post("/api/v1/page/create-update",authenticateToken, postPageData);

//user apis
router.post("/api/v1/register",createUser);
// router.put('/api/v1/user', authenticateToken, updateUserDetails);

//File_upload
// router.post("/api/v1/fileimage",authenticateToken, uploadImage)
// router.post("/api/v1/newsletter", uploadNewsletter)
// router.get("/api/v1/image/:id",authenticateToken, getImage)
// router.post("/api/v1/blogimage",authenticateToken, uploadBlogImage)

//post
// router.post("/api/v1/blog",authenticateToken, saveBlog);
// router.get("/api/v1/contactus/list", authenticateToken,getallContactUs)
// router.get("/api/v1/newletterlist", getAllNewsLetterList)

//Utility APi
// router.post("/api/v1/utility/data",authenticateToken, postUtility)
// router.put("/api/v1/utility/data",authenticateToken, updatetUtility)
// router.get("/api/v1/utility/subcriber/view",authenticateToken, getAllSubcribers)
// router.post("/api/v1/consent", saveConsent)
// router.post("/api/v1/utility/blogcategory",authenticateToken, addNewCategory)

router.post('/api/v1/quotation', saveQuotation);
router.get('/api/v1/quotations', getAllQuotations);
router.put('/api/v1/quotation/:id', updateQuotation);
router.get('/api/v1/quotations/:id', getQuotationById);

module.exports = router;