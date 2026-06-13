import reportsRepository from './reports.repository.js';

class ReportsService {
    async createReport(reportData, details, categories) {
        const reportId = await reportsRepository.create(reportData);
        if (details && Object.keys(details).length > 0) {
            await reportsRepository.createDetails(reportId, details);
        }
        if (categories && Object.keys(categories).length > 0) {
            await reportsRepository.createCategories(reportId, categories);
        }
        return reportId;
    }

    async getReportById(id) {
        const report = await reportsRepository.findById(id);
        if (!report) return null;
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
                trapped: report.trapped || 0,
            },
        };
    }

    async editReport(id, userId, description, details) {
        const report = await reportsRepository.findById(id);
        if (!report || report.user_id !== userId) {
            throw new Error('Unauthorized or report not found');
        }
        if (description) {
            await reportsRepository.update(id, { ...report, description });
        }
        if (details && Object.keys(details).length > 0) {
            await reportsRepository.updateDetails(id, details);
        }
    }

    async updateReportStatus(id, status) {
        await reportsRepository.update(id, { status });
    }

    async getAllReports() {
        return await reportsRepository.getAll();
    }
}

export default new ReportsService();
