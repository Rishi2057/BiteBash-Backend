const banners = require("../model/BannerModel");

exports.updateBannerController = async (req, res) => {
  try {
    const defaults = {
      title: banners.schema.paths["title"].defaultValue,
      subtitle: banners.schema.paths["subtitle"].defaultValue,
      button: banners.schema.paths["button"].defaultValue,
      link: banners.schema.paths["link"].defaultValue,
      banner: banners.schema.paths["banner"].defaultValue,
    };

    const data = {
      title: req.body.title?.trim() === "" ? defaults.title : req.body.title,
      subtitle: req.body.subtitle?.trim() === "" ? defaults.subtitle : req.body.subtitle,
      button: req.body.button?.trim() === "" ? defaults.button : req.body.button,
      link: req.body.link?.trim() === "" ? defaults.link : req.body.link,
    };

    // Image field
    if (req.file) {
      data.banner = req.file.filename;
    } else {
      data.banner = defaults.banner;  // if no new file → give default
    }

    const updated = await banners.findOneAndUpdate({}, data, { new: true, upsert: true });

    res.status(200).json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
  


exports.getBannerController = async (req, res) => {
    try {
        const banner = await banners.find()
        res.status(200).json(banner)

    } catch (error) {
        res.status(500).json(error)
    }
}