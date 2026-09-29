"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserPlus, Eye, EyeOff } from "lucide-react";

import  Input  from "@/components/ui/Input";
import  Button  from "@/components/ui/Button";
import { schoolsApi } from "@/lib/api/schools";
import Dropdown from "@/components/ui/Dropdown";
import Select from "@/components/ui/Select";
import { branchesApi } from "@/lib/api/branches";
import { rolesApi } from "@/lib/api/roles";
import { authApi } from "@/lib/api/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role:"",
  });
  
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



//   async function loadeRoles() {
//     try {
//       const response= await rolesApi.list();
//       setRoles(response.data)
      
//     } catch (error) {
//       console.log("error on listing Roles at front end;", error)
//     }
    
//   }

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      // Registration API will be connected here.
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await authApi.saRegister(form);

      console.log("response register done:", response.data)

      window.location.href = "/login";
    } catch {
      setError("Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  async function findBranches(id){
    try {
      const response =await branchesApi.getbySchoolId(id)
      setbranches(response.data)
    } catch (error) {
      console.log("Error on finding branchis  registration form", error)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          Create your account
        </h2>

        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Get started with your school management account.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className=" mb-5 rounded-[var(--radius-md)] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400 "
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* <Select
          id="school-roles"
          label="Select Role"
          hint="Choose the Role."
          onChange={(event) =>
            updateField("role", event.target.value)
          }
        >
          <option value="">-- Select a role --</option>
          {roles !== ""  && (
            roles.map((role)=> {
              return <option key= {role.id} value={role.id}>{role.name}</option>
            })
          )}
        </Select> */}

        <Input
          label="Full Name"
          placeholder="John Doe"
          autoComplete="name"
          required
          value={form.name}
          onChange={(event) =>
            updateField("name", event.target.value)
          }
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) =>
            updateField("email", event.target.value)
          }
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="+91 9876543210"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) =>
            updateField("phone", event.target.value)
          }
        />

        <div>
          <label
            htmlFor="register-password"
            className="mb-1.5 block text-sm font-medium text-[var(--color-text)]"
          >
            Password
          </label>

          <div className="relative">
            <Input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={(event) =>
                updateField("password", event.target.value)
              }
              className="pr-11"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              className=" absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] "
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-1.5 block text-sm font-medium text-[var(--color-text)]"
          >
            Confirm Password
          </label>

          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
              value={form.confirmPassword}
              onChange={(event) =>
                updateField(
                  "confirmPassword",
                  event.target.value
                )
              }
              className="pr-11"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((value) => !value)
              }
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
              className=" absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] "
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            <UserPlus size={17} />
            Create account
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className=" font-medium text-[var(--color-primary)] hover:underline "
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}