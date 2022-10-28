const product = require('../models/Product');
const cart = require('../models/Cart');
const cartProduct = require('../models/CartProduct');
const user = require('../models/User');

const productController = {
   createProduct: async (req, res) => {
      try {
         // const newProducts = new product(req.body);
         // const savaProduct = await newProducts.save();
         // res.status(200).json(savaProduct);
         let { name, price, description, image, category, ingredient, process } = req.body;

         if (!name || !price || !description || !image || !ingredient || !process) {
            return res.render('admin_products_add', { message: 'Vui lòng điền đầy đủ thông tin' });
         }

         if (!category) {
            category = 'Đồ ăn';
         }

         await product.create({
            name,
            price,
            description,
            image,
            category,
            ingredient,
            process,
         });

         res.redirect('/product/getAllProduct');
         return res.render('Admin', { message: 'Thêm sản phẩm thành công', user: req.user });
      } catch (err) {
         res.render('admin_products_add', { message: 'Thêm sản phẩm thất bại', user: req.user });
      }
   },

   getProductJson: async (req, res) => {
      try {
         const products = await product.find({});
         res.status(200).json(products);
      } catch (err) {
         res.status(500).json(err);
      }
   },

   getAllProduct: async (req, res) => {
      try {
         const users = await user.find({});
         const products = await product.find({});
         return res.render('Admin', {
            products,
            countProducts: products.length,
            countUsers: users.length,
            user: req.user,
            message: '',
         });
      } catch (err) {
         res.render('Admin', { message: 'Lỗi', user: req.user });
      }
   },

   updateProduct: async (req, res) => {
      // try {
      //    const { productId } = req.params;
      //    const productItem = await product.findById(productId);
      //    await productItem.updateOne({ $set: req.body });

      //    res.render('admin_products_del', { message: 'Cập nhật sản phẩm thành công', productItem, user: req.user });
      // } catch (err) {
      //    res.render('admin_products_del', { message: 'Cập nhật sản phẩm thất bại' });
      // }
      try {
         const { productId } = req.params;
         const productItem = await product.findById(productId);
         let { name, price, description, image, category, ingredient, process } = req.body;

         if (!name || !price || !description || !image || !ingredient || !process) {
            return res.render('admin_products_del', {
               message: 'Vui lòng điền đầy đủ thông tin',
               productItem,
               user: req.user,
            });
         }

         if (!category) {
            category = 'Đồ ăn';
         }

         await productItem.updateOne({
            name,
            price,
            description,
            image,
            category,
            ingredient,
            process,
         });

         return res.render('admin_products_del', { message: 'Cập nhật sản phẩm thành công', user: req.user, productItem });
      } catch (err) {
         res.render('admin_products_del', { message: 'Cập nhật sản phẩm thất bại', user: req.user });
      }
   },

   deleteProduct: async (req, res) => {
      try {
         // await cart.updateMany({ products: req.params.id }, { $pull: { products: req.params.id } });
         // await cartProduct.updateMany({ productId: req.params.id }, { productId: null });
         // const products = await product.findByIdAndDelete(req.params.id);
         // res.status(200).json(products);
         const { productId } = req.params;
         const productItem = await product.findById(productId);
         await productItem.deleteOne();

         const users = await user.find({});
         const products = await product.find({});

         res.render('Admin', { message: 'Xóa sản phẩm thành công', productItem, user: req.user, products, countProducts: products.length, countUsers: users.length });
      } catch (err) {
         const users = await user.find({});
         const products = await product.find({});
         return res.render('Admin', {
            message: 'Xóa sản phẩm thất bại',
            user: req.user,
            products,
            countProducts: products.length,
            countUsers: users.length,
         });
      }
   },

   getOneProduct: async (req, res) => {
      try{
         const {productId} = req.params;
         const productItem = await product.findById(productId);
         return res.render('productItem',{
            productItem
         });
      } catch (err) {
         res.render('productItem', { message: 'Lỗi', user: req.user });
      }
   },

   getOneProductAdmin: async (req, res) => {
      try{
         const {productId} = req.params;
         const productItem = await product.findById(productId);
         return res.render('admin_products_del',{
            productItem
         });
      } catch (err) {
         res.render('admin_products_del', { message: 'Lỗi', user: req.user });
      }
   }
};

module.exports = productController;
