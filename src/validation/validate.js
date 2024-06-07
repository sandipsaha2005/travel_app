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
	
})
