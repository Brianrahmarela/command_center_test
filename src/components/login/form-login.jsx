"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "../ui/icons";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { API } from "@/config";
import { setCookie } from "cookies-next";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	remember_me: z.boolean().default(false).optional()
});

export default function FormLogin() {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			remember_me: true
		}
	});
	useEffect(() => {
		let dataCookieEmail = Cookies.get('email')
		let dataCookiePassword = Cookies.get('password')
		if(dataCookieEmail && dataCookieEmail){
			let bytesEmail = CryptoJS.AES.decrypt(dataCookieEmail, 'secret key 123');
			let decryptedDataEmail = JSON.parse(bytesEmail.toString(CryptoJS.enc.Utf8));
			form.setValue("email", String(decryptedDataEmail));
			
			let bytesPassword = CryptoJS.AES.decrypt(dataCookiePassword, 'secret key 123');
			let decryptedDataPassword = JSON.parse(bytesPassword.toString(CryptoJS.enc.Utf8));
			form.setValue("password", String(decryptedDataPassword));
		}
	}, [])

	const onSubmit = async (values) => {
		setIsLoading(true)
		if(values.remember_me){
			let encryptedDataEmail = CryptoJS.AES.encrypt(JSON.stringify(values.email), 'secret key 123').toString();
			Cookies.set('email', encryptedDataEmail, { expires: 1 })
			let encryptedDataPass = CryptoJS.AES.encrypt(JSON.stringify(values.password), 'secret key 123').toString();
			Cookies.set('password', encryptedDataPass, { expires: 1 })
		} else {
			Cookies.remove('email') 
			Cookies.remove('password')
		}	

		const response = await API.POST('/auth', values);
		console.log('response /login', response)
		console.log('===> exp acces_token', response.data.content[0]?.expired_access_token_string)

		if (response.meta.code === 200) {
			await setCookie('access_token', response.data.content[0].access_token, {
			  maxAge: response.data.content[0].expired_access_token,
			});
			await setCookie('refresh_token', response.data.content[0].refresh_token);
			window.location.reload();
		  } else {
			showToast(response.meta.message);
			setIsLoading(false)		  
		}
	};
	const showToast = (msgErr) => {
		toast({
			variant: "destructive",
			title: "Error!",
			description: `${msgErr}`,
			action: <ToastAction altText="Try again">Try again</ToastAction>
		});
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username atau Email</FormLabel>
								<FormControl>
									<Input
										placeholder="masukkan alamat email"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="masukkan password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-between">
						<div>
							<FormField
								control={form.control}
								name="remember_me"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-2 space-y-0 ">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Ingat Saya</FormLabel>
										</div>
									</FormItem>
								)}
							/>
						</div>
						<FormLabel>
							<Link href={"/"}>Lupa Kata Sandi?</Link>
						</FormLabel>
					</div>
					<Button disabled={isLoading} type="submit" className="w-full text-md font-semibold ">
						 {!isLoading ? 'Masuk' : <Icons.spinner className="mr-2 h-6 w-8 animate-spin" />}
					</Button>
					<small className="text-sm font-medium leading-none text-center text-muted-foreground">
						Belum Punya Akun? <Link href={"/"}>Hubungi Sales Fastmart</Link>
					</small>
				</form>
			</Form>
			<Toaster />
		</>
	);
}
