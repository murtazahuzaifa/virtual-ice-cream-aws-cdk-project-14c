import React, { FC,useEffect } from 'react';
import { PageProps } from 'gatsby';
import { Seo, PageLayout, IceCream } from '../components';
import { ColorState } from '../components/ColorPalette';
import * as  s from './style';

interface QuerySchema {
    data: {
        virtualIceCream: {
            allIceCreams: {
                id: string,
                ts: number,
                receiverName: string
                senderName: string
                message: string
                iceCreamColor: ColorState
            }[]
        }
    }
}
interface PageContext {
    id: string,
    receiverName: string,
    senderName: string,
    message: string,
    iceCreamColor: ColorState,
}

const IceCreamPage: FC<PageProps<QuerySchema, PageContext, {}>> = ({ pageContext, path }) => {
    // console.log(window.location.origin);
    const { message, receiverName, iceCreamColor, senderName, id } = pageContext;
    const { color1, color2, color3 } = iceCreamColor;

    return (
        <PageLayout>
            <Seo title="Ice-Cream" />
            <s.Container>
                <div style={{ width: '180px' }} >
                    <IceCream crmlayer1={color1} crmlayer4={color1} crmlayer2={color2} crmlayer3={color3} />
                </div>
                <s.Card>
                    <p>This Ice-Cream is for you.</p>
                    <s.Details>
                        <div>Dear {receiverName},</div>
                        <s.Message>{message}</s.Message>
                        <div style={{margin:'auto 0 10px 0',textAlign:'center'}}>____{senderName}</div>
                    </s.Details>
                </s.Card>
            </s.Container>

        </PageLayout>
    )
}
export default IceCreamPage;