import express from 'express';
import sharp from 'sharp';
import fs from 'fs'; // Import fs for file system operations

const imagePath = './images'; // Change this to your desired image storage path
const thumbPath = './images/thumb'; // Change this to your desired thumb folder path

// Resize image (using async/await)
async function resizeImage(req: express.Request, res: express.Response): Promise<void> {
  const imageFilename: string = req.query.filename as string; // Use type assertion for non-optional parameter;
  const width = req.query.width as string;
  const height = req.query.height as string;

  if (!imageFilename) {
    //res.status(400).send('Filename is required');
    res.send('Filename is required');
    res.status(400);
    return;
  }

  if (!width) {
    res.status(400).send('Width is required');
    return;
  }

  if (!height) {
    res.status(400).send('Height is required');
    return;
  }

  try {
    const originalFilePath = `${imagePath}/${imageFilename}.jpg`;

    if (!fs.existsSync(originalFilePath)) {
      console.log(`Invalid image filename: ${imageFilename}`);
      res
        .status(404)
        .send(`Invalid image filename: ${imageFilename}. Please pass a valid filename to filename parameter.`);
      return; // Exit function if invalid image filename
    }

    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);

    if (
      !/^\d+$/.test(req.query.width as string) ||
      !/^\d+$/.test(req.query.height as string) ||
      width <= 0 ||
      height <= 0
    ) {
      console.log(`Invalid image dimensions: ${req.query.width}x${req.query.height}`);
      res
        .status(400)
        .send(
          `Invalid image dimensions: ${req.query.width}x${req.query.height}. Please pass a valid width and height to width and height parameters.`,
        );
      return; // Exit function if invalid image dimensions
    }

    const thumbFilename = `${imageFilename}-${width}x${height}.jpg`; // Generate unique thumb filename
    const thumbFilePath = `${thumbPath}/${thumbFilename}`;

    // Check if file exists in cache (thumb folder)
    if (fs.existsSync(thumbFilePath)) {
      console.log(`Using cached image: ${thumbFilePath}`);
      const thumbBuffer = await fs.promises.readFile(thumbFilePath);
      res.setHeader('Content-Type', 'image/jpeg'); // Adjust based on original image type
      res.send(thumbBuffer);
      return; // Exit function if cached image is found
    }

    // If not cached, read original image and resize
    const imageBuffer = await fs.promises.readFile(originalFilePath);

    const resizedImage = await sharp(imageBuffer).resize({ width, height }).toBuffer();

    // Save resized image to thumb folder for future use
    await fs.promises.writeFile(thumbFilePath, resizedImage);

    res.setHeader('Content-Type', 'image/jpeg'); // Adjust based on original image type
    res.send(resizedImage); // Send the resized image data
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image');
  }
}

export default resizeImage;
