interface SpecTableProps {
  specs: Record<string, string | number> | null;
}

export function SpecTable({ specs }: SpecTableProps) {
  if (!specs || Object.keys(specs).length === 0) {
    return (
      <p className="text-muted-foreground italic text-sm">
        No detailed specifications available for this product.
      </p>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card">
      <table className="w-full text-sm text-left">
        <tbody className="divide-y">
          {Object.entries(specs).map(([key, value], index) => (
            <tr key={key} className={index % 2 === 0 ? "bg-muted/30" : "bg-transparent"}>
              <th className="px-4 py-3 font-semibold text-muted-foreground w-1/3">
                {key}
              </th>
              <td className="px-4 py-3 text-foreground font-medium">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}