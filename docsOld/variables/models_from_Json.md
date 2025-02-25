---
sidebar_position: 5
title: JSON to Model generator
description: How to generate models from a JSON string with a click 
---


You would usually [create objects](./create_objects.md), each object representing a model.

But what if you have a group of models? It can be time-consuming to create objects one by one.

Nowa lets you create a group of models from a single JSON file, streamlining your workflow and saving you time.

## A Usecase example:


Let's say I have this model: 

```json

{
  "product_id": 98765,
  "product_name": "Smartphone",
  "description": "Latest model smartphone with advanced features.",
  "price": 699.99,
  "available_sizes": [],
  "colors": [
    {
      "color_name": "Black",
      "hex_value": "#000000"
    },
    {
      "color_name": "Silver",
      "hex_value": "#C0C0C0"
    }
  ],
  "in_stock": true,
  "categories": [
    {
      "category_id": 1,
      "category_name": "Electronics"
    },
    {
      "category_id": 2,
      "category_name": "Mobile Phones"
    }
  ],
  "reviews": [
    {
      "review_id": 101,
      "user_name": "John Doe",
      "rating": 4.5,
      "comment": "Great phone with excellent battery life!"
    },
    {
      "review_id": 102,
      "user_name": "Jane Smith",
      "rating": 4.0,
      "comment": "Good value for the price."
    }
  ],
  "supplier": {
    "supplier_id": 555,
    "supplier_name": "TechSupplier Inc.",
    "contact_email": "contact@techsupplier.com",
    "phone_number": "+1-800-123-4567"
  }
}
```
and I want to create models for the root `Products` and for `reviews`, `categories` and `supplier`. 


### Steps to generate models from a JSON text

1. Click on the `+` icon next to the `lib` folder in the Files panel.
2. Select `New model from JSON`.
3. Paste your JSON string into the editor.
4. Give your root model a name and specify the path where it will be stored.
5. Click "Save and Open" to generate your models.

Nowa will automatically create all the necessary models, including submodels for nested structures.


![](./img/model_json.gif)

You can see on the right all the models that have been generated from that JSON. Click on `Collapse All` to collabe all the models to see a top view for all the models that will be generated.

Submodels will also be generated as the `reviews`, `categories` and `supplier` in our example above.

All models are now generated in the same root file `product.dart` 

That's it! Your models are now ready to use or modify as needed.

