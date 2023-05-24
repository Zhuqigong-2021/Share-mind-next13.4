import User from "@models/user";
import { connectToDB } from "@utils/database";
export const PATCH = async (request, { params }) => {
  const { url } = await request.json();
  console.log("url from the json ");
  console.log(url);
  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingUser = await User.findById(params.id);
    console.log("find the user id");
    console.log(params.id);

    if (!existingUser) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data

    existingUser.url = url;

    await existingUser.save();
    console.log(existingUser);

    return new Response("Successfully updated the background image", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating background Image", { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(params);

    const findUser = await User.findById(params.id);

    if (!findUser) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(findUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to find the user", {
      status: 500,
    });
  }
};

// export default function handler(req, res) {
//   if (req.method !== "GET") {
//     res.status(405).json({ error: "Method Not Allowed" });
//     return;
//   }

//   const { userId } = req.query;

//   try {
//     connectToDB();
//     console.log(params);

//     const findUser = User.findById(userId);

//     if (!findUser) {
//       return new Response("User not found", { status: 404 });
//     }
//     return new Response(JSON.stringify(findUser), { status: 200 });
//   } catch (error) {
//     return new Response("Failed to find the user", {
//       status: 500,
//     });
//   }
// }
