import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const PATCH = async (request) => {
  const { id, thumbupEmail } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data

    existingPrompt.thumbupEmail = thumbupEmail;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts thumbup", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating Prompt thumbup", { status: 500 });
  }
};
