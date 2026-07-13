import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const members = [
  { name: "Camila Souza", role: "Product Designer", status: "Disponível" },
  { name: "João Mendes", role: "Tech Lead", status: "Em foco" },
  { name: "Lívia Rocha", role: "Marketing", status: "Disponível" },
];

export default function TeamPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Equipe</h1>
        <p className="text-muted-foreground">
          Acompanhe os membros, funções e disponibilidade do time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <Card key={member.name}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Status: {member.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
