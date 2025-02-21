export interface Analytics {
    top_skills: { skill: string; count: number }[];
    job_levels: { level: string; count: number }[];
    job_types: { job_type: string; count: number }[];
    top_companies: { company: string; count: number }[];
    top_search_cities: { city: string; count: number }[];
    top_summary_words: { word: string; count: number }[];
}
  
export async function fetchAnalytics(): Promise<Analytics> {
    const response = await fetch('http://localhost:5000/api/analytics');
    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }
    return response.json();
}