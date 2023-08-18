export default function SignUp() {
	return (
		<main className="min-h-screen flex justify-center items-center bg-gray-100">
			<div className="flex flex-col-reverse lg:flex-row w-full max-w-screen-xl mx-auto">
				{/* Left Side: Sign Up Form */}
				<div className="lg:w-1/2 p-8 flex justify-center items-center">
					<div className="w-full lg:w-4/5">
						<h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
						<form className="space-y-4">
							<input
								type="email"
								placeholder="Email"
								className="w-full p-2 border rounded focus:outline-none focus:border-crimson"
							/>
							<input
								type="password"
								placeholder="Password"
								className="w-full p-2 border rounded focus:outline-none focus:border-crimson"
							/>
							<input
								type="password"
								placeholder="Confirm Password"
								className="w-full p-2 border rounded focus:outline-none focus:border-crimson"
							/>
							<button
								type="submit"
								className="w-full py-2 bg-crimson text-black rounded btn-transparent"
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
