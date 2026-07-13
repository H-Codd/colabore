import { DashboardPayload } from "@/types/types";
import { NextResponse } from "next/server";

const fallbackData: DashboardPayload = {
  projectHighlights: [
    { title: "Ativos", value: "6", description: "Projetos em execução" },
    { title: "Concluídos", value: "14", description: "Entregas finalizadas" },
    { title: "Atrasados", value: "2", description: "Requerem atenção" },
  ],
  projectList: [
    {
      name: "Rebranding da marca",
      status: "Em andamento",
      dueDate: "15 ago",
      priority: "Alta",
      owner: "Ana",
    },
    {
      name: "MVP do produto",
      status: "Concluído",
      dueDate: "09 ago",
      priority: "Média",
      owner: "Bruno",
    },
    {
      name: "Campanha de lançamento",
      status: "Atrasado",
      dueDate: "20 ago",
      priority: "Alta",
      owner: "Carla",
    },
  ],
  teamMembers: [
    {
      name: "Camila Souza",
      role: "Product Designer",
      availability: "Disponível",
      workload: 78,
      project: "Colabore",
    },
    {
      name: "João Mendes",
      role: "Tech Lead",
      availability: "Em foco",
      workload: 92,
      project: "MVP",
    },
    {
      name: "Lívia Rocha",
      role: "Marketing",
      availability: "Disponível",
      workload: 65,
      project: "Lançamento",
    },
  ],
  reportMetrics: [
    { label: "Tarefas concluídas", value: "82%", width: "82%" },
    { label: "Tempo gasto por projeto", value: "64h", width: "64%" },
    { label: "Engajamento da equipe", value: "91%", width: "91%" },
  ],
};

function normalizePayload(payload: unknown): DashboardPayload {
  if (!payload || typeof payload !== "object") {
    return fallbackData;
  }

  const data = payload as Partial<DashboardPayload> & {
    dashboard?: Partial<DashboardPayload>;
  };

  const source = data.dashboard ?? data;

  return {
    projectHighlights: Array.isArray(source.projectHighlights)
      ? source.projectHighlights
      : fallbackData.projectHighlights,
    projectList: Array.isArray(source.projectList)
      ? source.projectList
      : fallbackData.projectList,
    teamMembers: Array.isArray(source.teamMembers)
      ? source.teamMembers
      : fallbackData.teamMembers,
    reportMetrics: Array.isArray(source.reportMetrics)
      ? source.reportMetrics
      : fallbackData.reportMetrics,
  };
}

export async function GET() {
  const apiUrl = process.env.DATA_BASE_URL;
  const apiKey = process.env.DATA_BASE_API;

  if (!apiUrl) {
    return NextResponse.json(fallbackData);
  }

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey ?? "",
        Authorization: apiKey ? `Bearer ${apiKey}` : "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Database API responded with ${response.status}`);
    }

    const payload = await response.json();
    return NextResponse.json(normalizePayload(payload));
  } catch {
    return NextResponse.json(fallbackData);
  }
}
