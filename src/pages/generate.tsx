import { type NextPage } from "next";
import Image from "next/image";

import Input from "~/components/Input";
import FormGroup from "~/components/FromGroup";
import { useState } from "react";
import { api } from "~/utils/api";
import Button from "~/components/Button";
import LoadingSpinner from "~/components/LoadingSpinner";
import SeoHead from "~/components/SeoHead";

const colors = [
  "blue",
  "red",
  "pink",
  "green",
  "orange",
  "yellow",
  "white",
  "black",
];

const GeneratePage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const [form, setForm] = useState({
    prompt: "",
    color: "",
  });

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      if (!data.imageUrl) return;
      setImageUrl(data.imageUrl);
    },
  });

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    generateIcon.mutate(form);
    setForm((prev) => ({ ...prev, prompt: "" }));
  }

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }
  return (
    <>
      <SeoHead title="Image Generator" desc="Create your own AI images" />
      <main className="container mx-auto flex min-h-screen flex-col justify-center px-8">
        <h1 className="text-6xl">Generate yout icons</h1>
        <p className="mb-12">
          Fill out the form below to start generating your icons.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <h2 className="text-xl">
            1. Describe what you want your icon to look like.
          </h2>
          <FormGroup className="mb-12">
            <label>Prompt</label>
            <Input value={form.prompt} onChange={updateForm("prompt")} />
          </FormGroup>

          <h2 className="text-xl">2. Pick your icon color</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {colors.map((color) => (
              <label className="flex gap-2 text-xl" key={color}>
                <input
                  type="radio"
                  name="color"
                  // value={color}
                  onChange={() => setForm((prev) => ({ ...prev, color }))}
                />
                {color}
              </label>
            ))}
            {/* <Input value={form.prompt} onChange={updateForm("color")} /> */}
          </FormGroup>

          {/* Submit */}
          <Button disabled={generateIcon.isLoading}>
            {generateIcon.isLoading && <LoadingSpinner />}
            {!generateIcon.isLoading && "Submit"}
          </Button>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="icon"
              height={400}
              width={400}
              className="mb-12 rounded"
            />
          )}
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
