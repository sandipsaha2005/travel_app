import { z } from 'zod';

export const loginValidate = z.object({
    role:z.string().nonempty({message: "Choose a role"}),
	email: z
		.string()
		.email({ message: 'Invalid Email Format' })
		.nonempty({ message: 'Please enter Email' }),
	password: z.string().nonempty({message: "Enter password"}),

});

export const registerValidate = z.object({
	name:z.string().nonempty({message: "Enter you name"}),
	phone:z.string().nonempty({message:"Enter mobile number"}),
	email: z
		.string()
		.email({ message: 'Invalid Email Format' })
		.nonempty({ message: 'Please enter Email' }),
	role:z.string().nonempty({message: "Choose a role"}),
	password:z.string().nonempty({message: "Enter password"}),
})

export const createDestValidate = z.object({
	title:z.string().nonempty({message: "Enter Title"}),
	categroy:z.string().nonempty({message: "Enter Category"}),
	country:z.string().nonempty({message: "Enter Country"}),
	city:z.string().nonempty({message: "Enter City"}),
	description:z.string().nonempty({message: "Enter Description"}),
	priceRange:z.string().nonempty({message: "Enter Price Range"}),
	todo1:z.string().nonempty({message:'Enter the TODO 1'}),
	todo2:z.string().nonempty({message:'Enter the TODO 2'}),
	todo3:z.string().nonempty({message:'Enter the TODO 3'}),
	todo4:z.string().nonempty({message:'Enter the TODO 4'}),
	neighburHood:z.string().nonempty({message:"Enter Neighbur Hood "}),
	guideName:z.string().nonempty("Enter the Guide Name")
})

export const createBookingValidate = z.object({
	name:z.string().nonempty({message:'Enter the Name'}),
	email:z.string().nonempty({message:'Enter the Email'}),
	phone:z.string().nonempty({message:'Enter the Phone Number'}),
	// fromDate:z.date(),
	// toDate:z.date(),
	people:z.string().nonempty({message:'Enter the No of People'}),
})

