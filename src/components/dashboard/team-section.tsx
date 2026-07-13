import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TeamMember } from "../../types/types";

type TeamSectionProps = {
  members: TeamMember[];
};

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipe</CardTitle>
        <CardDescription>
          Membros com função, disponibilidade e carga de trabalho.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member) => (
          <div
            key={member.name}
            className="rounded-lg border border-border/60 p-3"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                {member.availability}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Carga</span>
                <span>{member.workload}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${member.workload}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Projeto atual: {member.project}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
