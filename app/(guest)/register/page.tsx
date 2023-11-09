import RegisterForm from "@/components/pages/register-form"
import HeadingText from "@/components/heading-text"

export const metadata = {
  title: "Register",
}

export default function Contact() {
  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="Sign up for a new account">
          Register
        </HeadingText>
      </div>
      <RegisterForm />
    </main>
  )
}