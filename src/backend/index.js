const express = require(`express`);
const multer = require(`multer`);
const jwt = require(`jsonwebtoken`);
const bodyParser = require(`body-parser`);
const app = express();
const cors = require(`cors`);
const fs = require(`fs`);
const path = require(`path`);
const port = 5000
const address = `http://192.168.43.93`
const mongoose = require('mongoose')

// App use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
 
// Multer logic

// logofolio
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/logofolio/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + `-` + file.originalname);
  }
});

const logofolio = multer({ storage:storage1 });

// Thumbnails 

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/thumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + `-` + file.originalname);
  }
});

const thumbnails = multer({ storage:storage2 });

// Albumcovers

const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/albumcovers/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + `-` + file.originalname);
  }
});

const albumcovers = multer({ storage:storage3 });

// Clients

const storage4 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/clients/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const clients = multer({ storage:storage4 });


// Organisations


const storage5 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/organisations/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const organisations = multer({ storage:storage5 });

// Cover Logofolio

const storage6 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/coverlogofolio/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const coverlogofolio = multer({ storage:storage6 });

// Cover Thumbnails

const storage7 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/coverthumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const coverthumbnails = multer({ storage:storage7 })
;
// Cover Album Covers

const storage8 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/coveralbumcovers/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const coveralbumcovers = multer({ storage:storage8 });

// Main Logo

const storage9 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/mainlogo/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const mainlogo = multer({ storage:storage9 });

// Main Logo

const storage10 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/footerlogo/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const footerlogo = multer({ storage:storage10 });

// Live Stream Thumbnails

const storage11 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/livestreamthumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const livestreamthumbnails = multer({ storage:storage11 });

// Manipulated Thumbnails

const storage12 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/manipulatedthumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const manipulatedthumbnails = multer({ storage:storage12 });

// Realistic Thumbnails

const storage13 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/realisticthumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const realisticthumbnails = multer({ storage:storage13 });

// Mr Beast Type Thumbnails

const storage14 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/mrbeasttypethumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const mrbeasttypethumbnails = multer({ storage:storage14 });

// Cover Live Stream Thumbnails

const storage15 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/coverlivestreamthumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const coverlivestreamthumbnails = multer({ storage:storage15 });

// Cover Manipulated Thumbnails

const storage16 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/covermanipulatedthumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const covermanipulatedthumbnails = multer({ storage:storage16 });

// Cover Realistic Thumbnails

const storage17 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/coverrealisticthumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const coverrealisticthumbnails = multer({ storage:storage17 });

// Cover MrBeast Type Thumbnails

