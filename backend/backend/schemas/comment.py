from marshmallow import Schema, fields, validate

class CommentSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    recipe_id = fields.Integer(required=True)
    user_name = fields.Method("get_user_name", dump_only=True)
    comment_text = fields.String(
        required=True,
        validate=validate.Length(max=500)
    )
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    def get_user_name(self, obj):
        """Method to retrieve the username from the associated user."""
        return obj.user.username if obj.user else None  # Assuming the 'user' relationship is correctly loaded

class CommentCreateSchema(Schema):
    """Schema untuk pembuatan komentar (tanpa field read-only)"""
    
    # Fields that are required during creation
    user_id = fields.Integer(required=True)
    recipe_id = fields.Integer(required=True)
    comment_text = fields.String(
        required=True,
        validate=validate.Length(max=500)  # Limit the length of the comment text
    )
    
    # No need to include created_at, updated_at, or id fields here
    # These fields are auto-generated or auto-managed by the database

class CommentUpdateSchema(Schema):
    """Schema untuk pembaruan komentar (hanya field yang bisa diubah)"""
    comment_text = fields.String(validate=validate.Length(max=500))
