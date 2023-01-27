import express from 'express'
import { s3Upload, s3Delete } from '../src/multer_s3'

const app = express()

app.post('/img/upload', s3Upload.single('img_field_name'), async (req, res, next) => {

  return res.status(200).send(`Successfully upload`)
})

app.post('/img/upload', s3Upload.array('img_field_name', 3), async (req, res, next) => {

  return res.status(200).send(`Successfully upload ${req.files?.length} files`)
})

app.post('/img/delete', async (req, res, next) => {

  const { fileDir, fileName } = req.body

  const result = await s3Delete(fileDir, fileName)
  if (!result) return res.status(400).send('delete error')

  return res.status(200).send('Successfully delete')
})