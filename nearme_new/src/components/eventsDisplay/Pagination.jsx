import React from "react";
import { Box, Pagination } from "@mui/material";

function CustomPagination({ pageCount, currentPage, onPageChange }) {
  return (
    <Box display="flex" justifyContent="center" my={2}>
      <Pagination
        count={pageCount}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        onChange={onPageChange}
      />
    </Box>
  );
}

export default CustomPagination;
