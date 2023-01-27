import express, { Application, Request, Response, NextFunction } from 'express'
import http from "http"
import { s3Upload, s3Delete } from '../src/multer_s3'

const app: Application = express()
const port: number = 3000

app.post('/img/upload', s3Upload.single('img_field_name'), async (req: Request, res: Response, next: NextFunction) => {

  return res.status(200).send(`Successfully upload`)
})

app.post('/img/upload', s3Upload.array('img_field_name', 3), async (req: Request, res: Response, next: NextFunction) => {

  return res.status(200).send(`Successfully upload ${req.files?.length} files`)
})

app.post('/img/delete', async (req: Request, res: Response, next: NextFunction) => {

  const { fileDir, fileName } = req.body

  const result = await s3Delete(fileDir, fileName)
  if (!result) return res.status(400).send('delete error')

  return res.status(200).send('Successfully delete')
})

app.all("*", (req: Request, res: Response) => {

  return res.status(404).send()
})

http.createServer(app).listen(port, () => {

  console.log(`http App listening on the port ${port}`);
});