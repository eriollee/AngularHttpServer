import * as express from 'express'
import {Server } from 'ws';

const app = express();


export class Product  {
	constructor(
		public id:number,
		public title:string,
		public price:number,
		public rating:number,
		public desc:string,
		public categoires:Array<string>
	){
		// code...
	}
}

export class Comment  {
	constructor(
		public id:number,
		public productId:number,
		public timestamp:string,
		public user:string,
		public rating:number,
		public content:string
	){
		// code...
	}
}


const products:Product[] =[
  		new Product(1,"第一个商品",1.99,3.5,"这是一个商品描述32424322423",["电子产品","硬件设备"]),
  		new Product(2,"第二个商品",2.99,2.5,"这是一个商品描述32424322423",["硬件设备"]),
  		new Product(3,"第三个商品",1.39,1.5,"这是一个商品描述32424322423",["电子产品","硬件设备"]),
  		new Product(4,"第四个商品",1.99,1.5,"这是一个商品描述32424322423",["图书"]),
  		new Product(5,"第五个商品",1.99,1.5,"这是一个商品描述32424322423",["电子产品","硬件设备"]),
];


 const comments:Comment[]=[
  		new Comment(1,1,"2014-02-02 22:22:22","张三",3.5,"不错"),
  		new Comment(2,1,"2018-02-02 23:22:22","李四",1.5,"啊啊不错"),
  		new Comment(3,1,"2017-02-02 11:22:22","张三",4.5,"版本不错"),
  		new Comment(1,2,"2014-02-02 22:22:22","王五",2.0,"不错"),
  		new Comment(2,2,"2014-02-02 22:22:22","小明",3.5,"不错"),
  		new Comment(1,3,"2014-02-02 22:22:22","小王",3.5,"不错"),
  		new Comment(2,3,"2014-02-02 22:22:22","张三",3.5,"不错"),
  	 ]

app.get('/',(req,res)=>{
	res.send("hello expesss");
});


app.get('/api/products',(req,res)=>{
	let result = products;

	let params = req.query;

	console.log(params);
	console.log(params.title);
	if(params.title){
		result = result.filter((p)=> p.title.indexOf(params.title)!==-1);
		console.log(result);
	}

	if(params.price && result.length> 0){
		result = result.filter((p)=> p.price<= parseInt(params.price));
	}


	if(params.category !=="-1" && result.length> 0){
		result = result.filter((p)=> p.categoires.indexOf(params.category)!==-1);
	}


	res.json(result);
});

app.get('/api/product/:id',(req,res)=>{
	res.json(products.find((product)=>product.id == req.params.id));
});

app.get('/api/product/:id/comments',(req,res)=>{
	res.json(comments.filter((comment:Comment)=>comment.productId==req.params.id));
});



const server = app.listen(8000,"localhost",()=>{
	console.log("server start ,address:localhost 8000")
});

const wsServer = new Server({port:8085});
wsServer.on("connection",websocket =>{
		websocket.send("server push positively by eriollee")
		websocket.on("message",message =>{
			console.log("received message" + message)
		})
});

setInterval(()=>{
	if(wsServer.clients){
		wsServer.clients.forEach(client =>{
			client.send("this is timed push ");
		})
	}
},2000);