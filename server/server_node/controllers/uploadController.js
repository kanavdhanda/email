const UploadService = require('../services/uploadService');

class UploadController {
    static async uploadFile(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const result = await UploadService.uploadToCloudinary(req.file);

            res.json({
                message: 'File uploaded successfully',
                ...result
            });

        } catch (error) {
            res.status(500).json({
                error: 'Error uploading file',
                details: error.message
            });
        }
    }

    static async getAllUploads(req, res) {
        try {
            const uploads = await UploadService.getAllUploads();
            res.json(uploads);
        } catch (error) {
            res.status(500).json({
                error: 'Error fetching uploads',
                details: error.message
            });
        }
    }

    static async getUploadById(req, res) {
        try {
            const upload = await UploadService.getUploadById(req.params.id);
            if (!upload) {
                return res.status(404).json({ error: 'Upload not found' });
            }
            res.json(upload);
        } catch (error) {
            res.status(500).json({
                error: 'Error fetching upload',
                details: error.message
            });
        }
    }

    static async deleteUpload(req, res) {
        try {
            await UploadService.deleteUpload(req.params.id);
            res.json({ message: 'Upload deleted successfully' });
        } catch (error) {
            res.status(500).json({
                error: 'Error deleting upload',
                details: error.message
            });
        }
    }
}

module.exports = UploadController;

