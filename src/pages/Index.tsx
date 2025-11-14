import { useState } from "react";
import { MoleculeBuilder } from "@/components/MoleculeBuilder";
import { AtomPalette } from "@/components/AtomPalette";
import { CompoundLibrary } from "@/components/CompoundLibrary";
import { CompoundInfo } from "@/components/CompoundInfo";
import { FunctionalGroups } from "@/components/FunctionalGroups";
import { Bootloader } from "@/components/Bootloader";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Atom, Bond } from "@/types/molecule";
import { Beaker } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [atoms, setAtoms] = useState<Atom[]>([]);
  const [bonds, setBonds] = useState<Bond[]>([]);

  const handleAddAtom = (type: string) => {
    const newAtom: Atom = {
      id: `atom-${Date.now()}-${Math.random()}`,
      type,
      x: 100 + atoms.length * 60,
      y: 200 + Math.random() * 100,
    };
    setAtoms([...atoms, newAtom]);
  };

  const handleRemoveAtom = (id: string) => {
    setAtoms(atoms.filter((a) => a.id !== id));
    setBonds(bonds.filter((b) => b.atom1 !== id && b.atom2 !== id));
  };

  const handleAddBond = (atom1Id: string, atom2Id: string, type: string) => {
    const newBond: Bond = {
      id: `bond-${Date.now()}`,
      atom1: atom1Id,
      atom2: atom2Id,
      type: type as "single" | "double" | "triple",
    };
    setBonds([...bonds, newBond]);
  };

  const handleClear = () => {
    setAtoms([]);
    setBonds([]);
  };

  const handleSelectCompound = (compound: any) => {
    // Reset for demo purposes
    handleClear();
    // In a real app, you'd load the actual compound structure
  };

  if (isLoading) {
    return <Bootloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50 transition-colors duration-300">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2 relative">
            <Beaker className="w-10 h-10 text-primary animate-bounce-subtle" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Organic Compound Simulator
            </h1>
            <div className="absolute right-0 top-0">
              <DarkModeToggle />
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Build, explore, and analyze organic molecules interactively
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <AtomPalette onAddAtom={handleAddAtom} />
            <FunctionalGroups />
          </div>

          {/* Center - Molecule Builder */}
          <div className="lg:col-span-6">
            <MoleculeBuilder
              atoms={atoms}
              bonds={bonds}
              onAddAtom={handleAddAtom}
              onRemoveAtom={handleRemoveAtom}
              onAddBond={handleAddBond}
              onClear={handleClear}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <CompoundInfo atoms={atoms} />
            <CompoundLibrary onSelectCompound={handleSelectCompound} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
