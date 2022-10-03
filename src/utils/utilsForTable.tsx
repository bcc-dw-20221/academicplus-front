import {
  Box,
  Chip,
  Grid,
  IconButton,
  TableCell,
  Typography
} from "@mui/material";

export const cellValue = (value: any) => {
  return (
    <Typography component={"span"} variant="h6" fontWeight={400} noWrap={true}>
      {value}
    </Typography>
  );
};