const storage18 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `adminable/covermrbeasttypethumbnails/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const covermrbeasttypethumbnails = multer({ storage:storage18 });

// Express statics
app.use(`/images/logofolio`, express.static(`adminable/logofolio`));
app.use(`/images/thumbnails`, express.static(`adminable/thumbnails`));
app.use(`/images/albumcovers`, express.static(`adminable/albumcovers`));
app.use(`/images/clients`, express.static(`adminable/clients`));
app.use(`/images/organisations`, express.static(`adminable/organisations`));
app.use(`/images/coverlogofolio`, express.static(`adminable/coverlogofolio`));
app.use(`/images/coverthumbnails`, express.static(`adminable/coverthumbnails`));
app.use(`/images/coveralbumcovers`, express.static(`adminable/coveralbumcovers`));
app.use(`/images/mainlogo`, express.static(`adminable/mainlogo`));
app.use(`/images/footerlogo`, express.static(`adminable/footerlogo`));
app.use(`/images/livestreamthumbnails`, express.static(`adminable/livestreamthumbnails`));
app.use(`/images/manipulatedthumbnails`, express.static(`adminable/manipulatedthumbnails`));
app.use(`/images/realisticthumbnails`, express.static(`adminable/realisticthumbnails`));
app.use(`/images/mrbeasttypethumbnails`, express.static(`adminable/mrbeasttypethumbnails`));
app.use(`/images/coverlivestreamthumbnails`, express.static(`adminable/coverlivestreamthumbnails`));
app.use(`/images/covermanipulatedthumbnails`, express.static(`adminable/covermanipulatedthumbnails`));
app.use(`/images/coverrealisticthumbnails`, express.static(`adminable/coverrealisticthumbnails`));
app.use(`/images/covermrbeasttypethumbnails`, express.static(`adminable/covermrbeasttypethumbnails`));
app.use('/gallery', express.static('gallery'))

// Routes
 
main().catch(err => console.log(err))

async function main () {
await mongoose.connect('mongodb+srv://akkigraphics:akki192205@cluster0.y0rlbx7.mongodb.net/?retryWrites=true&w=majority')
const homeSchema = new mongoose.Schema({
  h1:String,
  p1:String,
  p2:String,
  p3:String
})
 
const Home = mongoose.model('Home', homeSchema)
 
   const overviewSchema =  new mongoose.Schema({
    h1:String,
    p1:String,
    h2:String,
    p2:String,
    p3:String,
    p4:String,
    p5:String,
    p6:String,
    p7:String,
    p8:String,
    p9:String,
    p10:String,
    p11:String,
    p12:String
   })

   const Overview = mongoose.model('Overview', overviewSchema)
    
   const messageSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }, 
    email: {
      type: String,
      required: true
    }, 
    message: {
      type: String,
      required: true
    },
    time: String
  });

   const Message = mongoose.model('Message', messageSchema)

app.get('/getmessenger', async(req, res)=>{
  const emails = await Message.distinct('email');

  res.send(emails);
})

app.get('/getmessagedetails/:id', async(req,res)=>{
  async function getMessageDetailsByEmail(email) {
    try {
      const messages = await Message.find({ email });
  
      res.send(messages);
    } catch (error) {
      res.json({error});
    }
  } 
  
  getMessageDetailsByEmail(req.params.id);
})  

app.post(`/login`, (req, res) => {
  const realPassword = `akki192205`;
  const { password } = req.body;
  if (password !== realPassword) {
    res.status(400).json({ success: false, message: `Incorrect password.` });
  } else {
    const secretKey = `akki_192205`;
    const payload = { password }; 
    const token = jwt.sign(payload, secretKey); 
    res.status(200).json({ success: true, message: `Login successful.`, token });
  }
});

app.post(`/verify`, (req, res) => {
  const secretKey = `akki_192205`;
  const token = req.headers.authtoken;
  if (!token) {
    res.status(401).json({ success: false, message: `Access denied.` });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ success: false, message: `Access denied.` });
    } else {
      res.status(200).json({ success: true, message: `Verification successful.` });
    }
  });
});

app.post(`/logofolio/upload`, logofolio.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here 
  res.redirect(`${address}:8080/$admin`);
}); 

app.post(`/thumbnails/upload`, thumbnails.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here
  res.redirect(`${address}:8080/$admin`); 
});
 
app.post(`/albumcovers/upload`, albumcovers.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here
  res.redirect(`${address}:8080/$admin`);
});

app.post(`/livestreamthumbnails/upload`, livestreamthumbnails.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here
  res.redirect(`${address}:8080/$admin`); 
});

app.post(`/manipulatedthumbnails/upload`, manipulatedthumbnails.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here
  res.redirect(`${address}:8080/$admin`); 
});

app.post(`/realisticthumbnails/upload`, realisticthumbnails.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here
  res.redirect(`${address}:8080/$admin`); 
});

app.post(`/mrbeasttypethumbnails/upload`, mrbeasttypethumbnails.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here
  res.redirect(`${address}:8080/$admin`); 
});

app.post(`/clients/upload`, clients.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here
  res.redirect(`${address}:8080/$admin`);
});

app.post(`/organisations/upload`, organisations.any(`file`), (req, res) => {
  // The uploaded file is available in req.file
  // Handle the file upload logic here
  res.redirect(`${address}:8080/$admin`);
});


// Route handler for uploading and deleting images
app.post('/coverlogofolio/upload', coverlogofolio.single('file'), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/coverlogofolio/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});

app.post(`/coverthumbnails/upload`, coverthumbnails.single(`file`), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/coverthumbnails/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});

app.post(`/coveralbumcovers/upload`, coveralbumcovers.single(`file`), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/coveralbumcovers/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});

app.post(`/coverlivestreamthumbnails/upload`, coverlivestreamthumbnails.single(`file`), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/coverlivestreamthumbnails/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});

app.post(`/covermanipulatedthumbnails/upload`, covermanipulatedthumbnails.single(`file`), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/covermanipulatedthumbnails/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});

app.post(`/coverrealisticthumbnails/upload`, coverrealisticthumbnails.single(`file`), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/coverrealisticthumbnails/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});

app.post(`/covermrbeasttypethumbnails/upload`, covermrbeasttypethumbnails.single(`file`), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/covermrbeasttypethumbnails/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
 
    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});

app.post(`/mainlogo/upload`, mainlogo.single(`file`), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/mainlogo/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});

app.post(`/footerlogo/upload`, footerlogo.single(`file`), (req, res) => {
  const uploadedFile = req.file; // Uploaded file information
  const directoryPath = './adminable/footerlogo/'; // Replace with the actual directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const filesToDelete = files.filter((file) => file !== uploadedFile.originalname);

    filesToDelete.forEach((file) => {
      const filePath = directoryPath + file;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted:', filePath);
      });
    });
  });

  res.redirect(`${address}:8080/$admin`);
});
 
app.delete(`/:directory/delete/:id`, (req, res) => {
  const fileId = req.params.id;
  const directory = req.params.directory
  // Construct the file path using the file ID and assuming the "uploads" folder is in the same directory
  const filePath = path.join(__dirname, "adminable", directory, fileId);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send(`File not found`);
  }

  // Delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(`Internal Server Error`);
    }

    return res.json({success:true, message:`File deleted successfully`})
  });
});

app.get(`/getimages/:directory`, (req, res) => {
  const directory = req.params.directory
  const uploadDir = path.join(__dirname, "adminable", directory);
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send(`Internal Server Error`);
    }
    const imageNames = files.filter(file => {
      const fileExtension = path.extname(file).toLowerCase();
      return [`.png`, `.jpg`, `.jpeg`].includes(fileExtension);
    });
    res.json({ images: imageNames });
  });
});

app.post(`/:d/rename/:id`, (req, res) => {
  const d = req.params.d
  const id = req.params.id;
  const newName = req.query.with;

  const filePath = path.join(`./adminable/${d}`, `${id}`);
  const newFilePath = path.join(`./adminable/${d}`, `${newName}${path.extname(id)}`);

  fs.rename(filePath, newFilePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error renaming file.`);
    } else {
      res.send(`File renamed successfully.`);
    }
  });
});


