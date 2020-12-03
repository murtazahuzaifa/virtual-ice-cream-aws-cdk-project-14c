import { ColorState } from '../components/ColorPalette';

export const query = (receiverName: string, senderName: string, message: string, color1: ColorState['color1'], color2: ColorState['color2'], color3: ColorState['color3']) => (
    `mutation {
        addIceCream( iceCream:{receiverName:"${receiverName}", senderName:"${senderName}", message:"${message}", iceCreamColor:{color1:"${color1}", color2:"${color2}", color3:"${color3}"}} ){
          id 
          receiverName
          senderName
          message
          iceCreamColor{
            color1 color2 color3
          }
        }
      }`)