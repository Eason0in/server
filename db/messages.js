const db = require("./connection");
const Joi = require("joi");

const schema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .required(),
  subject: Joi.string().required(),
  message: Joi.string()
    .max(500)
    .required(),
  imageURL: Joi.string().uri({
    scheme: [/https?/]
  })
});

//collection-name
const messages = db.get("messages");

const getAll = () => {
  return messages.find();
};

const create = message => {
  if (!message.username) message.username = "Anonymous";

  const result = Joi.validate(message, schema);
  if (result.error == null) {
    message.create = new Date();
    return messages.insert(message);
  } else {
    return Promise.reject(result.error);
  }
};

module.exports = {
  create,
  getAll
};
