import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const compounds = [
  { name: "Methane", formula: "CH₄", description: "Simplest alkane" },
  { name: "Ethane", formula: "C₂H₆", description: "Two-carbon alkane" },
  { name: "Ethanol", formula: "C₂H₅OH", description: "Common alcohol" },
  { name: "Acetone", formula: "C₃H₆O", description: "Simple ketone" },
  { name: "Benzene", formula: "C₆H₆", description: "Aromatic hydrocarbon" },
  { name: "Ethene", formula: "C₂H₄", description: "Simple alkene" },
];

interface CompoundLibraryProps {
  onSelectCompound: (compound: typeof compounds[0]) => void;
}

export const CompoundLibrary = ({ onSelectCompound }: CompoundLibraryProps) => {
  return (
    <Card className="p-4 animate-slide-in-right shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="font-semibold mb-3">Common Compounds</h3>
      <div className="space-y-2">
        {compounds.map((compound, idx) => (
          <Button
            key={compound.name}
            variant="ghost"
            className="w-full justify-start text-left h-auto py-3 hover:bg-muted transition-all hover:scale-105 hover:shadow-sm animate-fade-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
            onClick={() => {
              onSelectCompound(compound);
              toast.success(`Loaded ${compound.name}`);
            }}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="font-medium">{compound.name}</span>
              <span className="text-lg font-mono text-primary">{compound.formula}</span>
              <span className="text-xs text-muted-foreground">{compound.description}</span>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};
