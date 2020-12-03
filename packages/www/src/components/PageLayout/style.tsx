import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
`

export const Header = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
    font-style: italic;
    text-align: center;
    >a{
        text-decoration: none;
        >h1{
        font-family: Yellowtail,cursive;
        font-size: 50px;
        margin: 10px;
        color:whitesmoke;
        text-shadow: 0px 0px 10px #046369;
        cursor: pointer;
    }
    }
    >p{
        font-size: 30px;
        color:whitesmoke;
        text-shadow: 0px 0px 5px #046369;
    }
`

export const ChildWrapper = styled.div`
    max-width: 1080px;
    margin: 40px auto;
    padding: 0 20px;
`
