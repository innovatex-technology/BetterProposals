// controllers/quotation-controller.js
const Quotation = require('../model/Quotation');

// Save Quotation
const saveQuotation = async (req, res) => {
    try {
        const quotation = new Quotation(req.body);
        const savedQuotation = await quotation.save();
        res.status(201).json({ success: true, data: savedQuotation });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to save quotation", error });
    }
};

// Get All Quotations
const getAllQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find();
        res.status(200).json({ success: true, data: quotations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch quotations", error });
    }
};

// Update Quotation
const updateQuotation = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedQuotation = await Quotation.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure the update complies with the schema
        });

        if (!updatedQuotation) {
            return res.status(404).json({ success: false, message: "Quotation not found" });
        }

        res.status(200).json({ success: true, data: updatedQuotation });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update quotation", error });
    }
};

const getQuotationById = async (req, res) => {
    try {
        const { id } = req.params;
        const quotation = await Quotation.findById(id);

        if (!quotation) {
            return res.status(404).json({
                success: false,
                message: 'Quotation not found',
            });
        }

        res.status(200).json({
            success: true,
            data: quotation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quotation',
            error: error.message,
        });
    }
};

module.exports = {
    saveQuotation,
    getAllQuotations,
    updateQuotation,
    getQuotationById,
};
