"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export type AdminTableType = "products" | "categories" | "projects" | "clients" | "blog" | "certifications" | "inquiries";

interface DataTableProps {
  data: any[];
  type: AdminTableType;
  searchKey: string;
}

export function DataTable({ data, type, searchKey }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredData = data.filter((item) => {
    if (!search) return true;
    const val = item[searchKey];
    return String(val || "").toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const renderHeaders = () => {
    switch (type) {
      case "products": return ["Product Name", "Category", "Status", "Actions"];
      case "categories": return ["Name", "Slug", "Status", "Actions"];
      case "projects": return ["Title", "Client", "Sector", "Actions"];
      case "clients": return ["Name", "Sector", "City", "Actions"];
      case "blog": return ["Title", "Status", "Date", "Actions"];
      case "certifications": return ["Title", "Issuing Authority", "Issue Date", "Actions"];
      case "inquiries": return ["Type", "From", "Status", "Date", "Actions"];
      default: return [];
    }
  };

  const renderCells = (item: any, colIndex: number) => {
    switch (type) {
      case "products":
        if (colIndex === 0) return <div><p className="font-medium">{item.name}</p><p className="text-xs text-muted-foreground">{item.slug}</p></div>;
        if (colIndex === 1) return item.categories?.name || "Uncategorized";
        if (colIndex === 2) return <Badge variant={item.is_active ? "default" : "secondary"}>{item.is_active ? "Active" : "Draft"}</Badge>;
        if (colIndex === 3) return <Button variant="ghost" size="icon" asChild><Link href={`/admin/products/${item.id}/edit`}><Pencil className="size-4" /></Link></Button>;
        break;

      case "categories":
        if (colIndex === 0) return item.name;
        if (colIndex === 1) return <span className="text-muted-foreground">{item.slug}</span>;
        if (colIndex === 2) return <Badge variant={item.is_active ? "default" : "secondary"}>{item.is_active ? "Active" : "Hidden"}</Badge>;
        if (colIndex === 3) return <Button variant="ghost" size="icon" asChild><Link href={`/admin/categories/${item.id}/edit`}><Pencil className="size-4" /></Link></Button>;
        break;

      case "projects":
        if (colIndex === 0) return <div><p className="font-medium">{item.title}</p><p className="text-xs text-muted-foreground">{item.location}</p></div>;
        if (colIndex === 1) return item.client_name;
        if (colIndex === 2) return item.sector;
        if (colIndex === 3) return <Button variant="ghost" size="icon" asChild><Link href={`/admin/projects/${item.id}/edit`}><Pencil className="size-4" /></Link></Button>;
        break;

      case "clients":
        if (colIndex === 0) return <span className="font-medium">{item.name}</span>;
        if (colIndex === 1) return item.sector;
        if (colIndex === 2) return item.city;
        if (colIndex === 3) return <Button variant="ghost" size="icon" asChild><Link href={`/admin/clients/${item.id}/edit`}><Pencil className="size-4" /></Link></Button>;
        break;

      case "blog":
        if (colIndex === 0) return <div className="max-w-[300px]"><p className="font-medium truncate">{item.title}</p></div>;
        if (colIndex === 1) return <Badge variant={item.is_published ? "default" : "secondary"}>{item.is_published ? "Published" : "Draft"}</Badge>;
        if (colIndex === 2) return new Date(item.created_at).toLocaleDateString();
        if (colIndex === 3) return <Button variant="ghost" size="icon" asChild><Link href={`/admin/blog/${item.id}/edit`}><Pencil className="size-4" /></Link></Button>;
        break;

      case "certifications":
        // 🚨 Database ke columns 'title' aur 'issuing_authority' use kiye hain
        if (colIndex === 0) return <div><p className="font-medium">{item.title}</p><p className="text-xs text-muted-foreground uppercase">{item.kind}</p></div>;
        if (colIndex === 1) return item.issuing_authority || "N/A";
        if (colIndex === 2) {
          if (!item.issue_date) return <span className="text-muted-foreground text-xs">No Date</span>;
          return new Date(item.issue_date).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
          });
        }
        if (colIndex === 3) return <Button variant="ghost" size="icon" asChild><Link href={`/admin/certifications/${item.id}/edit`}><Pencil className="size-4" /></Link></Button>;
        break;

      case "inquiries":
        if (colIndex === 0) return <Badge variant={item.type === "Quote" ? "default" : "secondary"}>{item.type}</Badge>;
        // 🚨 Agar contact form hai toh name, agar quote hai toh contact_person
        if (colIndex === 1) return <div><p className="font-medium">{item.name || item.contact_person}</p><p className="text-xs text-muted-foreground">{item.company || item.email}</p></div>;
        if (colIndex === 2) return <Badge variant={item.status === "new" ? "destructive" : "outline"}>{item.status}</Badge>;
        if (colIndex === 3) return <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</span>;
        if (colIndex === 4) return <Button variant="ghost" size="icon" asChild><Link href={`/admin/inquiries/${item.id}?type=${item.type.toLowerCase()}`}><Pencil className="size-4" /></Link></Button>;
        break;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="pl-8"
        />
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {renderHeaders().map((header, idx) => (
                <TableHead key={idx}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={renderHeaders().length} className="h-24 text-center text-muted-foreground">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, rowIdx) => (
                <TableRow key={rowIdx}>
                  {renderHeaders().map((_, colIdx) => (
                    <TableCell key={colIdx}>{renderCells(item, colIdx)}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of {filteredData.length} entries
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
              <ChevronLeft className="size-4" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              Next <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}