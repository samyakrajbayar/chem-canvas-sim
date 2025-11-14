import { Card } from "@/components/ui/card";
import { Atom } from "@/types/molecule";

interface CompoundInfoProps {
  atoms: Atom[];
}

export const CompoundInfo = ({ atoms }: CompoundInfoProps) => {
  const atomCounts = atoms.reduce((acc, atom) => {
    acc[atom.type] = (acc[atom.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const molecularFormula = Object.entries(atomCounts)
    .sort((a, b) => {
      const order = ['C', 'H', 'O', 'N', 'Cl', 'Br'];
      return order.indexOf(a[0]) - order.indexOf(b[0]);
    })
    .map(([symbol, count]) => `${symbol}${count > 1 ? count : ''}`)
    .join('');

  const atomicWeights: Record<string, number> = {
    C: 12.01,
    H: 1.008,
    O: 16.00,
    N: 14.01,
    Cl: 35.45,
    Br: 79.90,
  };

  const molecularWeight = Object.entries(atomCounts).reduce(
    (sum, [symbol, count]) => sum + (atomicWeights[symbol] || 0) * count,
    0
  );

  return (
    <Card className="p-4 animate-slide-in-right shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="font-semibold mb-3">Compound Information</h3>
      
      {atoms.length === 0 ? (
        <p className="text-muted-foreground text-sm">No atoms added yet</p>
      ) : (
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Molecular Formula</p>
            <p className="text-2xl font-mono font-bold text-primary">
              {molecularFormula || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Molecular Weight</p>
            <p className="text-xl font-semibold">
              {molecularWeight.toFixed(2)} g/mol
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Atom Count</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(atomCounts).map(([symbol, count]) => (
                <div
                  key={symbol}
                  className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
                >
                  {symbol}: {count}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Atoms</p>
            <p className="text-lg font-semibold">{atoms.length}</p>
          </div>
        </div>
      )}
    </Card>
  );
};
