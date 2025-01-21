const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
    base_path: String,
    header: {
        heder_logo_image: String,
        main_menu: [{ order: Number, c_key: String, title: String, path: String, description: String }],
        nav_list_menu: [{ order: Number, c_key: String, title: String, path: String, description: String }],
        nav_menu_list_insight: [{ order: Number, c_key: String, title: String, icon: String, path: String }],
        side_contact_us: { c_key: String, title: String, description: String, path: String },
    },
    footer: {
        loower_footer: {
            copy_right: { firm_name: String, reserve_text: String, path: String },
            policies: [{ order: Number, title: String, path: String }],
        },
        site_map: [{ order: Number, title: String, links: [{ order: Number, title: String, path: String }] }],
    },
    page_name: String,
    last_updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pages", PageSchema);