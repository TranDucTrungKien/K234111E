const express=require("express")
const app=express()
const port=3000
const morgan=require("morgan")
const fs = require('fs')
const path=require("path")
const crypto = require('crypto')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

app.use(morgan("combined"))
app.use(express.static(path.join(__dirname, "public")))

const cors=require("cors")
app.use(cors())

// Add body parser for JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Define paths
const booksFilePath = path.join(__dirname, 'data', 'books.json')

// Create data directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'))
}
//create default API
app.get("/", (req, res)=> {
    res.send("Hello Restful API")
})
app.get("/about", (req, res)=> {
    tbl = 
    `<table border="8">
        <tr>
            <th>Name:</th>
            <td>Sang</td>
        </tr>
        <tr>
            <th>ID:</th> 
            <td>K234111416</td>
        </tr>
        <tr>
            <th>Image:</th>
            <td>
                <img src="/images/shin1.jpg" alt="Sang's Image" />
            </td>
        </tr>
    </table>`
    res.send(tbl)
})
// let database=[
// {"BookId":"BK001","BookName":"Kỹ thuật lập trình cơ bản", "Tensach":"Kỹ thuật lập trình cơ bản", "Price":70, "Giaban":"70,000 VNĐ", "Image":"b1.png", "Mota":"Cuốn sách về lập trình cơ bản", "Ngaycapnhat":"01/01/2024", "Soluongton":"50", "MaCD":"CD01", "MaNXB":"NXB01"},
// {"BookId":"BK002","BookName":"Kỹ thuật lập trình nâng cao", "Tensach":"Kỹ thuật lập trình nâng cao", "Price":100, "Giaban":"100,000 VNĐ", "Image":"b2.png", "Mota":"Cuốn sách về lập trình nâng cao", "Ngaycapnhat":"15/01/2024", "Soluongton":"30", "MaCD":"CD01", "MaNXB":"NXB01"},
// {"BookId":"BK003","BookName":"Máy học cơ bản","Tensach":"Máy học cơ bản", "Price":200, "Giaban":"200,000 VNĐ", "Image":"b3.png", "Mota":"Giới thiệu về machine learning", "Ngaycapnhat":"20/01/2024", "Soluongton":"20", "MaCD":"CD02", "MaNXB":"NXB02"},
// {"BookId":"BK004","BookName":"Máy học nâng cao","Tensach":"Máy học nâng cao", "Price":300, "Giaban":"300,000 VNĐ", "Image":"b4.png", "Mota":"Kiến thức nâng cao về AI", "Ngaycapnhat":"25/01/2024", "Soluongton":"15", "MaCD":"CD02", "MaNXB":"NXB02"},
// {"BookId":"BK005","BookName":"Lập trình Robot cơ bản","Tensach":"Lập trình Robot cơ bản", "Price":250, "Giaban":"250,000 VNĐ", "Image":"b5.png", "Mota":"Lập trình robot tự động", "Ngaycapnhat":"30/01/2024", "Soluongton":"25", "MaCD":"CD03", "MaNXB":"NXB03"},
// ]

// GET all books from file
app.get("/books", cors(), (req, res) => {
  try {
    const data = readBooksFromFile();
    res.send(data.books);
  } catch (error) {
    res.status(500).send({ error: 'Error reading books data' });
  }
});

