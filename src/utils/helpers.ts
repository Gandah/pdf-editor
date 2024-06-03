import { Template, Font, checkTemplate } from '@pdfme/common';
import { Form, Viewer, Designer } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import {
  text,
  readOnlyText,
  barcodes,
  image,
  readOnlyImage,
  svg,
  readOnlySvg,
  line,
  rectangle,
  ellipse,
} from '@pdfme/schemas';
import plugins from '../plugins';
import { BLANK_PDF } from '@pdfme/common';

const fontObjList = [
  {
    fallback: true,
    label: 'NotoSerifJP-Regular',
    url: '/fonts/NotoSerifJP-Regular.otf',
  },
  {
    fallback: false,
    label: 'NotoSansJP-Regular',
    url: '/fonts/NotoSansJP-Regular.otf',
  },
];

export const getFontsData = async () => {
  const fontDataList = await Promise.all(
    fontObjList.map(async (font) => ({
      ...font,
      data: await fetch(font.url).then((res) => res.arrayBuffer()),
    }))
  );

  return fontDataList.reduce((acc, font) => ({ ...acc, [font.label]: font }), {} as Font);
};

export const readFile = (file: File | null, type: 'text' | 'dataURL' | 'arrayBuffer') => {
  return new Promise<string | ArrayBuffer>((r) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e) => {
      if (e && e.target && e.target.result && file !== null) {
        r(e.target.result);
      }
    });
    if (file !== null) {
      if (type === 'text') {
        fileReader.readAsText(file);
      } else if (type === 'dataURL') {
        fileReader.readAsDataURL(file);
      } else if (type === 'arrayBuffer') {
        fileReader.readAsArrayBuffer(file);
      }
    }
  });
};

export const cloneDeep = (obj: any) => JSON.parse(JSON.stringify(obj));

const getTemplateFromJsonFile = (file: File) => {
  return readFile(file, 'text').then((jsonStr) => {
    const template: Template = JSON.parse(jsonStr as string);
    // eslint-disable-next-line no-useless-catch
    try {
      checkTemplate(template);
      return template;
    } catch (e) {
      throw e;
    }
  });
};

