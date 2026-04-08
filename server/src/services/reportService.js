import reportRepository from '../repositories/reportRepository.js';

class ReportService {
    async createReport(reportData, details, categories) {
        // Basic business logic can go here (e.g. data validation if not done in Joi)
        const reportId = await reportRepository.create(reportData);

        if (details && Object.keys(details).length > 0) {
            await reportRepository.createDetails(reportId, details);
        }

        if (categories && Object.keys(categories).length > 0) {
            await reportRepository.createCategories(reportId, categories);
        }

        return reportId;
    }

    async getReportById(id) {
        const report = await reportRepository.findById(id);
        if (!report) return null;

        // Transform to frontend-friendly format
        return {
            id: report.id,
            title: report.title,
            description: report.description,
            crisisType: report.crisis_type,
            status: report.status,
            location: { lat: report.lat, lng: report.lng },
            reportedBy: report.reporter_name || 'Unknown',
            details: {
                roadStatus: report.road_status || 'Unknown',
                missing: report.missing || 0,
                trapped: report.trapped || 0
            }
        };
    }

    async editReport(id, userId, description, details) {
        const report = await reportRepository.findById(id);
        if (!report || report.user_id !== userId) {
            throw new Error('Unauthorized or report not found');
        }

        if (description) {
            await reportRepository.update(id, { ...report, description });
        }

        if (details && Object.keys(details).length > 0) {
            await reportRepository.updateDetails(id, details);
        }
    }

    async updateReportStatus(id, status) {
        await reportRepository.update(id, { status });
    }

    async getAllReports() {
        return await reportRepository.getAll();
    }
}

export default new ReportService();
