import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #3dcee7;
    text-shadow: 0 0 3px black;
    font-size: 20px;
    >h1{
        text-align: center;
        margin: 20px 0;
    }
    
    @media (max-width: 700px){ font-size: 15px; }
    @media (max-width: 530px){ font-size: 18px; }
    @media (max-width: 410px){ font-size: 15px; }
`