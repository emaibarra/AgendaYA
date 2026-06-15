import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Login
      </h1>

      <LoginForm />
    </main>
  );
}