import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { ResultProps } from './types'

export const Result: FC<ResultProps> = ({ label, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}>
      <Typography component="h1" variant="h5">
        {label}
      </Typography>
      <Typography component="h1" variant="h5">
        {children}
      </Typography>
    </Box>
  )
}
