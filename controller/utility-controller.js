const utility = require('../model/UtilityDetails.js');
const contact = require('../model/ContactUs.js');
const subcribers = require('../model/Subcribers.js');
const { query } = require('express');
const newsletterSchema = require('../model/NewsLetterSchema.js')
const Consent = require('../model/Consent.js')


//save contact us data without file
const postContactUs = async (req, resp) => {
    try {
        let response;
        let bodyData = req.body;
        if (bodyData.first_name && bodyData.last_name && bodyData.email && bodyData.phone_number && bodyData.message) {
            let ContactUs = new contact(bodyData);
            let result = await ContactUs.save();
            response = {
                "message": "Data Saved Successfully",
                data: result
            }
            resp.status(200).json(response);
        }
        else {
            response = {
                "message": "Invalid Payload or Missing Required Field"
            }
            resp.status(400).json(response);
        }
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//read all contact us list
const getallContactUs = async (req, resp) => {
    const limit = parseInt(req.query.pageSize) || 15
    const currentPage = parseInt(req.query.currentPage) || 1
    const skip = (currentPage - 1) * limit;
   
    try {
        let response;
        let filter = {};
        if (req.query.page_c_key)
            filter = { page_c_key: req.query.page_c_key }
        else
            return resp.status(400).json({message: "Required Param Missing"})
        const query = [
            {
                $match: {
                    page_c_key: req.query.page_c_key
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $facet: {
                    paginatedData: [
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    totalCount: [
                        {
                            $match: {
                                page_c_key: req.query.page_c_key
                            },
                        },
                        { $count: "total" },
                    ],
                },
            },
        ]
        let result = await contact.aggregate(query)
        if (result) {
            response = {
                "message": "Data Fetch Successfully",
                data: result[0]
            }
        }
        else {
            response = {
                "message": "No Data Found"
            }
        }
        resp.status(200).json(response);
    } catch (err) {
        console.log(err)
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}



//utilitu apis
const postUtility = async (req, resp) => {
    try {
        let response;
        let bodyData = req.body;
        if (bodyData && bodyData.c_key && bodyData.c_key.length > 0) {
            let utilityBody = new utility(bodyData);
            let result = await utilityBody.save();
            response = {
                "message": "Utility Details Save uccessfully",
                data: result
            }
            resp.status(200).json(response);
        }
        else {
            response = {
                "message": "Invalid Payload or Missing c_key Key"
            }
            resp.status(400).json(response);
        }
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//read all contact us list
const getUtilityByCkey = async (req, resp) => {
    console.log("here")
    try {
        let response;
        let { c_key } = req.params;
        const result = await utility.findOne({ c_key: c_key }).sort({ created_date: -1 });
        if (result) {
            response = {
                "message": "Utility Fetch Successfully",
                data: result
            }
        }
        else {
            response = {
                "message": "No Data Found"
            }
        }
        resp.status(200).json(response);
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//Update Utility
const updatetUtility = async (req, resp) => {
    try {
        let response;
        let updatedBody = req.body;
        if (updatedBody.c_key) {
            let result = await utility.findOne({ c_key: updatedBody.c_key });
            if (result) {
                try {
                    result = await utility.updateOne({ c_key: updatedBody.c_key }, { data_source: updatedBody.data_source });
                    response = {
                        message: "Utility Updated Successfully",
                        data: result
                    };
                } catch (error) {
                    console.error('Error updating utility:', error);
                    response = {
                        message: "Error updating utility",
                        error: error
                    };
                }
            } else {
                response = {
                    message: "Utility Record Not Found with given c_key",
                    data: result
                };
            }
        }
        resp.status(200).json(response);
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}



//utilitu apis
const saveSubcribers = async (req, resp) => {
    try {
        let response;
        let bodyData = req.body;
        if (bodyData && bodyData.email || bodyData.phone_number || bodyData.number) {
            let newbodyData = new subcribers(bodyData);
            let result = await newbodyData.save();
            response = {
                "message": "Subcribers Save uccessfully",
                data: result
            }
            resp.status(200).json(response);
        }
        else {
            response = {
                "message": "Invalid Payload or Missing Fields Key"
            }
            resp.status(400).json(response);
        }
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//utilitu apis
const getAllSubcribers = async (req, resp) => {
    const limit = parseInt(req.query.pageSize) || 15
    const currentPage = parseInt(req.query.currentPage) || 1
    const skip = (currentPage - 1) * limit;
    try {
        let resultsWithSerialNumbers = []
        const query = [
            { $sort: { _id: -1 } },
            {
              $facet: {
                paginatedData: [
                  { $skip: skip },
                  { $limit: limit },
                ],
                totalCount: [{ $count: "total" }],
              },
            },
          ]
        const mainresults = await subcribers.aggregate(query)
        const results = mainresults[0]?.paginatedData?.map((item, index) => {
            return { serialNumber: skip + (index+1), email: item?.email, phone_number: item?.phone_number };
        });
        response = {
            "message": "Data Fetch uccessfully",
            data: {
                paginatedData : results,
                totalCount: mainresults[0]?.totalCount
            }
        }
        resp.status(200).json(response);
    } catch (err) {
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//read getAllNewsLetterList
const getAllNewsLetterList = async (req, resp) => {
    const limit = parseInt(req.query.pageSize) || 15
    const currentPage = parseInt(req.query.currentPage) || 1
    const skip = (currentPage - 1) * limit;
   
    try {
        let response;
        let filter = {};
        const query = [
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $facet: {
                    paginatedData: [
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    totalCount: [
                        { $count: "total" },
                    ],
                },
            },
        ]
        let result = await newsletterSchema.aggregate(query)
        if (result) {
            response = {
                "message": "Data Fetch Successfully",
                data: result[0]
            }
        }
        else {
            response = {
                "message": "No Data Found"
            }
        }
        resp.status(200).json(response);
    } catch (err) {
        console.log(err)
        resp.status(500).json({ error: 'Internal Server Error' });
    }
}

//read all contact us list
const saveConsent = async (req, resp) => {
    try {
        let response = {};
        const body = req.body;
        const { ip_address } = body;
        const existingConsent = await Consent.findOne({ ip_address });

        if (existingConsent) {
            existingConsent.set({
                ...body,
                last_updated_date: new Date()
            });
            const updatedConsent = await existingConsent.save();

            response = {
                message: "Consent Updated Successfully",
                data: updatedConsent
            };
        } else {
            // Create a new consent
            const consent = new Consent({
                ...body,
                last_updated_date: new Date()
            });
            const result = await consent.save();

            response = {
                message: "Consent Saved Successfully",
                data: result
            };
        }

        resp.status(200).json(response);
    } catch (err) {
        console.error(err);
        resp.status(500).json({ error: 'Internal Server Error' });
    }
};

//utilitu apis
const addNewCategory = async (req, resp) => {
    try {
        let response;
        let bodyData = req.body;
        if (bodyData?.c_key && bodyData?.data?.name) {
            let datalist = await utility.findOne({"c_key": "jre_blog_category_list"})
            if (datalist && datalist.c_key === bodyData?.c_key) {
                const isDuplicate = datalist.data_source.filter((item)=> item.name === bodyData?.data?.name)
                console.log(isDuplicate)
                if(isDuplicate && isDuplicate.length > 0)
                    return resp.status(400).json({"message": "Catgeory Already Exist" });

                const size = datalist.data_source.length + 1;
                const newData = [...datalist.data_source, { order: size, name: bodyData?.data?.name }];
                const updatedContent = await utility.updateOne({ c_key: bodyData.c_key }, {data_source: newData});
                return resp.status(200).json(updatedContent)
            }
            else {
                return resp.status(400).json({ "message": "Invalid Payload or Missing Fields Key" });
            }
        }
        
        else {
            return resp.status(400).json({"message": "Invalid Payload or Missing Fields Key"})
        }
    } catch (err) {
        console.log(err)
        return resp.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    postContactUs,
    getallContactUs,
    postUtility,
    getUtilityByCkey,
    updatetUtility,
    saveSubcribers,
    getAllSubcribers,
    getAllNewsLetterList,
    saveConsent,
    addNewCategory
}