// Set
const homeid = '647cbcb83b990f51cf4fda38';

app.post('/home/change', async(req,res)=>{

  const {h1,p1,p2,p3} = req.body


Home.findById(homeid)
  .then(textContent => {
    if (textContent) {
      if(h1){
        textContent.h1 = h1  
      }
      if(p1){
        textContent.p1 = p1
      }
      if(p2){
        textContent.p2 = p2
      }
      if(p3){
        textContent.p3 = p3
      }

      return textContent.save();
    }
    throw new Error('Document not found.');
  })
  .then(updatedTextContent => {
    res.send('Updated text content:');
  })
  .catch(error => {
    res.send('Error updating text content');
  });
})

app.get('/home/get', async (req, res) => {
  try {
    const home = await Home.findById(homeid);
    if (!home) {
      // Handle case where document is not found
      return res.status(404).json({ error: 'Home document not found' });
    }
    
    // Access individual fields
    const { h1, p1, p2, p3 } = home;
    res.json({ h1, p1, p2, p3 });
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({ error: 'Internal server error' });
  }
});

const overviewid = "647d95a520043a3e2c844727" 
 
app.post('/overview/change', async(req,res)=>{

const {h1,p1,h2,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12} = req.body 
 
  
Overview.findById(overviewid) 
  .then(textContent => {
    if (textContent) {
      if(h1){
        textContent.h1 = h1 
      }
      if(p1){
        textContent.p1 = p1
      }
      if(h2){
        textContent.h2 = h2
      }
      if(p2){
        textContent.p2 = p2
      }
      if(p3){
        textContent.p3 = p3
      }
      if(p4){
        textContent.p4 = p4
      }
      if(p5){
        textContent.p5 = p5
      }
      if(p6){
        textContent.p6 = p6
      }
      if(p7){
        textContent.p7 = p7
      }
      if(p8){
        textContent.p8 = p8
      }
      if(p9){
        textContent.p9 = p9
      }
      if(p10){
        textContent.p10 = p10
      }
      if(p11){
        textContent.p11 = p11
      }
      if(p12){
        textContent.p12 = p12
      }

      return textContent.save();
    }
    throw new Error('Document not found.');
  })
  .then(updatedTextContent => {
    res.send('Updated text content:');
  })
  .catch(error => {
    res.send('Error updating text content');
  });
})


app.get('/overview/get', async (req, res) => {
  try {
    const overview = await Overview.findById(overviewid);
    if (!overview) {
      // Handle case where document is not found
      return res.status(404).json({ error: 'Overview document not found' });
    }
    
    // Access individual fields
    const { h1, p1, h2, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12 } = overview;
    res.json({ h1, p1, h2, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12 });
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({ error: 'Internal server error' });
  }
});

function getCurrentTime() {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"
  ];

  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const formattedDate = `${day} ${month}, ${year}`;

  return `${formattedTime} ${formattedDate}`;
}

app.post('/sendmessage', (req, res) => {
  const { name, email, message } = req.body;
  const time = getCurrentTime();

  const usermessage = new Message({ name, email, message, time });
  usermessage.save()
    .then(() => {
      res.json({success:true, message:"Message sent successfully."})
    })
    .catch((error) => {
      res.json({success:false, message:error})
    });
});


app.listen(port, () => {
  console.log(`Backend listening at ${address}:${port}`);
});


}