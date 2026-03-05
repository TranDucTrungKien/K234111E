const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
const morgan=require("morgan")
app.use(morgan("combined"))
const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Upload directory created');
}

app.use(
fileUpload({
limits: {
fileSize: 10000000, // 10MB
},
abortOnLimit: true,
})
);
// Add this line to serve our index.html page
app.use(express.static('public'));
app.get('/', (req, res) => {
res.sendFile('index.html');
});
const cors=require("cors")
app.use(cors())
app.get("/image/:id",cors(),(req,res)=>{
  try {
    const id = req.params["id"];
    const filePath = path.join(__dirname, 'upload', id);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
      console.log('Serving image:', filePath);
      res.sendFile(filePath);
    } else {
      console.error('Image not found:', filePath);
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({ error: 'Error serving image' });
  }
})
app.post('/upload', (req, res) => {
  try {
    // Get the file that was set to our field named "image"
    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, error: 'No image file uploaded' });
    }
    
    const image = req.files.image;
    const fileName = image.name;
    const uploadPath = __dirname + '/upload/' + fileName;
    
    // Move the uploaded image to our upload folder
    image.mv(uploadPath, (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ success: false, error: 'Error uploading file' });
      }
      
      // Return JSON response with success and file info
      res.json({ 
        success: true, 
        fileName: fileName,
        message: 'File uploaded successfully',
        url: `http://localhost:${port}/image/${fileName}`
      });
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Server error during upload' });
  }
});
app.listen(port, () => {
  console.log(`=================================`);
  console.log(`Upload Server listening on port ${port}`);
  console.log(`Upload endpoint: http://localhost:${port}/upload`);
  console.log(`Image endpoint: http://localhost:${port}/image/:filename`);
  console.log(`Upload directory: ${uploadDir}`);
  console.log(`=================================`);
});