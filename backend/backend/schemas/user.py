from marshmallow import Schema, fields, validate
import bcrypt

class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    username = fields.String(
        required=True,
        validate=validate.Length(min=3, max=50),
        error_messages={"required": "Username wajib diisi."}
    )
    email = fields.String(
        required=True,
        error_messages={"required": "Email wajib diisi.", "validator_failed": "Format email tidak valid."}
    )
    
    password = fields.String(
        required=True,
        load_only=True,
        validate=validate.Length(min=8)
    )
    
    role = fields.String(
        required=True,
        validate=validate.OneOf(["user", "admin"])
    )
    
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

class UserCreateSchema(Schema):
    username = fields.String(
        required=True,
        validate=validate.Length(min=3, max=50),
        error_messages={
            "required": "Username wajib diisi.",
            "min": f"Username minimal 3 karakter.",
            "max": f"Username maksimal 50 karakter."
        }
    )
    email = fields.Email(
        required=True,
        error_messages={
            "required": "Email wajib diisi.",
            "invalid": "Format email tidak valid."
        }
    )
    password = fields.String(
        required=True,
        load_only=True,
        validate=validate.Length(min=8),
        error_messages={
            "required": "Password wajib diisi.",
            "min": "Password minimal 8 karakter."
        }
    )

    role = fields.String(
        required=True,
        load_only=True,
    )

class UserUpdateSchema(Schema):
    """Schema untuk pembaruan user (hanya field yang bisa diubah)"""
    username = fields.String(validate=validate.Length(min=2, max=50))
    email = fields.String(validate=validate.Email())
    password = fields.String(
        load_only=True,
        validate=validate.Length(min=8)
    )
    role = fields.String(validate=validate.OneOf(["user", "admin"]))