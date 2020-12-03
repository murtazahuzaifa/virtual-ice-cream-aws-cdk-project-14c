import styled from 'styled-components';
import Button from '../Button';

export const Container = styled.div`   
    padding: 20px;
    >form{
    }
`

export const InputLable = styled.label`
    display:flex;
    flex-direction: column;
    margin: 20px 0;
    font-size:20px;
    >input, >textarea{
        font-size:17px;
        margin-top: 10px;
        padding: 7px;
        border-radius: 7px;
        border: 2px solid #046369;
        box-shadow: 0 0 5px #046369;
    }
    >textarea{ height:100px;}
    >span{color: #046369; }
`

export const SubmitBtn = styled(Button)`
    font-size: 15px;
` 