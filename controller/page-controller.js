const { response } = require('express');
const Pages = require('../model/PageSchema.js');


const dotenv =  require('dotenv');
dotenv.config();
const server_url = process.env.SERVER_URL || "http://localhost:3001/innovatex/image/"


//fetch page data api
const fetchPageData = async (req, res) => {
    try {
        const { page_name } = req.params;
        if (!page_name) {
            return res.status(400).json({ error: 'page name must be given with page_name keyword' });
        }

        console.log(
            "Called"
        )
        const data = await Pages.findOne({ "page_name": page_name });
        if (data) {
            data["base_path"] = server_url;
            return res.status(200).json({
                "message": "Page Details Found",
                "data": data
            });
        }

        return res.status(404).json({
            "message": "Page Not Found",
            "data": null
        });

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const postPageData = async (req, res) => {
    try {
        const payloadData = req.body;
        const findExisting = await Pages.findOne({ "page_name": payloadData.page_name });

        if (findExisting) {
            payloadData.last_updated_date = new Date();
            const result = await Pages.updateOne({ _id: findExisting._id }, payloadData);
            return res.status(200).json({
                "message": "Page Details Updated Succesfully",
                "data": result
            });
        }

        const page = new Pages(payloadData);
        const result = await page.save();
        return res.status(200).json({
            "message": "Page Details Saved Successfully",
            "data": result
        });
        
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    fetchPageData,
    postPageData
}