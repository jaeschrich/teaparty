import { IContent} from "../types/types"
import { model, Schema } from "mongoose"

const contentSchema: Schema = new Schema(
  {
    author_id: {
      type: String,
      required: true,
    },
    comment: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model<IContent>("Content", contentSchema)


// Example code for changing attribute of array inside an object (JS)
/*

const itemId = 2;
const query = {
  item._id: itemId 
};
Person.findOne(query).then(doc => {
  item = doc.items.id(itemId );
  item["name"] = "new name";
  item["value"] = "new value";
  doc.save();

  //sent respnse to client
}).catch(err => {
  console.log('Oh! Dark')
});

*/