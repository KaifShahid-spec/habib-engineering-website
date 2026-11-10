"use client";

import { DataTable, type Column } from "./DataTable";

export function AdminTableWrapper<T>({ 
  data, 
  columns, 
  searchKey 
}: { 
  data: T[], 
  columns: Column<T>[], 
  searchKey?: string 
}) {
  return <DataTable data={data} columns={columns} searchKey={searchKey as any} />;
}