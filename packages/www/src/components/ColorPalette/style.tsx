import styled from 'styled-components';

export const ColorsWrap = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
`

export const ColorWrap = styled.label<{color:string}>`
    height: 50px; width: 50px;
    box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.651);
    border-radius: 50%;
    background-color: ${({color})=>color};
    margin: 20px;
    cursor: pointer;
    >input{
        visibility: hidden;
    }
` 