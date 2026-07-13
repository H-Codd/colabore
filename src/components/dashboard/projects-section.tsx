"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectItem } from "../../types/types";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    projects[0] ?? null,
  );

  const openKanban = (project: ProjectItem) => {
    router.push(`/kanban?project=${encodeURIComponent(project.name)}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle>Projetos</CardTitle>
          <CardDescription>
            Lista de projetos ativos, concluídos e atrasados com filtros
            rápidos.
          </CardDescription>
        </div>
        {selectedProject ? (
          <Button variant="outline" onClick={() => openKanban(selectedProject)}>
            Abrir Kanban
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap justify-end gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Status
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Prioridade
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Prazo
          </span>
        </div>

        <div className="space-y-3">
          {projects.map((project) => {
            const isSelected = selectedProject?.name === project.name;

            return (
              <button
                key={project.name}
                type="button"
                onClick={() => setSelectedProject(project)}
                className={`w-full rounded-lg border p-4 text-left transition ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border/60 hover:border-primary/40"
                }`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Responsável: {project.owner}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-muted px-2 py-1">
                      {project.status}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-1">
                      {project.priority}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-1">
                      {project.dueDate}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedProject ? (
          <div className="rounded-lg border border-border/60 bg-background/80 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold">Detalhes de {selectedProject.name}</p>
                <p className="text-sm text-muted-foreground">
                  Responsável: {selectedProject.owner} • {selectedProject.status} • {selectedProject.priority}
                </p>
              </div>
              <Button variant="secondary" onClick={() => openKanban(selectedProject)}>
                Ver Kanban
              </Button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-sm font-medium">Planejado</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Definição de escopo e entregas principais.
                </p>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-sm font-medium">Em andamento</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tarefas ativas com acompanhamento semanal.
                </p>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-sm font-medium">Concluído</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Entregas aprovadas e prontas para revisão.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
