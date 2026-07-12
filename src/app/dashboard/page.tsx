"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser, logoutUser } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const user = getCurrentUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      setIsLoading(false);
    }
  }, [router, user]);

  if (!user) {
    return null;
  }



  if(isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-md h-16 w-16 border-10 border-primary"></div>
      </div>
    );
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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Projetos</CardTitle>
            <CardDescription>
              Gerencie tarefas e prioridades do seu time.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Equipe</CardTitle>
            <CardDescription>
              Concentre comunicação e responsabilidades em um só lugar.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Relatórios</CardTitle>
            <CardDescription>
              Acompanhe o progresso com uma visão clara do time.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
