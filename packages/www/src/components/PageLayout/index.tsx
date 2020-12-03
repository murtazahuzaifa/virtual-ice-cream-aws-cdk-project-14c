import React, { FC, ReactNode } from 'react'
import * as s from './style';

export interface Props {
    children: ReactNode;
}

/////////////////////////////  Component ////////////////////////////////////////
const PageLayout: FC<Props> = ({ children }) => {
    return (
        <s.Wrapper>
            <s.Header>
                <a href="/"><h1 >Virtual IceCream</h1></a>
                <p>because we all know someone who deserves some sugar</p>
            </s.Header>
            <s.ChildWrapper>
                {children}
            </s.ChildWrapper>
        </s.Wrapper>
    )
};

export default PageLayout;
