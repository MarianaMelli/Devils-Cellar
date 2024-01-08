const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function index(req, res) {
  try {
    const users = await User.find().populate("myOrders").sort({createdAt:-1});
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function show(req, res) {
  try {
    const user = await User.findById(req.params.id).populate("myOrders");
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function store(req, res) {
  try {
    const { firstname, lastname, address, email, phone, password } = req.body;

    const newUser = await User.create({
      firstname,
      lastname,
      address,
      email,
      phone,
      password,
    });

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function update(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });
  try {
    form.parse(req, async (err, fields, files) => {
      const ext = path.extname(files.avatar.filepath);
      const newFileName = `image_${Date.now()}${ext}`;
      if (err) return res.json(err);

      if (files.avatar.size !== 0) {
        fields.avatar = newFileName;
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, fields, { new: true });

      if (updatedUser) {
        await supabase.storage
          .from("img")
          .upload(newFileName, fs.createReadStream(files.avatar.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.avatar.mimetype,
            duplex: "half",
          });
      }    
      await updatedUser.save();
      return res.status(200).json(updatedUser);
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function destroy(req, res) {
  const mainUser = await User.findOne({ email: "user@test.com" });
  if (req.params.id !== mainUser.id) {
    try {
      await User.deleteById(req.params.id);
      return res.json("user deleted");
    } catch (error) {
      return console.log(error);
    }
  } else {
    console.log("Test User can't be deleted");
    return res.json("Test User can't be deleted");
  }
}
async function findDeleted(req, res) {
  try {
    const deletedUser = await User.findDeleted();
    return res.json(deletedUser);
  } catch (error) {
    return console.log(error);
  }
}

async function restore(req, res) {
  try {
    await User.restore({ id: req.params.id });

    return res.json("the user has been restored");
  } catch (error) {
    return console.log(error);
  }
}


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  findDeleted,
  restore,
};
