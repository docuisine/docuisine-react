import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SeedUserStep() {
    return (
        <>
            <Label className="mb-2">Username</Label>
            <Input placeholder="Enter your name" />
            <Label className="mb-2 mt-4">Email</Label>
            <Input placeholder="Enter your email" type="email" />
            <Label className="mb-2 mt-4">Password</Label>
            <Input placeholder="Enter a password" type="password" />
            <Label className="mb-2 mt-4">Confirm Password</Label>
            <Input placeholder="Confirm your password" type="password" />
        </>
    );
}