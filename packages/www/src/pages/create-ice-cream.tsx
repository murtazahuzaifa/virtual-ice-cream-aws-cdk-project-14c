import { PageProps } from 'gatsby';
import React, { FC, useState, useEffect } from 'react';
import { Seo, PageLayout, IceCream, ColorPalette, CreateIceCreamForm, Loader } from '../components';
import { ColorState } from '../components/ColorPalette';
import * as s from '../pages-styles/create-ice-cream.style';
import { IceCreamType } from '../typedefs';

const initialResponse: IceCreamType = {
    id: '',
    iceCreamColor: { color1: "", color2: "", color3: "" },
    message: "",
    receiverName: "",
    senderName: "",
}
let baseUrl = '';

const CreateIceCream: FC<PageProps<{}, {}, {}>> = ({ }) => {

    useEffect(() => { baseUrl = window.location.origin })
    const [col, setCol] = useState<ColorState>({ color1: '#f0ecdb', color2: '#9f5e32', color3: '#5f3c25' });
    const [isFormSubmit, setFromSubmit] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<IceCreamType>(initialResponse);
    const handleResponse = (res: IceCreamType) => { setResponse({ ...res }); setLoading(false); setFromSubmit(true) };
    const onSubmitStart = () => { setLoading(true) };

    return (
        <PageLayout>
            <Seo title="Create Ice-Cream" />
            {!isFormSubmit ?
                <s.Container>
                    <div style={{ width: '180px' }} >
                        <IceCream crmlayer1={col.color1} crmlayer4={col.color1} crmlayer2={col.color2} crmlayer3={col.color3} />
                    </div>
                    <div>
                        <ColorPalette
                            value1={col.color1} onChange1={e => { setCol({ ...col, color1: e.target.value }) }}
                            value2={col.color2} onChange2={e => { setCol({ ...col, color2: e.target.value }) }}
                            value3={col.color3} onChange3={e => { setCol({ ...col, color3: e.target.value }) }}
                        />
                    </div>
                    <div>
                        <CreateIceCreamForm iceCreamColor={col} onSubmitStart={onSubmitStart} onSubmitEnd={handleResponse} />
                    </div>
                </s.Container>
                :
                <s.IcreamCard>
                    <div style={{ width: '180px' }} >
                        <IceCream crmlayer1={response.iceCreamColor.color1} crmlayer4={response.iceCreamColor.color1} crmlayer2={response.iceCreamColor.color2} crmlayer3={response.iceCreamColor.color3} />
                    </div>
                    <s.Card>
                        <p>Share Ice-Cream with this link:</p>
                        <s.Url>{`${baseUrl}/ice-cream/${response.id}`}</s.Url>
                        <s.Details>
                            <div>Dear {response.receiverName},</div>
                            <s.Message>{response.message}</s.Message>
                            <div style={{ margin: 'auto 0 10px 0', textAlign: 'center' }}>____{response.senderName}</div>
                        </s.Details>
                    </s.Card>
                </s.IcreamCard>
            }
            <Loader isLoading={isLoading} />
        </PageLayout>
    )
}

export default CreateIceCream;