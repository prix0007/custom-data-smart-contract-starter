
const borsh = require('borsh');

// example name (length 32 characters)  
const DUMMY_NAME = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

// example dob (length 2 + 1 + 2 + 1 + 4 characters)
const DUMMY_DOB = "XXXXXXXXXX";

// Let age be 0 for inital
const DUMMY_AGE = 0;

// exmaple shard (length 160 characters)
const DUMMY_ADDRESS = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

const DUMMY_TIMESTAMP = "0000000000000000"; 

class PersonalDetails {
 
  name = DUMMY_NAME;
  dob = DUMMY_DOB;
  age = DUMMY_AGE;
  permanent_address = DUMMY_ADDRESS;
  created_on = DUMMY_TIMESTAMP;
  last_updated_on = DUMMY_TIMESTAMP;

  constructor({
    name,
    dob,
    age,
    permanent_address,
    created_on,
    last_updated_on
  }) {
    if(name && dob && age && permanent_address && created_on && last_updated_on) {
      this.name = name;
      this.dob = dob;
      this.age = age;
      this.permanent_address = permanent_address;
      this.created_on = created_on;
      this.last_updated_on = last_updated_on;
    }
  }
}

const PersonalDetailsSchema = new Map([
  [
    PersonalDetails,
    {
      kind: "struct",
      fields: [
        ["name", "string"],
        ["dob", "string"],
        ["age", "u32"],
        ["permanent_address", "string"],
        ["created_on", "string"],
        ["last_updated_on", "string"],
      ],
    },
  ],
]);

const serialize = () => {
    return borsh.serialize(PersonalDetailsSchema, new PersonalDetails({
      name : DUMMY_NAME,
      dob : DUMMY_DOB,
      age : DUMMY_AGE,
      permanent_address : DUMMY_ADDRESS,
      created_on : DUMMY_TIMESTAMP,
      last_updated_on : DUMMY_TIMESTAMP,
    }));
}

const serializeUpdatedClass = (updatedClass) => {
  return borsh.serialize(PersonalDetailsSchema, updatedClass);
}

const deserialize = (buffer) => {
    return borsh.deserialize(PersonalDetailsSchema, PersonalDetails, buffer);
}

module.exports = {
    serialize,
    deserialize,
    serializeUpdatedClass,
    PersonalDetails
}