app.get("/books/:id", cors(), (req, res) => {
  try {
    const data = readBooksFromFile();
    const id = req.params["id"];
    let p = data.books.find(x => x.BookId == id);
    if (p) {
      res.send(p);
    } else {
      res.status(404).send({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error reading book data' });
  }
});

app.post("/books", cors(), (req, res) => {
  try {
    const data = readBooksFromFile();
    // Check if BookId already exists
    if (data.books.some(b => b.BookId === req.body.BookId)) {
      return res.status(400).send({ error: 'BookId already exists' });
    }
    data.books.push(req.body);
    writeBooksToFile(data);
    res.send(data.books);
  } catch (error) {
    res.status(500).send({ error: 'Error creating book' });
  }
});

app.put("/books/:id", cors(), (req, res) => {
  try {
    const data = readBooksFromFile();
    const id = req.params["id"];
    let index = data.books.findIndex(x => x.BookId == id);
    if (index !== -1) {
      data.books[index] = req.body;
      writeBooksToFile(data);
      res.send(data.books[index]);
    } else {
      res.status(404).send({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error updating book' });
  }
});

app.delete("/books/:id", cors(), (req, res) => {
  try {
    const data = readBooksFromFile();
    const id = req.params["id"];
    let index = data.books.findIndex(x => x.BookId == id);
    if (index !== -1) {
      data.books.splice(index, 1);
      writeBooksToFile(data);
      res.send({ message: "Book deleted successfully", books: data.books });
    } else {
      res.status(404).send({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error deleting book' });
  }
});

function readBooksFromFile() {
  try {
    const data = fs.readFileSync(booksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create with default data
    const defaultData = {
      "books": [
        {"BookId":"BK001","BookName":"Kỹ thuật lập trình cơ bản", "Tensach":"Kỹ thuật lập trình cơ bản", "Price":70000, "Giaban":"70,000 VNĐ", "Image":"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%230066CC' width='150' height='150'/%3E%3Ctext fill='%23FFFFFF' font-family='Arial' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EBook 1%3C/text%3E%3C/svg%3E", "Mota":"Cuốn sách về lập trình cơ bản", "Ngaycapnhat":"01/01/2024", "Soluongton":"50", "MaCD":"CD01", "MaNXB":"NXB01"},
        {"BookId":"BK002","BookName":"Kỹ thuật lập trình nâng cao", "Tensach":"Kỹ thuật lập trình nâng cao", "Price":100000, "Giaban":"100,000 VNĐ", "Image":"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%23FF6633' width='150' height='150'/%3E%3Ctext fill='%23FFFFFF' font-family='Arial' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EBook 2%3C/text%3E%3C/svg%3E", "Mota":"Cuốn sách về lập trình nâng cao", "Ngaycapnhat":"15/01/2024", "Soluongton":"30", "MaCD":"CD01", "MaNXB":"NXB01"},
        {"BookId":"BK003","BookName":"Máy học cơ bản","Tensach":"Máy học cơ bản", "Price":200000, "Giaban":"200,000 VNĐ", "Image":"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%2333CC33' width='150' height='150'/%3E%3Ctext fill='%23FFFFFF' font-family='Arial' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EBook 3%3C/text%3E%3C/svg%3E", "Mota":"Giới thiệu về machine learning", "Ngaycapnhat":"20/01/2024", "Soluongton":"20", "MaCD":"CD02", "MaNXB":"NXB02"},
        {"BookId":"BK004","BookName":"Máy học nâng cao","Tensach":"Máy học nâng cao", "Price":300000, "Giaban":"300,000 VNĐ", "Image":"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%23FFCC00' width='150' height='150'/%3E%3Ctext fill='%23000000' font-family='Arial' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EBook 4%3C/text%3E%3C/svg%3E", "Mota":"Kiến thức nâng cao về AI", "Ngaycapnhat":"25/01/2024", "Soluongton":"15", "MaCD":"CD02", "MaNXB":"NXB02"},
        {"BookId":"BK005","BookName":"Lập trình Robot cơ bản","Tensach":"Lập trình Robot cơ bản", "Price":250000, "Giaban":"250,000 VNĐ", "Image":"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%23CC0066' width='150' height='150'/%3E%3Ctext fill='%23FFFFFF' font-family='Arial' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EBook 5%3C/text%3E%3C/svg%3E", "Mota":"Lập trình robot tự động", "Ngaycapnhat":"30/01/2024", "Soluongton":"25", "MaCD":"CD03", "MaNXB":"NXB03"}
      ]
    };
    fs.writeFileSync(booksFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

function writeBooksToFile(data) {
  try {
    fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing to file:', error);
    return false;
  }
}

// MoMo Payment Configuration
const MOMO_CONFIG = {
  partnerCode: 'MOMO',
  accessKey: 'F8BBA842ECF85',
  secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
  endpoint: 'https://test-payment.momo.vn/v2/gateway/api/create',
  redirectUrl: 'http://localhost:4200/payment-result',
  ipnUrl: 'http://localhost:3000/payment/momo/callback',
  requestType: 'captureWallet',
  extraData: ''
};

// MoMo Payment Endpoint
app.post("/payment/momo", cors(), async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const orderId = `MOMO${Date.now()}`;
    const requestId = uuidv4();
    const orderInfo = `Thanh toán đơn hàng ${orderId}`;
    
    // Create raw signature
    const rawSignature = `accessKey=${MOMO_CONFIG.accessKey}&amount=${amount}&extraData=${MOMO_CONFIG.extraData}&ipnUrl=${MOMO_CONFIG.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${MOMO_CONFIG.partnerCode}&redirectUrl=${MOMO_CONFIG.redirectUrl}&requestId=${requestId}&requestType=${MOMO_CONFIG.requestType}`;
    
    // Generate signature using HMAC SHA256
    const signature = crypto
      .createHmac('sha256', MOMO_CONFIG.secretKey)
      .update(rawSignature)
      .digest('hex');

    // Request body to MoMo
    const requestBody = {
      partnerCode: MOMO_CONFIG.partnerCode,
      accessKey: MOMO_CONFIG.accessKey,
      requestId: requestId,
      amount: amount.toString(),
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: MOMO_CONFIG.redirectUrl,
      ipnUrl: MOMO_CONFIG.ipnUrl,
      extraData: MOMO_CONFIG.extraData,
      requestType: MOMO_CONFIG.requestType,
      signature: signature,
      lang: 'vi'
    };

    console.log('MoMo Request:', requestBody);

    // Send request to MoMo
    const response = await axios.post(MOMO_CONFIG.endpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('MoMo Response:', response.data);

    if (response.data && response.data.resultCode === 0) {
      res.json({
        success: true,
        payUrl: response.data.payUrl,
        orderId: orderId
      });
    } else {
      res.status(400).json({
        error: 'Failed to create payment',
        message: response.data.message || 'Unknown error'
      });
    }
  } catch (error) {
    console.error('MoMo Payment Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// MoMo IPN (Instant Payment Notification) callback
app.post("/payment/momo/callback", cors(), (req, res) => {
  console.log('MoMo IPN Callback:', req.body);
  
  // Verify signature
  const {
    partnerCode,
    orderId,
    requestId,
    amount,
    orderInfo,
    orderType,
    transId,
    resultCode,
    message,
    payType,
    responseTime,
    extraData,
    signature
  } = req.body;

  // Build raw signature for verification
  const rawSignature = `accessKey=${MOMO_CONFIG.accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
  
  const computedSignature = crypto
    .createHmac('sha256', MOMO_CONFIG.secretKey)
    .update(rawSignature)
    .digest('hex');

  if (signature === computedSignature) {
    console.log('Valid signature');
    // Process the payment result
    // Update order status in database, etc.
    res.status(200).json({ message: 'OK' });
  } else {
    console.log('Invalid signature');
    res.status(400).json({ message: 'Invalid signature' });
  }
});

app.listen(port, ()=>{
    console.log(`My Server listening on port ${port}`)
    console.log(`Books API: http://localhost:${port}/books`)
    console.log(`MoMo Payment API: http://localhost:${port}/payment/momo`)
    console.log(`Books data file: ${booksFilePath}`)
})