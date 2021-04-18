import { ISubmission} from "../types/types"
import { model, Schema } from "mongoose"

const submissionSchema: Schema = new Schema(
  {
    author: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    category: {
      type: Number, 
      require: true,
    },
    link: {
      link: Number,
      require: true,
    },
    comments: {
      type: String,
      required: true,
    },
    accepted: {
      type: Number,
      required: false,
    },
    voting_session: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
)

export default model<ISubmission>("Submission", submissionSchema)


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