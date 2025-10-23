import React, { FC } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { MessageScreenProps } from './types'

export const MessageScreen: FC<MessageScreenProps> = ({
  title,
  message,
  children,
}) => {
  return (
    <Box
      sx={{
        py: 5,
        px: 8,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -75%)',
        zIndex: 'modal',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component={Paper}>
      <Typography mb={4} component="h1" variant="h5">
        {title}
      </Typography>
      <Typography component="h3" variant="h6">
        {message}
      </Typography>
      {children}
      <Typography mt={2} component="h3" variant="h6">
        press any key to resume game
      </Typography>
    </Box>
  )
}
