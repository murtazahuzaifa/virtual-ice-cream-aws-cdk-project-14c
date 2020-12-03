import React, { FC } from 'react';
import { Seo, PageLayout, IceCream, Button } from '../components';
import { navigate, PageProps } from 'gatsby';
import * as s from '../pages-styles/index.style';

const Home: FC<PageProps> = ({ }) => {
    return (
        <PageLayout>
            <Seo />
            <s.IcreamWrap>
                <IceCream crmlayer1='#f0ecdb' crmlayer2='#9f5e32' crmlayer3='#5f3c25' />
                <IceCream crmlayer4='#9f5e32' crmlayer3='#f0ecdb' crmlayer2='#5f3c25' />
                <IceCream crmlayer1='orchid' crmlayer4='orchid' crmlayer3='tomato' crmlayer2='#5f3c25' />
                <IceCream crmlayer1='#ecdc93' crmlayer4='#ecdc93' crmlayer3='#cc7033' crmlayer2='#731c1c' />
            </s.IcreamWrap>
            <div style={{ display: 'flex', margin: '30px' }} >
                <Button onClick={() => { navigate('/create-ice-cream') }} >
                    Freeze a new Ice-Cream to send to a friend
                </Button>
            </div>
        </PageLayout>
    )
}

export default Home;
