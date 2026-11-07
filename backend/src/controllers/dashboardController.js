import { getDashboard } from '../services/dashboardService.js';

export async function getDashboardData(_request, response) {
  return response.json(await getDashboard());
}
