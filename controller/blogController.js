const Design = require("../modal/blogUser");

const getBlogs = async (req, res) => {
  try {
    const design = await Design.find();
    res.json(design);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Design.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addBlog = async (req, res) => {
  try {
    const { blogTitle, blogContent, authorId } = req.body;
    const newBlog = new Design({ blogTitle, blogContent, authorId });
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Design.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog };