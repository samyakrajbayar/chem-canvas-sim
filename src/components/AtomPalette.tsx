import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const atoms = [
  { symbol: "C", name: "Carbon", color: "bg-foreground" },
  { symbol: "H", name: "Hydrogen", color: "bg-muted-foreground" },
  { symbol: "O", name: "Oxygen", color: "bg-destructive" },
  { symbol: "N", name: "Nitrogen", color: "bg-primary" },
  { symbol: "Cl", name: "Chlorine", color: "bg-accent" },
  { symbol: "Br", name: "Bromine", color: "bg-secondary" },
];

interface AtomPaletteProps {
  onAddAtom: (type: string) => void;
}

export const AtomPalette = ({ onAddAtom }: AtomPaletteProps) => {
  return (
    <Card className="p-4 animate-slide-in-left shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="font-semibold mb-3">Atom Palette</h3>
      <div className="grid grid-cols-2 gap-2">
        {atoms.map((atom, idx) => (
          <Button
            key={atom.symbol}
            variant="outline"
            onClick={() => onAddAtom(atom.symbol)}
            className="flex items-center gap-2 justify-start hover:shadow-md transition-all hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div
              className={`w-6 h-6 rounded-full ${atom.color} text-white flex items-center justify-center text-xs font-bold`}
            >
              {atom.symbol}
            </div>
            <span className="text-sm">{atom.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};
