import React, { FC, ChangeEventHandler, useState, CSSProperties } from 'react';
import * as s from './style';

///////////////////////////////////// Type defs /////////////////////////////////
export type ColorState = {
    color1: CSSProperties['color']; color2: CSSProperties['color']; color3: CSSProperties['color'];
}

interface Props {
    value1?: string, onChange1?: ChangeEventHandler<HTMLInputElement>, 
    value2?: string, onChange2?: ChangeEventHandler<HTMLInputElement>,
    value3?: string, onChange3?: ChangeEventHandler<HTMLInputElement>,
}

/////////////////////////////  Component ////////////////////////////////////////

const ColorPalette: FC<Props> = ({
    value1 = 'fff', value2 = 'fff', value3 = 'fff', onChange1, onChange2, onChange3,
}) => {
    const [col, setCol] = useState<ColorState>({ color1: '#fff', color2: '#fff', color3: '#fff' })
    return (
        <div>
            <s.ColorsWrap>
                <s.ColorWrap htmlFor='col1' color={value1} >
                    <input id='col1' type="color" value={value1} onChange={onChange1} />
                </s.ColorWrap>
                <s.ColorWrap htmlFor='col2' color={value2} >
                    <input id='col2' type="color" value={value2} onChange={onChange2} />
                </s.ColorWrap>
                <s.ColorWrap htmlFor='col3' color={value3} >
                    <input id='col3' type="color" value={value2} onChange={onChange3} />
                </s.ColorWrap>
            </s.ColorsWrap>
        </div>
    )
}

export default ColorPalette
