// models/Form.ts
import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  mainUnit: { type: String, required: true },
  subUnit: { type: String },
  date: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Form || mongoose.model('Form', FormSchema);
