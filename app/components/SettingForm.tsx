"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { updateUsername } from "../actions";
import SubmitButton from "./SubmitButtons";
import { useFormState } from "react-dom";

const initialState = {
    username: "",
}

const SettingsForm = ({ username }: { username: string | null | undefined }) => {
    const [state, formAction] = useFormState(updateUsername, initialState)

    return (
        <form action={formAction}>
            <h1 className="text-3xl font-extralight tracking-tight">Settings</h1>

            <Separator className="my-4" />
            <Label className="text-lg">Username</Label>
            <p className="text-muted-foreground">In this Settings page you can change your username</p>

            <Input defaultValue={username ?? undefined} name="username" required className="mt-2" min={2} maxLength={21} />

            <div className="w-full flex mt-5 gap-x-5 justify-end">
                <Button variant="secondary" asChild type="button">
                    <Link href="/">Cancel</Link>
                </Button>
                <SubmitButton />
            </div>
        </form>
    );
}

export default SettingsForm;