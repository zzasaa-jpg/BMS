const http = require('http');
const port = process.env.PORT;
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
// require('dotenv').config();

try {
	mongoose.connect(process.env.URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});	
	console.log("CONNECTED TO DB");
} catch (err) {
	console.error("ERROR on mongoose connecting");
}
//--Schema--
const bank_user_Schema = new mongoose.Schema({
	name: { type: String, required: true },
	mail: { type: String, required: true },
	aadhar_number: { type: Number, required: true },
	phone_number: { type: Number, required: true },
	account_number: { type: Number, required: true },
	password: { type: String, required: true },
	money: { type: Number, required: true },
	login: { type: Boolean, required: true }
});
const Bank_User = mongoose.model('Bank_User', bank_user_Schema);
//-------------------------------------------------------------

const History_Schema = new mongoose.Schema({
	dt: { type: String, required: true },
	transaction_method: { type: String, required: true },
	credit: { type: Number, required: true },
	debit: { type: Number, required: true },
	balance: { type: Number, required: true },
	account_number: { type: Number, required: true },
});
const History = mongoose.model('History', History_Schema);
//-------------------------------------------------------------

const server = http.createServer((req, res) => {
	let filePath;
	let contentType;
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Acceess-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'GET' && req.url === '/') {
		filePath = path.join(__dirname, 'views', 'index.html');
		contentType = 'text/html';
	} else if (req.url.endsWith('.css')) {
		filePath = path.join(__dirname, 'views', req.url);
		contentType = 'text/css';
	} else if (req.url.endsWith('.js')) {
		filePath = path.join(__dirname, 'views', req.url);
		contentType = 'application/javascript';
	} else if (req.url.endsWith(".png") || req.url.endsWith(".jpg") || req.url.endsWith(".jpeg") || req.url.endsWith(".gif")) {
		filePath = path.join(__dirname, 'img', req.url);
		const extension = path.extname(req.url);
		switch (extension) {
			case '.png':
				contentType = 'image/png';
				break;
			case '.jpg':
			case '.jpeg':
				contentType = 'image/jpeg';
				break;
			case '.gif':
				contentType = 'image/gif';
				break;
			default:
				contentType = "application/octet-stream";
		}
	} else if (req.method === 'GET' && req.url === '/login') {
		filePath = path.join(__dirname, 'views', 'login.html');
		contentType = 'text/html';
	} else if (req.method === "POST" && req.url === '/in') {
		login_fun(req, res);
	} else if (req.method === "POST" && req.url === '/sign') {
		signin_fun(req, res);
	} else if (req.method === "GET" && req.url === '/All_User') {
		allUser_fun(req, res);
	} else if (req.method === 'POST' && req.url === '/generator') {
		generator_fun(req, res);
	} else if (req.method === 'GET' && req.url === '/gen') {
		filePath = path.join(__dirname, 'views', 'generator.html');
		contentType = 'text/html';
	} else if (req.method === 'GET' && req.url === '/dashboard') {
		filePath = path.join(__dirname, 'views', 'dashboard.html');
		contentType = 'text/html';
	} else if (req.method === 'POST' && req.url === '/user') {
		user_fun(req, res);
	} else if (req.method === 'PUT' && req.url === '/loginTrue') {
		loginTrue_fun(req, res);
	} else if (req.method === 'POST' && req.url === '/DOM_login_check') {
		DOM_login_check_fun(req, res);
	} else if (req.method === 'PUT' && req.url === '/transaction') {
		transaction_fun(req, res);
	} else if (req.method === 'GET' && req.url === '/balance') {
		balance_fun(req, res);
	} else if (req.method === 'POST' && req.url === '/history') {
		history_fun(req, res);
	} else if (req.method === 'GET' && req.url === '/atm') {
		filePath = path.join(__dirname, 'views', 'atm.html');
		contentType = 'text/html';
	} else if (req.method === 'GET' && req.url === '/debit_card') {
		filePath = path.join(__dirname, 'views', 'debit_card.html');
		contentType = 'text/html';
	} else if (req.method === 'GET' && req.url === '/passbook') {
		filePath = path.join(__dirname, 'views', 'passbook.html');
		contentType = 'text/html';
	} else if (req.method === 'PUT' && req.url === '/withdrawal') {
		withdrawal_fun(req, res);
	} else if (req.method === 'GET' && req.url === '/notification') {
		filePath = path.join(__dirname, 'views', 'notification.html');
		contentType = 'text/html';
	} else if (req.method === 'GET' && req.url === '/slip') {
		filePath = path.join(__dirname, 'views', 'slip.html');
		contentType = 'text/html';
	} else if (req.method === 'GET' && req.url === '/signin') {
		filePath = path.join(__dirname, 'views', 'signin.html');
		contentType = 'text/html';
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not found');
		return;
	}

	if (!fs.existsSync(filePath)) {
		console.error("err", filePath);
		return;
	}

	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Internal Server Error');
			return;
		}
		res.writeHead(200, { 'Content-Type': contentType });
		res.end(data);
	});
});


