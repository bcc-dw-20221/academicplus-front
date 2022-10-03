import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TableHead,
  Table as TableMui,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  Tooltip
} from "@mui/material";
import SkeletonToTables from "./SkeletonToTable";
interface TableProps {
  [props: string]: any;
}
export default function Table(props: TableProps) {
  console.log(props);
  return (
    <>
      {props.isLoading ? (
        <SkeletonToTables />
      ) : (
        <>
          <Card>
            <CardContent>
              <Box
                sx={{
                  overflow: {
                    xs: "auto",
                    sm: "unset"
                  }
                }}
              >
                <TableMui
                  stickyHeader={props.stickyHeader === true ? true : false}
                  aria-label={
                    props.stickyHeader === true
                      ? "sticky table"
                      : "custom pagination table"
                  }
                  sx={{
                    whiteSpace: "nowrap"
                  }}
                >
                  <TableHead>
                    {props.groupingHeaders && (
                      <TableRow>
                        <TableCell align="center" colSpan={1}>
                          {""}
                        </TableCell>
                        <TableCell align="center" colSpan={4}>
                          teste
                        </TableCell>
                        <TableCell align="center" colSpan={4}>
                          teste
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      {console.log(props.header)}
                      {props.header.map((column: any) => (
                        <TableCell key={column[0]} align={column[1]}>
                          <Tooltip title={column[3] && column[3]}>
                            <Typography
                              component={"span"}
                              variant="h5"
                              fontWeight="600"
                              color={column[2] && column[2]}
                            >
                              {column[0]}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                      ))}
                      {!props.noActions && (
                        <TableCell key={"Ações"} align="center">
                          <Typography
                            component={"span"}
                            variant="h5"
                            fontWeight="600"
                          >
                            Ações
                          </Typography>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.size ? (
                      props.children
                    ) : (
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={props.header.length + 1}
                        >
                          Nenhum dado para mostrar
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  {/* <TableFooter>
                    <TableRow>
                      {props.restocking && props.restocking}
                      {!props.hasNoPagination ? (
                        <TablePagination
                          rowsPerPageOptions={listFilter}
                          // colSpan={6}
                          colSpan={props.header.length + props.noActions ?? 1}
                          count={props.size}
                          rowsPerPage={props.rowsPerPage}
                          page={props.page}
                          SelectProps={{
                            inputprops: {
                              "aria-label": "Linhas por página"
                            },
                            native: false
                          }}
                          labelRowsPerPage="Linhas por Página"
                          onPageChange={props.handleChangePage}
                          onRowsPerPageChange={props.handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      ) : (
                        props.size + " Itens"
                      )}
                    </TableRow>
                  </TableFooter> */}
                </TableMui>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
      );
    </>
  );
}
