export interface Atom {
  id: string;
  type: string;
  x: number;
  y: number;
}

export interface Bond {
  id: string;
  atom1: string;
  atom2: string;
  type: "single" | "double" | "triple";
}

export interface Molecule {
  atoms: Atom[];
  bonds: Bond[];
  name?: string;
}
