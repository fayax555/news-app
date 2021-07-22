/* tslint:disable */
import { IncomingForm } from 'formidable';

// you might want to use regular 'fs' and not a promise one
import { promises as fs } from 'fs';

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  // parse form with a Promise wrapper
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  // read file from the temporary path
  const contents = await fs.readFile(data?.files?.nameOfTheInput.path, {
    encoding: 'utf8',
  });

  console.log(contents);

  // contents is a string with the content of uploaded file, so you can read it or store
}
