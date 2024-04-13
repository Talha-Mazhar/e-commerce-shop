import { Alert } from 'react-bootstrap'

import React from 'react'

const Messages = ({ variant = 'info', children }) => {
    return <Alert variant={variant}>{children}</Alert>
}

export default Messages
