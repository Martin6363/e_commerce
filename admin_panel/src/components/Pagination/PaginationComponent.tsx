import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect } from "react";

interface TypePagination {
  currentPage: number;
  pageCount: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent = ({ currentPage, pageCount, onPageChange }: TypePagination) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="my-2 flex justify-end bg-purple-500 dark:bg-purple-800 py-3 rounded-lg">
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          onChange={onPageChange}
          page={currentPage}
          renderItem={(item) => (
            <PaginationItem
            sx={{ color: "white" }}
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default PaginationComponent;
