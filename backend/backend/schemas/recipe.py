from marshmallow import Schema, fields, validate

class RecipeSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(
        required=True,
        validate=validate.Length(min=2, max=100)
    )
    description = fields.String(validate=validate.Length(max=500))
    ingredients = fields.String(
        required=True,
        validate=validate.Length(max=1000)
    )  # Gunakan \n untuk pemisah
    steps = fields.String(
        required=True,
        validate=validate.Length(max=2000)
    )  # Gunakan \n untuk pemisah
    image = fields.Str(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

class RecipeCreateSchema(RecipeSchema):
    title = fields.Str(required=True)
    description = fields.Str(required=True)
    ingredients = fields.Str(required=True)
    steps = fields.Str(required=True)
    image = fields.Url(required=False, allow_none=True)

class RecipeUpdateSchema(Schema):
    """Schema untuk pembaruan resep (hanya field yang bisa diubah)"""
    title = fields.String(validate=validate.Length(min=2, max=100))
    description = fields.String(validate=validate.Length(max=500))
    ingredients = fields.String(validate=validate.Length(max=1000))
    steps = fields.String(validate=validate.Length(max=2000))
    image = fields.Raw(type='file', allow_none=True)