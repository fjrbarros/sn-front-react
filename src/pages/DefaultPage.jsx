import React from 'react';
import Box from '@material-ui/core/Box';
import { TopBar } from '../components/Index';

export default function DefaultPage(props) {
    const { children } = props;
    return (
        <Box>
            <TopBar />
            <Box style={{ height: 'calc(100vh - 64px)' }}>
                {children}
            </Box>
        </Box>
    );
}