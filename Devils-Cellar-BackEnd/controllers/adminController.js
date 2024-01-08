const Admin = require("../models/Admin");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


async function index(req, res) {
  try {
    const admins = await Admin.find().sort({createdAt:-1});
    return res.json(admins);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function show(req, res) {
  try {
    const admin = await Admin.findById(req.params.id);
    return res.json(admin);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function store(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const newAdmin = await Admin.create({
      firstname,
      lastname,
      email,
      password,
    });

    return res.status(200).json(newAdmin);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function update(req, res) {
  const form = formidable({
    multiples: true,    
    keepExtensions: true,
  });

  const mainAdmin = await Admin.findOne({ email: "admin@test.com" });
  if (req.params.id !== mainAdmin.id) {
    try {
      form.parse(req, async (err, fields, files) => {
        const ext = path.extname(files.avatar.filepath);
        const newFileName = `image_${Date.now()}${ext}`;
        if (err) return res.json(err);

        if (files.avatar.size !== 0) {
          fields.avatar = newFileName;
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, fields, { new: true });


        if (updatedAdmin) {
          await supabase.storage
            .from("img")
            .upload(newFileName, fs.createReadStream(files.avatar.filepath), {
              cacheControl: "3600",
              upsert: false,
              contentType: files.avatar.mimetype,
              duplex: "half",
            });
        }
        await updatedAdmin.save();
        return res.status(200).json(updatedAdmin);
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    console.log("Test Admin can't be updated");
    return res.json("Test Admin can't be updated");
  }
}


async function destroy(req, res) {
  const mainAdmin = await Admin.findOne({ email: "admin@test.com" });
  if (req.params.id !== mainAdmin.id) {
    try {
      await Admin.findByIdAndRemove(req.params.id);
      res.json("se ha eliminado el admin");
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    console.log("Test Admin can't be deleted");
    return res.json("Test Admin can't be deleted");
  }
}


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
