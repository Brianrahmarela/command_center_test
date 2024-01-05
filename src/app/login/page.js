import React from "react";
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

	return (
		<div className=" flex flex-col justify-center  items-center h-screen" >
			<h4 className="mb-6 scroll-m-20 text-xl font-semibold tracking-tight">
				Fastmart Command Center
			</h4>
			<Card className="max-w-md w-full shadow-lg p-4 rounded-lg" >
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
