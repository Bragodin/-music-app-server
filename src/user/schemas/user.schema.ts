import * as mongoose from 'mongoose';
import { roleEnum } from '../enums/role.enum';
import { statusEnum } from '../enums/status.enum';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(statusEnum),
    default: statusEnum.active
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
    required: false,
    enum: Object.values(roleEnum),
    default: [roleEnum.user],
  },
  myMusic: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'User'
    }
  ]
});

UserSchema.index({ email: 1 }, {unique: true });

const User = mongoose.model("User", UserSchema);


