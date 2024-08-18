

import { LightbulbOutlined as Lightbulb } from '@mui/icons-material';
import { Typography, Box, styled } from '@mui/material';

const Light = styled(Lightbulb)`
  font-size: 120px;
  color: #37383a;
`;

const Text = styled(Typography)`
  color: #a8a2a5;
  font-size: 22px;
`;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20vh
`

const EmptyNotes = () => {
    return (
        <Container>
            <Light />
            <Text>Notes you add appear here</Text>
        </Container>
    )
}

export default EmptyNotes;