'use client'
import { useRouter } from "../../node_modules/next/navigation";

export default function Home() {
	const router = useRouter()

	return (
		<main className="min-h-screen flex justify-center items-center flex-col bg-gray-100">
			<div className="text-center">
				<h1 className="text-black text-4xl lg:text-4xl font-bold mb-4">
					<span className="text-5xl lg:text-6xl block">WELCOME TO</span>
					<span className="crimson text-5xl lg:text-9xl block">NOVA</span>
				</h1>
			</div>
			<div className="w-[500px] flex justify-center items-center">
				<button
					className="w-full py-2 bg-crimson text-black rounded btn-transparent m-10"
					onClick={() => router.push('/login')}
				>
					Log In
				</button>
				<button
					className="w-full py-2 bg-crimson text-black rounded btn-transparent m-10"
					onClick={() => router.push('/sign-up')}
				>
					Sign Up
				</button>
			</div>
		</main >
	);
}
