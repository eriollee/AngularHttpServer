import * as express from 'express'

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


const products:Product[] =[
  		new Product(1,"第一个商品",1.99,3.5,"这是一个商品描述32424322423",["电子产品","硬件设备"]),
  		new Product(2,"第二个商品",2.99,2.5,"这是一个商品描述32424322423",["硬件设备"]),
  		new Product(3,"第三个商品",1.39,1.5,"这是一个商品描述32424322423",["电子产品","硬件设备"]),
  		new Product(4,"第四个商品",1.99,1.5,"这是一个商品描述32424322423",["图书"]),
  		new Product(5,"第五个商品",1.99,1.5,"这是一个商品描述32424322423",["电子产品","硬件设备"]),
];

app.get('/',(req,res)=>{
	res.send("hello expesss");
});


app.get('/api/products',(req,res)=>{
	res.json(products);
});

app.get('/api/product/:id',(req,res)=>{
	res.json(products.find((product)=>product.id == req.params.id));
});


const server = app.listen(8000,"localhost",()=>{
	console.log("server start ,address:localhost 8000")
});