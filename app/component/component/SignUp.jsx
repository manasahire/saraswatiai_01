"use client"
import { Label } from "../ui/lable"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"


export default function Signup() {
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setClientState] = useState(false)
  

  useEffect(() => {
    setClientState(window.innerWidth);
  }, [])

  const handleSubmit = async () => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isSigningUp) {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    
    <div className="flex min-h-screen flex-col bg-background">
      <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>
      <header className="bg-primary py-4 px-6 text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-bold">SARASWATI AI </span>
          </div>
          <p className="text-sm font-medium">Empowering the digital world</p>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h1 className="text-2xl font-bold">{isSigningUp ? "Sign Up" : "Sign In"}</h1>
            <p className="mt-2 text-muted-foreground">
              {isSigningUp ? "Create a new account to get started." : "Welcome back! Sign in to your account."}
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {isSigningUp && (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500 font-medium">{error}</div>}
              {/* <button type="submit" className="w-full" disabled={isLoading}> */}
                <Button>{isLoading ? "Loading..." : (isSigningUp ? "Sign Up" : "Sign In")}</Button>
              {/* </button> */}

              <button type="button" className="w-full" onClick={handleGoogleSignIn}>
                <Button variant="outline" >
                  <ChromeIcon className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isSigningUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-primary hover:underline"
                    onClick={() => setIsSigningUp(false)}
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-primary hover:underline"
                    onClick={() => setIsSigningUp(true)}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted py-4 px-6 text-muted-foreground">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm">&copy; 2024 Saraswati Ai </p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
