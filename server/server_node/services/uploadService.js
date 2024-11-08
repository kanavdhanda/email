const cloudinary = require('../config/cloudinary.config');
const Upload = require('../models/Upload');
const fs = require('fs');
const path = require('path');

class UploadService {
    static async uploadToCloudinary(file) {
        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: 'raw',
                public_id: `html-files/${path.parse(file.originalname).name}`,
                tags: ['html_file']
            });

            // Clean up temporary file
            fs.unlinkSync(file.path);

            // Create database entry
            const upload = new Upload({
                fileName: file.filename,
                originalName: file.originalname,
                fileUrl: result.secure_url,
                publicId: result.public_id,
                fileType: file.mimetype
            });

            // Save to database
            await upload.save();

            return {
                fileUrl: result.secure_url,
                public_id: result.public_id,
                uploadId: upload._id
            };
        } catch (error) {
            // Clean up on error
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw error;
        }
    }

    static async getAllUploads() {
        try {
            return await Upload.find().sort({ uploadedAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    static async getUploadById(id) {
        try {
            return await Upload.findById(id);
        } catch (error) {
            throw error;
        }
    }

    static async deleteUpload(id) {
        try {
            const upload = await Upload.findById(id);
            if (!upload) {
                throw new Error('Upload not found');
            }

            // Delete from Cloudinary
            await cloudinary.uploader.destroy(upload.publicId);

            // Delete from database
            await Upload.findByIdAndDelete(id);

            return { message: 'Upload deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UploadService;

