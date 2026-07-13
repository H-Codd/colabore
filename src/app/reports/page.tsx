import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const metrics = [
  { label: "Tarefas concluídas", value: "82%" },
  { label: "Tempo gasto por projeto", value: "64h" },
  { label: "Engajamento da equipe", value: "91%" },
];

export default function ReportsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Relatórios</h1>
        <p className="text-muted-foreground">
          Consulte indicadores de produtividade e desempenho da equipe.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardTitle>{metric.label}</CardTitle>
              <CardDescription>Indicador principal</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
