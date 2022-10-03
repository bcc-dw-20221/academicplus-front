import React from "react";
import { Card, CardContent, Divider, Grid, Skeleton } from "@mui/material";

const SkeletonToTables = () => (
  <Card variant="outlined">
    <CardContent>
      {[1, 2, 3, 4].map(n => (
        <div key={n}>
          <Grid
            container
            spacing={4}
            style={{ marginTop: 6, marginBottom: 6 * 4.5 }}
          >
            <Grid item xs={12}>
              <Skeleton
                animation="wave"
                height={30}
                style={{ marginTop: 3, marginBottom: 3 }}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                animation="wave"
                height={30}
                width={130}
                style={{ marginTop: 3, marginBottom: 3 }}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                animation="wave"
                height={30}
                width={100}
                style={{ marginTop: 3, marginBottom: 3 }}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                animation="wave"
                height={30}
                width={100}
                style={{ marginTop: 3, marginBottom: 3 }}
              />
            </Grid>
          </Grid>
          <Divider variant="middle" />
        </div>
      ))}
    </CardContent>
  </Card>
);
export default SkeletonToTables;
