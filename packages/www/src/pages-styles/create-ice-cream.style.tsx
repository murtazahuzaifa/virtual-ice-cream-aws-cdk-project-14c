import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    flex-wrap: wrap;
`

export const ColorsWrap = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
`

export const ColorWrap = styled.label<{color:string}>`
    height: 50px; width: 50px;
    box-shadow: 0 0 8px 5px rgba(0,0,0,1);
    border-radius: 50%;
    background-color: ${({color})=>color};
    margin: 20px;
    >input{
        visibility: hidden;
    }
` 


/////////////////////////////////////////////////////////
export const IcreamCard = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

`

export const Card = styled.div`
    width: 500px;
    font-size: 25px;
    font-style: italic;
    >p{
        margin: 10px;
        font-weight: bolder;
        color: whitesmoke;

    }
`

export const Url = styled.div`
    font-size: 20px;
    background-color: rgba(23, 78, 7, 0.486);
    padding: 8px;
    margin: 10px 0;
`
export const Details = styled.div`
    background-color: rgba(226, 164, 139, 0.171);
    font-family: Yellowtail,cursive;
    min-height: 250px;
    padding:10px;
    display: flex;
    flex-direction: column;
`

export const Message = styled.p`
    font-size: 20px;
    text-indent: 30px;
`