import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ReportMetric } from "../../types/types";

type ReportsSectionProps = {
  metrics: ReportMetric[];
};

export function ReportsSection({ metrics }: ReportsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios</CardTitle>
        <CardDescription>
          Indicadores de produtividade, tempo gasto e desempenho da equipe.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{metric.label}</span>
              <span className="font-medium">{metric.value}</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: metric.width }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ExportSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exportação</CardTitle>
        <CardDescription>
          Gere relatórios em PDF ou Excel para compartilhar com o time.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button variant="outline">Exportar PDF</Button>
        <Button variant="outline">Exportar Excel</Button>
        <p className="text-sm text-muted-foreground">
          Atualizado há poucos minutos com os dados mais recentes.
        </p>
      </CardContent>
    </Card>
  );
}
