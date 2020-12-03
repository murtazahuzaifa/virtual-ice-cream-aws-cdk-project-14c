import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import IceCream, { Props } from './';

export default {
    title: 'Ui-Components/Ice-Cream',
    component: IceCream,
    argTypes: {
        cherry: { control: 'color' },
        crmlayer1: { control: 'color' },
        crmlayer2: { control: 'color' },
        crmlayer3: { control: 'color' },
        crmlayer4: { control: 'color' },
        biscuit: { control: 'color' },
    },
} as Meta


const Template: Story<Props> = (args) => <div style={{ width: '150px' }} ><IceCream {...args} /></div>

export const Basic = Template.bind({});
