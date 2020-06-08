import * as mongoose from 'mongoose';
import { roleEnum } from '../enums/role.enum';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    required: true,
    enum: Object.values(roleEnum)
  }
});

UserSchema.index({ email: 1 }, {unique: true });

const User = mongoose.model("User", UserSchema);


