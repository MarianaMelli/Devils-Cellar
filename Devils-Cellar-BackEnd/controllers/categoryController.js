const Category = require("../models/Category");
const Product = require("../models/Product");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


async function index(req, res) {
  try {
    const categories = await Category.find().sort({createdAt:-1});
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function show(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    return res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function store(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });
  try {
    form.parse(req, async (err, fields, files) => {
      const ext = path.extname(files.img.filepath);
      const newFileName = `image_${Date.now()}${ext}`;
      if (err) return res.json(err);

      fields.img = newFileName;

      const newCategory = await Category.create(fields);

      if (newCategory) {
        const { data, error } = await supabase.storage
          .from("img")
          .upload(newFileName, fs.createReadStream(files.img.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.img.mimetype,
            duplex: "half",
          });
      }
      return res.status(200).json(newCategory);
    });
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
      if (err) return res.json(err);
      const ext = path.extname(files.img.filepath);
      const newFileName = `image_${Date.now()}${ext}`;
      if (files.img.size !== 0) {
        fields.img = newFileName;
      }

      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, fields, { new: true });

      if (updatedCategory) {
        await supabase.storage
          .from("img")
          .upload(newFileName, fs.createReadStream(files.img.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.img.mimetype,
            duplex: "half",
          });
      }
      await updatedCategory.save();
      return res.status(200).json(updatedCategory);
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function destroy(req, res) {
  try {
    await Product.deleteMany({ category: req.params.id });
    await Category.findByIdAndRemove(req.params.id);
    res.json("se ha eliminado tu categoria");
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
