"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardLoading } from "@/components/dashboard/dashboard-loading";
import { ProjectHighlightsSection } from "@/components/dashboard/project-highlights-section";
import { ProjectsSection } from "@/components/dashboard/projects-section";
import { TeamSection } from "@/components/dashboard/team-section";
import {
  ExportSection,
  ReportsSection,
} from "@/components/dashboard/reports-section";
import { getCurrentUser, logoutUser, type User } from "@/lib/auth";
import type { DashboardData } from "@/types/types";

const emptyDashboard: DashboardData = {
  projectHighlights: [],
  projectList: [],
  teamMembers: [],
  reportMetrics: [],
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(emptyDashboard);

  useEffect(() => {
    setHasMounted(true);

    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const response = await fetch("/api/dashboard", { cache: "no-store" });
        if (response.ok) {
          const data = (await response.json()) as Partial<DashboardData>;
          setDashboardData({
            projectHighlights: data.projectHighlights ?? [],
            projectList: data.projectList ?? [],
            teamMembers: data.teamMembers ?? [],
            reportMetrics: data.reportMetrics ?? [],
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  if (!hasMounted) {
    return <DashboardLoading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="border-primary/20 bg-linear-to-br from-primary/10 to-background">
        <CardHeader>
          <CardTitle className="text-2xl">Bem-vindo, {user.name}</CardTitle>
          <CardDescription>
            Você entrou com sucesso na área protegida da aplicação.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Centralize projetos, equipe e indicadores em um único painel.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              logoutUser();
              router.push("/login");
            }}
          >
            Sair
          </Button>
        </CardContent>
      </Card>

      <Suspense fallback={<DashboardLoading />}>
        <ProjectHighlightsSection
          highlights={dashboardData.projectHighlights}
        />

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <ProjectsSection projects={dashboardData.projectList} />
          <TeamSection members={dashboardData.teamMembers} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ReportsSection metrics={dashboardData.reportMetrics} />
          <ExportSection />
        </section>
      </Suspense>
    </div>
  );
}
