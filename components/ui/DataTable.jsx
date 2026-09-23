"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

export default function DataTable({
  columns,
  data = [],
  loading = false,
  emptyMessage = "No records found.",
  rowKey = "id",
  pagination,
}) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        <div className="space-y-3 p-4">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="ui-skeleton h-10 w-full"
              />
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="ui-scroll w-full">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--color-foreground-muted)]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm text-[var(--color-foreground-muted)]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row[rowKey] ?? index}
                  className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-muted)]"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-3 py-2.5 text-sm text-[var(--color-foreground)]"
                    >
                      {column.render
                        ? column.render(
                            row,
                            index
                          )
                        : row[column.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3">
          <p className="text-xs text-[var(--color-foreground-muted)]">
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={pagination.onPrevious}
            >
              <ChevronLeft size={14} />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={
                pagination.page >=
                pagination.totalPages
              }
              onClick={pagination.onNext}
            >
              Next
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}