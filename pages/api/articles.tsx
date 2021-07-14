import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { newsTitle, newsBody } = req.body;

    const filePath = path.join(process.cwd(), 'data', 'articleData.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());

    const newArticle = {
      id: '3',
      name: 'John',
      date: '14 Jul 2021',
      title: newsTitle,
      body: newsBody,
    };

    data.push(newArticle);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', article: newArticle });
  } else {
    res.status(200).json({ message: 'this works' });
  }
}
