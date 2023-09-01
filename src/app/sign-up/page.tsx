'use client'

import { useState } from "react";

export default function SignUp() {
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState(Boolean)
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(Boolean);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(Boolean)
	const [checkPassword, setCheckPassword] = useState('');
	const [passwordsMatch, setPasswordsMatch] = useState(-1);

	function signUp(e: any) {
		e.preventDefault();

		if (username.length <= 5) {
			setUsernameError(true)
			return
		}

		if (!validateEmail(email)) {
			setEmailError(true);
			return
		}

		if (password.length < 8) {
			setPasswordError(true)
			return
		}


		if (password === checkPassword) {

			const requestBody = JSON.stringify({ username, email, password });
			console.log("Request Body:", requestBody);

			const postData = async () => {
				const response = await fetch("http://localhost:8080/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: requestBody,
				});

				return response.json();
			};

			postData().then((data) => {
				console.log(data)
			});

			setPasswordsMatch(1);
			setEmailError(false)
			setPasswordError(false)
		} else {
			setPasswordsMatch(0);
		}
	}

	function handleUsername(e: any) {
		setUsername(e)
		setUsernameError(false)
	}

	function handleEmail(e: any) {
		setEmail(e)
		setEmailError(false)
	}

	function validateEmail(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function handlePasswordChange(e: any) {
		setPasswordsMatch(-1)
		setPasswordError(false)
		setPassword(e)
	}

	function handlePasswordCheckChange(e: any) {
		setPasswordsMatch(-1)
		setCheckPassword(e)
	}

	return (
		<main className="min-h-screen flex justify-center items-center bg-gray-100">
			<div className="flex flex-col-reverse lg:flex-row w-full max-w-screen-xl mx-auto">
				{/* Left Side: Sign Up Form */}
				<div className="lg:w-1/2 p-8 flex justify-center items-center">
					<div className="w-full lg:w-4/5">
						<h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
						<form className="space-y-4">
							<input
								type="username"
								value={username}
								onChange={(e) => handleUsername(e.target.value)}
								placeholder="Username"
								className="w-full p-2 border rounded focus:outline-none focus:border-crimson"
							/>
							{usernameError == true && (
								<p className="text-red-500 text-sm">Username should be not less than 8 symbols</p>
							)}
							<input
								type="email"
								value={email}
								onChange={(e) => handleEmail(e.target.value)}
								placeholder="Email"
								className={`w-full p-2 border rounded focus:outline-none focus:border-crimson ${emailError ? 'border-red-500' : 'focus:border-crimson'}`}
							/>
							{emailError == true && (
								<p className="text-red-500 text-sm">Email does not match it's format</p>
							)}
							<input
								type="password"
								value={password}
								onChange={(e) => handlePasswordChange(e.target.value)}
								placeholder="Password"
								className={`w-full p-2 border rounded focus:outline-none ${passwordsMatch === -1
									? "focus:border-crimson"
									: passwordsMatch === 0
										? "border-red-500"
										: "border-green-500"
									}`}
							/>
							{passwordError == true && (
								<p className="text-red-500 text-sm">Passwords' length should be not less than 8 characters</p>
							)}
							<input
								type="password"
								value={checkPassword}
								onChange={(e) => handlePasswordCheckChange(e.target.value)}
								placeholder="Confirm Password"
								className={`w-full p-2 border rounded focus:outline-none ${passwordsMatch === -1
									? "focus:border-crimson"
									: passwordsMatch === 0
										? "border-red-500"
										: "border-green-500"
									}`}
							/>
							{passwordsMatch === 0 && (
								<p className="text-red-500 text-sm">Passwords do not match.</p>
							)}
							<button
								id="sign-up"
								className="w-full py-2 bg-crimson text-black rounded btn-transparent"
								onClick={signUp}
							>
								Sign Up
							</button>
						</form>
						<p className="mt-4 text-sm">
							Already have an account?{' '}
							<a href="/" className="crimson font-bold">
								Log In
							</a>
						</p>
					</div>
				</div>
				{/* Right Side: Welcome Message */}
				<div className="lg:w-1/2 p-8 text-white flex justify-center items-center">
					<div className="text-center">
						<h1 className="text-black text-4xl lg:text-6xl font-bold mb-4">
							WELCOME TO{' '}
							<span className="crimson text-5xl lg:text-9xl">NOVA</span>
						</h1>
					</div>
				</div>
			</div>
		</main>
	);
}
