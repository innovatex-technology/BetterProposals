const formidable = require('formidable');
const fs = require('fs');
const File = require('../model/FileSchema')
const ContactUs = require('../model/ContactUs')
const utility = require('../model/UtilityDetails')
const Newsletter = require('../model/NewsLetterSchema')


//env properties
const dotenv = require('dotenv');
dotenv.config();
const default_image = process.env.DEFAUL_IMAGE_C_KEY || "no_image_found"
const default_jre_server_utility = process.env.SERVER_PATH_UTILITY || "jre_base_server_path"


const uploadImage = async (req, res) => {
    let flag = true
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).send('Something went wrong.');
        }
        if (Object.keys(files).length === 0) {
            return res.status(400).send('Image must be insert')
        }

        let { blog_id, page_id, c_key } = fields;
        const uploadedFiles = Object.values(files);

        let unique_key;
        if (!c_key) {
            unique_key = "upload_ckey_" + createUniqueCKey();
        }
        // Save each file to MongoDB
        try {
            uploadedFiles[0].forEach(async (item) => {
                const isImage = (item.mimetype).toLowerCase().startsWith('image/')
                if (isImage) {
                    const oldRecord = await File.find({c_key:  c_key ? (Array.isArray(c_key) ? c_key[0] : c_key) : unique_key},"_id");
                    const newFile = new File({
                        c_key: c_key ? (Array.isArray(c_key) ? c_key[0] : c_key) : unique_key,
                        filename: item.originalFilename,
                        contentType: item.mimetype,
                        path: fs.readFileSync(item.filepath),
                        blog_id: blog_id ? blog_id : undefined,
                        page_id: page_id ? page_id : undefined
                    });
                    await newFile.save();
                    if (oldRecord && oldRecord.length > 0) {
                        await File.deleteMany({ _id: { $in: oldRecord } });
                    }
                } else {
                    flag = false
                }
            })
            if (flag) {
                res.status(200).json({ message: 'Files uploaded successfully.' });
            } else {
                res.status(200).json({ message: 'The uploaded files were of type image or PNG.' });
            }
        } catch (error) {
            console.error('Error saving files to MongoDB:', error);
            res.status(400).json({ error: 'An error occurred while saving files to MongoDB.' });
        }
    });
}

