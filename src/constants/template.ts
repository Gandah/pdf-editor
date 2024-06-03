import { Template, BLANK_PDF } from '@pdfme/common';


export const template: Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      name: {
        type: 'text',
        position: { x: 15.08, y: 15.08 },
        width: 40,
        height: 10,
      },
      address: {
        type: 'text',
        position: { x: 68.79, y: 14.55},
        width: 40,
        height: 10,
      },
      image: {
        type: 'image',
        position: { x: 136.42, y: 14.97 },
        width: 40,
        height: 40,
      },
    },
  ],
};


export const inputs = [{ name: 'Mr. G.', address: '007', image: 'image' }];



