import React from 'react'
import {
  Typography,
  createStyles,
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'

import copyIcon from './assets/copy-icon.svg'
import copy from 'copy-to-clipboard'
import { useDrawerState } from '..'
import OnClickTooltip from './widgets/OnClickTooltip'

const useStyles = makeStyles((theme) =>
  createStyles({
    drawerTitleDiv: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(6.5),
      marginTop: theme.spacing(1.5),
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        marginTop: 0,
      },
    },
    copyLinkDiv: {
      display: 'flex',
    },
    copyIcon: {
      marginRight: 5,
    },
    headerText: {
      marginBottom: '6px',
      [theme.breakpoints.up('md')]: {
        marginTop: '6px',
      },
    },
  }),
)

export default function DrawerHeader() {
  const classes = useStyles()
  const shortUrl = useDrawerState().relevantShortLink
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={classes.drawerTitleDiv}>
      <Typography
        variant={isMobileView ? 'h6' : 'h3'}
        color="primary"
        className={classes.headerText}
      >
        Edit link
      </Typography>
      <OnClickTooltip tooltipText="Short link copied">
        <Button
          onClick={() =>
            copy(
              `${document.location.protocol}//${document.location.host}/${shortUrl}`,
            )
          }
        >
          <div className={classes.copyLinkDiv}>
            <img
              className={classes.copyIcon}
              src={copyIcon}
              alt="Copy short link"
            />
            <Typography variant="subtitle2">Copy short link</Typography>
          </div>
        </Button>
      </OnClickTooltip>
    </div>
  )
}