export const downloadJsonFile = (json: any, title: string) => {
  if (typeof window !== 'undefined') {
    const blob = new Blob([JSON.stringify(json)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
};

export const handleLoadTemplate = (
  e: React.ChangeEvent<HTMLInputElement>,
  currentRef: Designer | Form | Viewer | null
) => {
  if (e.target && e.target.files) {
    getTemplateFromJsonFile(e.target.files[0])
      .then((t) => {
        if (!currentRef) return;
        currentRef.updateTemplate(t);
      })
      .catch((e) => {
        alert(`Invalid template file.
--------------------------
${e}`);
      });
  }
};

export const getPlugins = () => {
  return {
    Text: text,
    ReadOnlyText: readOnlyText,
    Line: line,
    Rectangle: rectangle,
    Ellipse: ellipse,
    Image: image,
    ReadOnlyImage: readOnlyImage,
    SVG: svg,
    ReadOnlySvg: readOnlySvg,
    QR: barcodes.qrcode,
    Code128: barcodes.code128,
    Signature: plugins.signature,
  };
};

export const generatePDF = async (currentRef: Designer | Form | Viewer | null) => {
  if (!currentRef) return;
  const template = currentRef.getTemplate();
  const inputs =
    typeof (currentRef as Viewer | Form).getInputs === 'function'
      ? (currentRef as Viewer | Form).getInputs()
      : template.sampledata ?? [];
  const font = await getFontsData();

  const pdf = await generate({
    template,
    inputs,
    options: { font, title: 'pdfme' },
    plugins: getPlugins(),
  });

  const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
  window.open(URL.createObjectURL(blob));
};

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getTemplate = (): Template => ({
  schemas: [
    {
      childName: {
        type: 'text',
        position: {
          x: 25.06,
          y: 24.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 36,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      homeAddress: {
        type: 'text',
        position: {
          x: 25.06,
          y: 65.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      city: {
        type: 'text',
        position: {
          x: 25.06,
          y: 85.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      state: {
        type: 'text',
        position: {
          x: 25.06,
          y: 105.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      zip: {
        type: 'text',
        position: {
          x: 25.06,
          y: 125.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      homePhone: {
        type: 'text',
        position: {
          x: 25.06,
          y: 145.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      // male: {
      //   type: 'checkbox',
      //   position: {
      //     x: 25.06,
      //     y: 165.61,
      //   },
      //   width: 18.7,
      //   height: 18.7,
      //   rotate: 0,
      //   opacity: 1,
      // },
      // female: {
      //   type: 'checkbox',
      //   position: {
      //     x: 45.06,
      //     y: 165.61,
      //   },
      //   width: 18.7,
      //   height: 18.7,
      //   rotate: 0,
      //   opacity: 1,
      // },
      birthday: {
        type: 'text',
        position: {
          x: 25.06,
          y: 185.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      presentAge: {
        type: 'text',
        position: {
          x: 25.06,
          y: 205.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1Name: {
        type: 'text',
        position: {
          x: 25.06,
          y: 225.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1Address: {
        type: 'text',
        position: {
          x: 25.06,
          y: 245.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1City: {
        type: 'text',
        position: {
          x: 25.06,
          y: 265.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1State: {
        type: 'text',
        position: {
          x: 25.06,
          y: 285.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1Zip: {
        type: 'text',
        position: {
          x: 25.06,
          y: 305.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1Phone: {
        type: 'text',
        position: {
          x: 25.06,
          y: 325.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1CellPhone: {
        type: 'text',
        position: {
          x: 25.06,
          y: 345.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1Email: {
        type: 'text',
        position: {
          x: 25.06,
          y: 365.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1Employer: {
        type: 'text',
        position: {
          x: 25.06,
          y: 385.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1WorkAddress: {
        type: 'text',
        position: {
          x: 25.06,
          y: 405.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1WorkPhone: {
        type: 'text',
        position: {
          x: 25.06,
          y: 425.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1WorkHours: {
        type: 'text',
        position: {
          x: 25.06,
          y: 445.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1Instagram: {
        type: 'text',
        position: {
          x: 25.06,
          y: 465.61,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2Name: {
        type: 'text',
        position: {
          x: 105.06,
          y: 24.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2Address: {
        type: 'text',
        position: {
          x: 105.06,
          y: 44.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2City: {
        type: 'text',
        position: {
          x: 105.06,
          y: 64.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2State: {
        type: 'text',
        position: {
          x: 105.06,
          y: 84.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2Zip: {
        type: 'text',
        position: {
          x: 105.06,
          y: 104.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2Phone: {
        type: 'text',
        position: {
          x: 105.06,
          y: 124.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2CellPhone: {
        type: 'text',
        position: {
          x: 105.06,
          y: 144.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2Email: {
        type: 'text',
        position: {
          x: 105.06,
          y: 164.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2Employer: {
        type: 'text',
        position: {
          x: 105.06,
          y: 184.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2WorkAddress: {
        type: 'text',
        position: {
          x: 105.06,
          y: 204.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2WorkPhone: {
        type: 'text',
        position: {
          x: 105.06,
          y: 224.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2WorkHours: {
        type: 'text',
        position: {
          x: 105.06,
          y: 244.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent2Instagram: {
        type: 'text',
        position: {
          x: 105.06,
          y: 264.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      mainEmail: {
        type: 'text',
        position: {
          x: 105.06,
          y: 284.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#FF0000',
        fontName: 'Arial',
      },
      pediatricianName: {
        type: 'text',
        position: {
          x: 105.06,
          y: 304.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      pediatricianPhone: {
        type: 'text',
        position: {
          x: 105.06,
          y: 324.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      dentistName: {
        type: 'text',
        position: {
          x: 105.06,
          y: 344.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      dentistPhone: {
        type: 'text',
        position: {
          x: 105.06,
          y: 364.35,
        },
        width: 77.77,
        height: 18.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      allergies: {
        type: 'text',
        position: {
          x: 105.06,
          y: 384.35,
        },
        width: 77.77,
        height: 38.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      specialNeeds: {
        type: 'text',
        position: {
          x: 105.06,
          y: 424.35,
        },
        width: 77.77,
        height: 38.7,
        rotate: 0,
        opacity: 1,
        fontSize: 12,
        fontColor: '#000000',
        fontName: 'Arial',
      },
      parent1Signature: {
        type: 'signature',
        position: {
          x: 105.06,
          y: 464.35,
        },
        width: 77.77,
        height: 38.7,
        rotate: 0,
        opacity: 1,
      },
      parent2Signature: {
        type: 'signature',
        position: {
          x: 105.06,
          y: 504.35,
        },
        width: 77.77,
        height: 38.7,
        rotate: 0,
        opacity: 1,
      },
    },
  ],
  basePdf:
  BLANK_PDF,
  sampledata: [
    {
      childName: 'John Doe',
      homeAddress: '123 Elm St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      homePhone: '555-1234',
      male: '',
      female: '',
      birthday: '01/01/2018',
      presentAge: '6 years',
      parent1Name: 'Jane Doe',
      parent1Address: '123 Elm St',
      parent1City: 'Springfield',
      parent1State: 'IL',
      parent1Zip: '62701',
      parent1Phone: '555-1234',
      parent1CellPhone: '555-5678',
      parent1Email: 'jane.doe@example.com',
      parent1Employer: 'Company ABC',
      parent1WorkAddress: '456 Oak St',
      parent1WorkPhone: '555-9876',
      parent1WorkHours: '9am - 5pm',
      parent1Instagram: '@jane.doe',
      parent2Name: 'John Smith',
      parent2Address: '789 Pine St',
      parent2City: 'Shelbyville',
      parent2State: 'IL',
      parent2Zip: '62702',
      parent2Phone: '555-4321',
      parent2CellPhone: '555-8765',
      parent2Email: 'john.smith@example.com',
      parent2Employer: 'Company XYZ',
      parent2WorkAddress: '123 Birch St',
      parent2WorkPhone: '555-6543',
      parent2WorkHours: '8am - 4pm',
      parent2Instagram: '@john.smith',
      mainEmail: 'john.doe@example.com',
      pediatricianName: 'Dr. Brown',
      pediatricianPhone: '555-1111',
      dentistName: 'Dr. White',
      dentistPhone: '555-2222',
      allergies: 'Peanuts, Tree nuts',
      specialNeeds: 'Vegetarian, sensitive skin',
      parent1Signature: 'base64 encoded signature',
      parent2Signature: 'base64 encoded signature',
    },
  ],
  columns: [
    'childName', 'homeAddress', 'city', 'state', 'zip', 'homePhone', 
    'male', 'female', 'birthday', 'presentAge', 'parent1Name', 'parent1Address', 
    'parent1City', 'parent1State', 'parent1Zip', 'parent1Phone', 'parent1CellPhone', 
    'parent1Email', 'parent1Employer', 'parent1WorkAddress', 'parent1WorkPhone', 
    'parent1WorkHours', 'parent1Instagram', 'parent2Name', 'parent2Address', 
    'parent2City', 'parent2State', 'parent2Zip', 'parent2Phone', 'parent2CellPhone', 
    'parent2Email', 'parent2Employer', 'parent2WorkAddress', 'parent2WorkPhone', 
    'parent2WorkHours', 'parent2Instagram', 'mainEmail', 'pediatricianName', 
    'pediatricianPhone', 'dentistName', 'dentistPhone', 'allergies', 'specialNeeds', 
    'parent1Signature', 'parent2Signature'
  ],
});



