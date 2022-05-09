import mongoose  from 'mongoose';
import validator from 'validator';
import bcrypt    from 'bcryptjs';
import jwt       from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
    {
      name: {
        type:      String,
        required:  [true, 'Please provide name'],
        min:       3,
        maxlength: 20,
        trim:      true,
      },
      
      email: {
        type:     String,
        required: [true, 'Please provide email'],
        validate: {
          validator: validator.isEmail,
          message:   'Please provide a valid email',
        },
        unique:   true,
      },
      
      password: {
        type:      String,
        required:  [true, 'Please provide password'],
        minlength: 6,
        select:    false,
      },
      
      lastName: {
        type:      String,
        trim:      true,
        maxlength: 20,
        default:   'lastName',
      },
      
      location: {
        type:      String,
        trim:      true,
        maxlength: 20,
        default:   'my city',
      },
    },
);

// # Hooks
UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const salt    = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// # Custom methods
UserSchema.methods.createJWT = function() {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET,
                  { expiresIn: process.env.JWT_LIFETIME });
};

UserSchema.methods.getData = function() {
  return {
    email:    this.email,
    name:     this.name,
    lastName: this.lastName,
    location: this.location,
  };
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;