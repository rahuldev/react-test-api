const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Products');
});

const categories = [...Array(5).keys()].map(j => (
  {
    id: `${j + 1}`,
    name: `Category ${(j + 1)}`
  }
));

const products = categories.reduce((acc, category) => {
  for (i = 1; i <= 30; i++) {
    acc.push({
      id: `${category.id}_${i}`,
      categoryId: category.id,
      categoryName: category.name,
      name: `${category.id}_Product ${i}`,
      imageUrl: 'https://picsum.photos/500/500/?random',
      price: Math.floor(Math.random() * 100) + 1,
      rating: Math.floor((Math.random() * 5)) + 1,
      currency: 'AED'
    })
  }
  return acc;
}, [])

app.get('/categories', (req, res) => {
  res.send(categories);
})

app.get('/products', (req, res) => {
  const category = req.query.category;
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 12;
  console.log(req.query)

  let result = products;
  if (category) {
    result = products.filter(x => x.categoryId === category);
  }

  res.send({
    total: result.length,
    skip,
    limit,
    data: result.slice(skip, skip + limit)
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server started');
});