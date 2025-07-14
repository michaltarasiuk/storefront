"use client";

import {useFormStatus} from "react-dom";

import {Button} from "@/components/Button";

export function SaveButton() {
  const {pending} = useFormStatus();
  return <Button isPending={pending}>Save</Button>;
}
