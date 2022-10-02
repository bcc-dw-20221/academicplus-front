import { Link, Typography } from "@mui/material";
import React from "react";
interface CopyrightProps {
  [prop: string]: any;
}
function Copyright({ ...rest }: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      align="center"
      color="rgba(0, 0, 0, 0.7)"
      {...rest}
    >
      Copyright ©{" "}
      <Link color="inherit" href="#">
        Academic-Plus
      </Link>{" "}
      2022.
    </Typography>
  );
}

export default Copyright;
