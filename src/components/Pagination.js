import { Button } from "@/components/ui/button"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-[#008751] text-white hover:bg-[#006741]"
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-[#008751] text-white hover:bg-[#006741]"
        >
          Next
        </Button>
      </div>
    );
}