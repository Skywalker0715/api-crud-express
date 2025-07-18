// Import instance Prisma yang sudah dikonfigurasi
const prisma = require('../helpers/prisma');
const { postSchema } = require('../helpers/schema.js');

// Fungsi untuk mendapatkan semua posts
const getPosts = async (req, res) => {
    try {
        // Mengambil semua data posts dari database
        const posts = await prisma.post.findMany();
        
        // Jika sukses, kembalikan response JSON
        return res.json({
            success: true,
            message: "Get data posts success",
            data: posts,
        });
    } catch (error) {
        // Jika terjadi error, log ke console
        console.log(error);
        
        // Kembalikan response error
        return res.status(500).json({
            success: false,
            message: "Get data posts failed",
        });
    }
};

const createPost = async (req, res) => {
  // 1. Validasi request body menggunakan Zod
  const parseResult = postSchema.safeParse(req.body);

  // 2. Jika validasi gagal, kirim response error
  if (!parseResult.success) {
    const errorMessages = parseResult.error.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errorMessages,
    });
  }

  // 3. Jika validasi berhasil, simpan ke database
  try {
    const { title, authorName, content, published } = parseResult.data;

    const newPost = await prisma.post.create({
      data: {
        title,
        author_name: authorName,
        content,
        published,
      },
    });

    // 4. Kirim response sukses beserta data yang baru dibuat
    return res.status(201).json({
      success: true,
      message: "Create data post success",
      data: newPost,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Fungsi untuk mengupdate post berdasarkan ID
const updatePost = async (req, res) => {
    // 1. Ambil ID dari parameter URL
    const { id } = req.params;

    // 2. Ambil data baru dari body request
    const { title, content, authorName, published } = req.body;

    try {
        // 3. Validasi dasar: pastikan title ada
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Judul tidak boleh kosong!",
            });
        }

        // 4. Lakukan update data di database menggunakan Prisma
        const post = await prisma.post.update({
            // Cari post berdasarkan ID.
            // Gunakan parseInt karena ID dari params adalah string, sedangkan di database adalah integer.
            where: {
                id: parseInt(id),
            },
            // Data baru yang akan di-update
            data: {
                title: title,
                author_name: authorName,
                content: content,
                published: published,
            },
        });

        // 5. Kirim respon sukses beserta data yang sudah di-update
        res.status(200).json({
            success: true,
            message: "Data post berhasil di-update!",
            data: post,
        });

    } catch (error) {
        // 6. Tangani error jika terjadi (misalnya, post dengan ID tersebut tidak ditemukan)
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat meng-update data.",
            error: error.message,
        });
    }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Data post berhasil dihapus!",
      data: deletedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus data.",
      error: error.message,
    });
  }
};

// Export fungsi getPosts agar bisa digunakan di file lain
module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
};
