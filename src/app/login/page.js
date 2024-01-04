import React from "react";
import useAuthSession from "@/lib/useAuthSession";
import { redirect } from "next/navigation";
import FormLogin from "@/components/login/form-login";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

const Login = async () => {
	const user = await useAuthSession();
	if (user) {
		// console.log('msk page login', user)
		redirect("/menu");
	}
	return (
		<div className=" flex flex-col justify-center  items-center h-screen">
			<h4 className="mb-6 scroll-m-20 text-xl font-semibold tracking-tight">
				Fastmart Command Center
			</h4>
			<Card className="max-w-md w-full shadow-lg">
				<CardHeader>
					<CardTitle className="font-bold">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<FormLogin />
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
