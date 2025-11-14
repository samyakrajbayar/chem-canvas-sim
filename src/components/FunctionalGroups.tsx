import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const functionalGroups = [
  { name: "Hydroxyl", formula: "-OH", description: "Alcohol group" },
  { name: "Carbonyl", formula: "C=O", description: "Ketone/Aldehyde" },
  { name: "Carboxyl", formula: "-COOH", description: "Carboxylic acid" },
  { name: "Amino", formula: "-NH₂", description: "Amine group" },
  { name: "Methyl", formula: "-CH₃", description: "Alkyl group" },
  { name: "Ethyl", formula: "-C₂H₅", description: "Alkyl group" },
];

export const FunctionalGroups = () => {
  return (
    <Card className="p-4 animate-slide-in-left shadow-md hover:shadow-lg transition-all duration-300" style={{ animationDelay: "0.2s" }}>
      <h3 className="font-semibold mb-3">Functional Groups</h3>
      <div className="space-y-2">
        {functionalGroups.map((group, idx) => (
          <Button
            key={group.name}
            variant="outline"
            className="w-full justify-start text-left h-auto py-3 transition-all hover:scale-105 hover:shadow-sm animate-fade-in"
            style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            onClick={() => toast.info(`${group.name}: ${group.description}`)}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="font-medium text-sm">{group.name}</span>
              <span className="text-base font-mono text-secondary">{group.formula}</span>
              <span className="text-xs text-muted-foreground">{group.description}</span>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};
