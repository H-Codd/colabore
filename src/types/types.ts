export type ProjectHighlight = {
  title: string;
  value: string;
  description: string;
};

export type ProjectItem = {
  name: string;
  status: string;
  dueDate: string;
  priority: string;
  owner: string;
};

export type TeamMember = {
  name: string;
  role: string;
  availability: string;
  workload: number;
  project: string;
};

export type ReportMetric = {
  label: string;
  value: string;
  width: string;
};

export type DashboardData = {
  projectHighlights: ProjectHighlight[];
  projectList: ProjectItem[];
  teamMembers: TeamMember[];
  reportMetrics: ReportMetric[];
};
export type DashboardItem = {
  title: string;
  value: string;
  description: string;
};

export type DashboardPayload = {
  projectHighlights: DashboardItem[];
  projectList: ProjectItem[];
  teamMembers: TeamMember[];
  reportMetrics: ReportMetric[];
};