"use client";

type DrugListProps = {
  brand: string;
  rules: string;
  name: string;
  tier: string;
};

export default function DrugDisplay({
  brand,
  rules,
  name,
  tier,
}: DrugListProps) {
  return (
    <div className="bg-green-900">
      <h1>Name: {name}</h1>
      <h1>Brand: {brand}</h1>
      <h1>Tier: {tier}</h1>
      <h1>Rules: {rules}</h1>
    </div>
  );
}
