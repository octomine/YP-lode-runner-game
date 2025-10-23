import { FC } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ClearIcon from '@mui/icons-material/Clear'
import { PauseActionsProps } from './types'

export const PauseActions: FC<PauseActionsProps> = ({
  onReplay,
  onLevelUp,
  onOver,
  noRest,
}) => {
  return (
    <List sx={{ mt: 2, width: 300 }}>
      <ListItem disablePadding>
        <ListItemButton disableRipple disabled={noRest} onClick={onReplay}>
          <ListItemIcon>
            <ReplayIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="replay level" secondary="rest -1" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton disableRipple disabled={noRest} onClick={onLevelUp}>
          <ListItemIcon>
            <ArrowUpwardIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="level up" secondary="rest -1" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton disableRipple onClick={onOver}>
          <ListItemIcon>
            <ClearIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="game over"
            secondary="immortalize to leaderboard"
          />
        </ListItemButton>
      </ListItem>
    </List>
  )
}
