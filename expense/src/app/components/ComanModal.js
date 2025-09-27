import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'

const ComanModal = ({ open, onClose, title, children, onSubmit }) => {
    return (
        <div>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle
                p={4}
                style={{marginBottom:"15px"}}
                >{title}</DialogTitle>
                <DialogContent style={{padding:"15px"}}>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ComanModal