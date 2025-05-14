from marshmallow import Schema, fields, validate

class CommentSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    recipe_id = fields.Integer(required=True)
    comment_text = fields.String(
        required=True,
        validate=validate.Length(max=500)
    )
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

class CommentCreateSchema(CommentSchema):
    """Schema untuk pembuatan komentar (tanpa field read-only)"""
    pass

class CommentUpdateSchema(Schema):
    """Schema untuk pembaruan komentar (hanya field yang bisa diubah)"""
    comment_text = fields.String(validate=validate.Length(max=500))