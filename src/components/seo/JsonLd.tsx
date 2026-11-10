/**
 * Injects JSON-LD Structured Data into the page.
 * 
 * Usage:
 * <JsonLd data={getOrganizationSchema()} />
 * <JsonLd data={getProductSchema(product)} />
 */
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}