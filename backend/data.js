import bcrypt from "bcryptjs"

const data = {
	users: [
		{
			name: "Inigo",
			email: "admin@admin.com",
			password: bcrypt.hashSync("1234", 8),
			isAdmin: true,
		},
		{
			name: "John Silverhand",
			email: "notadmin@admin.com",
			password: bcrypt.hashSync("1234", 8),
			isAdmin: false,
		}

	],
	products:[
		{
			
			name: "Carrots",
			category: "Vegetable",
			image:"/images/p1.jpg",
			price:9,
			countInStock:  10,
			brand:"Eroski",
			rating:4.5,
			numReviews: 10,
			description: "fresh product"
		},
		{
			
			name: "Tomatoes",
			category: "Fruit",
			image:"/images/p2.jpg",
			price:8,
			countInStock:  1,
			brand:"Eroski",
			rating:4,
			numReviews: 10,
			description: "fresh product"
		},
		{
		
			name: "Pumpkins",
			category: "Vegetable",
			image:"/images/p3.jpg",
			price:12,
			countInStock:  5,
			brand:"Eroski",
			rating:1.5,
			numReviews: 10,
			description: "fresh product"
		},
		{
		
			name: "Oranges",
			category: "Fruit",
			image:"/images/p4.jpg",
			price:5,
			countInStock:  0,
			brand:"Eroski",
			rating:4.5,
			numReviews: 10,
			description: "fresh product"
		},
		{
			
			name: "Honey",
			category: "Honey",
			image:"/images/p5.jpg",
			price:20,
			countInStock:  10,
			brand:"Al-Xara",
			rating:5,
			numReviews: 10,
			description: "fresh product"
		}
	]
}

export default data; 