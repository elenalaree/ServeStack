const router = require("express").Router();
const { Category, Product, Tag, ProductTag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	Category.findAll({
		include: [
			{
				model: Product,
				attributes: ["id", "product_name", "price", "stock", "category_id"],
				include: {
					model: Tag,
					attributes: ["tag_id", "tag_name"],
				},
			},
		],
	})
		.then((dbCategoryData) => res.json(dbCategoryData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	// be sure to include its associated Products
});

router.get("/:id", (req, res) => {
	Category.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
				attributes: ["id", "product_name", "price", "stock", "category_id"],
				include: {
					model: Tag,
					attributes: ["tag_id", "tag_name"],
				},
			},
		],
	})
		.then((dbCategoryData) => {
			if (!dbCategoryData) {
				res.status(404).json({ message: "No user found with this id" });
				return;
			}
			res.json(dbCategoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	// be sure to include its associated Products
});

router.post("/", (req, res) => {
	// create a new category
	Category.create({
		category_name: req.body.category_name,
	})
		.then((dbCategoryData) => res.json(dbCategoryData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	Category.update(
		{
			category_name: req.body.category_name,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbCategoryData) => {
			if (!dbCategoryData) {
				res.status(404).json({ message: "No category found with this id" });
				return;
			}
			res.json(dbCategoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	Category.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCategoryData) => {
			if (!dbCategoryData) {
				res.status(404).json({ message: "No category found with this id!" });
				return;
			}
			res.json(dbCategoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	// delete a category by its `id` value
});

module.exports = router;
