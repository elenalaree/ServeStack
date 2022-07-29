const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    
  })
		.then((dbTagData) => res.json(dbTagData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
				attributes: ["id", "product_name", "price", "stock", "category_id"],
			},
		],
	})
		.then((dbTagData) => {
			if (!dbTagData) {
				res.status(404).json({ message: "No tags found with this id" });
				return;
			}
			res.json(dbTagData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
  // be sure to include its associated tag data
});

router.post('/', (req, res) => {
  Tag.create({
		Tag_name: req.body.Tag_name,
	})
		.then((dbTagData) => res.json(dbTagData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(
		{
			Tag_name: req.body.Tag_name,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbTagData) => {
			if (!dbTagData) {
				res.status(404).json({ message: "No Tag found with this id" });
				return;
			}
			res.json(dbTagData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbTagData) => {
			if (!dbTagData) {
				res.status(404).json({ message: "No Tag found with this id!" });
				return;
			}
			res.json(dbTagData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
  // delete on tag by its `id` value
});

module.exports = router;
