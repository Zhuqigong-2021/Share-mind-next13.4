import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const PATCH = async (request) => {
  const { id, thumbdownEmail } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data

    existingPrompt.thumbdownEmail = thumbdownEmail;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts thumbdown", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating Prompt thumbdown", { status: 500 });
  }
};
