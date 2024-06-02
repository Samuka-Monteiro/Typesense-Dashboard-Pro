"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from 'next/navigation'
import { useCookie } from "react-use";

const formSchema = z.object({
  host: z.string(),
  port: z.coerce.number(),
  protocol: z.enum(["http", "https"]),
  apikey: z.string(),
});

export default function LoginForm() {
  return <div>login-form</div>;
}
