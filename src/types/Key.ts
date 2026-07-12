// types/Key.ts

export type KeyType = "number" | "operator" | "action" | "equals";

export type Key = {
  id: number;
  label: string;
  type: KeyType;
};