const getImage = async (req, res) => {
    try {
        const { id } = req.params;
        let newImageList = {
            message: "Data Fetch Successfully",
            data: []
        }
        const imageData = await File.find({ $or: [{ _id: id }, { page_id: id }, { blog_id: id }] }, "_id c_key page_id blog_id");
        if (imageData) {
            const utilityData = await utility.findOne({ c_key: default_jre_server_utility });
            if (utilityData) {
                const newImageList = imageData.map((element) => {
                    return {
                        base_path: utilityData?.data_source?.server_path + utilityData?.data_source?.image_path
                        + element?.c_key,
                        _id: element._id,
                        page_id: element.page_id,
                        blog_id: element.blog_id
                    }
                });
                res.status(200).json({
                    message: "Data Fetch Successfully",
                    data: newImageList
                });
            }
            else
                return res.status(200).json(newImageList);
        }
        else
            return res.status(404).json(newImageList);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const returnImageListByPostId = async (req, res) => {
    try {
        const { id } = req.params;
        const imageData = await File.find({ $or: [{ _id: id }, { page_id: id }, { blog_id: id }] });
        if (!imageData) {
            return res.status(404).json({ error: 'Image not found' });
        }
        return res.json(imageData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//return exact image url for showing the image
const getImageUForPages = async (req, res) => {
    try {
        const { c_key } = req.params;
        let imageData = await File.findOne({ c_key: c_key }).sort({_id:-1});
        if (!imageData) {
            imageData = await File.findOne({ c_key: default_image }).sort({_id:-1});
        }
        return res.send(imageData.path);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


//contact us form data saveing with resume
const saveCareerData = async (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err)
            return res.status(400).json({ messgae: "Something wrong with server" })

        if (Object.keys(files).length === 0)
            return res.status(400).json({ messgae: "No Resume Found" })

        //required field validation
        let { data } = fields;
        if (!data)
            return res.status(400).json({ message: "Data json body missing" })

        let bodyJson;
        try {
            bodyJson = JSON.parse(data[0]);
        } catch (error) {
            return res.status(400).json({ message: "Invalid data payload" })
        }


        // Save each file to MongoDB
        const uploadedFiles = Object.values(files);
        try {
            let result = null;
            let item = uploadedFiles[0][0];
            let unique_key = "career_ckey_" + createUniqueCKey();
            if (item) {
                const isPdf = (item.mimetype).toLowerCase().startsWith('application/pdf')
                if (isPdf) {
                    const file = new File({
                        c_key: unique_key,
                        filename: item.originalFilename,
                        contentType: item.mimetype,
                        path: fs.readFileSync(item.filepath)
                    });
                    result = await file.save();
                } else {
                    return res.status(400).json({ message: 'Please upload resume in pdf format' });
                }
            }

            if (result) {
                bodyJson["page_c_key"] = "career_from";
                bodyJson["resume_files_ckey"] = unique_key;
                const contactus = new ContactUs(bodyJson);
                await contactus.save();
            }
            res.status(200).json({ message: "Data saved successfully" })

        } catch (error) {
            console.error('Error saving records to MongoDB:', error);
            res.status(400).json({ error: 'An error occurred while saving files to MongoDB.' });
        }
    });
}


//upload blog related image
const uploadBlogImage = async (req, res) => {
    let flag = true
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields) => {
        if (err) {
            return res.status(400).send('Something went wrong.');
        }
        let { blog_id, image, c_key, filename, contentType } = fields;
        // Save each file to MongoDB
        let body = {};
        try {
            body["path"] = image[0];
            body["c_key"] = c_key[0]
            body["blog_id"] = blog_id[0]
            body["filename"] = filename[0]
            body["contentType"] = contentType[0]
            console.log(body)
            const filesCollection = new File(body);
            filesCollection.save();
            res.status(200).json({ "message": "Data Saved Successfully" })
        } catch (error) {
            console.error('Error saving files to MongoDB:', error);
            res.status(400).json({ error: 'An error occurred while saving files to MongoDB.' });
        }
    });


    function base64ToBinary(base64String) {
        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
}

//create unique c key
const createUniqueCKey = () => {
    const currentDate = new Date();
    const formattedDate = currentDate
        .toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            fractionalSecondDigits: 3,
        })
        .replace(/[^\d]/g, "");
    return formattedDate;
}


//upload newsletter
const uploadNewsletter = async (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err)
            return res.status(400).json({ messgae: "Something wrong with server" })

        if (Object.keys(files).length === 0)
            return res.status(400).json({ messgae: "No NewsLetter Found" })

        //required field validation
        let { data } = fields;
        if (!data)
            return res.status(400).json({ message: "Data json body missing" })

        let bodyJson;
        try {
            bodyJson = JSON.parse(data[0]);
        } catch (error) {
            return res.status(400).json({ message: "Invalid data payload" })
        }


        // Save each file to MongoDB
        const uploadedFiles = Object.values(files);
        try {
            let result = null;
            let item = uploadedFiles[0][0];
            let unique_key = "newsletter_ckey_" + createUniqueCKey();
            if (item) {
                const isPdf = (item.mimetype).toLowerCase().startsWith('application/pdf')
                if (isPdf) {
                    const file = new File({
                        c_key: unique_key,
                        filename: item.originalFilename,
                        contentType: item.mimetype,
                        path: fs.readFileSync(item.filepath)
                    });
                    result = await file.save();
                } else {
                    return res.status(400).json({ message: 'Please upload newsletter in pdf format' });
                }
            }

            if (result) {
                bodyJson["newsletter_c_key"] = unique_key;
                const newsletterschema = new Newsletter(bodyJson);
                await newsletterschema.save();
            }
            res.status(200).json({ message: "Data saved successfully" })

        } catch (error) {
            console.error('Error saving records to MongoDB:', error);
            res.status(400).json({ error: 'An error occurred while saving files to MongoDB.' });
        }
    });
}

module.exports = {
    uploadImage,
    getImage,
    getImageUForPages,
    saveCareerData,
    uploadBlogImage,
    uploadNewsletter
}