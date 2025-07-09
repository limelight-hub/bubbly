import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Discord Clone</h1>
          <p className="text-gray-400">Sign in to start chatting</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-700 border border-gray-600",
            },
          }}
          redirectUrl="/setup"
        />
      </div>
    </div>
  )
}
