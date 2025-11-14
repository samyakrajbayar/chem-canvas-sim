import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Atom, Bond } from "@/types/molecule";
import { Plus, Minus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MoleculeBuilderProps {
  atoms: Atom[];
  bonds: Bond[];
  onAddAtom: (type: string) => void;
  onRemoveAtom: (id: string) => void;
  onAddBond: (atom1Id: string, atom2Id: string, type: string) => void;
  onClear: () => void;
}

export const MoleculeBuilder = ({
  atoms,
  bonds,
  onAddAtom,
  onRemoveAtom,
  onAddBond,
  onClear,
}: MoleculeBuilderProps) => {
  const [selectedAtoms, setSelectedAtoms] = useState<string[]>([]);
  const [bondType, setBondType] = useState<"single" | "double" | "triple">("single");

  const handleAtomClick = (atomId: string) => {
    if (selectedAtoms.includes(atomId)) {
      setSelectedAtoms(selectedAtoms.filter(id => id !== atomId));
    } else if (selectedAtoms.length < 2) {
      const newSelected = [...selectedAtoms, atomId];
      setSelectedAtoms(newSelected);
      
      if (newSelected.length === 2) {
        onAddBond(newSelected[0], newSelected[1], bondType);
        setSelectedAtoms([]);
        toast.success(`${bondType} bond created`);
      }
    }
  };

  const getAtomColor = (type: string) => {
    const colors: Record<string, string> = {
      C: "hsl(var(--foreground))",
      H: "hsl(var(--muted-foreground))",
      O: "hsl(0, 84%, 55%)",
      N: "hsl(210, 90%, 45%)",
      Cl: "hsl(120, 60%, 40%)",
      Br: "hsl(15, 85%, 50%)",
    };
    return colors[type] || "hsl(var(--foreground))";
  };

  return (
    <Card className="p-6 h-full flex flex-col animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Molecule Builder</h2>
        <div className="flex gap-2">
          <select
            value={bondType}
            onChange={(e) => setBondType(e.target.value as any)}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="single">Single Bond</option>
            <option value="double">Double Bond</option>
            <option value="triple">Triple Bond</option>
          </select>
          <Button variant="destructive" size="icon" onClick={onClear}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 border-2 border-dashed border-border rounded-lg p-4 relative bg-card overflow-auto">
        <svg width="100%" height="100%" className="absolute inset-0">
          {bonds.map((bond, idx) => {
            const atom1 = atoms.find(a => a.id === bond.atom1);
            const atom2 = atoms.find(a => a.id === bond.atom2);
            if (!atom1 || !atom2) return null;

            const offset = bond.type === "double" ? 4 : bond.type === "triple" ? 6 : 0;
            
            return (
              <g key={idx}>
                <line
                  x1={atom1.x}
                  y1={atom1.y}
                  x2={atom2.x}
                  y2={atom2.y}
                  stroke="hsl(var(--foreground))"
                  strokeWidth="2"
                />
                {bond.type === "double" && (
                  <line
                    x1={atom1.x}
                    y1={atom1.y + offset}
                    x2={atom2.x}
                    y2={atom2.y + offset}
                    stroke="hsl(var(--foreground))"
                    strokeWidth="2"
                  />
                )}
                {bond.type === "triple" && (
                  <>
                    <line
                      x1={atom1.x}
                      y1={atom1.y + offset}
                      x2={atom2.x}
                      y2={atom2.y + offset}
                      stroke="hsl(var(--foreground))"
                      strokeWidth="2"
                    />
                    <line
                      x1={atom1.x}
                      y1={atom1.y - offset}
                      x2={atom2.x}
                      y2={atom2.y - offset}
                      stroke="hsl(var(--foreground))"
                      strokeWidth="2"
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {atoms.map((atom, idx) => (
          <div
            key={atom.id}
            className="absolute cursor-pointer transition-all duration-300 hover:scale-125 animate-scale-in"
            style={{
              left: atom.x - 20,
              top: atom.y - 20,
              animationDelay: `${idx * 0.05}s`,
            }}
            onClick={() => handleAtomClick(atom.id)}
            onDoubleClick={() => onRemoveAtom(atom.id)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                selectedAtoms.includes(atom.id) ? 'ring-4 ring-primary' : ''
              }`}
              style={{ backgroundColor: getAtomColor(atom.type) }}
            >
              {atom.type}
            </div>
          </div>
        ))}

        {atoms.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Click atoms below to start building
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mt-2">
        Click atoms to select, create bonds by selecting two atoms. Double-click to remove.
      </p>
    </Card>
  );
};