async function login_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const ac_no_value = parsed_body.ac_no_value || null;
		const password_value = parsed_body.password_value || null;

		if (!ac_no_value || !password_value) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "name and password are required" }));
			return;
		}

		try {
			const existingUser = await Bank_User.findOne({ account_number: ac_no_value, password: password_value });
			if (!existingUser) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "User not found" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: " successfully login", user: existingUser, redirect: "" }));
		} catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error saving data', err }));
		}
	});
}

async function signin_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const name_value = parsed_body.name_value || null;
		const mail_value = parsed_body.mail_value || null;
		const aadhar_number = parsed_body.aadhar_number || null;
		const phone_number = parsed_body.phone_number || null;

		if (!name_value || !mail_value || !aadhar_number || !phone_number) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "name and mail, aadhar_no, phone_no are required" }));
			return;
		}

		try {
			const newBank_User = new Bank_User({ name: name_value, mail: mail_value, aadhar_number: aadhar_number, phone_number: phone_number, password: "XXXX", account_number: 0, money: 0, login: false });
			await newBank_User.save();

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: " successfully Signin", newBank_User, redirect: "/gen" }));
		}
		catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error saving data', err }));
		}
	});
}

async function allUser_fun(req, res) {

	try {
		const all_User = await Bank_User.find({});
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(all_User));
	}
	catch (err) {
		console.error("ERR", err);
		res.writeHead(500, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: 'Error saving data', err }));
	}
}


async function generator_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const ac_no = parsed_body.ac_no || null;
		const password_value = parsed_body.password_value || null;
		const id = parsed_body.id || null;

		if (!id || !password_value || !ac_no) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "password, ac_no are required" }));
			return;
		}

		try {
			const update_Bank_User = await Bank_User.findByIdAndUpdate(id, { account_number: ac_no, password: password_value }, { new: true });
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: " successfully updated ac && password", update_Bank_User }));
		}
		catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error saving data', err }));
		}
	});
}


async function user_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const id = parsed_body.id || null;

		if (!id) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "id are required" }));
			return;
		}

		try {
			const Bank_User_ = await Bank_User.findById(id);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: " successfully user fetched", Bank_User_ }));
		}
		catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error in fetching id', err }));
		}
	});
}

async function loginTrue_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const id = parsed_body.id1 || null;
		const login_value = parsed_body.login_value;

		if (!id || login_value === null || login_value === undefined) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "id or login value are required" }));
			return;
		}

		try {
			const login_true_ = await Bank_User.findByIdAndUpdate(id, { login: login_value }, { new: true });
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: " login true", login_true_ }));
		}
		catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error in fetching id for login true', err }));
		}
	});
}


async function DOM_login_check_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const id = parsed_body.id || null;

		if (!id) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "id are required" }));
			return;
		}

		try {
			const login_check_ = await Bank_User.findById(id);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: " login checked", login_check_ }));
		}
		catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error in fetching id for DOM login check id', err }));
		}
	});
}

async function transaction_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const amount = parsed_body.balance;
		const ac_no = parsed_body.deposit_form_ac_no || null;

		if (amount == null || !ac_no) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "amount are required" }));
			return;
		}

		try {
			const transaction = await Bank_User.findOneAndUpdate({ account_number: ac_no }, { $set: { money: amount } }, { new: true });
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "transaction completed", transaction }));
		}
		catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error in transaction:', err }));
		}
	});
}

async function history_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const dt = parsed_body.date_time || null;
		const transaction_method = parsed_body.transaction_method || null;
		const credit = parsed_body.credit;
		const debit = parsed_body.debit;
		const balance = parsed_body.balance;
		const ac_no = parsed_body.account_number;

		if (!dt || !transaction_method || credit == null || debit == null || balance == null || ac_no == null) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "date, transaction_method, credit, debit, balance, ac_no are required" }));
			return;
		}

		try {
			const history_ = new History({ dt: dt, transaction_method: transaction_method, credit: credit, debit: debit, balance: balance, account_number: ac_no });
			await history_.save();
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: " successfully history saved", history_ }));
		}
		catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error saving data', err }));
		}
	});
}

async function balance_fun(req, res) {
	try {
		const balance = await History.find({});
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(balance));
	}
	catch (err) {
		console.error("ERR", err);
		res.writeHead(500, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: 'Error fetching data(balance):', err }));
	}
}

async function withdrawal_fun(req, res) {
	let body = '';

	req.on('data', chunk => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsed_body = JSON.parse(body || '{}');
		const ac_no = parsed_body.ac_no;
		const withdrawal_slip_amount = parsed_body.withdrawal_slip_amount;

		if (ac_no === null || withdrawal_slip_amount === null) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "ac_no or withdrawal amount are required" }));
			return;
		}

		try {
			const withdrawal_amount = await Bank_User.findOneAndUpdate({ account_number: ac_no }, { $set: { money: withdrawal_slip_amount } }, { new: true });
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "successfull amount withdrawal", withdrawal_amount }));
		}
		catch (err) {
			console.error("ERR", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: 'Error in fetching withdrawal', err }));
		}
	});
}

server.listen(port);
console.log(`http://localhost:${port}`);