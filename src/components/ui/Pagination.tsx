// src/components/ui/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
}: PaginationProps) {
  // Calcular quais páginas mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    // Sempre mostrar a primeira página
    if (currentPage > 3) {
      pages.push(1);
    }

    // Adicionar ... se necessário
    if (currentPage > 4) {
      pages.push(-1); // -1 representa "..."
    }

    // Calcular páginas ao redor da página atual
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Adicionar ... se necessário
    if (currentPage < totalPages - 3) {
      pages.push(-2); // -2 representa "..."
    }

    // Sempre mostrar a última página
    if (currentPage < totalPages - 2) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Calcular o intervalo de itens sendo mostrado
  const calculateItemRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems || 0);
    return `${start}-${end}`;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {totalItems && (
          <div>
            <p className="text-sm text-gray-700">
              Mostrando{" "}
              <span className="font-medium">{calculateItemRange()}</span> de{" "}
              <span className="font-medium">{totalItems}</span> resultados
            </p>
          </div>
        )}

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Paginação"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
                currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-50"
              )}
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {getPageNumbers().map((page, index) => {
              if (page < 0) {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={cn(
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20",
                    page === currentPage
                      ? "bg-primary-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  )}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
                currentPage === totalPages
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-50"
              )}
            >
              <span className="sr-only">Próxima</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>

      {/* Versão mobile da paginação */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium",
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-50"
          )}
        >
          Anterior
        </button>

        <span className="text-sm text-gray-700">
          {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium",
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-50"
          )}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
