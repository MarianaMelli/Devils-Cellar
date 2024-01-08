const Product = require("../models/Product");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function index(req, res) {
  try {
    const products = await Product.find().populate("category").sort({createdAt:-1});
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function showFeaturedProducts(req, res) {
  try {
    const featuredProducts = await Product.find({ featured: true }).populate("category");
    return res.json(featuredProducts);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function show(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    return res.json(product);
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
      console.log({ fields });
      if (err) return res.json(err);
      const ext = path.extname(files.img.filepath);
      const newFileName = `image_${Date.now()}${ext}`;

      
      fields.img = newFileName;

      const newProduct = await Product.create(fields);

      if (newProduct) {
        const { data, error } = await supabase.storage
          .from("img")
          .upload(newFileName, fs.createReadStream(files.img.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.img.mimetype,
            duplex: "half",
          });
      }

      return res.status(200).json(newProduct);
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
      const ext1 = path.extname(files.img.filepath);
      const ext2 = path.extname(files.featuredImg.filepath);
      const newFileName1 = `image_${Date.now()}${ext1}`;
      const newFileName2 = `featured_image_${Date.now()}${ext2}`;
      if (err) return res.json(err);

      if (files.img.size !== 0) {
        fields.img = newFileName1;
      }
      if (files.featuredImg.size !== 0) {
        fields.featuredImg = newFileName2;
      }
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, fields, { new: true });

      if (updatedProduct) {
        await supabase.storage
          .from("img")
          .upload(newFileName1, fs.createReadStream(files.img.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.img.mimetype,
            duplex: "half",
          });

        await supabase.storage
          .from("img")
          .upload(newFileName2, fs.createReadStream(files.featuredImg.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.featuredImg.mimetype,
            duplex: "half",
          });
      }
      await updatedProduct.save();
      res.json(updatedProduct);
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function destroy(req, res) {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.json("se ha eliminado tu producto");
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
  showFeaturedProducts,
  index,
  show,
  store,  
  update,
  destroy,
};
