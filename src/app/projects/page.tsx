import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
  { name: "Rebranding da marca", status: "Em andamento" },
  { name: "MVP do produto", status: "Concluído" },
  { name: "Campanha de lançamento", status: "Atrasado" },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Projetos</h1>
        <p className="text-muted-foreground">
          Veja o estado geral dos projetos e acompanhe os próximos passos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Acesso rápido ao Kanban
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
