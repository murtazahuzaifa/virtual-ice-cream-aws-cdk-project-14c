import React, { FC } from 'react';
import { Formik, Form, ErrorMessage, Field, FormikHelpers } from 'formik';
import { ColorState } from '../ColorPalette';
import { IceCreamType } from '../../typedefs';
import * as s from './style';
import { query } from '../../services/gqlQuery';
import axios from 'axios';

///////////////////////////////////// Type defs /////////////////////////////////
export interface FormFields {
    to: string; message: string; from: string,
}

type QueryResponseType = { data: { data: { addIceCream: IceCreamType } } }

export interface Props {
    iceCreamColor: ColorState,
    onSubmitStart?: () => void,
    onSubmitEnd?: (res: IceCreamType) => void,
}

const formInitialValues: FormFields = {
    from: '', message: '', to: '',
}

////////////////  Handler funcitons ///////////////////////////////////
const onValidation = (values: FormFields) => {
    const error: { [P in keyof FormFields]?: string } = {}
    if (values.from === '') { error.from = 'Your name required' }
    if (values.message === '') { error.message = 'Message required' }
    if (values.to === '') { error.to = `Receiver's name required` }

    return error
}


/////////////////////////////  Component ////////////////////////////////////////

const CreateIceCreamForm: FC<Props> = ({ iceCreamColor, onSubmitStart, onSubmitEnd }) => {

    const onSubmit = async ({ to, from, message }: FormFields, { setSubmitting, resetForm }: FormikHelpers<FormFields>) => {
        const { color1, color2, color3 } = iceCreamColor;
        onSubmitStart && onSubmitStart();
        const url = 'https://q6bkwbybx5fqpmqpja6r6ovmcy.appsync-api.us-east-2.amazonaws.com/graphql'
        try {
            const { data } = await axios.post<{}, QueryResponseType>(url, JSON.stringify({ query: query(to, from, message, color1, color2, color3) }),
                { headers: { "content-type": "application/json", "x-api-key": process.env.ICE_CREAMS_SOURCE_API_KEY } })

            axios.post(url, JSON.stringify({ query: "{ addIceCreamPage{ success } }" }),
                { headers: { "content-type": "application/json", "x-api-key": process.env.ICE_CREAMS_SOURCE_API_KEY } })

            resetForm();
            const res = data.data.addIceCream
            onSubmitEnd && onSubmitEnd({ id: res.id, message: res.message, receiverName: res.receiverName, senderName: res.senderName, iceCreamColor: res.iceCreamColor })
            setSubmitting(false);
        } catch (err) {
            console.log(err)
            setSubmitting(false);
        }
    }

    return (
        <s.Container>
            <Formik initialValues={formInitialValues} onSubmit={onSubmit} validate={onValidation} >
                {(formik) => (
                    <Form>
                        <s.InputLable htmlFor="_to">
                            <span>To</span>
                            <Field id="_to" name='to' type='text' placeholder={`Receiver's name`} />
                            <ErrorMessage name='code' render={(msg) => <span style={{ color: 'red' }}>{msg}</span>} />
                        </s.InputLable>
                        <s.InputLable htmlFor="_message">
                            <span>Message</span>
                            <Field as={'textarea'} id="_message" name='message' type='text-area' placeholder='Your message' />
                            <ErrorMessage name='name' render={(msg) => <span style={{ color: 'red' }}>{msg}</span>} />
                        </s.InputLable>
                        <s.InputLable htmlFor="_from">
                            <span>From</span>
                            <Field id="_from" name='from' type='text' placeholder='Your name' />
                            <ErrorMessage name='price' render={(msg) => <span style={{ color: 'red' }}>{msg}</span>} />
                        </s.InputLable>
                        <div style={{ display: "flex" }}>
                            <s.SubmitBtn type='submit' disabled={!formik.dirty || !formik.isValid}>Freeze</s.SubmitBtn>
                        </div>
                    </Form>
                )}
            </Formik>
        </s.Container>
    )
}

export default CreateIceCreamForm;
