from marshmallow import Schema, fields, validate
import bcrypt

class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    username = fields.String(
        required=True,
        validate=validate.Length(min=2, max=50)
    )
    email = fields.String(
        required=True,
        validate=validate.Email(error="Format email tidak valid")
    )
    password = fields.String(
        required=True,
        load_only=True,  # Tidak ditampilkan di response
        validate=validate.Length(min=6)
    )
    role = fields.String(
        required=True,
        validate=validate.OneOf(["user", "admin"])
    )
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

class UserCreateSchema(Schema):
    username = fields.String(required=True, validate=validate.Length(min=3))
    email = fields.Email(required=True)
    password = fields.String(required=True, load_only=True)
    
    def load(self, data, *args, **kwargs):
        data = super().load(data, *args, **kwargs)
        data["password"] = bcrypt.hashpw(
            data["password"].encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")
        return data
    

class UserUpdateSchema(Schema):
    """Schema untuk pembaruan user (hanya field yang bisa diubah)"""
    username = fields.String(validate=validate.Length(min=2, max=50))
    email = fields.String(validate=validate.Email())
    password = fields.String(
        load_only=True,
        validate=validate.Length(min=6)
    )
    role = fields.String(validate=validate.OneOf(["user", "admin"]))