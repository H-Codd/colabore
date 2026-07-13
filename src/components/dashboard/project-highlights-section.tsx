import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectHighlight } from "../../types/types";

type ProjectHighlightsSectionProps = {
  highlights: ProjectHighlight[];
};

export function ProjectHighlightsSection({
  highlights,
}: ProjectHighlightsSectionProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {highlights.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
