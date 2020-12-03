import styled from 'styled-components';

export const IcreamWrap = styled.div`
    display:flex;
    height: 320px;
    max-width: 700px;
    /* background-color: whitesmoke; */
    margin: 0 auto;
    >div{
        margin: 0 15px;
    }
    @media (max-width: 650px){ height: 280px; }
    @media (max-width: 550px){ height: 220px; }
    @media (max-width: 450px){ height: 160px; }
    @media (max-width: 390px){ height: 120px; }
`

