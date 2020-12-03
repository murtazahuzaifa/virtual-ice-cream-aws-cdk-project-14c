import styled from 'styled-components';

export default  styled.button.attrs(({disabled})=>({
    backgroundColor: disabled? 'rgb(200,200,200)': 'transparent',
    backgroundColorOnHover:  disabled? 'rgb(200,200,200)': 'rgba(150,150,150,.5)',
    boxShadow: disabled? 'none': '0px 0px 10px #046369',
    boxShadowOnHover: disabled? 'none': '0px 0px 10px #046369',
    color: disabled? 'gray': '#e6f8ee'
}))`
    cursor: ${({ disabled }) => disabled && 'not-allowed'};
    user-select: none;
    font-size: 20px;
    padding: 10px;
    border-radius: 15px;
    background-color: ${({backgroundColor})=> backgroundColor };
    color: ${({color})=> color };
    border: 2px #046369;
    box-shadow: ${({boxShadow})=> boxShadow } ;
    margin: 10px auto;
    transition: .15s ease-in-out;
    :hover{ background-color: ${({backgroundColorOnHover})=> backgroundColorOnHover } }
    :active{ box-shadow: ${({boxShadowOnHover})=> boxShadowOnHover }; }

`
// export Button;