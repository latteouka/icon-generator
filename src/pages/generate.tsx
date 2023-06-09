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
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const [form, setForm] = useState({
    prompt: "",
    color: "",
    number: "1",
  });

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      if (data.length === 0) return;
      setImagesUrl(data);
    },
  });

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    generateIcon.mutate({ ...form, number: parseInt(form.number) });
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
        <h1 className="mt-8 text-6xl">Generate your oil paint</h1>
        <p className="mb-12 mt-4">
          Fill out the form below to start generating your images.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <h2 className="text-xl">
            1. Describe what you want your paint to look like.
          </h2>
          <FormGroup className="mb-12">
            <label>About the paint:</label>
            <Input
              value={form.prompt}
              onChange={updateForm("prompt")}
              type="text"
            />
          </FormGroup>

          <h2 className="text-xl">2. Pick your main theme color</h2>
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

          <h2 className="text-xl">3. How many do you want?</h2>
          <FormGroup className="mb-12">
            <label>Number of paints: {form.number}</label>
            <input
              type="range"
              max="10"
              min="1"
              defaultValue="1"
              onChange={updateForm("number")}
              className="dark:bg-gray-70 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
          </FormGroup>
          {/* Submit */}
          <Button disabled={generateIcon.isLoading} className="mb-12">
            {generateIcon.isLoading && <LoadingSpinner />}
            {!generateIcon.isLoading && "Submit"}
          </Button>
          {imagesUrl.length > 0 && (
            <>
              <h2>Result:</h2>
              <section className="mb-12 grid grid-cols-4 gap-4">
                {imagesUrl.map((url) => (
                  <Image
                    key={url}
                    src={url}
                    alt="icon"
                    height={200}
                    width={200}
                    className="rounded"
                  />
                ))}
              </section>
            </>
          )}
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
