'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import Spinner from '@/components/ui/Spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import DataTablePagination from './DataTablePagination';

interface DataTableProps<TData, TValue> {
  /** Column definitions for the table */
  columns: ColumnDef<TData, TValue>[];
  /** Data to be displayed in the table */
  data: TData[];
  /** Whether to show pagination controls */
  pagination?: boolean;
  /** List of page size options */
  paginationList?: number[];
  /** Custom empty state content */
  emptyState?: React.ReactNode | string;
  /** Whether the table is in a loading state */
  isLoading?: boolean;
  /** Custom loading text for screen readers */
  loadingText?: string;
}

function DataTable<TData, TValue>({
  columns,
  data,
  pagination = true,
  paginationList = [10, 20, 25, 30, 40, 50],
  emptyState = null,
  isLoading = false,
  loadingText = 'Loading data...',
}: DataTableProps<TData, TValue>) {
  const t = useTranslations();

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      columnVisibility,
      sorting,
      globalFilter,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <div className="flex items-center justify-center gap-2">
                    <Spinner size="lg" label={loadingText} />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}

            {!isLoading && !table.getRowModel().rows?.length && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyState || t('common.table.noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && <DataTablePagination table={table} paginationList={paginationList} />}
    </div>
  );
}

export default DataTable;
